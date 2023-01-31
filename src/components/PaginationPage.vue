<template>
  <div class="pagination-dot-view">
    <ul>
      <li
        v-for="(page, index) in pageList"
        :key="index"
        :class="[active >= index + 1 ? 'is-active' : '']"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: this.$route.path,
      pageList: ["/registrationSelectPackage", "/registrationBusinessDetails"],
      currentPage: 0,
    };
  },
  computed: {
    active() {
      for (let i = 0; i < this.pageList.length; i++) {
        if (this.page === this.pageList[i]) {
          this.currentPage = i + 1;
          return this.currentPage;
        }
      }
    },
  },
};
</script>
