<template>
  <div class="row wrap-layout">
    <div class="col-12" style="width:100%;height:70px;"></div>
    <div class="col-xs-12 col-sm-4 offset-xs-0 offset-sm-4 self-center">
      <div class="login q-gutter-sm">
        <div>
          <q-input
          outlined
          autofocus
          v-model="loginForm.username"
          label="Username"
          :error="v$.loginForm.username.$error">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>
        <div>
          <q-input
          outlined
          v-model="loginForm.password"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          :error="v$.loginForm.password.$error"
          @keyup.enter="login">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn color="primary" class="login-btn full-width" :label="einloggen" @click="login" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'Login',
  meta: {
    title: 'Login – FightSearch 0.1'
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      isPwd: true,
      message: '',
      error: false,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  validations() {
      return {
        loginForm: {
            username: { required },
            password: { required }
        }
      }
  },
  methods: {
    async login () {
      const isFormCorrect = await this.v$.$validate()
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
          Username: this.loginForm.username,
          Password: this.loginForm.password
        }).then(function (response) {
          console.log(response)
          // check for valid User Type
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
    }
  }
}
</script>

<style scoped>
.login-btn
{
  padding: 0;
}
.cur
{
    background-color: brown;
}
</style>
