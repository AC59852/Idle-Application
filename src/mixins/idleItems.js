export default {
  data() {
    return {
      idleItems: [
        {
          name: 'item1',
          cost: 100,
          quantity: 0,
          unlocked: true,
          multiplier: 1,
        }
      ]
    }
  },

  methods: {
    purchaseItem(item) {
      item.quantity++

      item.cost = Math.floor(item.cost * 1.15)
    }
  }
}