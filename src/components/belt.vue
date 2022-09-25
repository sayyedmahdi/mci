<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row belt tw-w-full tw-text-center tw-text-white tw-mt-4">
    <div class="bg__dark_pink tw-flex-1 tw-py-4">
      <div class="title_text tw-mb-1">{{ $t('jetzt') }}</div>
      <img class="tw-mx-auto" src="~assets/rectangle1390.png">
      <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
    </div>
    <div class="bg__dark_blue tw-flex-1 tw-py-4">
      <div class="title_text tw-mb-1">{{ $t('einfach') }}</div>
      <img class="tw-mx-auto" src="~assets/rectangle1391.png">
      <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
    </div>
    <div class="bg__dark_pink tw-flex-1 tw-py-4 ">
      <div class="title_text tw-mb-1">{{ $t('onlineZahlung') }}</div>
      <img class="tw-mx-auto" src="~assets/rectangle1392.png">
      <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
    </div>
    <div class="bg__dark_blue tw-flex-1 tw-py-4">
      <div class="title_text tw-mb-1">{{ $t('profitabel') }}</div>
      <img class="tw-mx-auto" src="~assets/rectangle1393.png">
      <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "belt",
  // props: {
  //   title: {
  //     type: String,
  //     required: true
  //   },
  //   image: {
  //     type: String,
  //     required: false
  //   },
  //   text: {
  //     type: String,
  //     required: false
  //   }
  // }
}
</script>

<style scoped>

.title_text {
  font-weight: 500;
  font-size: 29px;
  line-height: 30px;
  color: #FFFFFF;
}
</style>
