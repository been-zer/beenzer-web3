<template>
  <!-- Play Panel. -->

  <div class="m-auto w-full max-w-lg p-4">

    <div class="rounded-xl pt-2 pb-2 shadow-xl" :class="this.$store.state.dark ? 'bg-gray-800 shadow-gray-700' : 'bg-white'">
      <!-- Title Box -->
      <div class="px-4 text-center mt-10">
        <p class="uppercase text-xl tracking-widest text-gray-400 font-semibold">
          MINT CLOSED
        </p>
        <p class="uppercase text-6xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-800">
          $BEEN
        </p>
        <div class="py-4 text-center uppercase text-sm tracking-widest font-semibold justify-center">

          <div class="pl-2 pt-6">
            LAUNCHING
            <p class="uppercase text-xl tracking-widest text-gray-400 font-semibold">
              PRESALE 🎉
            </p>
            <p class="uppercase text-3xl tracking-widestfont-semibold">
              JAN  1  2023 
            </p>
            <CountDown class="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400" />
          </div>    

            
        </div>

        <div class="text-center uppercase tracking-widest font-semibold justify-center border-1 rounded-xl pt-4">
          
          <div class="grid grid-cols-4 grid-flow-row align-center justify-center mb-4 px-4 text-center">

            <div class="p-4 text-center">
              <p class="uppercase text-md tracking-widest text-gray-400 font-semibold">SOL</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${0.02}`}}</p>
              </div>
            </div>

            <div class="p-4 text-center">
              <p class="uppercase text-md tracking-widest text-gray-400 font-semibold">USD</p>
              <div class="flex justify-center" >
                <p class="lowercase font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${1.00}`}}</p>
              </div>
            </div>

            <div class="p-4 text-center">
              <p class="uppercase text-md tracking-widest text-gray-400 font-semibold">BEENS</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${1}`}}</p>
              </div>
            </div>

            <div class="p-4 text-center">
              <p class="uppercase text-md tracking-widest text-gray-400 font-semibold">BEENZ</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${4}`}}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div>

        <div class="uppercase text-s tracking-widest text-gray-400 font-semibold text-center mb-4 -mt-2">
          Pick your number
        </div>

        <div class="font-bold text-4xl text-center p-7 rounded-xl mx-2 cursor-pointer"
        :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-200'"
        @click="$emit('commit', number)"
        @mouseover="commitHover=true"
        @mouseleave="commitHover=false">
          <div class="text-2xl py-2 mr-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600" v-if="commitHover">
            <a class="text-xl mr-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-600">
              MINT 🚀 </a>
            {{ nf.format(number).replaceAll(',', ' ') }}
          </div>
          <div v-else>{{ nf.format(number).replaceAll(',', ' ') }}</div>
        </div>
        
        <div class="grid grid-cols-3 gap-1 text-s font-semibold text-center py-4 px-4 rounded-xl">
          <button @click="clickNum(1)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-tl-xl align-middle relative">1</button>
          <button @click="clickNum(2)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">2</button>
          <button @click="clickNum(3)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-tr-xl align-middle relative">3</button>
          <button @click="clickNum(4)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">4</button>
          <button @click="clickNum(5)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">5</button>
          <button @click="clickNum(6)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">6</button>
          <button @click="clickNum(7)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-bl-xl align-middle relative">7</button>
          <button @click="clickNum(8)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">8</button>
          <button @click="clickNum(9)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-br-xl align-middle relative">9</button>
          <button @click="resetNum()"  :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-3 px-2 rounded-3xl m-3 align-middle relative">↻</button>
          <button @click="clickNum(0)" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-b-xl align-middle relative">0</button>
          <button @click="deleteNum()" :class="this.$store.state.dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-3 px-2 rounded-3xl m-3 align-middle relative">⇐</button>          
        <div/>

      </div>

    </div>
  </div>
</div>

</template>

<script>
import { ref } from 'vue';
import click_sound from '../assets/sounds/click.mp3';
import CountDown from './CountDown';
import store from '@/store';

export default {
  components: {
    CountDown,
  },
  props: [
    'potSOL',
    'wallet',
    'balance',
    'tickets',
    'yourNumbers',
    'yourProbability',
    'yourROI'
  ],
  methods: {
    commitNumber () {
      this.$emit('commit', this.commitNumber)
    }
  },
  data() {
    return {
      commitHover: false,
      commiting: false,
    }
  },
  setup () {

    const number = ref('1')
    const nf = Intl.NumberFormat();
    const maxNumber = 1000000000;
    const audio = new Audio(click_sound);

    // Keyboard functionality
    function clickNum (n) {
      if ( store.state.sound )
        audio.play();

      if (number.value[0] === '0')
        return number.value = String(n)
      
      if ( number.value+n <= maxNumber )
        number.value += n
      else
        return alert(`Number must be between 1 and ${nf.format(maxNumber)}, including both.`)     
    }
    function deleteNum () {
      if (number.value.length > 1)
        number.value = number.value.slice(0, -1);
      else resetNum();
    }
    function resetNum () {
      number.value = '1';
    }

    const commitPop = ref(false);
    
    return { 
      clickNum,
      deleteNum,
      resetNum,
      number,
      nf,
      location,
      commitPop,
    }
  }
}
</script>
