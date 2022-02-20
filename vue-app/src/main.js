import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

console.log("ENV",process.env);

createApp(App).use(router).mount('#app')
