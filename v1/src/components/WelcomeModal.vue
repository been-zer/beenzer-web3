<template>
  <teleport to="body">
    <div ref="modal-backdrop" v-if="connected" class="fixed z-10 inset-0 overflow-y-auto bg-opacity-50 " :class="!this.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">
      <img :src="fireworks" class="fixed z-1 mt-12 inset-0 m-auto opacity-30" />
      <div class="z-20 flex items-center justify-center min-h-screen text-center" >
        <div class="z-90 min-h-[900px] m-2 sm:w-1/3 rounded-lg text-center overflow-hidden p-8 flex flex-col justify-center shadow-xl shadow-yellow-800" :class="this.$store.state.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'" >
          <div class="uppercase text-lg tracking-widest text-gray-400 font-semibold mt-8">
            WELCOME TO
          </div>
          <p class="uppercase px-4 sm:px-14 mx-4 text-4xl sm:text-6xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-400">
            BEENZER DAO
          </p>
          <p class="uppercase px-4 sm:px-14 mt-6 text-2xl tracking-widest font-semibold text-gray-400" >
            DECENTRALIZED AUTONOMOUS ORGANIZATION (DAO) 
            <span class="lowercase">
              v1.0
            </span>
          </p>
          <p class="mt-8 px-2 uppercase text-sm tracking-widest font-semibold" >
            CONNECT YOUR BROWSER WALLET
          </p>
          <p class="mt-2 px-2 uppercase text-sm tracking-widest font-semibold" >
            TO LOGIN TO BEENZER
          </p>
          <div class="my-6 flex align-center justify-center">
            <wallet-multi-button :dark="this.$store.state.dark"/>
          </div>
          <p class="mt-6 text-md tracking-widest text-gray-200 font-semibold">
            FROM HERE YOU CAN:
          </p>
          <p class="mt-6 text-2xl tracking-wides font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-400">
            1️. MINT $BEEN ⛏️
          </p>
          <p class="mt-6 text-2xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-400">
            2️. BURN $BEEN 🔥
          </p>
          <p class="mt-6 text-2xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-400">
            3️. GOVERNANCE ⚖️
          </p>
          
          <div class="uppercase font-semibold text-yellow-500 mt-12 text-md text-semibold tracking-widest">
            ⚠️ We keep track of your location ⚠️
            <p class="mt-2 text-sm tracking-widest text-gray-400">
              You can turn anonymous if you want
            </p>
            <div class="flex mt-8 justify-center text-center">
              <div class="mr-4">{{flag}}</div>
              <div>
                <location-switcher />
              </div>
              <div class="ml-4">🏴‍☠️</div>
            </div>
          </div>

          <FooterBar :time="time" :users="users" :flag="flag" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { WalletMultiButton } from 'solana-wallets-vue';
import LocationSwitcher from './LocationSwitcher.vue';
import FooterBar from './FooterBar.vue';

export default {
  components: {
    WalletMultiButton,
    LocationSwitcher,
    FooterBar
  },
  props: [
    'flag',
    'time',
    'users',
    'connected'
  ],
  methods: [

  ],
  data() {
    return {
      fireworks: require("../assets/fireworks.gif"),
      dark: true
    }
  }
  
}
</script>
