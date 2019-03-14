<template>
  <div class="cart">
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td><input v-model.number="item.quantity" type="number"></td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>

      <p>Total Items: {{ totalItems }}</p>
      <p>Total Price: {{ totalPrice }}</p>

      <router-link to="/">Back to List</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cart', 'totalItems', 'totalPrice'])
  },
}
</script>

<style scoped>

</style>


