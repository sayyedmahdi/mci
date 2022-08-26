<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row-reverse md:tw-items-center md:tw-justify-between tw-items-center tw-justify-center tw-w-full tw-h-full tw-p-14 ">
    <div class="bg__dark_blue tw-w-[400px] tw-text-white tw-flex tw-flex-col tw-justify-start tw-text-center tw-p-8 md:tw-h-[570px]  md:tw-w-[650px]">
      <div class="tw-text-4xl tw-pb-[30%]">Log In</div>
      <q-input v-model="email" label="Email" label-color="white" class="tw-text-sm tw-border-b tw-border-white"/>
      <q-input v-model="password" label="Password" label-color="white" class="tw-text-sm tw-border-b tw-border-white" />
      <q-btn class="bg__dark_pink tw-mt-24 tw-object-fit tw-p-2 tw-lowercase"><span class="tw-uppercase">L</span>og in</q-btn>
      <div class="text_dark_pink tw-text-left tw-mt-6">Terms of use</div>
    </div>
    <div class="tw-h-full tw-mt-[10%] lg:tw-ml-[5%] lg:tw-mr-[5%]">
      <img class="tw-object-cover" src="~assets/login.png">
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
