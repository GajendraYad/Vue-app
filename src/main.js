import { createApp } from 'vue'
import App from './App.vue'
import User from './components/User.vue'
import Timer from './components/Timer.vue'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

const app = createApp(App).use(router);
app.component('hello-world', User);
app.component('timer', Timer);
app.mount('#app');
app.use(axios);



