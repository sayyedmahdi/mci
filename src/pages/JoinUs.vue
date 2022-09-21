<template>
  <form v-on:submit.prevent="() => {}">
    <div class="tw-flex tw-flex-col md:tw-flex-row-reverse md:tw-items-center md:tw-justify-between tw-items-center tw-justify-center tw-w-full tw-h-full tw-p-14 ">
      <div class="bg__dark_blue tw-w-[400px] tw-text-white tw-flex tw-flex-col tw-justify-start tw-text-center tw-p-8 md:tw-h-[570px]  md:tw-w-[650px]">
        <div class="tw-text-4xl tw-pb-[5%]">{{ $t('register.CreateAccount') }}</div>
        <input v-model="fullName" :class="['tw-text-sm', 'tw-border-b',  'tw-my-6' ,'tw-text-white' ,'tw-color-white' ,'bg__dark_blue' ,'focus:tw-outline-none' ,  errorExists('fullName') ? 'tw-border-red-700' : '']" :placeholder="$t('register.FullName')"/>
        <ul class="" id="parsley-id-11" v-if="errorExists('fullName')"><li class="parsley-required">{{$t('register.FullNameRequired')}}</li></ul>
        <input v-model="email" :class="['tw-text-sm', 'tw-border-b', 'tw-my-6', 'tw-text-white', 'tw-color-white', 'bg__dark_blue', 'focus:tw-outline-none' ,  errorExists('email') ? 'tw-border-red-700' : '']" :placeholder="$t('user.Email')"/>
        <ul class="parsley-errors-list filled" id="parsley-id-11" v-if="errorExists('email')"><li class="parsley-required">{{$t('register.EmailRequired')}}</li></ul>
        <input v-model="password" :class="['tw-text-sm', 'tw-border-b', 'tw-my-6', 'tw-text-white', 'tw-color-white', 'bg__dark_blue', 'focus:tw-outline-none' ,  errorExists('password') ? 'tw-border-red-700' : '']" type="password" :placeholder="$t('user.Password')" />
        <ul class="parsley-errors-list filled" id="parsley-id-11" v-if="errorExists('password')"><li class="parsley-required">{{$t('register.PasswordRequired')}}</li></ul>
        <button class="bg__dark_pink tw-mt-8 tw-object-fit tw-p-2 " @click="register" >{{ $t('register.CreateAccount') }}</button>
        <div class="tw-flex tw-flex-row tw-space-x-4 tw-p-2 tw-mt-[4%]">
          <input v-model="termsOfUse" class="form-check-input h-4 w-4 bg-white tw-transition tw-duration-200 cursor-pointer" type="checkbox" >
          <label class="form-check-label text-white" for="flexCheckDefault">
            {{ $t('register.IAgree') }}
          </label>
          <div class="text_dark_pink tw-text-left tw-cursor-pointer" @click="showTermsOfUse()">{{$t('termsOfUse')}}</div>
        </div>


      </div>

      <div class="tw-h-full tw-mt-[10%] lg:tw-ml-[5%] lg:tw-mr-[5%]">
        <img class="tw-object-cover" src="~assets/login.png">
      </div>

    </div>
  </form>
  <q-dialog v-model="show">
    <div class="bg-white tw-p-16">
      <h3>{{$t('termsOfUse')}}</h3>
      <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
    </div>

  </q-dialog>
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
      show: false
    }
  },
  methods: {
    async register () {
      if (!this.termsOfUse){
        this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: this.$t('register.acceptTermsOfUse'),
          position: 'bottom-right'
        })

        return false;
      }
      this.errors = [];
      this.validate();
      let _this = this
      this.errors.length;
      if (this.errors.length > 0){
        return false;
      }
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
          message: this.$t('updateNotPossible'),
          position: 'bottom-right'
        })
      })
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
          if (!response.data.Type == 1) {
            _q.notify({
              type: 'negative',
              timeout: 3000,
              message: this.$t('loginNotPossible'),
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
          _router.push('/')
        }).catch(function (error) {
          _this.$helper.logError(error)
          _q.notify({
            type: 'negative',
            timeout: 3000,
            message: this.$t('loginNotPossible'),
            position: 'bottom-right'
          })
        })
      }
    },
    errorExists(part){
      if (this.errors.includes(part)) {
        return true
      } else {
        return false
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
    },
    showTermsOfUse(){
      this.show = true;
    }
  }
}
</script>

<style scoped>
input[type="checkbox"]:checked {
  accent-color:  #D25A73 !important;
}
</style>
