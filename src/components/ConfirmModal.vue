<template>
  <div
    class="overlay"
    :class="{ active: showOverlay }"
    @click.self="toggleOverlay"
  >
    <div class="modal" @click.stop>
      <h1>Are you sure you want to delete this post?</h1>
      <div class="modal-buttons">
        <button class="confirm-btn" @click="confirmDelete">Confirm</button>
        <button class="cancel-btn" @click="toggleOverlay">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showOverlay: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggleOverlay', 'confirmDelete'],
  setup(props, { emit }) {
    const toggleOverlay = () => {
      emit('toggleOverlay')
    }

    const confirmDelete = () => {
      emit('confirmDelete')
    }

    return {
      toggleOverlay,
      confirmDelete,
    }
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: none;
  justify-content: center;
  align-items: center;
}

.overlay.active {
  display: flex;
}

.modal {
  background-color: white;
  padding: 40px 80px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.confirm-btn,
.cancel-btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn {
  background-color: #007bff;
  color: white;
  border: none;
}

.confirm-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.cancel-btn:hover {
  background-color: #c82333;
}
</style>
