<template>
  <div>
    <CountDown :time=time :transform="transformSlotProps" v-slot="{ days, hours, minutes, seconds }">
      {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
    </CountDown>
  </div>
</template>

<script>
  import CountDown from '@chenfengyuan/vue-countdown';
  
  const expires = new Date(Date.UTC(2023, 0, 1));
  const now = new Date().getTime();
  const time = expires.getTime()-now; 

  export default ({
    props: ['_date'],
    components: {
      CountDown
    },
    setup() { 
      return { 
        time 
      } 
    } 
  })
</script>
