<template>
  <div>
    <q-list dark>
      <q-item clickable v-ripple class="grey-10" to="/">
        <q-item-section>Home</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="grey-10" to="/events">
        <q-item-section>Events</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="grey-10" to="/news">
        <q-item-section>News</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="grey-10" to="/media">
        <q-item-section>Media</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="grey-10" to="/contact">
        <q-item-section>Contact</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="grey-10" to="/support">
        <q-item-section>Support</q-item-section>
      </q-item>
      <q-item clickable v-ripple class="grey-10" @click="logout">
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'menuMobile',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$q.cookies.remove('mcisitetoken')
      this.$q.localStorage.remove('user')
      this.$store.dispatch('Logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.icon
{
  position: relative;
  left: 5px;
}
#mobiledrawer .q-item.q-router-link--active
{
  color: #000;
}
</style>
