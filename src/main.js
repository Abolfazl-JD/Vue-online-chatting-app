import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueChatScroll from 'vue-chat-scroll'

createApp(App).use(router).use(VueChatScroll).use(VueAxios, axios).mount('#app')