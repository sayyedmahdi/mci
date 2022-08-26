<template>
  <div class="row">
    <div class="col-xs-12 col-sm-10 menu-top text-center">
      <ul>
        <li><q-btn flat @click="$router.push('/')">Home</q-btn></li>
        <li><q-btn flat @click="$router.push('/stores')">Stores</q-btn></li>
        <li><q-btn flat @click="$router.push('/packets')">Packets</q-btn></li>
        <li><q-btn flat @click="$router.push('/contact')">Contact</q-btn></li>
        <li><q-btn flat @click="$router.push('/support')">Support</q-btn></li>
      </ul>
    </div>
    <div class="col-xs-12 col-sm-2 text-right">
      <span class="material-icons" style="font-size:30px">account_circle
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item v-close-popup>
              <q-item-section>{{ this.$store.getters.StateUser.Username }}</q-item-section>
            </q-item>
            <q-item clickable @click="logout" v-if="$store.getters.isAuthenticated">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuTop',
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
