import { ref, computed } from 'vue'

const getPosts = () => {
  const posts = ref([])

  async function getBlogs() {
    try {
      const response = await fetch('http://localhost:3000/posts')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      posts.value = data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  const postsLength = computed(() => posts.value.length)

  return {
    posts,
    getBlogs,
    postsLength,
  }
}

export default getPosts
