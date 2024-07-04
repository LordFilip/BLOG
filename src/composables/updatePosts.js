import { ref } from 'vue'

const updatePost = async (updatedPost) => {
  const { id, title, details, tags } = updatedPost

  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, details, tags }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    console.log(`Post with ID ${id} updated successfully.`)
  } catch (error) {
    console.error('There was a problem with updating the post:', error)
    throw error
  }
}

export { updatePost }
