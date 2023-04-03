import { defineStore } from "pinia";
import idleItems from "@/mixins/idleItems";
import clickerItems from "@/mixins/clickerItems";

export const clickerStore = defineStore('clicks', {
 state: () => ({
    clicks: 600,
    baseClickPower: 1,
    clickPower: 0,
    baseIdlePower: 0,
    idlePower: 0,
    allIdleItems: idleItems.data().idleItems,
    allClickerItems: clickerItems.data().clickerItems,
  }),

  getters: {
    roundedClicks() {
      return Math.round(this.clicks);
    },
  },

  actions: {
    incrementClicks() {
      var totalClickPower = this.baseClickPower + this.clickPower;

      this.clicks += totalClickPower;
    },

    incrementIdle() {
      this.allIdleItems.forEach((idleItem) => {
        if (idleItem.unlocked) {
          this.clicks += idleItem.quantity * idleItem.multiplier;
        }
      });
    },

    purchaseItem(item) {
      console.log(item)

      // find the item in the allIdleItems array
      const itemToPurchase = this.allIdleItems.find((idleItem) => idleItem.name === item.name);

      if(this.clicks >= itemToPurchase.cost) {
        this.clicks -= itemToPurchase.cost;
        itemToPurchase.quantity++;

        var basePrice = item.baseCost;
        var newPrice = basePrice * Math.pow(1.4, itemToPurchase.quantity); 

        itemToPurchase.cost = Math.round(newPrice * 100) / 100;

        this.idlePower += itemToPurchase.multiplier;
      } else {
        alert('Not enough clicks!')
      }
    },

    purchaseClicker(clicker) {
      const clickerToPurchase = this.allClickerItems.find((clickerItem) => clickerItem.name === clicker.name);

      if(this.clicks >= clickerToPurchase.cost) {
        this.clicks -= clickerToPurchase.cost;
        clickerToPurchase.quantity++;

        var basePrice = clicker.baseCost;
        var newPrice = basePrice * Math.pow(1.4, clickerToPurchase.quantity);
        
        clickerToPurchase.cost = Math.round(newPrice * 100) / 100;

        this.clickPower += clickerToPurchase.multiplier;
      } else {
        alert('Not enough clicks!')
      }
    }
  }
})