<template>
  <div class="tw-flex tw-flex-col-reverse tw-items-center tw-justify-between tw-w-full tw-h-screen tw-p-20">
    <div class="tw-h-full tw-mt-[12%] tw-ml-[12%]">
      <img class="tw-object-cover" src="~assets/login.png">
    </div>

    <div class="bg__dark_blue tw-text-white tw-flex tw-flex-col tw-justify-start tw-text-center tw-p-12 lg:tw-h-[570px] lg:tw-w-[600px]">
      <div class="tw-text-4xl tw-pb-[30%]">Log In</div>
      <q-input v-model="email" label="Email" label-color="white" class="tw-text-sm tw-border-b tw-border-white"/>
      <q-input v-model="password" label="Password" label-color="white" class="tw-text-sm tw-border-b tw-border-white" />
      <q-btn class="bg__dark_pink tw-mt-24 tw-object-fit tw-p-2 tw-lowercase"><span class="tw-uppercase">L</span>og in</q-btn>
      <div class="text_dark_pink tw-text-left tw-mt-6">Terms of use</div>
    </div>

  </div>
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
  }
}
</script>

<style scoped>

</style>
