<template>
  <img v-if="src" class="buddy-logo" :src="src" />
  <span v-else="src" class="buddy-logo text-logo">{{ who }}</span>
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
    GetBuddyLogo
  }
}
</script>

<style lang="stylus">
.buddy-logo
  height 32px
  padding 8px
  margin 8px
img.buddy-logo
  vertical-align middle
.text-logo
  font-weight 300
  color #7d8aa4
  border-bottom 2px solid #7d8aa4
</style>
