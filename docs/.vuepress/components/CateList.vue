<template>
  <div>
    <p style="border-bottom: 1px solid #eaecef; margin: 30px 0 10px">✨ 最近更新</p>
    <div v-if="list.length">
      <ul>
        <li v-for="item in previewList"><a :href="item.path">{{ item.title }}</a></li>
        <li v-if="more && reducedList.length" v-for="item in reducedList"><router-link :to="item.path">{{ item.title }}</router-link></li>
      </ul>
      <p v-if="more && reducedList.length"><a href="javascript:" @click="more = true">查看更多...</a></p>
    </div>
    <p v-else style="margin: 30px 50px 10px; color: #7d8aa4">😂 这里啥也没有，再等等...</p>
  </div>
</template>

<script>
export default {
  name: 'CateList',
  data() {
    return {
      preview: 20,
      more: false
    }
  },
  computed: {
    // 取最近20条文章
    list() {
      return this.$site.pages.filter(({ path }) =>
        path != this.$page.path && path.indexOf(this.$page.path)==0
      ).sort((a,b) => a.lastUpdated > b.lastUpdated)
    },
    previewList() {
      return this.list.slice(0, this.preview)
    },
    reducedList() {
      return this.list.slice(this.preview)
    }
  }
}
</script>
