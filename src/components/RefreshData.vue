<template>
  <div>
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
          <countup v-if="step<3"
            :start-val="1"
            :end-val="percent"
            :duration="3"
            class="vux-circle-demo-font"></countup>
          <!-- 百分号 -->
          <span v-if="step<3"
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
      <x-button @click.native="stepPlus"
        v-if="step==0"
        :gradients="['#1D62F0', '#19D5FD']"
        style="border-radius:99px;">同 步 数 据</x-button>
      <x-button @click.native="stepPlus"
        v-else-if="step==1"
        :gradients="['#6F1BFE', '#9479DF']"
        style="border-radius:99px;"
        show-loading>爬 取 数 据 中 ...</x-button>
      <x-button @click.native="stepPlus"
        v-else-if="step==2"
        :gradients="['#A644FF', '#FC5BC4']"
        style="border-radius:99px;"
        show-loading>数 据 同 步 中 ...</x-button>
      <x-button v-else
        plain
        disabled
        style="border-radius:99px;color: #97A8B0;">同 步 数 据 (21min)</x-button>
    </box>
  </div>
</template>

<script>
import { Box, Countup, Divider, Marquee, MarqueeItem, XButton, XCircle } from 'vux'

export default {
  name: 'RefreshData',
  components: {
    Box,
    Countup,
    Divider,
    Marquee,
    MarqueeItem,
    XButton,
    XCircle
  },
  data () {
    return {
      lastRefreshTime: '2018-11-25 20:00',
      percent: 0,
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
      marqueeMsg: null,
      step: 0
    }
  },
  created: function () {
    this.marqueeMsg = this.marqueeMsg0
  },
  methods: {
    stepPlus () {
      this.step += 1
      this.percentPlus()
      this.marqueeMsg = this.marqueeMsg1
      if (this.step === 3) {
        this.percent = 200
        this.marqueeMsg = this.marqueeMsg0
      }
    },
    percentPlus () {
      this.percent += (100 / 2)
    }
  }
}
</script>

<style>
.vux-background {
  background: linear-gradient(to top right, #ecf5ff, #f7feff, #f7f9ff);
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
  bottom: 9vh;
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
</style>
