<template>
  <div>
    <div class="post-container">
      <PostDisplay
        v-if="post && !editing"
        :post="post"
        @edit="handleEdit"
        @delete="toggleOverlay"
      />
      <PostEdit
        v-if="post && editing"
        :post="post"
        @cancel="handleEdit"
        @confirm-edit="confirmEdit"
      />
    </div>
    <ConfirmModal
      :showOverlay="showOverlay"
      @toggleOverlay="toggleOverlay"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getPosts from '../composables/getPosts'
import { updatePost } from '../composables/updatePosts'
import { deletePost } from '../composables/deletePost'
import ConfirmModal from '../components/ConfirmModal.vue'
import PostDisplay from '../components/PostDisplay.vue'
import PostEdit from '../components/PostEdit.vue'

export default {
  components: { ConfirmModal, PostDisplay, PostEdit },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = ref(route.params.id)
    const { posts, getBlogs } = getPosts()
    const showOverlay = ref(false)
    const editing = ref(false)

    const toggleOverlay = () => {
      showOverlay.value = !showOverlay.value
    }

    const confirmDelete = async () => {
      try {
        await deletePost(id.value)
        console.log(`Post with ID ${id.value} deleted successfully.`)
        router.push('/')
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }

    onMounted(() => {
      getBlogs()
    })

    const post = computed(() => {
      return posts.value.find((post) => post.id === id.value)
    })

    const handleEdit = () => {
      editing.value = !editing.value
    }

    const confirmEdit = async (editedPost) => {
      try {
        await updatePost({ id: id.value, ...editedPost })
        console.log(`Post with ID ${id.value} updated successfully.`)
        router.push('/')
      } catch (error) {
        console.error('Error updating post:', error)
      }
    }

    return {
      post,
      showOverlay,
      toggleOverlay,
      confirmDelete,
      editing,
      handleEdit,
      confirmEdit,
    }
  },
}
</script>

<style>
.main {
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background-color: #d8d7d7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-tags {
  margin-top: 20px;
  text-align: center;
}

.post-tags strong {
  display: block;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.post-tags ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.post-tags li {
  display: inline-block;
  background-color: #e3e3e3;
  color: #333;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

button {
  margin-left: 20px;
  padding: 10px 20px;
}
.save-btn {
  border: 1px solid green;
}
.edit-btn {
  background-color: rgb(233, 230, 225);
  border: 1px solid green;
  color: green;
}

.delete-btn {
  background-color: rgb(233, 230, 225);
  border: 1px solid red;
  color: red;
}
.cancel-btn {
  border: 1px solid red;
}
.save-btn,
.cancel-btn,
.delete-btn:hover {
  cursor: pointer;
}

input {
  width: 80%;
  height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
textarea {
  width: 80%;
  height: 200px;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
}
li {
  display: inline-block;
  background-color: #e3e3e3;
  color: #333;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  position: relative;
  border: 1px solid #d8d7d7;
}

li .remove-tag {
  background-color: #ff5c5c;
  color: white;
  border-radius: 50%;
  padding: 0 5px;
  margin-left: 8px;
  cursor: pointer;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 0.9rem;
}

li .remove-tag:hover {
  background-color: #e04747;
}

.post-tags li {
  border: 1px solid #ccc;
  padding: 10px 15px;
  margin: 5px;
}
</style>
