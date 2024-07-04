<template>
  <form class="post-form" @submit.prevent="submitForm">
    <label for="title" class="form-label">Post Title</label>
    <input
      type="text"
      id="title"
      name="title"
      class="form-input"
      v-model="title"
      :class="{ 'input-error': !title && errors.submitted }"
      @focus="clearErrors"
    />
    <div v-if="!title && errors.submitted" class="error-text">
      You need to give your blog a title
    </div>

    <label for="description" class="form-label">Post Description</label>
    <textarea
      id="description"
      name="description"
      class="form-textarea"
      v-model="details"
      :class="{ 'input-error': !details && errors.submitted }"
      @focus="clearErrors"
    ></textarea>
    <div v-if="!details && errors.submitted" class="error-text">
      You need to give your blog a description
    </div>

    <label for="tags" class="form-label">Post Tags</label>
    <input
      type="text"
      id="tags"
      name="tags"
      class="form-input"
      v-model="tags"
      :class="{ 'input-error': !tags && errors.submitted }"
      @focus="clearErrors"
    />
    <div v-if="!tags && errors.submitted" class="error-text">
      You need to give your blog some tags
    </div>

    <button>Add Post</button>
  </form>
</template>

<script>
import getPosts from '../composables/getPosts'
export default {
  data() {
    return {
      title: '',
      details: '',
      tags: '',
      errors: {
        submitted: false,
      },
    }
  },
  setup() {
    const { posts, getBlogs, postsLength } = getPosts()
    getBlogs()
    console.log(posts)
    return {
      postsLength,
    }
  },
  methods: {
    submitForm() {
      this.errors.submitted = true

      if (!this.title || !this.details || !this.tags) {
        return
      }

      let parsedTags = this.tags
        .split(' ')
        .filter(
          (tag, index, self) => tag.trim() !== '' && self.indexOf(tag) === index
        )

      let id = (this.postsLength + 1).toString()
      this.postsLength += 1
      let post = {
        title: this.title,
        details: this.details,
        tags: parsedTags,
        id: id,
      }

      try {
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        }).then(() => {
          this.$router.push('/')
        })
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    },
    clearErrors() {
      this.errors.submitted = false
    },
  },
}
</script>

<style scoped>
.post-form {
  max-width: 500px;
  padding: 20px;
  background-color: #f0f7fc;
  border: 1px solid #d3e4f5;
  border-radius: 8px;
  margin: 150px auto 0 auto;
}

.form-label {
  font-size: 24px;
  color: #3498db;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 5px;
  border: 1px solid #b3d7f7;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  text-align: left;
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.input-error {
  border-color: red !important;
}

.error-text {
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
  padding: 16px 32px;
  border-radius: 20px;
  border: 1px solid green;
  font-size: 20px;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
}
</style>
