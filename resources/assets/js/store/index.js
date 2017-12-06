import Vue from 'vue';
import Vuex from 'vuex';
import aside from './modules/aside';
import user from './modules/user';
import breadcrumb from './modules/breadcrumb';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        aside,
        breadcrumb,
        user
    }
});

export default store;
