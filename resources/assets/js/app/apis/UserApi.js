import axios from 'axios';

const UserApi = {
    getUser() {
        return axios.get('/api/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/api/login', credentials).then(response => response.data)
    },
    logout(){
        return axios.post('/api/logout').then(response => response.data)
    }
};
export default UserApi;
