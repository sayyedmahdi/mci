<template>
  <form v-on:submit.prevent="() => {}">
  <div class="tw-flex tw-flex-col md:tw-flex-row-reverse md:tw-items-center md:tw-justify-between tw-items-center tw-justify-center tw-w-full tw-h-full tw-p-14 ">
    <div class="bg__dark_blue tw-w-[400px] tw-text-white tw-flex tw-flex-col tw-justify-start tw-text-center tw-p-8 md:tw-h-[570px]  md:tw-w-[650px]">
      <div class="tw-text-4xl tw-pb-[30%]">Log In</div>
      <input v-model="email" class="tw-text-sm tw-border-b tw-my-6 tw-text-white tw-color-white bg__dark_blue focus:tw-outline-none" placeholder="Email"/>
      <input v-model="password" class="tw-text-sm tw-border-b tw-my-6  tw-text-white tw-color-white bg__dark_blue focus:tw-outline-none" type="password" placeholder="Password" />
      <button class="bg__dark_pink tw-mt-24 tw-object-fit tw-p-2 tw-lowercase" @click="login" @keyup.enter="login"><span class="tw-uppercase">L</span>og in</button>
      <div class="text_dark_pink tw-text-left tw-mt-6">Terms of use</div>
    </div>

    <div class="tw-h-full tw-mt-[10%] lg:tw-ml-[5%] lg:tw-mr-[5%]">
      <img class="tw-object-cover" src="~assets/login.png">
    </div>

  </div>
  </form>
</template>

<script>
import header from "components/header";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const isFormCorrect = true; //await this.v$.$validate()
      if (isFormCorrect) {
        // storage
        let cookies = this.$q.cookies
        let localstorage = this.$q.localStorage
        // router
        let _router = this.$router
        let _q = this.$q
        let _this = this
        // get a token and user data
        this.$api.post('user/login.php', {
          Username: this.email,
          Password: this.password
        }).then(function (response) {
          // check for valid User Type
          console.log(response.data.Type)
          if (!response.data.Type == 1) {
            _q.notify({
              type: 'negative',
              timeout: 3000,
              message: 'Login not possible',
              position: 'bottom-right'
            })
            return
          }
          // set token data to cookie storage
          cookies.set('mcisitetoken', response.data.Token, {
            path: '/'
          })
          // set user data to cookie storage
          localstorage.set('user', JSON.stringify(response.data))
          // set auth to true
          _this.$store.dispatch('SetUser', response.data)
          _this.$api.defaults.headers.common['Token'] = response.data.Token
          _router.push('/user/dashboard')
        }).catch(function (error) {
          _this.$helper.logError(error)
          _q.notify({
            type: 'negative',
            timeout: 3000,
            message: 'Login not possible',
            position: 'bottom-right'
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
