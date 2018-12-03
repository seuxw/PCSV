<template>
  <div>
    <div v-transfer-dom>
      <loading :show="loadShow"
        text=""></loading>
    </div>
    <toast v-model="toastShow"
      type="cancel"
      :time=5000>登录异常</toast>
    <!-- html 背景 -->
    <div class="vux-background"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading, Toast, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'Login',
  directives: {
    TransferDom
  },
  components: {
    Loading,
    Toast,
    TransferDom
  },
  created: async function () {
    // if (this.$cookies.get('__qc__k') == null) {
    // //   eslint-disable-next-line
    //   QC.Login.showPopup({
    //     appId: '101529980',
    //     redirectURI: 'https://seuxw.cn/webapp/paocao'
    //   })
    // } else
    // if (this.$cookies.get('xAuth') == null) {
    //   this.loadShow = false
    //   // TODO： 添加一卡通输入框

    //   let xAuth = await this.getXAuth()
    //   if (xAuth == null) {
    //     this.loadShow = false
    //     this.toastShow = true
    //   } else {
    //     this.$cookies.set('xAuth', xAuth)
    //     this.$router.push({
    //       path: '/paocao',
    //       name: 'paocao'
    //     })
    //   }
    // } else {
    //   this.loadShow = false
    //   this.toastShow = true
    // }
    this.loadShow = false
  },
  data () {
    return {
      loadShow: true,
      toastShow: false,
      cardno: null
    }
  },
  methods: {
    async getXAuth (tk, cardno) {
      let i = 5
      do {
        var res = await axios.post('/xAuth?tk=' + this.$cookies.get('__qc__k') +
          '&cardno=' + this.cardno)
        res = res.data['data']['token']
      } while (--i || res == null)
      return res
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
