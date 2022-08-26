<template>
  <q-layout view="lHh Lpr lFf">
    <div
      id="mobile_menu"
      class="tw-fixed tw-inset-0  tw-hidden tw-z-20  tw-flex-col tw-items-center tw-self-end tw-w-full tw-h-full tw-m-h-screen tw-px-6 tw-py-1 tw-pt-24 tw-pb-4 tw-tracking-widest text_dark_blue tw-uppercase tw-divide-y tw-divide-gray-500 tw-opacity-90 tw-bg-white"
    >
      <button type="button" @click="hideMenu" class="tw-ml-[95%] hover:tw-bg-slate-300 hover:tw-rounded tw-p-2" data-bs-dismiss="offcanvas" aria-label="Close">
        <img src="https://diagnozi.ge/assets/images/close.svg" alt="">
      </button>
      <q-tabs class="tw-flex tw-flex-col mobile_menu_tabs" >

        <q-route-tab class="text_dark_pink" to="/" label="Home" />
        <q-route-tab to="/Stores" label="Stores" />
        <q-route-tab to="/packets" label="Packets" />
        <q-route-tab to="/contact" label="Contact" />
        <q-route-tab to="/support" label="Support" />
      </q-tabs>
    </div>
    <q-header reveal elevated class="tw-bg-white text_dark_blue tw-text-sm tw-justify-between" >
      <div class="tw-flex tw-py-4 md:tw-px-24 tw-px-8 tw-justify-between" >
        <div><img src="~assets/rectangle1380.png"></div>
        <q-tabs align="left" id="desktop_menu">
          <q-route-tab class="text_dark_pink" to="/" label="Home" />
          <q-route-tab to="/Stores" label="Stores" />
          <q-route-tab to="/packets" label="Packets" />
          <q-route-tab to="/contact" label="Contact" />
          <q-route-tab to="/support" label="Support" />
        </q-tabs>
        <div class="tw-flex tw-justify-center tw-items-center ">
          <span class="material-icons tw-px-4" style="font-size:30px">account_circle</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" viewBox="0 0 23 25" fill="none" >
            <path d="M11.5 25.0004C12.3288 25.0004 13.1237 24.6711 13.7097 24.0851C14.2958 23.499 14.625 22.7042 14.625 21.8754H8.375C8.375 22.7042 8.70424 23.499 9.29029 24.0851C9.87634 24.6711 10.6712 25.0004 11.5 25.0004ZM13.0547 1.71758C13.0765 1.50032 13.0525 1.2809 12.9843 1.07347C12.9161 0.866047 12.8052 0.675218 12.6587 0.513294C12.5122 0.351369 12.3334 0.221945 12.1339 0.133366C11.9343 0.0447882 11.7184 -0.000976563 11.5 -0.000976562C11.2816 -0.000976563 11.0657 0.0447882 10.8661 0.133366C10.6666 0.221945 10.4878 0.351369 10.3413 0.513294C10.1948 0.675218 10.0839 0.866047 10.0157 1.07347C9.94748 1.2809 9.9235 1.50032 9.94531 1.71758C8.17925 2.0768 6.5916 3.03533 5.45119 4.43086C4.31079 5.82639 3.68773 7.57316 3.6875 9.37539C3.6875 11.091 2.90625 18.7504 0.5625 20.3129H22.4375C20.0938 18.7504 19.3125 11.091 19.3125 9.37539C19.3125 5.59414 16.625 2.43789 13.0547 1.71758Z" fill="#1D607F"/>
          </svg>
          <button
            id="menu-btn"
            @click="navToggle"
            class="tw-z-30 tw-block md:tw-hidden focus:tw-outline-none hamburger tw-ml-4 tw-mt-2"
          >
            <span class="hamburger-top"></span>
            <span class="hamburger-middle"></span>
            <span class="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {

  },
  methods: {
    navToggle() {
      document.getElementById('menu-btn').classList.toggle('open')
      document.getElementById('mobile_menu').classList.toggle('tw-flex')
      document.getElementById('mobile_menu').classList.toggle('tw-hidden')
     },
    hideMenu(){
      document.getElementById('menu-btn').classList.toggle('open')
      document.getElementById('mobile_menu').classList.toggle('tw-hidden')
    }
  }
});
</script>

<style>
@media screen and (max-width: 768px) {
  #desktop_menu {
    display: none;
  }
  #menu-btn {
    display: block;
  }
}

@media screen and (min-width: 768px){
  #menu-btn {
    display: none;
  }
}


.hamburger {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.25s;
  position: relative;
}

.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  content: '';
  position: absolute;
  width: 24px;
  height: 3px;
  top: 0;
  left: 0;
  background: #000;
  transform: rotate(0);
  transition: all 0.5s;
}

.hamburger-middle {
  transform: translateY(7px);
}

.hamburger-bottom {
  transform: translateY(14px);
  background: #000;
}

.open {
  transform: rotate(90deg);
  transform: translateY(0px);
  position: fixed;
  top: 50px;
  right: 25px;
}

.open .hamburger-top {
  transform: rotate(45deg) translateY(6px) translateX(6px);
  background-color: #fff;
}

.open .hamburger-middle {
  display: none;
}

.open .hamburger-bottom {
  transform: rotate(-45deg) translateY(6px) translateX(-6px);
  background-color: #fff;
}


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
