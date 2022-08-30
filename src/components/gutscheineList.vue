<template>
  <div class="tw-my-32">
    <div class="tw-flex tw-text-5xl sm:tw-ml-[100px] tw-ml-[20px]  tw-mb-12">
      <span class="text_dark_blue ">Liste der <span class="text_dark_pink tw-ml-3">Geschäfte</span></span>
    </div>

    <div class="tw-flex flex-col xl:tw-justify-around md:tw-space-y-0 md:tw-space-x-14 tw-space-y-8 md:space-y-0 md:tw-flex-row md:tw-px-36 xs:tw-px-6 xxxs:tw-px-2 xl:tw-px-56 tw-justify-between text_dark_blue">
      <!-- Col 1 -->
      <template v-for="(store , i) in stores" :key="i">

        <div v-if="i % 2 === 0 " class="box_shadow tw-flex-wrap tw-flex-col-reverse  xxs:tw-flex-row text_dark_blue tw-pl-8 xxs:tw-pl-2 tw-pb-2 tw md:tw-pl-4 xxs:tw-pb-8 tw-pr-0 tw-flex tw-text-left tw-max-h-[360px] tw-justify-between">
          <div class="tw-max-w-[50%] md:tw-max-w-[50%] xxs:tw-max-w-[50%] xl:tw-max-w-[50%] xl:tw-pr-8 xl:tw-w-[230px] xl:tw-ml-4">
            <img class="xxs:tw-mb-12 xxs:tw-mt-8" src="~assets/rectangle1398.png">
            <div class="tw-text-3xl md:tw-text-2xl xl:tw-text-4xl">{{store.Title}}</div>
            <div class="tw-text-sm">{{ store.Comments }}</div>
            <button @click="openPage(store.Url)" class="tw-flex tw-py-2 md:tw-py-1 md:tw-pd-x-3 tw-px-2 xl:tw-px-3 xl:tw-py-2 lg:text_md  tw-mt-4 bg__dark_pink tw-text-white tw-text-xs">
              <span>Lorem Ipsum</span>
            </button>
          </div>
          <div class="xxs:tw-my-6 tw-pt-4 md:tw-w-[40%] 2xl:tw-mr-[-35px] xl:tw-mr-[-23px] tw-max-h-[30%]">
            <img src="~assets/rectangle1403.png">
          </div>

        </div>

        <!-- Col 2 -->
        <div v-else class="box_shadow text_dark_blue tw-flex-col-reverse xxs:tw-flex-row tw-p-4 md:tw-p-8 xl:tw-w-[700px] tw-flex tw-text-left tw-max-h-[360px] tw-items-center tw-justify-between">
          <div class="lg:tw-pr-[30%] lg:tw-space-y-6 xl:tw-pr-[20%] tw-max-w-[50%]">
            <img src="~assets/rectangle1398.png">
            <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl">{{store.Title}}</div>
            <div class="tw-text-sm">{{ store.Comments }}</div>
            <button @click="openPage(store.Url)" class="tw-flex tw-py-2 tw-px-2 xl:tw-px-3 xl:tw-py-2 lg:text_md tw-mt-4 bg__dark_pink tw-text-white tw-text-xs" >
              <span>Lorem Ipsum</span>
            </button>
          </div>
          <div class="tw-justify-end tw-min-w-[50%]">
            <img src="~assets/rectangle1396.png">
          </div>

        </div>
      </template>


    </div>

    <div v-if="false" class="tw-flex flex-col tw-mt-8 md:tw-space-y-0 md:tw-space-x-14 tw-space-y-8 md:space-y-0 md:tw-flex-row tw-px-36 xl:tw-px-56 tw-justify-between  text_dark_blue">

      <div class="box_shadow text_dark_blue tw-pl-8 md:tw-pl-4 tw-pb-8 tw-pr-0 tw-flex tw-text-left tw-max-h-[360px] tw-justify-between">
        <div class="tw-justify-center tw-pt-8 md:tw-max-w-[50%] xl:tw-max-w-[65%] xl:tw-pr-18 xl:tw-w-[230px] xl:tw-ml-4">
          <div class="tw-mb-12">
            <img src="~assets/rectangle1398.png">
          </div>
          <div class="tw-text-3xl md:tw-text-2xl xl:tw-text-4xl">Store 2</div>
          <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
          <button class="tw-flex tw-py-2 md:tw-py-1 md:tw-pd-x-3 tw-px-2 xl:tw-px-3 xl:tw-py-2 lg:text_md  tw-mt-4 bg__dark_pink tw-text-white ">
            <span>Lorem Ipsum</span>
          </button>
        </div>
        <div class="tw-my-6 tw-pt-4">
          <img src="~assets/rectangle1403.png">
        </div>

      </div>

      <!-- Col 2 -->
      <div class="box_shadow text_dark_blue tw-p-8 xl:tw-w-[700px] tw-flex tw-text-left tw-max-h-[360px] tw-items-center">
        <div class="lg:tw-pr-[30%] lg:tw-space-y-6 xl:tw-pr-[20%]">
          <img src="~assets/rectangle1398.png">
          <div class=" tw-text-3xl xl:tw-text-4xl">Store 2</div>
          <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
          <button class="tw-flex tw-py-2 tw-px-2 xl:tw-px-3 xl:tw-py-2 lg:text_md  tw-mt-4 bg__dark_pink tw-text-white ">
            <span>Lorem Ipsum</span>
          </button>
        </div>
        <div class="tw-justify-end">
          <img src="~assets/rectangle1396.png">
        </div>

      </div>
      <!-- Col 2 -->
      <div class="box_shadow text_dark_blue tw-p-8 xl:tw-w-[700px] tw-flex tw-text-left tw-max-h-[360px] tw-items-center">
        <div class="lg:tw-pr-[30%] lg:tw-space-y-6 xl:tw-pr-[20%]">
          <img src="~assets/rectangle1398.png">
          <div class=" tw-text-3xl xl:tw-text-4xl">Store 2</div>
          <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
          <button class="tw-flex tw-py-2 tw-px-2 xl:tw-px-3 xl:tw-py-2 lg:text_md  tw-mt-4 bg__dark_pink tw-text-white ">
            <span>Lorem Ipsum</span>
          </button>
        </div>
        <div class="tw-justify-end">
          <img src="~assets/rectangle1396.png">
        </div>

      </div>

      <!-- Col 1 -->
      <div class="box_shadow text_dark_blue tw-pl-8 md:tw-pl-4 tw-pb-8 tw-pr-0 tw-flex tw-text-left tw-max-h-[360px] tw-justify-between">
        <div class="tw-justify-center tw-pt-8 md:tw-max-w-[50%] xl:tw-max-w-[65%] xl:tw-pr-18 xl:tw-w-[230px] xl:tw-ml-4">
          <div class="tw-mb-12">
            <img src="~assets/rectangle1398.png">
          </div>
          <div class="tw-text-3xl md:tw-text-2xl xl:tw-text-4xl">Store 2</div>
          <div class="tw-text-sm">Lorem ipsum dolor sit amet</div>
          <button class="tw-flex tw-py-2 md:tw-py-1 md:tw-pd-x-3 tw-px-2 xl:tw-px-3 xl:tw-py-2 lg:text_md  tw-mt-4 bg__dark_pink tw-text-white ">
            <span>Lorem Ipsum</span>
          </button>
        </div>
        <div class="tw-my-6 tw-pt-4">
          <img src="~assets/rectangle1403.png">
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "geschäfteList",
  data(){
    return {
      stores: []
    }
  },
  methods: {
    openPage(url){
      window.open(url, '_blank');
    },
    loadData(){
      this.$api.post('store/search.php', {
        Title: '',
        OrderBy: 'id',
        OrderDir: 'desc',
        Page: '1',
        RowsPerPage: '10'
      }).then((res) => {
        this.stores = res.data.Data
      })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
</style>
