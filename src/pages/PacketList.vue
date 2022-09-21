<template>
  <belt />
  <div class="tw-flex tw-flex-col tw-px-6 tw-items-center">
    <div class="tw-flex tw-flex-col-reverse tw-py-10 tw-justify-start md:tw-flex-row tw-items-center
      md:tw-justify-between box_shadow tw-max-w-[480px] md:tw-w-full md:tw-h-[360px] tw-my-12 md:tw-max-w-[1200px]" v-for="(packet , i) in packets" :key="i">
      <div class="tw-text-center tw-space-y-4 md:tw-text-left text_dark_blue tw-pl-[8%]">
        <div class="tw-text-4xl">{{ packet.Title }}</div>
        <div class="tw-text-2xl text_dark_pink">{{ packet.Price }} $</div>
        <div class="tw-text-base tw-px-16 md:tw-pr-[17%] md:tw-px-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis odio pretium feugiat adipiscing imperdiet ipsum urna.</div>
        <div class="tw-mt-[2%]">
          <span class="tw-mr-12">{{ $t('packet.Duration') }}: <span class="tw-font-bold">{{ packet.Duration }} {{ $t('packet.Month') }}</span ></span >
          <span>{{$t('packet.PaymentPerMonth')}}: <span class="tw-font-bold">{{ parseInt(packet.Price / packet.Duration ) }} $</span ></span>
        </div>
        <button class="flex items-center tw-mx-auto md:tw-mx-0 tw-py-2 tw-px-9 text_md bg__dark_pink tw-text-white justify-center " @click="buy(packet)">
          <span>{{ $t('packet.BuyNow') }}</span>
        </button>
      </div>
      <div class="md:tw-w-1/2">
        <img class="tw-px-4 tw-mx-auto md:tw-px-0" src="~assets/packetList.png">
      </div>

    </div>
  </div>
  <q-dialog
    v-model="show"
  >
    <div class="tw-flex tw-flex-col tw-space-y-4 tw-justify-center tw-items-center text_dark_blue tw-py-4 tw-bg-white tw-px-8 tw-text-xl tw-font-bold">
      {{ $t('packet.BuyPacket') }}
      <div class="bg__dark_blue tw-mt-2 tw-text-white tw-px-16 tw-text-center tw-py-4 tw-space-y-2 tw-font-medium" v-if="typeof selectedPacket !== 'undefined'">
        <div>{{selectedPacket.Title}}</div>
        <div>{{selectedPacket.Price}}$</div>
        <div class="tw-flex tw-text-sm tw-justify-between tw-space-x-10 ">
          <div>{{ $t('packet.Duration') }}: <span class="tw-font-bold">{{selectedPacket.Duration}} {{ $t('packet.Month') }}</span></div>
            <div>{{ $t('packet.PaymentPerMonth') }}: <span class="tw-font-bold">{{ parseInt(selectedPacket.Price / selectedPacket.Duration ) }}$</span></div>
        </div>
      </div>
      <div class="tw-mr-auto tw-flex tw-justify-between tw-space-x-2 tw-mr-0 tw-w-full">
        <div class="" :id="'paypal' + selectedPacket.ID">
<!--          <span class="tw-font-medium tw-text-base ">Checkout by:</span>-->
<!--          <img src="~assets/paypal.png" class="tw-cursor-pointer" @click="sendBuy('2')">-->
        </div>
        <div class="tw-mt-auto">
          <label class="tw-cursor-pointer bg__dark_pink tw-text-white tw-pt-[0.6rem] tw-pb-[0.4rem] tw-px-2 tw-text-base tw-font-medium" @click="sendBuy('1')">{{ $t('gutschein.Gutscheine') }}</label>
          <input class="tw-border tw-border-red-700 tw-h-10 tw-w-[150px]" v-model="code">
        </div>
      </div>

    </div>
  </q-dialog>
  <footer-page />
</template>

<script>
import belt from "components/belt";
import footerPage from "components/footerPage";
import {mapGetters} from "vuex";

export default {
  name: "PacketList",
  components: {belt , footerPage},
  data() {
    return {
      packets: [],
      show: false,
      code: '',
      selectedPacket: {
        Price: 0,
        Title: '',
        Duration: 0,
      },
      paypalLoaded: false,
    }
  },
  watch: {
    show() {
      this.paypalLoaded = false;
      var intervalId = setInterval(() => {
        let id = this.selectedPacket.ID;
        const elementExists = !!document.getElementById('paypal' + id)
        if (elementExists && !this.paypalLoaded){
          this.paypalLoaded = true;
          window.vue = this;
          var FUNDING_SOURCES = [
            paypal.FUNDING.PAYPAL,
          ]
          FUNDING_SOURCES.forEach(function (fundingSource) {

            var button = paypal.Buttons({
              style: {
                layout: 'vertical',
                color: 'silver',
                shape: 'rect',
                label: 'paypal'
              },
              fundingSource: fundingSource,
              createOrder(data, actions) {
                if (window.vue.StateUser === null || window.vue.StateUser === undefined) {
                  window.vue.$q.notify({
                    type: 'negative',
                    timeout: 3000,
                    message: this.$t('loginError'),
                    position: 'bottom-right'
                  });

                  return false;
                }
                let packet = JSON.parse(localStorage.getItem('selectedPacket'));
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: packet.Price
                    },
                    title: {
                      value: packet.Title
                    }
                  }],
                });
              },
              // Finalize the transaction
              onApprove(data, actions) {
                return actions.order.capture().then(details => {
                  window.vue.code = data.orderID
                  window.vue.sendBuy('2')
                });
              },
            })
            if (button.isEligible()) {
              button.render('#paypal' + window.vue.selectedPacket.ID)
            }
          })
        }

        clearInterval(intervalId)
      } , 1000)

    }
  },
  computed: {
    ...mapGetters(['StateUser'])
  },
  methods: {
    loadData(){
      let _this = this
      // get list
      this.$api.post('packet/search.php', {
        Title: '',
        OrderBy: 'id',
        OrderDir: 'asc',
        Page: '1',
        RowsPerPage: '10'
      }).then((res) => {
        this.packets = res.data.Data
      }).catch(function (error) {
        _this.$helper.logError(error)
        _this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: this.$t('loadListFailed'),
          position: 'bottom-right'
        })
      })
    },
    sendBuy(buyMethod){
      if (this.StateUser === null){
        this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: this.$t('loginError'),
          position: 'bottom-right'
        });

        return false;
      }
      let data = {
        UserID: this.StateUser.ID,
        PacketID: this.selectedPacket.ID,
        BuyMethod: buyMethod,
        GutscheinCode: this.code
      };

      if (buyMethod === '1'){
        data.GutscheinCode = this.code;

        if (this.code === ''){
          this.$q.notify({
            type: 'negative',
            timeout: 3000,
            message: this.$t('gutscheinCodeError'),
            position: 'bottom-right'
          });

          return false;
        }
      }


      this.$api.post('userpacket/create.php' , data)
        .then((res) => {
          this.$q.notify({
            type: 'positive',
            timeout: 3000,
            message: this.$t('successBuy'),
            position: 'bottom-right'
          });
          this.show = false;
        })
        .catch((err) => {
          this.$q.notify({
            type: 'negative',
            timeout: 3000,
            message: err.response.data.ErrorMsg,
            position: 'bottom-right'
          });
          this.show = false;
        })
      this.code = '';

    },
    buy(packet){
      if (this.StateUser === null || this.StateUser === undefined){
        this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: this.$t('loginError'),
          position: 'bottom-right'
        });

        return false;
      }
      this.selectedPacket.Price = packet.Price;
      this.selectedPacket.Duration = packet.Duration;
      this.selectedPacket.Title = packet.Title;
      this.selectedPacket.ID = packet.ID;
      this.code = '';
      this.show = true;
      this.paypalLoaded = false;
      localStorage.setItem('selectedPacket' , JSON.stringify(this.selectedPacket))
    },
    clearInterval(id){
      clearInterval(id);
    }
  },
  mounted() {
    this.loadData();
  },
  created() {
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}

input {
  color: #EEA2AD !important;
}

.paypal-button-number-1 {
  display: none !important;
}

.paypal-button-number-2 {
  display: none !important;
}
</style>
