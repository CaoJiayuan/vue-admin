import axios from 'axios';

const UserAPi = {
    getUser() {
        return axios.get('/api/user').then(response => {
            return response.data;
        })
    }
};

export default UserAPi;