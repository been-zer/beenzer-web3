<template>
  <label class="switch">
    <input type="checkbox" @click="toggleCheckbox">
    <div class="slider round"></div>
  </label>
</template>

<script>
export default {
  el: 'LocationSwitcher',
  data() {
    return {
      checkbox: true
    }
  },
  methods: {
    toggleCheckbox() {
      this.checkbox = !this.checkbox
      this.$emit('checkbox', this.checkbox)
    }
  }

}
</script>

<style scoped="true">
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 10px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(168, 168, 168, 0.753);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 28px;
  width: 28px;
  left: 4px;
  top: 1px;
  align-items: middle;
  background-color: rgb(255, 255, 255);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #1b1b1b8c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>