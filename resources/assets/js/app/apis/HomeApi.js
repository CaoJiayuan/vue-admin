import axios from 'axios';
const HomeApi = {
    getNavigation(){
        return axios.get('/api/navigation').then(response => response.data)
    }
};

export default HomeApi;
