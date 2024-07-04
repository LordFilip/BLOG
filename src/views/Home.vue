<template>
  <div class="home-main">
    <Search :posts="posts" @update:filteredPosts="updateFilteredPosts" />
    <h1>Blog Posts</h1>
    <div>
      <SinglePost v-for="post in filteredPosts" :post="post" :key="post.id" />
    </div>
  </div>
</template>

<script>
import SinglePost from '../components/SinglePost'
import Search from '../components/Search'
import getPosts from '../composables/getPosts'
import { ref, watchEffect } from 'vue'

export default {
  components: { SinglePost, Search },

  setup() {
    const { posts, getBlogs } = getPosts()
    getBlogs()

    const filteredPosts = ref([])

    const updateFilteredPosts = (newFilteredPosts) => {
      filteredPosts.value = newFilteredPosts
    }

    watchEffect(() => {
      if (filteredPosts.value.length === 0 && posts.value.length > 0) {
        filteredPosts.value = posts.value
      }
    })

    return {
      posts,
      filteredPosts,
      updateFilteredPosts,
    }
  },
}
</script>

<style scoped>
.home-main {
  margin-top: 200px;
}
h1 {
  font-size: 48px;
  text-transform: uppercase;
  margin-bottom: 50px;
}
</style>
