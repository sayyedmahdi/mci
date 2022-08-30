<template>
  <q-layout view="lHh Lpr lFf">
    <div
      id="mobile_menu"
      class="tw-fixed tw-inset-0  tw-hidden tw-z-20  tw-flex-col tw-items-center tw-self-end tw-w-full tw-h-full tw-m-h-screen tw-px-6 tw-py-1 tw-pt-24 tw-pb-4 tw-tracking-widest text_dark_blue tw-uppercase tw-divide-y tw-divide-gray-500 tw-opacity-90 tw-bg-white"
    >
      <button type="button" @click="hideMenu" class="tw-ml-[95%] hover:tw-bg-slate-300 hover:tw-rounded tw-p-2" data-bs-dismiss="offcanvas" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M6.48775 5.00008L9.854 1.63383C10.0487 1.43914 10.0487 1.1232 9.854 0.928203L9.07182 0.146016C8.87713 -0.0486719 8.56119 -0.0486719 8.36619 0.146016L5.00025 3.51258L1.634 0.146328C1.43932 -0.0483593 1.12338 -0.0483593 0.928379 0.146328L0.146504 0.928203C-0.0481836 1.12289 -0.0481836 1.43883 0.146504 1.63383L3.51275 5.00008L0.146504 8.36633C-0.0481836 8.56102 -0.0481836 8.87695 0.146504 9.07195L0.928692 9.85414C1.12338 10.0488 1.43932 10.0488 1.63432 9.85414L5.00025 6.48758L8.3665 9.85383C8.56119 10.0485 8.87713 10.0485 9.07213 9.85383L9.85432 9.07164C10.049 8.87695 10.049 8.56101 9.85432 8.36601L6.48775 5.00008Z" fill="#92929D"/>
        </svg>
      </button>
      <q-tabs class="tw-flex tw-flex-col mobile_menu_tabs" >

        <q-route-tab @click="hideMenu" class="text_dark_pink" to="/" label="Home" />
        <q-route-tab @click="hideMenu" to="/Stores" label="Stores" />
        <q-route-tab @click="hideMenu" to="/packets" label="Packets" />
        <q-route-tab @click="hideMenu" to="/contact" label="Contact" />
        <q-route-tab @click="hideMenu" to="/support" label="Support" />
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
          <span class="material-icons tw-px-4" style="font-size:30px">account_circle
            <q-popup-proxy>
              <div class="tw-bg-white tw-py-2 tw-px-6 tw-text-center tw-flex tw-flex-col" v-if="!isAuthenticated">
                <router-link to="/login">
                  <button class="tw-mt-4 tw-py-2 tw-max-h-8 tw-w-40 text_md bg__dark_blue tw-text-white  ">
                    <span>Log in</span>
                  </button>
                </router-link>
                <router-link to="/join-us">
                  <button class="tw-mt-4 tw-mb-2 tw-py-2 tw-max-h-8 tw-w-40 text_md bg__dark_pink tw-text-white  ">
                    <span>Join Us!</span>
                  </button>
                </router-link>
              </div>
              <div class="tw-flex tw-flex-col tw-py-2 tw-px-4 tw-bg-white tw-space-y-6 tw-w-[200px]" v-else>
                <div class="tw-flex tw-justify-between tw-space-x-4 tw-border-b tw-border-b-2 tw-border-b-[#1D607F] tw-pb-1.5 " @click="profile()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M9.41699 1.33301C11.558 1.33301 13.292 3.06696 13.292 5.20801C13.292 7.34905 11.558 9.08301 9.41699 9.08301C7.27595 9.08301 5.54199 7.34905 5.54199 5.20801C5.54199 3.06696 7.27595 1.33301 9.41699 1.33301ZM17.667 17.833H1.16699V16.1455C1.16699 15.6018 1.43538 15.0886 1.96262 14.6019C2.49326 14.1122 3.25209 13.6839 4.13281 13.3311C5.89505 12.6252 8.01934 12.2705 9.41699 12.2705C10.8146 12.2705 12.9389 12.6252 14.7012 13.3311C15.5819 13.6839 16.3407 14.1122 16.8714 14.6019C17.3986 15.0886 17.667 15.6018 17.667 16.1455V17.833Z" stroke="#1D607F"/>
                    </svg>
                    Profile
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M0.165039 1.91866L5.74671 7.50033L0.165039 13.082L1.66671 14.5837L8.75004 7.50033L1.66671 0.416992L0.165039 1.91866Z" fill="#1D607F"/>
                    </svg>
                </div>
                <div class="tw-flex tw-justify-between tw-space-x-4 tw-border-b tw-border-b-2 tw-border-b-[#1D607F] tw-pb-1.5" @click="dashboard()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.16634 0.833008V3.16634H0.833008V0.833008H3.16634ZM8.16634 10.833V13.1663H5.83301V10.833H8.16634ZM3.16634 10.833V13.1663H0.833008V10.833H3.16634ZM3.16634 5.83301V8.16634H0.833008V5.83301H3.16634ZM8.16634 5.83301V8.16634H5.83301V5.83301H8.16634ZM13.1663 3.16634H10.833V0.833008H13.1663V3.16634ZM8.16634 0.833008V3.16634H5.83301V0.833008H8.16634ZM13.1663 5.83301V8.16634H10.833V5.83301H13.1663ZM13.1663 10.833V13.1663H10.833V10.833H13.1663Z" stroke="#D25A73"/>
                    </svg>
                    Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M0.165039 1.91866L5.74671 7.50033L0.165039 13.082L1.66671 14.5837L8.75004 7.50033L1.66671 0.416992L0.165039 1.91866Z" fill="#1D607F"/>
                    </svg>
                </div>
                <div class="tw-flex tw-justify-between tw-space-x-4 tw-border-b tw-border-b-2 tw-border-b-[#1D607F] tw-pb-1.5" @click="logout()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                    <path d="M14.142 8.33333H6.16699V7.66667H14.142H15.3458L14.4962 6.8138L12.6984 5.00902L13.167 4.54044L16.6266 8L13.1682 11.4583L12.6979 10.9846L14.4955 9.18689L15.3491 8.33333H14.142ZM2.33366 1.66667H1.83366V2.16667V13.8333V14.3333H2.33366H8.50033V15H2.33366C1.69313 15 1.16699 14.4739 1.16699 13.8333V2.16667C1.16699 1.52614 1.69313 1 2.33366 1H8.50033V1.66667H2.33366Z" stroke="#1D607F"/>
                    </svg>
                    Log Out
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M0.165039 1.91866L5.74671 7.50033L0.165039 13.082L1.66671 14.5837L8.75004 7.50033L1.66671 0.416992L0.165039 1.91866Z" fill="#1D607F"/>
                  </svg>
                </div>
              </div>
            </q-popup-proxy>
          </span>
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
import {mapGetters} from 'vuex';

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
  computed: {
    ...mapGetters(['isAuthenticated'])
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
    },
    logout(){
      this.$store.dispatch('SetUser', null)
      this.$api.defaults.headers.common['Token'] = ''
      this.$router.push('/')
    },
    profile(){
      this.$router.push('/user/profile')
    },
    dashboard(){
      this.$router.push('/dashboard')
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
