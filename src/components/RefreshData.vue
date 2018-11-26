<template>
  <div>
    <div>
      <divider class="vux-divider">最后同步于: {{lastRefreshTime}}</divider>
    </div>
    <div class="vux-circle-demo">
      <div class="vux-circle-demo-p">
        <x-circle :percent="percent"
          :stroke-width="2"
          :trail-width="2"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec">
          <countup :start-val="1"
            :end-val="percent"
            :duration="3"
            class="vux-circle-demo-font"></countup>
          <span class="vux-circle-demo-font">%</span>
        </x-circle>
      </div>
    </div>
    <div class="vux-marquee">
      <marquee :interval=3000>
        <marquee-item v-for="i in marqueeMsg"
          :key="i"
          class="align-middle">{{i}}</marquee-item>
      </marquee>
    </div>
    <div>
      <box class="vux-button">
        <x-button @click.native="stepPlus"
          :gradients="['#1D62F0', '#19D5FD']"
          style="border-radius:99px;">同 步 数 据</x-button>
        <!-- <x-button :gradients="['#A644FF', '#FC5BC4']" style="border-radius:99px;" show-loading>iOS Gradients</x-button>
        <x-button :gradients="['#6F1BFE', '#9479DF']" style="border-radius:99px;" show-loading>iOS Gradients</x-button> -->
      </box>
    </div>
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
      marqueeMsg: [
        '请稍等片刻，马上就好',
        'Tip: 每 40 分钟才可同步一次哦～',
        '秋意正好，不如喝杯热水休息一下',
        'Tip: 只有连接 seu-wlan 才可进行同步操作',
        '我为人人，让人为我～'
      ],
      step: 0
    }
  },
  methods: {
    stepPlus () {
      this.percentPlus()
    },
    percentPlus () {
      this.percent += (100 / 17)
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.vux-divider {
  -webkit-transform: scale(0.7);
}
.align-middle {
  text-align: center;
  color: #698491;
  -webkit-transform: scale(0.8);
}
.vux-circle-demo {
  padding-top: 36%;
  text-align: center;
}
.vux-circle-demo-p {
  width: 70%;
  height: 70%;
}
.vux-circle-demo-font {
  color: #335769;
  font-size: 400%;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
.vux-marquee {
  position: fixed;
  bottom: 15%;
  right: 0%;
  left: 0%;
}
.vux-button {
  position: fixed;
  bottom: 7%;
  right: 15%;
  left: 15%;
}
</style>
