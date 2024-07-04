<template>
  <div class="main">
    <h1>{{ post.title }}</h1>
    <p>{{ post.details }}</p>
    <div class="post-tags">
      <strong>Tags:</strong>
      <ul>
        <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
    <div class="buttons">
      <button class="edit-btn" @click="$emit('edit')">Edit Post</button>
      <button class="delete-btn" @click="$emit('delete')">Delete Post</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
}
</script>
