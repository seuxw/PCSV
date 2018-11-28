<template>
  <div>
    <!-- <div v-transfer-dom>
      <confirm v-model="show2"
        :title="'须知'"
        theme="android"
        hide-on-blur>
        <p>微微已对所有爬取到的数据进行加密传输，请放心使用。</p>
        <p>请认真阅读<a href="https://github.com/seuxw/PCSV/blob/master/EULA.md">《用户许可协议》</a>。</p>
        <p>使用本网页爬虫，即表示您同意协议中条款。</p>
      </confirm>
    </div> -->
    <!-- 提示框 -->
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur"
        class="dialog-demo"
        hide-on-blur>
        <div class="img-box">
          <img src="https://s1.ax1x.com/2018/11/28/FVTIxK.gif"
            style="max-width:100%">
          <p class="align-middle"
            style="margin-top: 10px;">所有数据将加密传输，请放心使用</p>
          <p class="align-middle">请认真阅读
            <a href="https://github.com/seuxw/PCSV/blob/master/EULA.md">《用户许可协议》</a>
          </p>
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <!-- html 背景 -->
    <div class="vux-background"></div>
    <!-- circle 组件 -->
    <div class="vux-circle-demo">
      <div class="vux-circle-demo-p">
        <x-circle :percent="percent"
          :stroke-width="1"
          :trail-width="1"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec">
          <!-- circle 内含 -->
          <!-- 百分数 -->
          <countup v-if="step<totalStep"
            :start-val="1"
            :end-val="percent"
            :duration="3"
            class="vux-circle-demo-font"></countup>
          <!-- 百分号 -->
          <span v-if="step<totalStep"
            class="vux-circle-demo-font">%</span>
          <!-- 成功弯勾 -->
          <svg v-else
            class="icon myIconStyle"
            aria-hidden="true">
            <use xlink:href="#icon-dagouwuquan"></use>
          </svg>
        </x-circle>
      </div>
    </div>
    <!-- marquee 组件 -->
    <div class="vux-marquee">
      <marquee :interval=3000>
        <marquee-item v-for="i in marqueeMsg"
          :key="i"
          class="align-middle"
          style="list-style:none;">{{i}}</marquee-item>
      </marquee>
    </div>
    <!-- button 组件 -->
    <box class="vux-button">
      <x-button @click.native="startSpider"
        v-if="step==0"
        :gradients="['#1D62F0', '#19D5FD']"
        style="border-radius:99px;">同 步 数 据</x-button>
      <x-button v-else-if="step==totalStep"
        plain
        disabled
        style="border-radius:99px;color: #97A8B0;">同 步 数 据 (21min)</x-button>
      <x-button @click.native="stepPlus"
        v-else-if="step!=totalStep-1"
        :gradients="['#6F1BFE', '#9479DF']"
        style="border-radius:99px;"
        show-loading>爬 取 数 据 中 ...</x-button>
      <x-button @click.native="stepPlus"
        v-else
        :gradients="['#A644FF', '#FC5BC4']"
        style="border-radius:99px;"
        show-loading>数 据 同 步 中 ...</x-button>
    </box>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { Box, Confirm, Countup, Divider, Marquee, MarqueeItem, TransferDomDirective as TransferDom, XButton, XCircle, XDialog } from 'vux'

export default {
  name: 'RefreshData',
  directives: {
    TransferDom
  },
  components: {
    Box,
    Confirm,
    Countup,
    Divider,
    Marquee,
    MarqueeItem,
    TransferDom,
    XButton,
    XCircle,
    XDialog
  },
  data () {
    return {
      totalStep: 4,
      percent: 0,
      step: 0,
      marqueeMsg: null,
      marqueeMsg0: [
        'Tip: 每 40 分钟才可同步一次哦～',
        '动动手指，获取最新跑操数据吧',
        'Tip: 只有连接 seu-wlan 才可进行同步操作',
        '我为人人，人人为我～'
      ],
      marqueeMsg1: [
        '稍等片刻，马上就好',
        'Tip: 每 40 分钟才可同步一次哦～',
        '秋意正好，不如喝杯热水休息一下',
        'Tip: 只有连接 seu-wlan 才可进行同步操作',
        '微微正在努力同步中～',
        'Tip: 每次同步耗时约为一分钟哦',
        '关注小微 GitHub，一起参与开发～',
        'Tip: 如有问题，欢迎致信微微邮箱'
      ],
      showHideOnBlur: true,
      sessionID: '5CF1C1D07A81503A5AC5E62076C26136',
      dataJson: {}
    }
  },
  created: function () {
    this.marqueeMsg = this.marqueeMsg0
  },
  methods: {
    stepPlus () {
      this.step += 1
      this.percent += (100 / this.totalStep)
      this.marqueeMsg = this.marqueeMsg1
      if (this.step === this.totalStep) {
        this.percent = 200
        this.marqueeMsg = this.marqueeMsg0
      }
    },
    dataGzip () {
      let pako = require('pako')
      return pako.gzip(JSON.stringify(this.dataJson), { to: 'string' })
    },
    dataAES () {
      // TODO: 此处密码为测试用
      const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
      const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量
      let encrypted = CryptoJS.AES.encrypt(this.dataGzip(), key,
        { iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7 })
      let dataAes = encrypted.ciphertext.toString()
      // console.log(dataAes)
      return dataAes
    },
    async startSpider () {
      this.stepPlus()
      let expiresMin = 10
      let d = new Date()
      this.dataJson = {}
      d.setTime(d.getTime() + 60 * 1000 * expiresMin)
      document.cookie =
        'JSESSIONID=' + this.sessionID + ';path=/;expires=' + d.toGMTString()
      await this.getHtmlAll()
      this.dataAES()
    },
    async getHtmlAll () {
      let page = this.totalStep - 2
      do {
        await this.getHtml(page)
      } while (--page)
    },
    async getHtml (page) {
      await this.getHtmlPromise(page)
        .then(res => {
          if (res.status !== '200') {
            res = res.data
            this.dataJson[page] = this.htmlSplit(res)
            // console.log(this.dataJson[page])
            // console.log(page)
            this.stepPlus()
          } else {
          }
        })
        .catch(function (e) {
          console.log(e)
        })
    },
    htmlSplit (res) {
      var resRe =
        '<td width=.+align="center">213(.+)</td>\\s+<td width=.+align="center">.+</td>\\s+<td width=.+align="center">.+</td>\\s+<td width=.+align="center">.+</td>\\s+<td width=.+align="center">.+</td>\\s+<td width=.+align="center">(.+)</td>'
      var resReG = new RegExp(resRe, 'g')
      var result = res.match(resReG)
      let resultList = []
      let len = result.length
      let i = len - 1
      if (i > -1) {
        do {
          let resultSplit = result[i].match(resRe)
          resultList.push(resultSplit[1] + resultSplit[2])
        } while (i-- > 1)
      }
      // console.log(new Date().getTime());
      let resultStr = len + '.' + resultList.join('.')
      return resultStr
    },
    getHtmlPromise (page) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            '/SportWeb/gym/gymExercise/gymExercise_query_resultCnt.jsp?pageStr=' +
            page
          )
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';

.vux-background {
  background: linear-gradient(to top right, #f2f7ff, #fcffff, #ecf5ff);
  /* background: radial-gradient(circle, #f7feff, #ecf5ff); */
  width: 100vw;
  height: 100vh;
}
.align-middle {
  text-align: center;
  color: #335769;
  -webkit-transform: scale(0.75);
}
.vux-circle-demo {
  position: fixed;
  left: 50%;
  top: 40vh;
  margin-top: -30vmin;
  margin-left: -30vmin;
  text-align: center;
}
.vux-circle-demo-p {
  height: 60vmin;
  width: 60vmin;
}
.vux-circle-demo-font {
  color: #335769;
  font-size: 400%;
}
.myIconStyle {
  width: 60%;
  height: 60%;
  color: #335769;
}
.vux-marquee {
  position: fixed;
  bottom: 10vh;
  right: 0%;
  color: #335769;
}
.vux-button {
  position: fixed;
  left: 50%;
  width: 60vmin;
  bottom: 3vh;
  margin-left: -30vmin;
}
.dialog-demo {
  .img-box {
    height: 295px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 12px;
    margin-bottom: 25px;
  }
}
</style>
