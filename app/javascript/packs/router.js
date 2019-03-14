import Vue from 'vue'
import VueRouter from 'vue-router'

import ItemsList from '../components/items-list.vue'
import ShoppingCart from '../components/shopping-cart.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: ItemsList },
  { path: '/cart', component: ShoppingCart }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router;