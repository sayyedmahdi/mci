<template>
  <div class="tw-flex tw-w-full tw-h-2">
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
  </div>
  <div class="tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-space-x-10 md:tw-justify-between tw-p-6 lg:tw-px-40">
    <div class="box_shadow md:tw-w-[60%] tw-h-[280px] md:tw-flex-row tw-flex tw-flex-col-reverse tw-justify-center tw-items-center md:tw-items-start md:tw-justify-between">
      <div class="text_dark_pink md:tw-max-w-[60%] md:tw-space-y-10 tw-p-2 tw-flex tw-flex-col tw-justify-between tw-text-center md:tw-text-left tw-py-4">
        <div class="tw-text-sm xxs:tw-text-lg sm:tw-text-2xl">Your Packet</div>
        <div class="tw-text-base xxs:tw-text-xl sm:tw-text-3xl text_dark_blue">Packet 1/1000 $</div>
        <div class="tw-text-base xxs:tw-text-xl sm:tw-text-3xl text_dark_pink xl:tw-flex "><div class="">Bought: 800 $</div>      <div>Remain: 1600 $</div></div>
      </div>
      <div><img src="~assets/rectangle1391.png"></div>
    </div>
    <div class="box_shadow tw-flex tw-flex-col tw-justify-center tw-items-center text_dark_blue md:tw-w-[350px]">
      <img src="~assets/user-avatar.png" >
      <div class="text_dark_pink tw-text-2xl">{{StateUser.Username}}</div>
      <div class="tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-6">
          <div>New Orders</div>
          <div>Current Packet</div>
          <div>All Packets</div>
      </div>
      <div class="tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-6">
        <div class="tw-pl-6">18</div>
        <div>Packet1</div>
        <div class="tw-pr-6">6</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "dashboard",
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(['StateUser'])
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
</style>
