<template>
  <div class="tw-flex tw-w-full tw-h-2">
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
  </div>
  <div class="tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-space-x-10 md:tw-justify-between tw-p-6 lg:tw-px-40 tw-mt-24">

    <div class="box_shadow md:tw-w-[60%] md:tw-h-[280px] md:tw-flex-row tw-flex tw-flex-col-reverse tw-justify-center tw-items-center md:tw-items-start md:tw-justify-between">
      <div class="text_dark_pink md:tw-max-w-[60%] md:tw-space-y-10 tw-p-2 tw-flex tw-flex-col tw-justify-between tw-text-center md:tw-text-left tw-py-4">
        <div class="tw-text-sm xxs:tw-text-lg sm:tw-text-2xl">Your Balance: {{parseInt(info.SumCashbacks) - parseInt(info.SumBuy)}} $</div>
        <div class="tw-text-base xxs:tw-text-xl sm:tw-text-3xl text_dark_blue">Cashbacks: {{ info.SumCashbacks }} $</div>
        <div class="tw-text-base xxs:tw-text-xl sm:tw-text-3xl text_dark_pink xl:tw-flex "  ><div>Used: {{ info.SumBuys }} $</div></div>
      </div>
      <div style="position: absolute">

      </div>
      <div class="tw-relative">
        <img src="~assets/circle-full.png">
        <div class="balance__value_2 text_dark_blue">{{parseInt(info.SumCashbacks) - parseInt(info.SumBuy)}} $</div>
      </div>

    </div>
    <div class="box_shadow tw-flex tw-mb-16 md:tw-mb-0 tw-flex-col tw-space-y-5 tw-justify-center tw-items-center text_dark_blue md:tw-w-[350px]">
      <img src="~assets/user-avatar.png" class="tw-mt-[-80px]">
      <div class="text_dark_pink xs:tw-text-2xl">{{StateUser.Username}}</div>
      <div class="md:tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-2 xs:tw-px-6">
        <div>Orders</div>
        <div>Active Packets</div>
        <div>All Packets</div>
      </div>
      <div class="xs:tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-2 xs:tw-px-6 tw-font-bold">
        <div class="tw-pl-6">{{ info.NumBuys }}</div>
        <div>{{ info.NumActivePackets }}</div>
        <div class="tw-pr-6">{{ info.NumPackets }}</div>
      </div>
      <div class="tw-pb-2 tw-px-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
    </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16">
    <div class=" tw-flex tw-flex-col text_dark_blue ">
      <q-table
        class="mobile__data q-mx-lg"
        title="Packets Buying History"
        :rows="packetsHistory"
        :columns="packetColumns"
        row-key="ID"
        color="red"
        title-class="title-class"
        :pagination="packetPagination"
        @update:pagination="newPagination('packets' , $event)"
        :rows-per-page-options="perPageOptions"
      >
        <template v-slot:top-right @click="getAllPaginate(packetsHistory.length , 'packet')">
          <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(packetsHistory.length , 'packet')">
            All Records: {{packetsHistory.length}}
          </div>
        </template>
        <template v-slot:header>

        </template>
        <template v-slot:body="props">

          <div class="my-card text-white ">
            <q-card-section :class="['border__bottom__head' , stripedRow(props.rowIndex) ? 'striped_table_row' : '']" >
              <q-card-section class="">
                <p class="title-class ">Packet {{props.row.PacketName}}</p>
              </q-card-section>
              <q-card-section >
                <span class="mobile__data__row">Packet Name: {{props.row.PacketName}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Start Date: {{props.row.StartDate}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Price: {{props.row.PacketPrice}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Buy Method: {{props.row.BuyMethod === 1 ? 'Gutsheine' : 'Paypal'}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Buy Date: {{props.row.BuyDate}}</span>
              </q-card-section>
            </q-card-section>
          </div>
          <!--          <q-tr :props="props">-->
          <!--            <q-td key="PacketName" :props="props">{{ props.row.PacketName }}</q-td>-->
          <!--            <q-td key="StartDate" :props="props">{{ props.row.StartDate }}</q-td>-->
          <!--            <q-td key="Price" :props="props">{{ props.row.Price }}</q-td>-->
          <!--            <q-td key="BuyMethod" :props="props">{{ props.row.BuyMethod === 1 ? 'Gutsheine' : 'Paypal' }}</q-td>-->
          <!--            <q-td key="BuyDate" :props="props">{{ props.row.BuyDate }}</q-td>-->
          <!--          </q-tr>-->
        </template>
      </q-table>

      <q-table
        class="desktop__data"
        title="Packets Buying History"
        :rows="packetsHistory"
        :columns="packetColumns"
        row-key="ID"
        color="red"
        title-class="title-class"
        :pagination="packetPagination"
        @update:pagination="newPagination('packets' , $event)"
        :rows-per-page-options="perPageOptions"
      >
        <template v-slot:top-right @click="getAllPaginate(packetsHistory.length , 'packet')">
          <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(packetsHistory.length , 'packet')">
            All Records: {{packetsHistory.length}}
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="PacketName" :props="props">{{ props.row.PacketName }}</q-td>
            <q-td key="StartDate" :props="props">{{ props.row.StartDate }}</q-td>
            <q-td key="Price" :props="props">{{ props.row.PacketPrice }}</q-td>
            <q-td key="BuyMethod" :props="props">{{ props.row.BuyMethod === 1 ? 'Gutsheine' : 'Paypal' }}</q-td>
            <q-td key="BuyDate" :props="props">{{ props.row.BuyDate }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 tw-mt-8">
    <div class=" tw-flex tw-flex-col text_dark_blue ">
      <q-table
        class="mobile__data q-mx-lg"
        title="Order Buying History"
        :rows="buyHistory"
        :columns="orderColumns"
        row-key="ID"
        color="red"
        title-class="title-class"
        :pagination="orderPagination"
        @update:pagination="newPagination('orders' , $event)"
        :rows-per-page-options="perPageOptions"
      >
        <template v-slot:top-right @click="getAllPaginate(buyHistory.length , 'order')">
          <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(buyHistory.length , 'order')">
            All Records: {{buyHistory.length}}
          </div>
        </template>
        <template v-slot:header>

        </template>
        <template v-slot:body="props">

          <div class="my-card text-white ">
            <q-card-section :class="['border__bottom__head' , stripedRow(props.rowIndex) ? 'striped_table_row' : '']" >
              <q-card-section class="">
                <p class="title-class ">{{props.row.StoreName}}</p>
              </q-card-section>
              <q-card-section >
                <span class="mobile__data__row">Store: {{props.row.StoreName}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Requested Price: {{props.row.RequestedPrice}} $</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Final Price: {{props.row.FinalPrice }} $</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Status: {{displayStatus(props.row.Status)}} </span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">Date: {{props.row.StartDate}}</span>
              </q-card-section>
            </q-card-section>
          </div>
        </template>
      </q-table>
      <q-table
        class="desktop__data"
        title="Order Buying History"
        :rows="buyHistory"
        :columns="orderColumns"
        row-key="ID"
        color="red"
        title-class="title-class"
        :pagination="orderPagination"
        @update:pagination="newPagination('orders' , $event)"
        :rows-per-page-options="perPageOptions"
      >
        <template v-slot:top-right>
          <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore  @click="getAllPaginate(buyHistory.length , 'order')">
            All Records: {{buyHistory.length}}
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="StoreName" :props="props">{{ props.row.StoreName }}</q-td>
            <q-td key="RequestedPrice" :props="props">{{ props.row.RequestedPrice }} $</q-td>
            <q-td key="FinalPrice" :props="props">{{ props.row.FinalPrice }} $</q-td>
            <q-td key="Status" :props="props">{{ displayStatus(props.row.Status) }}</q-td>
            <q-td key="StartDate" :props="props">{{ props.row.StartDate }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16 tw-mb-[15%]">
    <div class=" tw-py-6">
      <div class=" tw-flex tw-flex-col text_dark_blue ">
        <q-table
          class="mobile__data q-mx-lg"
          title="Cash backs History"
          :rows="cashBacks"
          :columns="cashBackColumns"
          row-key="ID"
          color="red"
          title-class="title-class"
          :pagination="cashBackPagination"
          @update:pagination="newPagination('cashBacks' , $event)"
          :rows-per-page-options="perPageOptions"
        >
          <template v-slot:top-right @click="getAllPaginate(cashBacks.length , 'cashBack')">
            <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(cashBacks.length , 'cashBack')">
              All Records: {{cashBacks.length}}
            </div>
          </template>
          <template v-slot:header>

          </template>
          <template v-slot:body="props">

            <div class="my-card text-white ">
              <q-card-section :class="['border__bottom__head' , stripedRow(props.rowIndex) ? 'striped_table_row' : '']" >
                <q-card-section class="">
                  <p class="title-class ">Packet {{props.row.PacketName}}</p>
                </q-card-section>
                <q-card-section >
                  <span class="mobile__data__row">Packet Name: {{props.row.PacketName}}</span>
                </q-card-section>
                <q-card-section >
                  <span class="mobile__data__row">Packet Cashback: {{props.row.PacketCashback}}</span>
                </q-card-section>
                <q-card-section>
                  <span class="mobile__data__row">Payback Date: {{props.row.PaybackDate}}</span>
                </q-card-section>
              </q-card-section>
            </div>
          </template>
        </q-table>
        <q-table
          class="desktop__data"
          title="Cash backs History"
          :rows="cashBacks"
          :columns="cashBackColumns"
          row-key="ID"
          color="red"
          title-class="title-class"
          table-header-class="table-header"
          :pagination="cashBackPagination"
          @update:pagination="newPagination('cashBacks' , $event)"
          :rows-per-page-options="perPageOptions"
        >
          <template v-slot:top-right>
            <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(cashBacks.length , 'cashBacks')">
              All Records: {{cashBacks.length}}
            </div>
          </template>
        </q-table>
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
      packetColumns: [
        { name: 'PacketName', align: 'center', label: 'Packet', field: 'PacketName', sortable: true },
        { name: 'StartDate', align: 'center', label: 'Start Date', field: 'StartDate', sortable: true },
        { name: 'Price', align: 'center', label: 'Price', field: 'PacketPrice', sortable: true },
        { name: 'BuyMethod', align: 'center', label: 'Buy Method', field: 'BuyMethod' , sortable: true },
        { name: 'BuyDate', align: 'center', label: 'Buy Date', field: 'BuyDate', sortable: true },
      ],
      orderColumns: [
        { name: 'StoreName', align: 'center', label: 'Store', field: 'StoreName', sortable: true },
        { name: 'RequestedPrice', align: 'center', label: 'Requested Price', field: 'RequestedPrice', sortable: true },
        { name: 'FinalPrice', align: 'center', label: 'Final Price', field: 'FinalPrice', sortable: true },
        { name: 'Status', align: 'center', label: 'Status', field: 'Status', sortable: true },
        { name: 'StartDate', align: 'center', label: 'Date', field: 'StartDate', sortable: true },
      ],
      cashBackColumns: [
        { name: 'PacketName', align: 'center', label: 'Packet Name', field: 'PacketName', sortable: true },
        { name: 'PacketCashback', align: 'center', label: 'Packet Cashback', field: 'PacketCashback', sortable: true },
        { name: 'PaybackDate', align: 'center', label: 'Payback Date', field: 'PaybackDate', sortable: true },
      ],
      info: {},
      stripedIndex: 2,
      selectedPerPage: 5,
      perPageOptions: [
        5 , 10 , 20, 50, 100
      ],
      buyHistory: [],
      cashBacks: [],
      packetsHistory: [],
      packetPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
      },
      orderPagination: {rowsPerPage:10},
      cashBackPagination: {rowsPerPage:10},
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
    },
    newPagination(table , newPagination){
      switch (table){
        case 'packets':
          this.packetPagination = newPagination;
          break;
        case 'orders':
          this.orderPagination = newPagination;
          break;
        case 'cashBacks':
          this.cashBackPagination = newPagination;
          break;
      }
    },
    userInfo(){
      this.$api.post('user/info.php' , )
        .then((res) => {
          this.info = res.data
        })
        .catch((err) => {

        })
    },
    getUserPackets(){
      this.$api.post('userpacket/search.php', {
        Title: this.filter,
        OrderBy: 'id',
        OrderDir: 'desc',
      })
        .then((res) => {
          this.packetsHistory = res.data.Data
        })
    },
    getUserBuys(){
      this.$api.post('buy/search.php', {
        Title: this.filter,
        OrderBy: 'id',
        OrderDir: 'desc' ,
      })
        .then((res) => {
          this.buyHistory = res.data.Data
        })
    },
    getCashBacks(){
      this.$api.post('cashback/search.php', {
        Title: this.filter,
        OrderBy: 'id',
        OrderDir: 'desc' ,
      })
        .then((res) => {
          this.cashBacks = res.data.Data;
        })
    },
    getAllPaginate(count , type){
      switch (type){
        case 'order':
          this.orderPagination.rowsPerPage = 0;
          break;
        case 'packet':
          this.packetPagination.rowsPerPage = 0;
          break;
        case 'cashBack':
          this.cashBackPagination.rowsPerPage = 0;
          break;
      }
    },
    displayStatus (status) {
      if (!status) {
        return 'X'
      }
      if (status === '1')
        return 'Reserved'
      if (status === '2')
        return 'Committed'
      if (status === '3')
        return 'Canceled'
      return status
    }
  },
  mounted() {
    this.getUserPackets();
    this.getUserBuys();
    this.getCashBacks();
    this.userInfo();
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}

.mobile__data__row {
  color: #1D607F;
  font-size: 1.25rem;
  line-height: 1.75rem;
}



.border__bottom__head {
  border-bottom: 1px solid #EEA2AD !important;
}

.border__bottom__body {
  border-bottom: 1px solid #FFD7EC !important;
}
.balance__value {
  position: relative;
  left: 30%;
  /* bring your own prefixes */
  /*transform: translate(-50%, -50%);*/
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
.balance__value_2
{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
@media screen and (min-width: 1900px) {
  .balance__value{
    left: 16%;
  }
}

@media screen and (max-width: 1300px){
  .balance__value{
    left: 56%;
  }
}

@media screen and (min-width: 1200px){
  .balance__value{
    left: 40%;
  }
}

@media screen and (min-width: 900px){
  .balance__value{
    left: 41%;
  }
}

@media screen and (min-width: 800px){
  .balance__value{
    left: 50%;
  }
}

@media screen and (max-width: 800px){
  .balance__value{
    left: 43%;
  }
}

@media screen and (max-width: 768px) {
  .mobile__data{
    display: block;
  }

  .desktop__data{
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .mobile__data{
    display: none;
  }

  .desktop__data{
    display: block;
  }
}

</style>
