import Login from './components/auth/Login.vue';

require('./bootstrap');
require('admin-lte/plugins/iCheck/icheck');
window.Vue = require('vue');
window.Vue.component('Login', Login);
const app = new Vue({
    el: '#app'
});