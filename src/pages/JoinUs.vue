<template>
  <form v-on:submit.prevent="() => {}">
    <div class="tw-flex tw-flex-col md:tw-flex-row-reverse md:tw-items-center md:tw-justify-between tw-items-center tw-justify-center tw-w-full tw-h-full tw-p-14 ">
      <div class="bg__dark_blue tw-w-[400px] tw-text-white tw-flex tw-flex-col tw-justify-start tw-text-center tw-p-8 md:tw-h-[570px]  md:tw-w-[650px]">
        <div class="tw-text-4xl tw-pb-[5%]">Create Account</div>
        <input v-model="fullName" class="tw-text-sm tw-border-b tw-my-6 tw-text-white tw-color-white bg__dark_blue focus:tw-outline-none" placeholder="Full Name"/>
        <input v-model="email" class="tw-text-sm tw-border-b tw-my-6 tw-text-white tw-color-white bg__dark_blue focus:tw-outline-none" placeholder="Email"/>
        <input v-model="address" class="tw-text-sm tw-border-b tw-my-6 tw-text-white tw-color-white bg__dark_blue focus:tw-outline-none" placeholder="Address"/>
        <input v-model="password" class="tw-text-sm tw-border-b tw-my-6  tw-text-white tw-color-white bg__dark_blue focus:tw-outline-none" type="password" placeholder="Password" />
        <button class="bg__dark_pink tw-mt-8 tw-object-fit tw-p-2 " @click="register" >Create Account</button>
        <div class="tw-flex tw-flex-row tw-space-x-4 tw-p-2 tw-mt-[4%]">
          <input v-model="termsOfUse" class="form-check-input h-4 w-4 bg-white tw-transition tw-duration-200 cursor-pointer" type="checkbox" >
          <label class="form-check-label text-white" for="flexCheckDefault">
            I agree with
          </label>
          <div class="text_dark_pink tw-text-left ">Terms of use</div>
        </div>


      </div>

      <div class="tw-h-full tw-mt-[10%] lg:tw-ml-[5%] lg:tw-mr-[5%]">
        <img class="tw-object-cover" src="~assets/login.png">
      </div>

    </div>
  </form>
</template>

<script>

export default {
  name: "JoinUs",
  data() {
    return {
      fullName: '',
      email: '',
      address: '',
      password: '',
      termsOfUse: 0,
      errors: [],
    }
  },
  methods: {
    async register () {
      if (!this.termsOfUse){
        this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: 'please accept terms of use',
          position: 'bottom-right'
        })

        return
      }
      return;
      let _this = this
      const isFormCorrect = true;
      if (isFormCorrect) {
        this.$api.post('user/create.php', {
          Username: this.email,
          Email: this.email,
          Password: this.password,
          Status: '2',
          Type: '2',
        }).then((res) => {
          this.login()
        }).catch(function (error) {
          _this.$helper.logError(error)
          _this.$q.notify({
            type: 'negative',
            timeout: 3000,
            message: 'Update not possible',
            position: 'bottom-right'
          })
        })
      }
    },
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
          _router.push('/admin')
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
    },
    validate(){
      if (this.fullName === '' || this.fullName === null){
        this.errors.push('fullName')
      }
      if (this.email === '' || this.email === null){
        this.errors.push('email')
      }
      if (this.password === '' || this.password === null){
        this.errors.push('password')
      }
      if (this.address === '' || this.address === null){
        this.errors.push('address')
      }
    }
  }
}
</script>

<style scoped>
input[type="checkbox"]:checked {
  accent-color:  #D25A73 !important;
}
</style>
