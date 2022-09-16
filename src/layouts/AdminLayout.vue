<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="xs bg-white text-black flex">
      <q-toolbar class="bg-darkprimary text-black flex" style="justify-content: space-between; ">
        <q-btn xs dense flat round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title><router-link to="/"><img alt="FightSearch Logo" src="../assets/logo.png" class="fightsearch-logo"></router-link></q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="mobiledrawer = !mobiledrawer" />
      </q-toolbar>
    </q-header>
    <q-drawer
      id="mobiledrawer"
      v-model="mobiledrawer"
      side="right"
      behavior="mobile"
      :width="250"
      :breakpoint="700"
      content-class="bg-primary text-black"
    >
      <q-scroll-area style="height: 100%;">
        <menuMobile />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="q-page">
        <div class="row gt-xs q-pa-none q-ma-none">
          <div class="col-2 flex justify-center q-pa-md">
            <router-link to="/"><img alt="FightSearch Logo" src="../assets/logo.png" class="fightsearch-logo"></router-link>
          </div>
          <div class="col-7 flex items-center justify-center">
            <menuTop />
          </div>
          <div class="col-3 flex items-center justify-center">
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
        <div class="row q-pa-none q-ma-none">
          <div class="col-3" style="background-color: #D25A73; height: 10px"></div>
          <div class="col-3" style="background-color: #1D607F; height: 10px"></div>
          <div class="col-3" style="background-color: #D25A73; height: 10px"></div>
          <div class="col-3" style="background-color: #1D607F; height: 10px"></div>
        </div>
        <div class="row q-pa-none q-ma-none">
          <div class="col-xs-5 col-sm-2"  v-if='drawer' style="background-color: #D25A73; min-height: calc(100vh - 30px)">
            <menuAdmin />
          </div>
          <div class="col" :class="padClass">
            <div class="router">
              <router-view />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import menuTop from 'components/menus/menuTopAdmin';
import menuMobile from 'components/menus/menuMobile';
import menuAdmin from 'components/menus/menuAdmin';
import { useI18n } from 'vue-i18n'

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
      locale: useI18n({ useScope: 'global' }).locale,
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
  },
  methods: {
    logout () {
      this.$q.cookies.remove('boxsitetoken')
      this.$q.localStorage.remove('user')
      this.$store.dispatch('Logout')
      this.$router.push('/')
    }
  }
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Murecho:wght@100;200;300;400;500;600;700;800;900&display=swap');

.q-page
{
  background-color: #fff;
  background-position: top center;
  background-size: 100% 250px;
  background-repeat: no-repeat;
}
.router
{
  margin-top: 50px;
}
.Search, .Search input
{
  color: #000 !important;
}
.new-button
{
    font-family: 'Murecho';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.0125em;
    color: #D25A73;
}
.save-btn, .delete-btn, .cancel-btn
{
    padding: 0;
    letter-spacing: 0.015em;
    color: #FFFFFF;
    font-family: 'Murecho';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 26px;
    width: 86px;
    height: 26px;
    text-align: center;
    border-radius: 0;
}
.save-btn, .delete-btn
{
    background-color: #D25A73;
}
.cancel-btn
{
    background-color: #1D607F;
}
.cancel-btn-alt
{
    background-color: #fff;
    color: #000;
}
.delete-dialog
{
    background-color: #fff;
    color: #1D607F;
}
.detail-dialog
{
    background-color: #1D607F;
    min-width: 800px;
    color: #fff;
}
.detail-dialog .q-field__native, .detail-dialog .q-field__prefix, .detail-dialog .q-field__suffix, .detail-dialog .q-field__input
{
    font-family: 'Murecho';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.0025em;
    color: #EEA2AD;
}
.detail-dialog .q-field--outlined .q-field__control:before
{
    border: solid 1px #EEA2AD;
    border-radius: 0;
}
.detail-dialog .q-field--highlighted .q-field__control:after
{
    border: solid 1px #fff;
    border-radius: 0;
}

.detail-dialog .q-field__label
{
    color: #EEA2AD;
}
.detail-dialog .q-field--highlighted .q-field__native, .detail-dialog .q-field--highlighted .q-field__prefix
, .detail-dialog .q-field--highlighted .q-field__suffix, .detail-dialog .q-field--highlighted .q-field__input
, .detail-dialog .q-field--highlighted .q-field__label
{
    color: #fff;
}
.detail-title
{
    font-family: 'Murecho';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.0125em;
    color: #FFFFFF;
}
.delete-title
{
  font-family: 'Murecho';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.0125em;
  color: #1D607F;
}
.title-class
{
  font-family: 'Murecho';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 22px;
  letter-spacing: 0.0015em;
  color: #D25A73;
}
.table-header, .table-header th
{
    font-family: 'Murecho';
    font-style: normal;
    font-weight: 500 !important;
    font-size: 17px !important;
    line-height: 22px;
    letter-spacing: 0.001em;
    color: #1D607F;
}
.table-header th
{
    border-bottom: 1px solid #EEA2AD;
}
.table, .table td
{
    font-family: 'Murecho';
    font-style: normal;
    font-weight: 400;
    font-size: 14px !important;
    line-height: 22px;
    letter-spacing: 0.0025em;
    color: #1D607F;
}
.table td
{
    border-bottom: 1px solid #FFD7EC;
}
.table tbody td:before
{
    background: rgb(241, 241, 230, 0.3);
}
.q-item.q-router-link--active, .q-item--active {
    background-color: #1D607F;
    color: #fff;
}
body.desktop .q-focus-helper:after
{
    background-color: #1D607F;
}

/*--------------- Mobile friendly settings -----------*/
@media (max-width: 768px){
  .detail-dialog
  {
      min-width: unset;
  }
}
</style>
