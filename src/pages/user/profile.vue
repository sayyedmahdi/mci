<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-space-x-10 tw-p-8 md:tw-flex-row md:tw-justify-between md:tw-items-center text_dark_blue">
    <div class="tw-pl-[5%] md:tw-min-w-[35%]">
      <div class="tw-text-3xl tw-text-center md:tw-text-left">Hello {{ StateUser.Username }}</div>
      <div class="tw-text-base">This is your profile page. You can Edit and make changes to it.</div>
      <div class="tw-mt-[20%]">
        <img src="~assets/user-profile.png">
      </div>
    </div>
    <div class="box_shadow text_dark_blue tw-flex tw-flex-col tw-p-8 tw-max-w-[840px]">
      <div class="tw-text-4xl tw-text-center">
        Edit Profile
      </div>
      <div class="tw-flex tw-flex-wrap  tw-mb-6 tw-box-shadow tw-mt-8">
        <div class="w-full mb-6 tw-px-3 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="name">
            Name
          </label>
          <input v-model="name" :class="['appearance-none', 'bg__dark_blue' , 'tw-block' ,'tw-w-full', 'tw-py-3', 'tw-px-4', 'tw-mb-3', 'focus:tw-border-white' , errorExists('name') ? 'tw-border-red-700' : '' ]" id="name" type="text" placeholder="Name">
          <p v-if="errorExists('name')" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" :class="['appearance-none', 'bg__dark_blue' , 'tw-block', 'tw-w-full', 'tw-py-3', 'tw-px-4', 'tw-mb-3', 'focus:tw-border-white' , errorExists('email') ? 'tw-border-red-700' : '' ]" id="email" type="text" placeholder="Email">
          <p v-if="errorExists('email')" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="password">
            Current Password
          </label>
          <input v-model="password" class="appearance-none bg__dark_blue  tw-block tw-w-full tw-py-3 tw-px-4 tw-mb-3 focus:tw-border-white" id="password" type="password" placeholder="Current Password">
          <p v-if="false" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="new-password">
            New Password
          </label>
          <input v-model="newPassword" class="appearance-none bg__dark_blue  tw-block tw-w-full tw-py-3 tw-px-4 tw-mb-3 focus:tw-border-white" id="new-password" type="password" placeholder="New Password">
          <p v-if="false" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full md:w-1/3 tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="country">
            Country
          </label>
          <input v-model="country" class="appearance-none bg__dark_blue  tw-block tw-w-full tw-py-3 tw-px-4 tw-mb-3 focus:tw-border-white" id="country" type="text" placeholder="Country">
          <p v-if="false" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full md:w-1/3 tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="country">
            City
          </label>
          <input v-model="city" class="appearance-none bg__dark_blue  tw-block tw-w-full tw-py-3 tw-px-4 tw-mb-3 focus:tw-border-white" id="city" type="text" placeholder="City">
          <p v-if="false" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full md:w-1/3 tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="postal-code">
            Postal code
          </label>
          <input v-model="postalCode" class="appearance-none bg__dark_blue  tw-block tw-w-full tw-py-3 tw-px-4 tw-mb-3 focus:tw-border-white" id="postal-code" type="text" placeholder="Postal code">
          <p v-if="false" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full tw-px-3 tw-mb-6 md:tw-mb-0">
          <label class="tw-block tracking-wide tw-text-base tw-font-bold mb-2" for="address">
            Address
          </label>
          <input v-model="address" class="appearance-none bg__dark_blue  tw-block tw-w-full tw-py-3 tw-px-4 tw-mb-3 focus:tw-border-white" id="address" type="text" placeholder="Address">
          <p v-if="false" class="text-red-500 text-xs italic">Please fill out this field.</p>

        </div>
        <q-btn @click="update()" class="bg__dark_pink tw-mt-6 tw-mx-auto tw-p-2 tw-lowercase tw-text-white tw-max-h-10 tw-px-20 tw-text-base">Save Changes</q-btn>
      </div>
    </div>
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
            message: 'Update profile successfully',
            position: 'bottom-right'
          })
        })
        .catch((err) => {
          this.$helper.logError(err)
          this.$q.notify({
            type: 'negative',
            timeout: 3000,
            message: 'Update profile not possible',
            position: 'bottom-right'
          })
        })
    },
    changePassword(){

    },
    errorExists(part){
      if (this.errors.includes(part)) {
        return true
      } else {
        return false
      }
    },
    validate(){
      if (this.name === '' || this.name === null){
        this.errors.push('name')
      }
      if (this.email === '' || this.email === null){
        this.errors.push('email')
      }
      // if (this.password === '' || this.password === null){
      //   this.errors.push('password')
      // }
      // if (this.address === '' || this.address === null){
      //   this.errors.push('address')
      // }
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
