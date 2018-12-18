<template>
  <div>
    <div style="padding: 60px 0; text-align: center">
      <div style="font-size: 1.25em; font-weight: 100;">~~评论区~~</div>
      <div style="font-size: .9em; padding-top: 5px">
        <span :id="$page.path" class="leancloud-visitors" :data-flag-title="$page.title">
          <span class="post-meta-item-text">访问量： </span>
          <span class="leancloud-visitors-count">loading...</span>
        </span>
      </div>
    </div>
    <div ref="vcomments"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    let id = `vcomments${+new Date()}`
    this.$refs.vcomments.id = id
    new Valine({
      el: '#'+id,
      appId: 'IaM9lSdwBvjoe7j7vPUzKDaj-gzGzoHsz',
      appKey: '9QtvqVJg3ys5nuQarbyb7LhF',
      placeholder: '这里是留言评论区，欢迎讨论 :)',
      avatar: 'retro',
      visitor: true,
      pageSize: 100
    })
  }
}
</script>
