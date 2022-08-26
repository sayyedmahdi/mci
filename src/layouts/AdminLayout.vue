<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="gt-xs bg-black text-white">
    </q-header>
    <q-header class="xs bg-white text-black">
      <q-toolbar class="bg-darkprimary text-white">
        <q-toolbar-title><router-link to="/"><span class="fightsearch">FightSearch</span></router-link></q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="mobiledrawer = !mobiledrawer" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      side="left"
      :width="250"
      :breakpoint="700"
      style="background-color: #B6B6B6"
    >
      <q-scroll-area style="height: 100%;">
        <div class="row q-pa-sm">
          <div class="col">
            <router-link to="/"><img alt="FightSearch Logo" src="../assets/logo.png" class="fightsearch-logo"></router-link>
          </div>
          <div class="col text-right">
            <q-select
              v-model="locale"
              :options="localeOptions"
              dense
              borderless
              emit-value
              map-options
              options-dense
            />
          </div>
        </div>
        <menuAdmin />
      </q-scroll-area>
    </q-drawer>
    <q-drawer
      id="mobiledrawer"
      v-model="mobiledrawer"
      side="right"
      behavior="mobile"
      :width="250"
      :breakpoint="700"
      content-class="bg-primary text-white"
    >
      <q-scroll-area style="height: 100%;">
        <menuMobile />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="q-page">
        <div class="row q-pa-none q-pm-none">
          <div class="col-12" :class="padClass">
            <menuTop />
            <div class="shadow-2 router">
              <router-view />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import menuTop from 'components/menus/menuTop';
import menuMobile from 'components/menus/menuMobile';
import menuAdmin from 'components/menus/menuAdmin';

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AdminLayout",

  components: {
    menuTop,
    menuMobile,
    menuAdmin
  },

  data() {
    return {
      locale: 'en-US',
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'de', label: 'German' }
      ],
      drawer: true,
      mobiledrawer: false,
      window: window
    };
  },
  computed: {
    curUsername () {
      return this.$store.getters.isAuthenticated ? this.$store.getters.StateUser.Username : "NO USER"
    },
    padClass () {
      return this.$q.platform.is.mobile ? "q-pa-sm" : "q-pa-xl"
    }
  }
});
</script>
<style scoped>
.q-page
{
  background-color: #D9D9D9;
  background-image: url(../assets/admin-back.png);
  background-position: top center;
  background-size: 100% 250px;
  background-repeat: no-repeat;
}
.router
{
  margin-top: 50px;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}
</style>