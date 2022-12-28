<template>
  <teleport to="body">
    <div ref="modal-backdrop" class="fixed z-10 inset-0 overflow-y-auto bg-opacity-50" :class="!this.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">
      <img :src="fireworks" class="fixed z-1 mt-12 inset-0 m-auto opacity-30" />
      <img :src="fireworks" class="fixed z-1 inset-0 m-auto opacity-30" />
      <div class="z-20 flex items-center justify-center min-h-screen text-center" >
        <div class="z-90 min-h-[900px] m-2 sm:w-1/3 rounded-lg text-center overflow-hidden shadow-xl p-8 flex flex-col justify-center" :class="this.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'" >
          
          <p class="uppercase px-14 text-4xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-400">
            CONNECT YOUR WALLET TO LOGIN
          </p>
          <div class="my-10 flex align-center justify-center">
            <wallet-multi-button :dark="this.$store.state.dark"/>
          </div>
          <p class="mt-2 px-8 uppercase text-2xl tracking-widest font-semibold ">
            BEENZER'S DECENTRALIZED AUTONOMOUS ORGANIZATION 
            <a class="text-4xl pointer text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-400" to="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization">
              (DAO)
            </a>
          </p>
          <p class="mt-10 text-2xl tracking-widest text-gray-300 font-semibold">
            FROM HERE YOU CAN:
          </p>
          <p class="mt-10 text-2xl tracking-widest text-green-500 font-semibold">
            1️⃣ MINT $BEEN ⛏️
          </p>
          <p class="mt-10 text-2xl tracking-widest text-red-500 font-semibold">
            2️⃣ BURN $BEEN 🔥
          </p>
          <p class="mt-10 text-2xl tracking-widest text-yellow-500 font-semibold">
            3️⃣ GOVERNANCE ⚖️
          </p>
          
          <div class="uppercase text-yellow-500 mt-10 text-xl tracking-widest">
            ⚠️ We keep track of your location {{ location }}
            <p class="mt-2 text-sm tracking-widest text-gray-400 font-semibold">
              You can turn anonymous if you want
            </p>
            <div class="flex mt-8 justify-center text-center">
              <div class="mr-4">{{location}}</div>
              <div>
                <location-switcher />
              </div>
              <div class="ml-4">🏴‍☠️</div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </teleport>
</template>

<script>
// import LoginWithTwitter from "../services/twitter-auth";

// const tw = new LoginWithTwitter({
//   consumerKey: '0Y42EKLLt3IwyYALd8gsR01xP',
//   consumerSecret: 'fJkC4jOcTjT2OhJiNzQiiCiEM2rONOch9liXIyMZ7KRrVJ5MYF',
//   callbackUrl: 'https://localhost:8080'
// })
// import { watchEffect, ref } from 'vue';
//import { TwitterApi } from 'twitter-api-v2';

// Instantiate with desired auth type (here's Bearer v2 auth)
//const twitterClient = new TwitterApi({ appKey: '0Y42EKLLt3IwyYALd8gsR01xP', appSecret: 'fJkC4jOcTjT2OhJiNzQiiCiEM2rONOch9liXIyMZ7KRrVJ5MYF' });

//const readOnlyClient = twitterClient.readOnly;

// Play with the built in methods
// import fireworks from '../assets/fireworks.gif'
import { WalletMultiButton } from 'solana-wallets-vue';
import LocationSwitcher from './LocationSwitcher.vue';


export default {
  components: {
    WalletMultiButton,
    LocationSwitcher
  },
  props: {
    location
  },
  setup () {

    // const tw_user = ref();
    // watchEffect(async () => {
    //   const user = await twitterClient.appLogin();

    //   console.log(user);
      
    // });

    // return {
    //   tw_user
    // }
  },
  data() {
    return {
      fireworks: require("../assets/fireworks.gif"),
      dark: true
    }
  }
  
}
</script>
