<template>
  <div class="menu-top text-center">
    <ul>
      <li><q-btn flat @click="$router.push('/')">Home</q-btn></li>
      <li><q-btn flat @click="$router.push('/stores')">Stores</q-btn></li>
      <li><q-btn flat @click="$router.push('/packets')">Packets</q-btn></li>
      <li><q-btn flat @click="$router.push('/contact')">Contact</q-btn></li>
      <li><q-btn flat @click="$router.push('/support')">Support</q-btn></li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'menuTopAdmin',
  data () {
    return {
      user: JSON.parse(this.$q.localStorage.getItem('user'))
    }
  },
  mounted () {
    // console.log(this.user)
  },
  methods: {
    logout () {
      this.$q.cookies.remove('boxsitetoken')
      this.$q.localStorage.remove('user')
      this.$store.dispatch('Logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.menu-top
{
  padding: 0px;
}
.menu-top ul
{
  margin: 0;
  padding: 0;
}
.menu-top ul li
{
  display: inline;
}
</style>
