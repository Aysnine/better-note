<template>
  <img v-if="src" class="buddy-logo" :src="src" :alt="who" :title="who" />
  <span v-else="src" class="buddy-logo text-logo" :alt="who" :title="who">{{ who }}</span>
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
  transition all .3s
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
    margin 4px
  .text-logo
    font-weight 300
</style>
