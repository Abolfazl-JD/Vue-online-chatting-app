import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/welcome.vue'
import Chatroom from '../views/cahtroom'

const routes = [{
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/chatroom',
        name: 'chatroom',
        component: Chatroom,
        props: true,
        beforeEnter(to, from, next) {
            to.params.name ? next() : next({ name: 'Welcome' })
        }
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router