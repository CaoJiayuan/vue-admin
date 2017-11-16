import HomeApi from '../../app/apis/HomeApi';
const state = {
    navigation: []
};

const getters = {
    getNavigation: state => state.navigation
};

const actions = {
    loadNavigation({commit}) {
        HomeApi.getNavigation().then(navigation => {
            commit('setNavigation', {navigation})
        })
    }
};

const mutations = {
    setNavigation(state, {navigation}){
        state.navigation = navigation;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}
