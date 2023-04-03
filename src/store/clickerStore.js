import { defineStore } from "pinia";

export const clickerStore = defineStore('clicks', {
 state: () => ({
    clicks: 0
  }),

  actions: {
    incrementClicks(clickPower) {
      console.log(clickPower)
      this.clicks += clickPower;
    }
  }
})