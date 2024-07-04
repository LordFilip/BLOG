<template>
  <div class="navbar">
    <h1>BLOG</h1>
    <div class="links">
      <router-link :to="{ name: 'Home' }" class="nlin">All Posts</router-link>
      <router-link :to="{ name: 'AddPost' }" class="nlin">Add Post</router-link>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white !important;
  padding: 10px 50px;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.links {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.navbar ::v-deep .links a.nlin,
.navbar >>> .links a.nlin {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  cursor: pointer;
}

.navbar ::v-deep .links a.nlin.active,
.navbar >>> .links a.nlin.active {
  font-weight: bold;
}
</style>
