import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'
import {Decimal} from 'decimal.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // The state is the object that represents your store. It's the most important thing.
  // You can initialize default values here, but you should never reference this object directly.
  state: {
    cart: [],
    items: []
  },

  // Getters are computed properties that can make it easier to access certain properties of the state,
  // or can be used to do calculations. Remember: Computed properties always return a value.
  getters: {
    cart(state) {
      return state.cart
    },
    totalItems(state) {
      return state.cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    },
    totalPrice(state) {
      return state.cart.reduce((sum, item) => sum.plus(new Decimal(item.price).times(new Decimal(item.quantity || 0))), new Decimal(0.00))
    },
    itemQuantity(state) {
      // Here, we're actually returning a function so that we can find the current cartItem
      // based on an item passed in. This getter is called like this.itemQuantity(item).
      // Note that we have to return a function here because the only allowed parameter for a getter
      // is state, representing the current state of the store.
      return function (item) {
        const cartItem = _.find(state.cart, {id: item.id})
        return _.get(cartItem, 'quantity', 0)
      }
    },
    items(state) {
      return state.items
    }
  },

  // Actions are methods and can be asynchronous. Note that actions can't affect the state directly,
  // they commit mutations which affect the state.
  // Actions are commonly used for API calls, which are asynchronous and thus CANNOT BE mutations.
  actions: {
    getItems({ commit }) {
      return axios.get('/products/index').then((response) => commit('setItems', response.data.data))
    }
  },

  // Mutations are methods that actually change (or mutate) the current state.
  // You "dispatch" actions and "commit" mutations.
  mutations: {
    addToCart (state, item) {
      // create a copy of the current cart that we can manipulate
      const cart = _.cloneDeep(state.cart)

      // check if item already exists in the cart
      const cartItem = _.find(cart, {id: item.id})

      // if the item doesn't exist in the cart, add it
      // else increase the quantity by one
      if (!cartItem) {
        item.quantity = 1
        cart.push(item)
      } else {
        cartItem.quantity += 1
      }

      // Vue.set makes sure that the change is reactive
      Vue.set(state, 'cart', cart)

      console.log(`${item.name} has been added to cart`)
    },
    removeFromCart (state, item) {
      // create a copy of the current cart that we can manipulate
      const cart = _.cloneDeep(state.cart)

      // check if item already exists in the cart
      const cartItem = _.find(cart, {id: item.id})

      // if item exists in the cart, decrease the quantity
      if (cartItem) {
        cartItem.quantity -= 1
      }

      // remove items from cart if the quantity is 0 (or less)
      _.remove(cart, function (item) {
        return item.quantity <= 0;
      })

      // Vue.set makes sure that the change is reactive
      Vue.set(state, 'cart', cart)

      console.log(`${item.name} has been removed from cart`)
    },
    setItems (state, data) {
      Vue.set(state, 'items', data)
    }
  }
})

export default store;
