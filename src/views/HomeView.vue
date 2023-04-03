<template>
  <div class="home">
    <h1>Total Clicks: {{ store.clicks }}</h1>
    <button @click="incrementClicks()" class="clickme"></button>
    <button @click="purchaseClicker()" class="clickers">Clickers {{ clicker.total }} | Cost {{ clicker.cost }}</button>
    <button v-for="idleItem in idleItems" :key="idleItem" @click="purchaseIdler(idleItem)">{{ idleItem.name }} {{ idleItem.quantity }} | Cost: {{ idleItem.cost }}</button>
  </div>
</template>

<script>
import idleItems from '@/mixins/idleItems.js';
import { clickerStore } from '@/store/clickerStore';

export default {
  name: 'HomeView',

  mixins: [idleItems],

  data() {
    return {
      interval: null,
      clicks: 100,
      baseClick: 1,
      calculatedClicks: 0,
      clicker: {
        cost: 10,
        multiplier: 1,
        total: 0
      },

      allIdleItems: this.idleItems
    }
  },

  setup() {
    const store = clickerStore();

    return {
      store
    }
  },

  mounted() {
    // this.interval = setInterval(() => {
    //   this.clicks += this.idler.multiplier * this.idler.total;
    // }, 1000);

    this.calculatedClicks = this.baseClick;

    console.log(this.idleItems)
  },

  methods: {
    incrementClicks() {
      this.store.incrementClicks(this.calculatedClicks);
    },

    purchaseClicker() {
      if (this.clicks >= this.clicker.cost) {
        this.clicks -= this.clicker.cost;
        this.clicker.cost *= 2;

        this.calculatedClicks = this.baseClick += this.clicker.multiplier;

        this.idler.cost *= 1.2;

        this.idler.cost = Math.round(this.idler.cost);
      }
    },

    purchaseIdler(idleItem) {
      if (this.clicks >= idleItem.cost) {
        this.purchaseItem(idleItem)
      }
    }
  }
}
</script>
<style scoped>
.clickme {
  width: 200px;
  height: 200px;
  background-color: red;
  border-radius: 50%;
}
</style>
