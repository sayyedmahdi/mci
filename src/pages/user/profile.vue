<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-space-x-10 tw-p-8 md:tw-flex-row md:tw-justify-between md:tw-items-center text_dark_blue">
    <div class="tw-pl-[5%] md:tw-min-w-[35%]">
      <div class="tw-text-3xl tw-text-center md:tw-text-left">{{ $t('profile.Hello') }} {{ StateUser.Username }}</div>
      <div class="tw-text-base">{{ $t('profile.Text') }}</div>
      <div class="tw-mt-[20%]">
        <img src="~assets/user-profile.png">
      </div>
    </div>
    <div class="box_shadow text_dark_blue tw-flex tw-flex-col tw-p-8 tw-max-w-[840px]">
      <div class="tw-text-4xl tw-text-center">
        {{ $t('profile.EditProfile') }}
      </div>
      <div class="tw-flex tw-flex-wrap  tw-mb-6 tw-box-shadow tw-mt-8">
        <div class="w-full mb-6 tw-px-3 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="name">
            {{ $t('profile.UserName') }}
          </label>
          <input v-model="name" :class="['appearance-none', 'bg__dark_blue' , 'tw-block' ,'tw-w-full', 'tw-py-3', 'tw-px-4', 'tw-mb-3', 'focus:tw-border-white' , errorExists('name') ? 'tw-border-red-700' : '' ]" id="name" type="text" :placeholder="$t('profile.UserName')">
          <p v-if="errorExists('name')" class="text-red-500 text-xs italic">{{$t('profile.Error')}}</p>
        </div>
        <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="email">
            {{ $t('profile.Email') }}
          </label>
          <input v-model="email" :class="['appearance-none', 'bg__dark_blue' , 'tw-block', 'tw-w-full', 'tw-py-3', 'tw-px-4', 'tw-mb-3', 'focus:tw-border-white' , errorExists('email') ? 'tw-border-red-700' : '' ]" id="email" type="text" :placeholder="$t('profile.Email')">
          <p v-if="errorExists('email')" class="text-red-500 text-xs italic">{{$t('profile.Error')}}</p>
        </div>
        <q-btn @click="update()" class="bg__dark_pink tw-mt-6 tw-mx-auto tw-p-2 tw-lowercase tw-text-white tw-max-h-10 tw-px-20 tw-text-base">{{$t('profile.SaveChanges')}}</q-btn>
        <q-btn @click="showChangePassword()" class="bg__dark_pink tw-mt-6 tw-mx-auto tw-p-2 tw-lowercase tw-text-white tw-max-h-10 tw-px-20 tw-text-base">
          {{ $t('profile.ChangePassword') }}</q-btn>
      </div>
    </div>
    <q-dialog
      v-model="show"
    >
      <div class="tw-flex tw-flex-col tw-space-y-4 tw-justify-center tw-items-center text_dark_blue tw-py-4 tw-bg-white tw-px-8 tw-text-xl tw-font-bold">
        {{$t('profile.ChangePassword')}}
        <div class="tw-mr-auto tw-flex tw-justify-between tw-space-x-2 tw-mr-0 tw-w-full">
          <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
            <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="password">
              {{ $t('profile.CurrentPassword') }}
            </label>
            <input v-model="password" :class="['appearance-none', 'bg__dark_blue',  'tw-block', 'tw-w-full', 'tw-py-3', 'tw-px-4', 'tw-mb-3', 'focus:tw-border-white' , errorExists('password') ? 'tw-border-red-700' : '' ]" id="password" type="password" :placeholder="$t('profile.CurrentPassword')">
            <p v-if="errorExists('password')" class="text-red-500 text-xs italic">{{$t('profile.Error')}}</p>
          </div>
          <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
            <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="new-password">
              {{ $t('profile.NewPassword') }}
            </label>
            <input v-model="newPassword" :class="['appearance-none', 'bg__dark_blue',  'tw-block', 'tw-w-full', 'tw-py-3', 'tw-px-4', 'tw-mb-3', 'focus:tw-border-white' , errorExists('newPassword') ? 'tw-border-red-700' : '' ]" id="new-password" type="password" :placeholder="$t('profile.NewPassword')">
            <p v-if="errorExists('newPassword')" class="text-red-500 text-xs italic">{{$t('profile.Error')}}</p>
          </div>

        </div>
        <q-btn @click="changePassword()" class="bg__dark_pink tw-mt-6 tw-mx-auto tw-p-2 tw-lowercase tw-text-white tw-max-h-10 tw-px-20 tw-text-base">{{$t('profile.SaveChanges')}}</q-btn>

      </div>
    </q-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "profile",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      newPassword: '',
      address: '',
      country: '',
      city: '',
      postalCode: '',
      errors: [],
      show: false
    }
  },
  computed: {
    ...mapGetters(['StateUser'])
  },
  methods: {
    update(){
      let data = {
        ID: this.StateUser.ID,
        Email: this.email,
        Username: this.name
      }
      this.errors = [];
      this.validate();
      if (this.errors.length > 0){
        return false;
      }

      this.$api.post('user/update.php', data)
        .then((res) => {
          this.$q.cookies.set('mcisitetoken', res.data.Token, {
            path: '/'
          })
          // set user data to cookie storage
          this.$q.localStorage.set('user', JSON.stringify(res.data))
          // set auth to true
          this.$store.dispatch('SetUser', res.data)
          this.$api.defaults.headers.common['Token'] = res.data.Token
          this.$q.notify({
            type: 'positive',
            timeout: 3000,
            message: this.$t('profile.SuccessUpdate'),
            position: 'bottom-right'
          })
        })
        .catch((err) => {
          this.$helper.logError(err)
          this.$q.notify({
            type: 'negative',
            timeout: 3000,
            message: this.$t('profile.FailedUpdate'),
            position: 'bottom-right'
          })
        })
    },
    changePassword(){
      this.errors = [];

      if (this.password === '' || this.password == null){
        this.errors.push('password')
      }
      if (this.newPassword === '' || this.newPassword == null){
        this.errors.push('newPassword')
      }

      if (this.errors.length > 0){
        return false;
      }


      let data = {
        ID: this.StateUser.ID,
        OldPassword: this.password,
        Password: this.newPassword
      }
      this.$api.post('user/changepassword.php' , data)
        .then((res) => {
          if (res.data.Code === "200"){
            this.$q.notify({
              type: 'positive',
              timeout: 3000,
              message: this.$t('profile.SuccessChangePassword'),
              position: 'bottom-right'
            })

            this.show = false;
          }
        })
        .catch((err) => {
          let errorMessage = '';
          switch (err.response.data.ErrorCode){
            case 401:
              errorMessage = this.$t('profile.InvalidOldPassword');
              break;
            case 402:
              errorMessage = this.$t('profile.InvalidNewPassword');
              break;
            case 300:
              errorMessage = this.$t('profile.SomeError');
              break;
          }

          this.$q.notify({
            type: 'negative',
            timeout: 3000,
            message: errorMessage,
            position: 'bottom-right'
          })
        })
    },
    errorExists(part){
      if (this.errors.includes(part)) {
        return true
      } else {
        return false
      }
    },
    showChangePassword(){
      this.show = true;
    },
    validate(){
      if (this.name === '' || this.name === null){
        this.errors.push('name')
      }
      if (this.email === '' || this.email === null){
        this.errors.push('email')
      }
    }
  },
  mounted() {
    this.name = this.StateUser.Username
    this.email = this.StateUser.Email

  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14) !important;
}

</style>
