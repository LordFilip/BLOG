import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import AddPost from '../views/AddPost.vue'
import Details from '../views/Details.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost,
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
