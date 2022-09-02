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
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16">
    <div class="box_shadow tw-py-6">
      <div class=" tw-px-16 tw-flex tw-flex-col text_dark_blue ">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-3xl lg:tw-pb-10 text_dark_pink">Packets Buying History</div>
          <div class="box_shadow all_counter tw-flex tw-items-center tw-px-4"><span>All Buys: 6</span></div>
        </div>

        <table class="tw-w-full">
          <thead class="text_dark_blue tw-text-xl  table_head_border tw-w-full tw-whitespace-no-wrap">
          <tr class="tw-pb-4">
            <th>Title</th>
            <th>Packet</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment type</th>
            <th>Paypal number</th>
          </tr>
          </thead>
          <tbody class="text_dark_blue tw-text-lg font_medium">
          <tr v-for="(history , i) in packetsHistory" :key="`IDID__${i}`" :class="[ stripedRow(i) ? 'striped_table_row' : '' ]">
            <th class="font_medium tw-py-4 table_row">{{history.Title}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.Packet}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.Date}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.Price}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.PaymentType}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.PaypalNumber}}</th>
          </tr>
          </tbody>


        </table>
        <div class="tw-text-right tw-mt-6 tw-mb-2">
          Records per page:
          <select v-model="selectedPerPage">
            <template v-for="t in perPageOptions" :key="t">
              <option>{{t}}</option>
            </template>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16 tw-mb-[15%]">
    <div class="box_shadow tw-py-6">
      <div class=" tw-px-16 tw-flex tw-flex-col text_dark_blue ">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-3xl lg:tw-pb-10 text_dark_pink">Packets Buying History</div>
          <div class="box_shadow all_counter tw-flex tw-items-center tw-px-4"><span>All Buys: 6</span></div>
        </div>

        <table class="tw-w-full">
          <thead class="text_dark_blue tw-text-xl  table_head_border tw-w-full tw-whitespace-no-wrap">
          <tr class="tw-pb-4">
            <th>Title</th>
            <th>Packet</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment type</th>
            <th>Paypal number</th>
          </tr>
          </thead>
          <tbody class="text_dark_blue tw-text-lg font_medium">
          <tr v-for="(history , i) in packetsHistory" :key="`IDID__${i}`" :class="[ stripedRow(i) ? 'striped_table_row' : '' ]">
            <th class="font_medium tw-py-4 table_row">{{history.Title}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.Packet}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.Date}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.Price}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.PaymentType}}</th>
            <th class="font_medium tw-py-4 table_row">{{history.PaypalNumber}}</th>
          </tr>
          </tbody>
          <div class="tw-text-right tw-mt-6 tw-mb-2">
            Records per page:
            <select v-model="selectedPerPage">
              <template v-for="t in perPageOptions" :key="t">
                <option>{{t}}</option>
              </template>
            </select>
          </div>
        </table>
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
      stripedIndex: 2,
      selectedPerPage: 5,
      perPageOptions: [
        5 , 10 , 20, 50, 100
      ],
      packetsHistory: [
        {
          Title: 'aa',
          Packet: 'some',
          Price: 500,
          Date: '25/2/2022',
          PaymentType: 'Paypal',
          PaypalNumber: '128526'
        },
        {
          Title: 'aa',
          Packet: 'some',
          Price: 500,
          Date: '25/2/2022',
          PaymentType: 'Paypal',
          PaypalNumber: '128526'
        },
        {
          Title: 'aa',
          Packet: 'some',
          Price: 500,
          Date: '25/2/2022',
          PaymentType: 'Paypal',
          PaypalNumber: '128526'
        },
        {
          Title: 'aa',
          Packet: 'some',
          Price: 500,
          Date: '25/2/2022',
          PaymentType: 'Paypal',
          PaypalNumber: '128526'
        },
        {
          Title: 'aa',
          Packet: 'some',
          Price: 500,
          Date: '25/2/2022',
          PaymentType: 'Paypal',
          PaypalNumber: '128526'
        },
        {
          Title: 'aa',
          Packet: 'some',
          Price: 500,
          Date: '25/2/2022',
          PaymentType: 'Paypal',
          PaypalNumber: '128526'
        }
      ],
    }
  },
  computed: {
    ...mapGetters(['StateUser'])
  },
  methods: {
    stripedRow(i){
      if (i < 4){
        return i === 1;
      }else {
        return (i - 2) % 3 === 0;
      }
    }
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}

.table_head_border {
  border-bottom: 1px solid #EEA2AD;
}

.font_medium {
  font-weight: normal !important;
}

.striped_table_row {
  background-color: #F1F1E6 !important;
}

.all_counter {
  height: 36px !important;
}

.table_row {
  border-bottom: 1px solid #FFD7EC;
}
</style>
