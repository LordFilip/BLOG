<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by title or tags"
    />
    <select v-model="filterOption">
      <option value="title">By Title</option>
      <option value="tag">By Tag</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['posts'],
  data() {
    return {
      searchQuery: '',
      filterOption: 'title',
    }
  },
  computed: {
    filteredPosts() {
      if (this.filterOption === 'title') {
        return this.posts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      } else if (this.filterOption === 'tag') {
        const tags = this.searchQuery
          .toLowerCase()
          .split(' ')
          .map((tag) => tag.trim())
        return this.posts.filter((post) =>
          tags.every((tag) =>
            post.tags.some((postTag) => postTag.toLowerCase().includes(tag))
          )
        )
      }
      return this.posts
    },
  },
  watch: {
    searchQuery() {
      this.$emit('update:filteredPosts', this.filteredPosts)
    },
    filterOption() {
      this.$emit('update:filteredPosts', this.filteredPosts)
    },
  },
  mounted() {
    this.$emit('update:filteredPosts', this.filteredPosts)
  },
}
</script>

<style scoped>
.search-container {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
input {
  width: 250px;
  height: 30px;
  margin-top: 20px;
}
select {
  height: 30px;
}
</style>
