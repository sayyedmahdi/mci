<template>
  <div class="tw-my-32">
    <div class="tw-flex tw-text-6xl tw-ml-[100px] tw-mb-12">
      <span class="text_dark_blue ">Paket<span class="text_dark_pink tw-ml-3">liste</span></span>
    </div>

    <div class="tw-flex tw-flex-col tw-space-y-6 md:tw-space-y-0 md:space-x-8 xl:tw-space-x-16 md:tw-flex-row tw-px-20 md:tw-px-16 xl:tw-px-60 ">
      <!-- Col 1 -->
      <div class="box_shadow text_dark_blue tw-text-center tw-p-12">

          <img class="tw-mx-auto" src="~assets/rectangle1395.png">

        <div class=" tw-text-4xl ">Packet 1</div>
        <div class="text_dark_pink  tw-text-3xl">1200 $</div>
        <div class=" tw-text-lg">Duration: 12 month</div>
        <div class=" tw-text-lg">Per Month Payment: 200 $</div>
        <button class="flex items-center tw-mx-auto tw-py-3 tw-px-9 text_md tw-mt-4 bg__dark_pink tw-text-white justify-center ">
          <span>Buy Now</span>
        </button>
      </div>


      <!-- Col 2 -->
      <div class="box_shadow text_dark_blue tw-text-center tw-p-12">
        <img class="tw-mx-auto" src="~assets/rectangle1395.png">
        <div class=" tw-text-4xl ">Packet 1</div>
        <div class="text_dark_pink  tw-text-3xl">1200 $</div>
        <div class=" tw-text-lg">Duration: 12 month</div>
        <div class=" tw-text-lg">Per Month Payment: 200 $</div>
        <button class="flex items-center tw-mx-auto tw-py-3 tw-px-9 text_md tw-mt-4 bg__dark_pink tw-text-white justify-center ">
          <span>Buy Now</span>
        </button>
      </div>

      <!-- Col 3 -->
      <div class="box_shadow text_dark_blue tw-text-center tw-p-12">
        <img class="tw-mx-auto" src="~assets/rectangle1395.png">
        <div class=" tw-text-4xl ">Packet 1</div>
        <div class="text_dark_pink  tw-text-3xl">1200 $</div>
        <div class=" tw-text-lg">Duration: 12 month</div>
        <div class=" tw-text-lg">Per Month Payment: 200 $</div>
        <button class="flex items-center tw-mx-auto tw-py-3 tw-px-9 text_md tw-mt-4 bg__dark_pink tw-text-white justify-center ">
          <span>Buy Now</span>
        </button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "paketList"
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
</style>
