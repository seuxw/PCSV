<template>
  <div>
    <div v-transfer-dom>
      <loading :show="true"
        text=""></loading>
    </div>
    <!-- html 背景 -->
    <div class="vux-background"></div>
  </div>
</template>

<script>
import { Loading, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'Login',
  directives: {
    TransferDom
  },
  components: {
    Loading,
    TransferDom
  },
  created: function () {
    if (this.$cookies.get('__qc__k') == null) {
      // eslint-disable-next-line
      QC.Login.showPopup({
        appId: '101529980',
        redirectURI: 'https://seuxw.cn/webapp/paocao'
      })
    } else {
      this.marqueeMsg = this.marqueeMsg0
    }
  },
  data () {
    return {
    }
  },
  methods: {
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
