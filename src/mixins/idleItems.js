// tick is every 100ms, so 10 ticks per second
// make sure to divide by 10 to get the correct value
// for example: multiplier: 0.1, means 1 click per second
export default {
  data() {
    return {
      idleItems: [
        {
          name: 'item1',
          baseCost: 40,
          cost: 40,
          quantity: 0,
          unlocked: true,
          multiplier: 0.01,
        },
        {
          name: 'item2',
          baseCost: 100,
          cost: 100,
          quantity: 0,
          unlocked: true,
          multiplier: 1,
        },
      ]
    }
  }
}