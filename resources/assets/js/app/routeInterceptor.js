import routes from '../routes';
import store from '../store';
import {flattenNode} from "./utils";
import collect from 'collect.js';

const flattened = flattenNode(routes, 'children');


const interceptor = (to, from, next) => {
    let path = to.path;
    let matched = collect(flattened).filter(item => item.path === path).first();
    if (matched) {
        store.commit('setTitle', {
            title   : matched.meta.title,
            subtitle: matched.meta.subtitle,
        })
    }
    next();
};

function parseLevel(path) {
    let parts = path.split('/').filter(part => part !== '');


    return parts.length + 1;
}


export default interceptor;