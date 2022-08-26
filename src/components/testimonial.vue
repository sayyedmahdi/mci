<template>
  <div class=" tw-my-32 ">
    <div class="tw-flex tw-text-6xl tw-ml-[100px] tw-mb-20">
      <span class="text_dark_blue ">Nutzer<span class="text_dark_pink tw-ml-3">kommentieren</span></span>
    </div>

    <div class="tw-flex tw-flex-col tw-px-40 tw-my-6 tw-space-y-8 md:tw-space-y-0  md:tw-space-x-8 md:tw-px-20  md:tw-flex-row   lg:tw-justify-between ">
      <!-- Col 1 -->
      <div class="box_shadow tw-text-left tw-p-4 text_dark_blue tw-max-w-[400px] tw-max-h-64">

        <img class="tw-mx-auto" src="~assets/ellipse2327.png">

        <div class="tw-text-4xl tw-mb-3">Person 1</div>
        <div class="tw-text-[16px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id consequat ac dui vitae </div>

      </div>


      <!-- Col 2 -->
      <div class="box_shadow tw-text-left tw-p-4 tw-text-white tw-max-w-[400px] tw-max-h-64 bg__dark_pink col2_testimonial">

        <img class="tw-mx-auto" src="~assets/ellipse2329.png">

        <div class="tw-text-4xl tw-mb-3">Person 2</div>
        <div class="tw-text-[16px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id consequat ac dui vitae </div>

      </div>

      <!-- Col 3 -->
      <div class="box_shadow  tw-text-left tw-p-4 text_dark_blue tw-max-w-[400px] tw-max-h-64">

        <img class="tw-mx-auto" src="~assets/ellipse2328.png">

        <div class="tw-text-4xl tw-mb-3">Person 3</div>
        <div class="tw-text-[16px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id consequat ac dui vitae </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "testimonial"
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}

@media screen and (min-width: 768px){
  .col2_testimonial {
    margin-top: -35px !important;
    margin-bottom: 35px !important;
  }
}
</style>
