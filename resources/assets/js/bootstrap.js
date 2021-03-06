import {toastrNotification} from './app/utils';
import {TOKEN_CACHE_NAME, LOGIN_PATH} from './app/constant';

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
} catch (e) {
}
require('es6-promise').polyfill();
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF csrf as a header based on the value of the "XSRF" csrf cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.withCredentials = true;


/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every csrf manually.
 */

let csrf = document.head.querySelector('meta[name="csrf-token"]');

window.axios.interceptors.request.use(config => {

    let jwt = localStorage.getItem(TOKEN_CACHE_NAME);
    if (jwt) {
        config.headers.common['Authorization'] = 'Bearer ' + jwt;
    }
    return config;
}, err => {
    return Promise.reject(err);
});
window.axios.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
        window.location.href = LOGIN_PATH;
    } else {
        toastrNotification('error', error.response.data.message);
    }
});


if (csrf) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf.content;
} else {
    console.error('CSRF csrf not found: https://laravel.com/docs/csrf#csrf-x-csrf-csrf');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
