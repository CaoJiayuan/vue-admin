import Vue from 'vue';
import Vuex from 'vuex';
import aside from './modules/aside';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        aside,
        user
    }
});

export default store;