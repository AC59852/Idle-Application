<template>
  <div class="home">
    <h1>Total Clicks: {{ store.roundedClicks }}</h1>
    <h2>Production: {{ this.idlePowerPerSecond }}</h2>
    <button @click="incrementClicks()" class="clickme"></button>
    <button v-for="clickerItem in store.allClickerItems" :key="clickerItem" @click="purchaseClicker(clickerItem)">{{ clickerItem.name }} {{ clickerItem.quantity }} | Cost: {{ clickerItem.cost }}</button>
    <button v-for="idleItem in store.allIdleItems" :key="idleItem" @click="purchaseIdler(idleItem)">{{ idleItem.name }} {{ idleItem.quantity }} | Cost: {{ idleItem.cost }}</button>
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
    }
  },

  setup() {
    const store = clickerStore();

    return {
      store
    }
  },

  mounted() {
    this.interval = setInterval(() => {
      console.log('interval')
      this.store.incrementIdle()
    }, 100);

    console.log(this.idleItems)
  },

  methods: {
    incrementClicks() {
      this.store.incrementClicks();
    },

    purchaseClicker(clickerItem) {
      this.store.purchaseClicker(clickerItem);
    },

    purchaseIdler(idleItem) {
      this.store.purchaseItem(idleItem)
    }
  },

  computed: {
    idlePowerPerSecond() {
      return this.store.idlePower * 10;
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
