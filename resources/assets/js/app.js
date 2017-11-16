import VueRouter from 'vue-router';
import routes from './routes';
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';
import Aside from './components/layouts/Aside.vue';
import Content from './components/layouts/Content.vue';
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('admin-lte');

window.Vue = require('vue');
window.Vue.use(VueRouter);
window.Vue.component('AdminHeader', Header);
window.Vue.component('AdminFooter', Footer);
window.Vue.component('AdminAside', Aside);
window.Vue.component('AdminContent', Content);
const router = new VueRouter({
    routes
});
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
