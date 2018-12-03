<template>
  <div>
    <div v-transfer-dom>
      <loading :show="loadShow"
        text=""></loading>
    </div>
    <toast v-model="toastShow"
      type="cancel"
      :time=5000>登录异常</toast>
    <div v-transfer-dom>
      <confirm v-model="confirmShow"
        show-input
        placeholder="输入一卡通号"
        :title="'用户绑定'"
        :input-attrs="{type: 'number'}"
        @on-confirm="onConfirm"
        :close-on-confirm=false
        confirm-text="我很确定"
        :show-cancel-button=false>
      </confirm>
      <toast v-model="toastShow2" 
        position="bottom" 
        type="text"
        width="10em">请输入正确一卡通号</toast>
    </div>
    <!-- html 背景 -->
    <div class="vux-background"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Confirm, Loading, Toast, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'Login',
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Loading,
    Toast,
    TransferDom
  },
  created: function () {
    if (this.$cookies.get('__qc__k') == null) {
      //   eslint-disable-next-line
      QC.Login.showPopup({
        appId: '101529980',
        redirectURI: 'https://seuxw.cn/webapp/paocao'
      })
    } else if (this.$cookies.get('xAuth') == null) {
      this.loadShow = false
      this.confirmShow = true
    } else {
      // TODO: 添加 xAuth 更新代码
      this.$router.push({
        path: '/paocao',
        name: 'paocao'
      })
    }
  },
  data () {
    return {
      loadShow: true,
      toastShow: false,
      toastShow2: false,
      cardno: null,
      confirmShow: false
    }
  },
  methods: {
    async getXAuth (tk, cardno) {
      let i = 3
      // TODO: 修复 xAuth 多次请求问题
      do {
        var res = await axios.post('/xAuth?tk=' + this.$cookies.get('__qc__k') +
          '&cardno=' + this.cardno)
        res = res.data['data']['token']
      } while (--i || res == null)
      return { res: '555' }
    },
    async onConfirm (inputCardno) {
      this.cardno = inputCardno
      while (this.cardno < 213150000 || this.cardno > 213190000) {
        this.toastShow2 = true
        return
      }
      let xAuth = await this.getXAuth()
      // TODO: 添加 xAuth 正确性判断
      if (xAuth == null) {
        this.toastShow = true
      } else {
        this.confirmShow = false
        this.$cookies.set('xAuth', xAuth)
        this.$router.push({
          path: '/paocao',
          name: 'paocao'
        })
      }
    }
  }
}
</script>

<style>
.vux-background {
  background: linear-gradient(to top right, #f2f7ff, #fcffff, #ecf5ff);
  /* background: radial-gradient(circle, #f7feff, #ecf5ff); */
  width: 100vw;
  height: 100vh;
}
</style>
