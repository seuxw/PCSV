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
  created: function () {
    // if (this.$cookies.get('__qc__k') == null) {
    // //   eslint-disable-next-line
    //   QC.Login.showPopup({
    //     appId: '101529980',
    //     redirectURI: 'https://seuxw.cn/webapp/paocao'
    //   })
    // } else
    if (this.$cookies.get('xAuth') == null) {
      this.loadShow = false
      // TODO： 多次尝试
      // TODO： 异常反馈
      this.getXAuth()
      // TODO： token 写入 cookie
    } else {
      this.loadShow = false
      this.toastShow = true
    }
  },
  data () {
    return {
      loadShow: true,
      toastShow: false
    }
  },
  methods: {
    async getXAuth () {
      // TODO： token 验证
      let res = await axios.post('/xAuth?tk=' + "this.$cookies.get('__qc__k')"
      )
      console.log(res)
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
