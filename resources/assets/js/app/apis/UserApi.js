import axios from 'axios';

const UserApi = {
    getUser() {
        return axios.get('/api/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/api/login', credentials).then(response =>{
            let data = response.data;
            window.localStorage.setItem('jwt_token', data.access_token);
            this.readyToRefresh(data.expires_in);
            return data;
        })
    },
    logout(){
        return axios.post('/api/logout').then(response => response.data)
    },
    refresh(){
        return axios.post('/api/refresh').then(response =>{
            let data = response.data;
            window.localStorage.setItem('jwt_token', data.access_token);
            this.readyToRefresh(data.expires_in);
            return data;
        })
    },
    readyToRefresh(ttl){
        setTimeout(() => {
            this.refresh();
        }, ttl)
    }
};
export default UserApi;
