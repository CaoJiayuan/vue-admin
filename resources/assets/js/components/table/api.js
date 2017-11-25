import axios from 'axios';
import {setQuery} from '../../app/utils';

const Api = {
    getList(url, data) {
        data = data || {};
        url = setQuery(url, data);
        return axios.get(url).then(response => response.data);
    }
};

export default Api;