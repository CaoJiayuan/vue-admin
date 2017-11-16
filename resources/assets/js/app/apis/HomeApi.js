import axios from 'axios';
const HomeApi = {
    getNavigation(){
        return axios.get('/api/navigation').then(response => {
            return response.data;
        })
    }
};

export default HomeApi;