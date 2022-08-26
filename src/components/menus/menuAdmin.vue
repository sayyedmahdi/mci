<template>
  <div class="q-pa-none" style="height: 100%">
    <div class="menu-admin">
      <q-list class="q-pa-md">
        <q-item clickable v-ripple class="grey-10" to="/admin/users">
          <q-item-section><span class="material-icons" style="font-size:30px">account_circle</span></q-item-section>
          <q-item-section>Users</q-item-section>
          <q-item-section><span class="material-icons" style="font-size:30px">chevron_right</span></q-item-section>
        </q-item>
        <q-item clickable v-ripple class="grey-10" to="/admin/stores">
          <q-item-section><span class="material-icons" style="font-size:30px">list</span></q-item-section>
          <q-item-section>Stores</q-item-section>
          <q-item-section><span class="material-icons" style="font-size:30px">chevron_right</span></q-item-section>
        </q-item>
        <q-item clickable v-ripple class="grey-10" to="/admin/packets">
          <q-item-section><span class="material-icons" style="font-size:30px">list</span></q-item-section>
          <q-item-section>Packets</q-item-section>
          <q-item-section><span class="material-icons" style="font-size:30px">chevron_right</span></q-item-section>
        </q-item>
        <q-item clickable v-ripple class="grey-10" to="/admin/gutscheine">
          <q-item-section><span class="material-icons" style="font-size:30px">list</span></q-item-section>
          <q-item-section>Gutscheine</q-item-section>
          <q-item-section><span class="material-icons" style="font-size:30px">chevron_right</span></q-item-section>
        </q-item>
        <q-item clickable v-ripple class="grey-10" to="/admin/config">
          <q-item-section><span class="material-icons" style="font-size:30px">settings</span></q-item-section>
          <q-item-section>Config</q-item-section>
          <q-item-section><span class="material-icons" style="font-size:30px">chevron_right</span></q-item-section>
        </q-item>
        <q-item clickable v-ripple class="grey-10" @click="logout">
          <q-item-section><span class="material-icons" style="font-size:30px">logout</span></q-item-section>
          <q-item-section>Logout</q-item-section>
          <q-item-section><span class="material-icons" style="font-size:30px">chevron_right</span></q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuAdmin',
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.user)
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

<style>
.menu-admin
{
  background-color: #B6B6B6;
  color: #000;
  padding: 10px;
  height: 100%;
}
.admin-name
{
  font-family: Rubik;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
}
.user-type
{
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color:#2A52BE;
}
.q-item
{
  padding: 0;
}
</style>
