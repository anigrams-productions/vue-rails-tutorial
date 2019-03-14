<template>
  <div class="items-list">
    <h1>Our Catalog</h1>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.price }}
        <button @click="addToCart(item)">Add to Cart</button>
        <button v-if="itemQuantity(item) > 0" @click="removeFromCart(item)">Remove From Cart</button>
      </li>
    </ul>

    <router-link to="/cart">Go to Cart</router-link>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['itemQuantity', 'items'])
  },

  methods: {
    ...mapMutations(['addToCart', 'removeFromCart']),
    ...mapActions(['getItems'])
  },

  beforeMount() {
    this.getItems();
  }
} //end export
</script>

<style scoped>

</style>


