<template>
  <div>
    <div class="vux-circle-demo">
      <div class="vux-circle-demo-p">
        <x-circle :percent="percent"
          :stroke-width="1"
          :trail-width="1"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec">
          <countup v-if="step<3"
            :start-val="1"
            :end-val="percent"
            :duration="3"
            class="vux-circle-demo-font"></countup>
          <span v-if="step<3"
            class="vux-circle-demo-font">%</span>
          <svg v-else
            class="icon myIconStyle"
            aria-hidden="true">
            　　<use xlink:href="#icon-dagouwuquan"></use>
          </svg>
        </x-circle>
      </div>
    </div>
    <div class="vux-marquee">
      <marquee :interval=3000>
        <marquee-item v-for="i in marqueeMsg"
          :key="i"
          class="align-middle"
          style="list-style:none;">{{i}}</marquee-item>
      </marquee>
    </div>
    <div>
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
        '稍等片刻，马上就好',
        'Tip: 每 40 分钟才可同步一次哦～',
        '秋意正好，不如喝杯热水休息一下',
        'Tip: 只有连接 seu-wlan 才可进行同步操作',
        '我为人人，人人为我～'
      ],
      step: 0
    }
  },
  methods: {
    stepPlus () {
      this.step += 1
      this.percentPlus()
      if (this.step === 3) {
        this.percent = 200
      }
    },
    percentPlus () {
      this.percent += (100 / 2)
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.align-middle {
  text-align: center;
  color: #335769;
  -webkit-transform: scale(0.75);
}
.vux-circle-demo {
  padding-top: 36%;
  right: 0%;
  text-align: center;
}
.vux-circle-demo-p {
  width: 60%;
  height: 60%;
}
.vux-circle-demo-font {
  color: #335769;
  font-size: 400%;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
.myIconStyle {
  width: 60%;
  height: 60%;
  color: #335769;
}
.vux-marquee {
  position: fixed;
  bottom: 12%;
  right: 0%;
  left: 0%;
  color: #335769;
}
.vux-button {
  position: fixed;
  bottom: 5%;
  right: 18%;
  left: 18%;
}
</style>
