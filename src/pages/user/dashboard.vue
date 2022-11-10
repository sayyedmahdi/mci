<template>
  <div class="tw-flex tw-w-full tw-h-2">
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
  </div>
  <div class="tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-space-x-10 md:tw-justify-between tw-p-6 lg:tw-px-40  tw-mt-24">
    <div class="box_shadow md:tw-w-[60%] md:tw-h-[280px] md:tw-flex-row tw-flex tw-flex-col-reverse tw-justify-center tw-items-center md:tw-items-start md:tw-justify-between">
      <div class="text_dark_pink tw-w-full md:tw-space-y-6 tw-p-2 tw-flex tw-flex-col tw-justify-between tw-text-center md:tw-text-left tw-py-4">
        <div class="tw-text-sm xxs:tw-text-lg sm:tw-text-2xl">{{ $t('userDashboard.Balance') }}</div>
        <div class="tw-text-base xxs:tw-text-md sm:tw-text-xl text_dark_blue">{{ $t('userDashboard.AvailablePurchasing') }}</div>
        <div class="tw-mx-auto bg__dark_pink tw-flex tw-justify-center tw-items-center tw-px-8 tw-text-white tw-text-lg md:tw-text-2xl tw-h-[70px]">{{ parseInt(info.SumCashbacks) - parseInt(info.SumBuy) }} $</div>
        <div class="tw-text-base xxs:tw-text-md sm:tw-text-xl text_dark_blue xl:tw-flex "  ><div>{{ $t('userDashboard.ToalCashbacks') }}: {{ info.SumCashbacks }} $</div></div>
      </div>
    </div>
    <div class="box_shadow tw-flex tw-mb-16 md:tw-mb-0 tw-flex-col tw-space-y-5 tw-justify-center tw-items-center text_dark_blue md:tw-w-[350px]">
      <img src="~assets/user-avatar.png" class="tw-mt-[-80px]">
      <div class="text_dark_pink xs:tw-text-2xl">{{StateUser.Username}}</div>
      <div class="md:tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-2 xs:tw-px-6">
        <div>{{ $t('userDashboard.Orders') }}</div>
        <div>{{$t('userDashboard.ActivePackets')}}</div>
        <div>{{ $t('userDashboard.AllPackets') }}</div>
      </div>
      <div class="xs:tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-2 xs:tw-px-6 tw-font-bold">
        <div class="tw-pl-6">{{ info.NumBuys }}</div>
        <div>{{ info.NumActivePackets }}</div>
        <div class="tw-pr-6">{{ info.NumPackets }}</div>
      </div>
      <div class="tw-pb-2 tw-px-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
    </div>
  </div>
  <div class="q-pa-md tw-hidden md:tw-block tw-text-right box_shadow lg:tw-mx-40 md:tw-mx-10" v-if="packets.length > 1 && !showAllPackets">
    <div class="text_dark_pink tw-text-lg md:tw-text-2xl tw-text-left">{{ $t('userDashboard.YourPacket') }}</div>

    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      class=""
    >
      <q-carousel-slide :name="i"  class="column no-wrap " v-for="(packet , i) in packets" :key="`asasas` + i">
        <div :class="['row', 'fit', packet.length >= 3 ? 'justify-between' : packet.length === 2 ? 'justify-evenly' : 'justify-center', 'items-center', 'q-gutter-xs', 'q-col-gutter', 'no-wrap' ]">
          <div class=" text_dark_blue tw-text-center tw-p-6 packet-box" v-for="(p , j) in packet" :key="j">
            <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl tw-mb-1">{{p.PacketName}}</div>
            <div class="tw-text-sm text_dark_pink md:tw-text-lg">{{$t('packet.Duration')}}: {{ p.PacketDuration }} {{ $t('packet.Month') }}</div>
            <div class="tw-text-sm text_dark_pink ">{{$t('userpacket.StartDate')}}: {{ p.StartDate }}  </div>
            <div class="tw-relative " @mouseover="showCashbacks[j] = false" @mouseleave="showCashbacks[j] = true">
              <img src="~assets/circle-full.png" class=" fix__circle2">
              <div class="balance__value_2 text_dark_blue tw-flex-col" v-if="showCashbacks[j]" ><p :class="[getColor(p)]">{{(p.PacketCashback) * (p.PacketDuration)  }} $ </p><p>von insg. </p>{{(p.Cashbacks.length) * (p.PacketCashback)}} $</div>
              <div class="balance__value_2 text_dark_pink " v-if="!showCashbacks[j]" >
                {{ $t('userDashboard.YourPacket') }} <br/>
                {{(p.PacketCashback) * (p.PacketDuration)}} $ <br/>
                Exp: {{packetExp(p)}}
              </div>
            </div>
          </div>

        </div>
      </q-carousel-slide>

    </q-carousel>
    <q-btn @click="showAllPackets = !showAllPackets" class="tw-mr-[8%]">{{$t('userDashboard.SeeAllPackets')}}</q-btn>
  </div>
  <div v-if="showAllPackets && packets.length > 1" class="tw-text-center md:tw-text-right q-pa-md">
    <div class="tw-flex tw-flex-wrap tw-px-10 tw-gap-4  tw-hidden md:tw-flex">
      <div class="box_shadow text_dark_blue tw-text-center tw-p-6 md:tw-p-12 tw-basis-[31%]" v-for="(packet , i) in packetsHistory" :key="i">
        <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl tw-mb-1">{{packet.PacketName}}</div>
        <div class="tw-text-sm md:tw-text-lg">{{$t('packet.Duration')}}: {{ packet.PacketDuration }} {{ $t('packet.Month') }}</div>
        <div class="tw-text-sm ">{{$t('userpacket.StartDate')}}: {{ packet.StartDate }}  </div>
        <div class="tw-relative " @mouseover="showCashbacks[i] = false" @mouseleave="showCashbacks[i] = true">
          <img src="~assets/circle-full.png" class="fix__circle2">
          <div class="balance__value_2 text_dark_blue tw-flex-col" v-if="showCashbacks[i]" ><p :class="[getColor(packet)]">{{(packet.PacketCashback) * (packet.PacketDuration)  }} $ </p><p>von insg. </p>{{(packet.Cashbacks.length) * (packet.PacketCashback)}} $</div>
          <div class="balance__value_2 text_dark_pink " v-if="!showCashbacks[i]" >
            {{ $t('userDashboard.YourPacket') }} <br/>
            {{(packet.PacketCashback) * (packet.PacketDuration)}} $ <br/>
            Exp: {{packetExp(packet)}}
          </div>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-px-10 tw-gap-4 tw-text-right  md:tw-hidden">
      <div class="box_shadow text_dark_blue tw-text-center tw-p-6 md:tw-p-12" v-for="(packet , i) in packetsHistory" :key="i">
        <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl tw-mb-1">{{packet.PacketName}}</div>
        <div class="tw-text-sm md:tw-text-lg">{{$t('packet.Duration')}}: {{ packet.PacketDuration }} {{ $t('packet.Month') }}</div>
        <div class="tw-text-sm ">{{$t('userpacket.StartDate')}}: {{ packet.StartDate }}  </div>
        <div class="tw-relative " @mouseover="showCashbacks[i] = false" @mouseleave="showCashbacks[i] = true">
          <img src="~assets/circle-full.png" class="fix__circle3">
          <div class="balance__value_2 text_dark_blue tw-flex-col" v-if="showCashbacks[i]" ><p :class="[getColor(packet)]">{{(packet.PacketCashback) * (packet.PacketDuration)  }} $ </p><p>von insg. </p>{{(packet.Cashbacks.length) * (packet.PacketCashback)}} $</div>
          <div class="balance__value_2 text_dark_pink " v-if="!showCashbacks[i]" >
            {{ $t('userDashboard.YourPacket') }} <br/>
            {{(packet.PacketCashback) * (packet.PacketDuration)}} $ <br/>
            Exp: {{packetExp(packet)}}
          </div>
        </div>
      </div>
    </div>
    <q-btn @click="showAllPackets = !showAllPackets" class="md:tw-mr-[8%] tw-mt-4 md:tw-mt-0">{{$t('userDashboard.SeeSliderPackets')}}</q-btn>
  </div>
  <div v-else-if="packets.length === 1" class="q-pa-md tw-hidden md:tw-block ">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      class=""
    >
      <q-carousel-slide :name="1"  class="column no-wrap" v-for="(packet , i) in packets" :key="`asasas` + i">
        <div :class="['row', 'fit', packet.length >= 3 ? 'justify-between' : packet.length === 2 ? 'justify-evenly' : 'justify-center', 'items-center', 'q-gutter-xs', 'q-col-gutter', 'no-wrap']">
          <div class="box_shadow text_dark_blue tw-text-center tw-p-6 " v-for="(p , j) in packet" :key="j">
            <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl tw-mb-1">{{p.PacketName}}</div>
            <div class="tw-text-sm md:tw-text-lg">{{$t('packet.Duration')}}: {{ p.PacketDuration }} {{ $t('packet.Month') }}</div>
            <div class="tw-text-sm ">{{$t('userpacket.StartDate')}}: {{ p.StartDate }}  </div>
            <div class="tw-relative " @mouseover="showCashbacks[j] = false" @mouseleave="showCashbacks[j] = true">
              <img src="~assets/circle-full.png" class="fix__circle2">
              <div class="balance__value_2 text_dark_blue tw-flex-col" v-if="showCashbacks[j]" ><p :class="[getColor(p)]">{{(p.PacketCashback) * (p.PacketDuration)  }} $ </p><p>von insg. </p>{{(p.Cashbacks.length) * (p.PacketCashback)}} $</div>
              <div class="balance__value_2 text_dark_pink " v-if="!showCashbacks[j]" >
                {{ $t('userDashboard.YourPacket') }} <br/>
                {{(p.PacketCashback) * (p.PacketDuration)}} $ <br/>
                Exp: {{packetExp(p)}}
              </div>
            </div>
          </div>

        </div>
      </q-carousel-slide>

    </q-carousel>
  </div>
  <div class="q-pa-md  md:tw-hidden tw-text-center" v-if="!showAllPackets">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      class=""
    >
      <q-carousel-slide :name="i" class="column no-wrap" v-for="(packet , i) in packetsHistory" :key="i">
        <div :class="['row', 'fit', 'justify-center', 'items-center', 'q-gutter-xs', 'q-col-gutter', 'no-wrap']">
          <div class="box_shadow text_dark_blue tw-text-center tw-p-6 " >

            <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl tw-mb-1">{{packet.PacketName}}</div>
            <div class="tw-text-sm md:tw-text-lg">{{$t('packet.Duration')}}: {{ packet.PacketDuration }} {{ $t('packet.Month') }}</div>
            <div class="tw-text-sm ">{{$t('userpacket.StartDate')}}: {{ packet.StartDate }}  </div>
            <div class="tw-relative " @mouseover="showCashbacks[i] = false" @mouseleave="showCashbacks[i] = true">
              <img src="~assets/circle-full.png" class="fix__circle2">
              <div class="balance__value_2 text_dark_blue tw-flex-col" v-if="showCashbacks[i]" ><p :class="[getColor(packet)]">{{(packet.PacketCashback) * (packet.PacketDuration)  }} $ </p><p>von insg. </p>{{(packet.Cashbacks.length) * (packet.PacketCashback)}} $</div>
              <div class="balance__value_2 text_dark_pink " v-if="!showCashbacks[i]" >
                {{ $t('userDashboard.YourPacket') }} <br/>
                {{(packet.PacketCashback) * (packet.PacketDuration)}} $ <br/>
                Exp: {{packetExp(packet)}}
              </div>
            </div>
          </div>

        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-btn @click="showAllPackets = !showAllPackets" >{{$t('userDashboard.SeeAllPackets')}}</q-btn>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 tw-mt-8 lg:tw-mt-16">
    <div class=" tw-flex tw-flex-col text_dark_blue ">
      <q-table
        class="mobile__data q-mx-lg"
        :title="$t('userDashboard.packetHistory')"
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
            {{ $t('allRecords') }}: {{packetsHistory.length}}
          </div>
        </template>
        <template v-slot:header>

        </template>
        <template v-slot:body="props">

          <div class="my-card text-white ">
            <q-card-section :class="['border__bottom__head' , stripedRow(props.rowIndex) ? 'striped_table_row' : '']" >
              <q-card-section class="">
                <p class="title-class ">{{ $t('packet.Packet') }} {{props.row.PacketName}}</p>
              </q-card-section>
              <q-card-section >
                <span class="mobile__data__row">{{ $t('userpacket.Packet') }}: {{props.row.PacketName}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('userpacket.StartDate') }}: {{props.row.StartDate}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('userpacket.Price') }}: {{props.row.PacketPrice}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('userpacket.BuyMethod') }}: {{props.row.BuyMethod === 1 ? $t('userpacket.BuyMethodGutschein') : $t('userpacket.BuyMethodPaypal')}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('userpacket.BuyDate') }}: {{props.row.BuyDate}}</span>
              </q-card-section>
            </q-card-section>
          </div>

        </template>
      </q-table>

      <q-table
        class="desktop__data"
        :title="$t('userDashboard.packetHistory')"
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
            {{ $t('allRecords') }}: {{packetsHistory.length}}
          </div>
        </template>
        <template v-slot:header>
          <tr>
            <th class="text-center sortable">
              {{$t('userpacket.Packet')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('userpacket.StartDate')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('userpacket.Price')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('userpacket.BuyMethod')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('userpacket.BuyDate')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
          </tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="PacketName" :props="props">{{ props.row.PacketName }}</q-td>
            <q-td key="StartDate" :props="props">{{ props.row.StartDate }}</q-td>
            <q-td key="Price" :props="props">{{ props.row.PacketPrice }}</q-td>
            <q-td key="BuyMethod" :props="props">{{ props.row.BuyMethod === 1 ? $t('userpacket.BuyMethodGutschein') : $t('userpacket.BuyMethodPaypal') }}</q-td>
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
        :title="$t('userDashboard.orderHistory')"
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
            {{ $t('allRecords') }}: {{buyHistory.length}}
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
                <span class="mobile__data__row">{{ $t('store.Store') }}: {{props.row.StoreName}}</span>
              </q-card-section>
              <q-card-section >
                <span class="mobile__data__row">{{ $t('store.OrderNumber') }}: {{props.row.OrderNumber}}</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('buy.RequestedPrice') }}: {{props.row.RequestedPrice}} $</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('buy.FinalPrice') }}: {{props.row.FinalPrice }} $</span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('buy.Status') }}: {{displayStatus(props.row.Status)}} </span>
              </q-card-section>
              <q-card-section>
                <span class="mobile__data__row">{{ $t('buy.StartDate') }}: {{props.row.StartDate}}</span>
              </q-card-section>
            </q-card-section>
          </div>
        </template>
      </q-table>
      <q-table
        class="desktop__data"
        :title="$t('userDashboard.orderHistory')"
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
            {{ $t('allRecords') }}: {{buyHistory.length}}
          </div>
        </template>
        <template v-slot:header>
          <tr>
            <th class="text-center sortable">
              {{$t('store.Store')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('store.OrderNumber')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('buy.RequestedPrice')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('buy.FinalPrice')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('buy.Status')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
            <th class="text-center sortable">
              {{$t('buy.StartDate')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
            </th>
          </tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="StoreName" :props="props">{{ props.row.StoreName }}</q-td>
            <q-td key="StoreName" :props="props">{{ props.row.OrderNumber }}</q-td>
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
          :title="$t('userDashboard.CashbacksHistory')"
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
              {{ $t('allRecords') }}: {{cashBacks.length}}
            </div>
          </template>
          <template v-slot:header>

          </template>
          <template v-slot:body="props">

            <div class="my-card text-white ">
              <q-card-section :class="['border__bottom__head' , stripedRow(props.rowIndex) ? 'striped_table_row' : '']" >
                <q-card-section class="">
                  <p class="title-class ">{{ $t('packet.Packet') }} {{props.row.PacketName}}</p>
                </q-card-section>
                <q-card-section >
                  <span class="mobile__data__row">{{ $t('cashback.Packet') }}: {{props.row.PacketName}}</span>
                </q-card-section>
                <q-card-section >
                  <span class="mobile__data__row">{{ $t('cashback.Amount') }}: {{props.row.PacketCashback}}</span>
                </q-card-section>
                <q-card-section>
                  <span class="mobile__data__row">{{ $t('cashback.Date') }}: {{props.row.PaybackDate}}</span>
                </q-card-section>
              </q-card-section>
            </div>
          </template>
        </q-table>
        <q-table
          class="desktop__data"
          :title="$t('userDashboard.CashbacksHistory')"
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
              {{ $t('allRecords') }}: {{cashBacks.length}}
            </div>
          </template>
          <template v-slot:header>
            <tr>
              <th class="text-center sortable">
                {{$t('cashback.Packet')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
              </th>
              <th class="text-center sortable">
                {{$t('cashback.Amount')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
              </th>
              <th class="text-center sortable">
                {{$t('cashback.Date')}}<i class="q-icon notranslate material-icons q-table__sort-icon q-table__sort-icon--center" aria-hidden="true" role="presentation">arrow_upward</i>
              </th>
            </tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ref} from 'vue';
import moment from 'moment';

export default {
  name: "dashboard",
  data(){
    return {
      slide: ref(1),
      showAllPackets: false,
      packets: [],
      showCashbacks: [],
      packetColumns: [
        { name: 'PacketName', align: 'center', label: this.$t('userpacket.Packet'), field: 'PacketName', sortable: true },
        { name: 'StartDate', align: 'center', label: this.$t('userpacket.StartDate'), field: 'StartDate', sortable: true },
        { name: 'Price', align: 'center', label: this.$t('userpacket.Price'), field: 'PacketPrice', sortable: true },
        { name: 'BuyMethod', align: 'center', label: this.$t('userpacket.BuyMethod'), field: 'BuyMethod' , sortable: true },
        { name: 'BuyDate', align: 'center', label: this.$t('userpacket.BuyDate'), field: 'BuyDate', sortable: true },
      ],
      orderColumns: [
        { name: 'StoreName', align: 'center', label: this.$t('store.Store'), field: 'StoreName', sortable: true },
        { name: 'OrderNumber', align: 'center', label: this.$t('store.OrderNumber'), field: 'OrderNumber', sortable: true },
        { name: 'RequestedPrice', align: 'center', label: this.$t('buy.RequestedPrice'), field: 'RequestedPrice', sortable: true },
        { name: 'FinalPrice', align: 'center', label: this.$t('buy.FinalPrice'), field: 'FinalPrice', sortable: true },
        { name: 'Status', align: 'center', label: this.$t('buy.Status'), field: 'Status', sortable: true },
        { name: 'StartDate', align: 'center', label: this.$t('buy.StartDate'), field: 'StartDate', sortable: true },
      ],
      cashBackColumns: [
        { name: 'PacketName', align: 'center', label: this.$t('cashback.Packet'), field: 'PacketName', sortable: true },
        { name: 'PacketCashback', align: 'center', label: this.$t('cashback.Amount'), field: 'PacketCashback', sortable: true },
        { name: 'PaybackDate', align: 'center', label: this.$t('cashback.Date'), field: 'PaybackDate', sortable: true },
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
  watch: {

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
        OrderBy: 'BuyDate',
        OrderDir: 'desc',
      })
        .then((res) => {
          this.packetsHistory = res.data.Data;
          let packetsSlides = Math.ceil(this.packetsHistory.length / 3);
          for(let i = 0; i < packetsSlides; i++){
            this.packets.push([]);
          }
          let j = 0;
          this.packetsHistory.map((p , i) => {
            p.SumCashbacks = p.Cashbacks.length * p.PacketCashback;
            p.SumPrice = p.PacketDuration * p.PacketCashback;
            if (this.packets[j].length === 3){
              j++;
            }
            this.packets[j].push(p);
            this.packetsHistory[i].SumCashbacks = p.SumCashbacks;
            this.packetsHistory[i].SumPrice = p.SumPrice;
            this.showCashbacks.push(true)
          })
        })
    },
    getUserBuys(){
      this.$api.post('buy/search.php', {
        Title: this.filter,
        OrderBy: 'BuyDate',
        OrderDir: 'desc' ,
      })
        .then((res) => {
          this.buyHistory = res.data.Data
        })
    },
    getCashBacks(){
      this.$api.post('cashback/search.php', {
        Title: this.filter,
        OrderBy: 'BuyDate',
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
    },
    packetExp(packet){
      let expMonth = packet.PacketDuration - packet.Cashbacks.length;
      return moment().add(expMonth, 'month').format('MMM YYYY');
    },
    getColor(packet){
      if (packet.Cashbacks.length <= 3 )
      {
        return 'color-1';
      }

      if (packet.Cashbacks.length === 4 )
      {
        return 'color-4';
      }

      if (packet.Cashbacks.length === 5 )
      {
        return 'color-5';
      }

      if (packet.Cashbacks.length === 6 )
      {
        return 'color-6';
      }

      if (packet.Cashbacks.length === 7 )
      {
        return 'color-7';
      }

      if (packet.Cashbacks.length === 8 )
      {
        return 'color-8';
      }

      if (packet.Cashbacks.length === 9 )
      {
        return 'color-9';
      }

      if (packet.Cashbacks.length === 10 )
      {
        return 'color-10';
      }

      if (packet.Cashbacks.length === 11 )
      {
        return 'color-11';
      }

      if (packet.Cashbacks.length >= 12 )
      {
        return 'color-12';
      }
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

.packet-box {
  background: #F1F1E6;
}

.mobile__data__row {
  color: #1D607F;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.color-1 {
  color: #1D607F;
}
.color-4{
  color: #CBBB93;
}
.color-5{
  color: #F8BA00;
}
.color-6{
  color: #FE2500;
}
.color-7{
  color: #D31876;
}
.color-8{
  color: #22AEFF;
}
.color-9{
  color: #73DD4D;
}
.color-10{
  color: #D25A73;
}
.color-11{
  color: #F9C321;
}
.color-12{
  color: #FE4221;
}


.fix__circle {
  margin-left: 32%;
}

.fix__circle2 {
  margin-left: 5%;
}

.fix__circle3 {
  margin-left: 0;
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


@media screen and (min-width: 340px) {
  .fix__circle3 {
    margin-left: 7%;
  }
}

@media screen and (min-width: 400px) {
  .fix__circle3 {
    margin-left: 20%;
  }
}

@media screen and (min-width: 500px) {
  .fix__circle3 {
    margin-left: 30%;
  }
}

@media screen and (min-width: 1280px) {
  .fix__circle {
    margin-left: 32%;
  }

  .fix__circle2 {
    margin-left: 20%;
  }
}

@media screen and (min-width: 1700px) {
  .fix__circle2 {
    margin-left: 20%;
  }
}

@media screen and (max-width: 1280px) {
  .fix__circle {
    margin-left: 18%;
  }
}

@media screen and (max-width: 1024px) {
  .fix__circle {
    margin-left: 0%;
  }
}

@media screen and (min-width: 768px) {
  .fix__circle {
    margin-left: 33%;
  }
}

@media screen and (max-width: 768px) {
  .fix__circle {
    margin-left: 5%;
  }
}

/*@media screen and (min-width: 768px) {*/
/*  .fix__circle {*/
/*    margin-left: 0%;*/
/*  }*/
/*}*/

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
