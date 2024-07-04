<template>
  <router-link :to="{ name: 'Details', params: { id: post.id } }" class="post">
    <h1>{{ post.title }}</h1>
    <p class="post-details">{{ truncatedDetails }}</p>
    <div class="post-tags">
      <strong>Tags:</strong>
      <ul>
        <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    truncatedDetails() {
      if (this.post.details.length > 100) {
        return this.post.details.substring(0, 100) + '...'
      } else {
        return this.post.details
      }
    },
  },
}
</script>

<style scoped>
.post {
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  background-color: #e2e2e2;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background-color: #cbc4c4;
}

h1 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: #333;
}

.post-details {
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 1em;
  color: #555;
}

.post-tags {
  margin-top: 1em;
}

.post-tags strong {
  font-size: 1em;
  color: #333;
}

.post-tags ul {
  list-style-type: none;
  padding: 0;
  margin: 0.5em 0 0 0;
  display: flex;
  flex-wrap: wrap;
}

.post-tags li {
  display: inline-block;
  margin: 0.2em;
  background-color: #007bff;
  color: white;
  padding: 0.6em 1.2em;
  border-radius: 20px;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.post-tags li:hover {
  background-color: #0056b3;
}
</style>
