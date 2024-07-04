import { ref } from 'vue'

const deletePost = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    console.log(`Post with ID ${id} deleted successfully.`)
  } catch (error) {
    console.error('There was a problem with deleting the post:', error)
    throw error
  }
}

export { deletePost }
