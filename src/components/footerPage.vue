<template>
  <div class="tw-w-full tw-text-white">
    <div class="tw-flex sm:tw-h-14 tw-flex-row  tw-text-center tw-mt-4 tw-h-[77px]">
      <div class="tw-flex-1 bg__dark_pink"></div>
      <div class="tw-flex-1 bg__dark_blue"></div>
      <div class="tw-flex-1 bg__dark_pink"></div>
      <div class="tw-flex-1 bg__dark_blue"></div>
    </div>
    <div class="bg__dark_blue tw-flex tw-flex-col md:tw-flex-row tw-text-white md:tw-justify-between md:tw-px-24 tw-px-16 tw-py-10">
      <div class="md:tw-text-left tw-text-center">
        <div class="tw-text-4xl tw-mb-5 md:tw-text-2xl">
          MCI
          <div class="tw-text-base">Mega Club International</div>
        </div>
        <div class="tw-text-sm md:tw-max-w-[350px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim aliquam diam tristique congue suspendisse et. Tellus enim morbi et tellus, tellus venenatis nunc at.
        </div>
      </div>
      <div class="tw-mt-16 tw-text-center md:tw-text-left">
        <div class="mb-4">
          <span class="pr-12"><img class="tw-inline-block tw-pr-2" src="~assets/phone.png">+49 711 5044 7999</span>
          <span><img class="tw-inline-block tw-pr-2" src="~assets/envelop.png">Kontakt@HouseofGlam.Beauty</span>
        </div>
        <div>
          <span class="pr-12"><img class="tw-inline-block tw-pr-2" src="~assets/mobile.png">+49 172 43 79 528</span>
          <span><img class="tw-inline-block tw-pr-2" src="~assets/location.png">Eberhardstr. 73 , 70173 Stuttgart</span>
        </div>
      </div>
  </div>
    <div class="tw-flex tw-text-sm tw-justify-between bg__dark_blue md:tw-px-24 tw-px-16 tw-pb-4">
      <div class=" tw-mt-10 "><span>Copyright @house of glam 2021</span></div>
      <div class=" tw-mt-10"><span class="tw-cursor-pointer" @click="dataProtectiondialog()"> Datenschutzerklärung</span><span class="ml-4 tw-cursor-pointer" @click="impressumdialog()">Impressum</span></div>
    </div>

    <q-dialog v-model="showImpressum">
      <div class="bg-white tw-p-16">
        <h3>Impressum</h3>
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>

    </q-dialog>
    <q-dialog v-model="showDataProtection">
      <div class="bg-white tw-p-16">
        <h3>Datenschutzerklärung</h3>
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>

    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "footerPage",
  data(){
    return {
      showImpressum: false,
      showDataProtection: false
    }
  },
  methods: {
    impressumdialog(){
      this.showImpressum = true;
    },
    dataProtectiondialog(){
      this.showDataProtection = true;
    }
  }
}
</script>

<style scoped>

</style>
