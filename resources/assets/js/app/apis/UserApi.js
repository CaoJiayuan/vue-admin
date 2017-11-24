import axios from 'axios';
import {TOKEN_CACHE_NAME} from '../constant';
function Token() {

}
Token.prototype.access_token = null;
Token.prototype.expires_in = 0;
Token.prototype.type = null;

const UserApi = {
    getUser() {
        return axios.get('/api/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/api/login', credentials).then(response =>{
            this.afterLogin(response.data)
        })
    },
    logout(){
        return axios.post('/api/logout').then(response => response.data)
    },
    afterLogin(token){
        window.localStorage.setItem(TOKEN_CACHE_NAME, token.access_token);
        token.expires_in > 0 && this.readyToRefresh(token.expires_in);
        return token;
    },
    refresh(){
        return axios.post('/api/refresh').then(response =>{
            this.afterLogin(response.data)
        })
    },
    readyToRefresh(ttl){
        setTimeout(() => {
            this.refresh();
        }, ttl)
    }
};
export default UserApi;
