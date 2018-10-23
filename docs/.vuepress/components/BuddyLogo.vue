<template>
  <img v-if="src" @click="handleClick" class="buddy-logo" :src="src" :alt="who" :title="who" />
  <span v-else="src" @click="handleClick" class="buddy-logo text-logo" :alt="who" :title="who">{{ who }}</span>
</template>

<script>
import GetBuddyLogo from '../lib/buddy-logo.js'
export default {
  name: 'BuddyLogo',
  props: ['who'],
  computed: {
    src() {
      return this.GetBuddyLogo(this.who)
    }
  },
  methods: {
    GetBuddyLogo,
    handleClick() {
      let root = document.body
      let el = document.createElement('div')
      el.innerText = this.who
      el.setAttribute('class', 'who-poper')
      root.appendChild(el)
      let t = setTimeout(() => { root.removeChild(el) || clearTimeout(t) }, 5000)
    }
  }
}
</script>

<style lang="stylus">
.buddy-logo
  height 32px
  padding 6px
  margin 4px
  transition all .3s
  cursor pointer
img.buddy-logo
  vertical-align middle
.text-logo
  font-weight bold
  color #7d8aa4
  border-bottom 2px solid #7d8aa4
  display inline-block
@media (max-width 960px)
  .buddy-logo
    height 18px
    padding 4px
  .text-logo
    font-weight 300
.who-poper
  position fixed
  z-index 666666
  width 120px
  text-align center
  padding 10px 20px
  left 50%
  margin-left -80px
  background #282c3475
  color #fff
  border-radius 5px
  animation upup 5s 1
@keyframes upup
  0% 
    bottom 50px
    opacity 0
  5%
    bottom 160px
    opacity 1
  95%
    bottom 160px
    opacity 1
  100%
    bottom 50px
    opacity 0
</style>
