import UserApi from '../../app/apis/UserApi';
const state = {
    user: {}
};

const getters = {
    getUser: state => state.user
};

const actions = {
    loadUser({commit}) {
        UserApi.getUser().then(user => {
            commit('setUser', {user})
        })
    }
};

const mutations = {
    setUser(state, {user}) {
        state.user = user;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}