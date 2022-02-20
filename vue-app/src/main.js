import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import UserManage from './UserManage';

console.log("ENV",process.env);

//createApp(App).use(router).mount('#app')

const app = createApp(App);
UserManage.factory({
    UserPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.VUE_APP_COGNITO_CLIENT_ID
}).then( UserManger => {
    app.config.globalProperties.$userManager = UserManger;  
    app.config.globalProperties.$baseUrl = process.env.VUE_APP_API_URL;
    router.userManager = UserManger;
    app.use(router).mount('#app');
});