<template>
  <div class="tw-my-32">
    <div class="tw-flex tw-text-5xl sm:tw-ml-[100px] tw-ml-[20px] tw-mb-12">
      <span class="text_dark_blue ">Paket<span class="text_dark_pink tw-ml-3">{{ $t('list') }}</span></span>
    </div>

    <div class="tw-flex tw-flex-col tw-space-y-6 md:tw-space-y-0 md:space-x-8 xl:tw-space-x-16 md:tw-flex-row md:tw-px-20 tw-px-10 md:tw-px-16 xl:tw-px-60 tw-justify-between">
      <!-- Col 1 -->
      <div class="box_shadow text_dark_blue tw-text-center tw-p-6 md:tw-p-12" v-for="(packet , i) in packets" :key="i">

        <img class="tw-mx-auto" src="~assets/rectangle1395.png">

        <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl">{{packet.Title}}</div>
        <div class="text_dark_pink tw-text-sm md:tw-text-3xl">{{ packet.Price }} $</div>
        <div class="tw-text-sm md:tw-text-lg">Duration: {{ packet.Duration }} month</div>
        <div class="tw-text-sm md:tw-text-lg">Per Month Payment: {{ parseInt(packet.Price /packet.Duration ) }} $</div>
        <button class="tw-flex tw-items-center tw-mx-auto tw-py-3 tw-px-2 md:tw-px-9 md:text_md tw-text-xs tw-mt-4 bg__dark_pink tw-text-white tw-justify-center " @click="buy(packet)">
          <span>Buy Now</span>
        </button>
      </div>



    </div>

    <q-dialog
      v-model="show" id="dialog_container"
    >
      <div class="tw-flex tw-flex-col tw-space-y-4 tw-justify-center tw-items-center text_dark_blue tw-py-4 tw-bg-white tw-px-8 tw-text-xl tw-font-bold">
        Buy Packet
        <div class="bg__dark_blue tw-mt-2 tw-text-white tw-px-16 tw-text-center tw-py-4 tw-space-y-2 tw-font-medium" v-if="typeof selectedPacket !== 'undefined'">
          <div>{{selectedPacket.Title}}</div>
          <div>{{selectedPacket.Price}}$</div>
          <div class="tw-flex tw-text-sm tw-justify-between tw-space-x-10 ">
            <div>Duration: <span class="tw-font-bold">{{selectedPacket.Duration}} month</span></div>
            <div>Per Month Payment: <span class="tw-font-bold">{{ parseInt(selectedPacket.Price / selectedPacket.Duration ) }}$</span></div>
          </div>
        </div>
        <div class="tw-mr-auto tw-flex tw-justify-between tw-space-x-2 tw-mr-0 tw-w-full">
          <div :id="'paypal' + selectedPacket.ID">
            <!--          <span class="tw-font-medium tw-text-base ">Checkout by:</span>-->
            <!--          <img src="~assets/paypal.png" class="tw-cursor-pointer" @click="sendBuy('2')">-->
          </div>
          <div class="tw-mt-auto">
            <label class="tw-cursor-pointer bg__dark_pink tw-text-white tw-pt-[0.6rem] tw-pb-[0.4rem] tw-px-2 tw-text-base tw-font-medium" @click="sendBuy('1')">Gutsheine</label>
            <input class="tw-border tw-border-red-700 tw-h-10 tw-w-[150px]" v-model="code">
          </div>
        </div>

      </div>
    </q-dialog>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "paketList",
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
  computed: {
    ...mapGetters(['StateUser'])
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
                    message: 'please login first',
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
  methods: {
    loadData () {
      let _this = this
      // get list
      this.$api.post('packet/search.php', {
        Title: '',
        OrderBy: 'id',
        OrderDir: 'asc',
        Page: '1',
        RowsPerPage: '3'
      }).then((res) => {
        this.packets = res.data.Data
      }).catch(function (error) {
        _this.$helper.logError(error)
        _this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: 'Error loading list',
          position: 'bottom-right'
        })
      })
    },
    sendBuy(buyMethod){
      if (this.StateUser === null || this.StateUser === undefined){
        this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: 'please login first',
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
            message: 'please insert your Gutschein Code first',
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
            message: 'purchase was made successfully',
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
          message: 'please login first',
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
      localStorage.setItem('selectedPacket' , JSON.stringify(this.selectedPacket))
    },
    clearInterval(id){
      clearInterval(id);
    }
  },
  mounted() {
    this.loadData();

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

</style>
