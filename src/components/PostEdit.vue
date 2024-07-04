<template>
  <div class="main">
    <div class="edit-form">
      <input
        type="text"
        class="edit-title"
        placeholder="Title"
        v-model="editedTitle"
      />
      <textarea
        class="edit-details"
        placeholder="Details"
        v-model="editedDetails"
      ></textarea>
      <div class="edit-tags">
        <input
          type="text"
          id="edit-tags"
          placeholder="Enter tags (comma separated)"
          v-model="editedTagsInput"
          @keydown.enter.prevent="addEditedTag"
        />
        <ul>
          <li v-for="(tag, index) in editedTags" :key="index">
            {{ tag }}
            <span @click="removeEditedTag(index)" class="remove-tag">X</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="buttons">
      <button class="cancel-btn" @click="$emit('cancel')">Cancel Edit</button>
      <button class="save-btn" @click="confirmEdit">Confirm Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      editedTitle: this.post.title,
      editedDetails: this.post.details,
      editedTagsInput: '',
      editedTags: [...this.post.tags],
    }
  },
  methods: {
    addEditedTag() {
      const newTags = this.editedTagsInput.split(',').map((tag) => tag.trim())
      newTags.forEach((tag) => {
        if (tag && !this.editedTags.includes(tag)) {
          this.editedTags.push(tag)
        }
      })
      this.editedTagsInput = ''
    },
    removeEditedTag(index) {
      this.editedTags.splice(index, 1)
    },
    confirmEdit() {
      this.$emit('confirm-edit', {
        title: this.editedTitle,
        details: this.editedDetails,
        tags: Array.from(new Set(this.editedTags)),
      })
    },
  },
}
</script>
