import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cart: [],
    items: []
  },

  getters: {
    cart(state) {
      return state.cart
    },
    totalItems(state) {
      return state.cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    },
    totalPrice(state) {
      return state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0)
    },
    itemQuantity(state) {
      return function (item) {
        const cartItem = _.find(state.cart, {id: item.id})
        return _.get(cartItem, 'quantity', 0)
      }
    },
    items(state) {
      return state.items
    }
  },

  actions: {
    getItems({ commit }) {
      return axios.get('/products/index').then((response) => commit('setItems', response.data.data))
    }
  },

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