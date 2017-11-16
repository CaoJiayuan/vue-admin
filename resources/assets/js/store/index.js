import Vue from 'vue';
import Vuex from 'vuex';
import aside from './modules/aside';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        aside
    }
});

export default store;