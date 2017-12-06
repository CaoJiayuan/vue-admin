import * as _ from 'lodash';
import * as Chance from "chance";

let toastr = require('toastr');
let timer = null;
let flattened = [];

export function throttle(callback, threshold) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        (typeof callback === 'function') && callback();
    }, threshold)
}

export function toastrNotification(type, message, overloadOptions) {
    // type有4种，success、info、warning、error
    toastr.options = {
        "debug"            : false,
        "newestOnTop"      : false,
        "positionClass"    : "toast-top-center",
        "preventDuplicates": true,
        "onclick"          : null,
        "showDuration"     : "300",
        "hideDuration"     : "1000",
        "timeOut"          : "3000",
        "extendedTimeOut"  : "1000",
        "showEasing"       : "swing",
        "hideEasing"       : "linear",
        "showMethod"       : "fadeIn",
        "hideMethod"       : "fadeOut"
    };

    if (typeof overloadOptions === 'object') {
        for (var i in overloadOptions) {
            toastr.options[i] = overloadOptions[i];
        }
    }

    return toastr[type](message);
}


/**
 *
 * @param {String} url
 * @param {Object} query
 * @returns {string}
 */
export function setQuery(url, query) {
    let obj = parseUrl(url);
    let q = obj.query;

    for (let i in  query) {
        let item = query[i];
        if (_.isString(item)) {
            item.length > 0 && (q[i] = item);
        } else {
            q[i] = item;
        }
    }


    let queryString = httpQueryString(q);

    if (queryString.length < 1) {
        return obj.path;
    }

    return obj.path + '?' + queryString;
}

/**
 *
 * @param {String} url
 * @returns {Object}
 */
export function parseUrl(url) {
    let part = url.split('?', 2);
    if (part.length < 2) {
        return {
            path       : part[0],
            queryString: '',
            query      : {}
        }
    }
    let qs = part[1].split('&');
    let query = {};
    qs.forEach(function (item) {
        let p = item.split('=');
        if (p.length > 1) {
            let key = p[0];
            let value = p[1];
            if (key.indexOf('[]') > 0) {
                let fixedKey = key.replace('[]', '');
                if (query[fixedKey]) {
                    query[fixedKey].push(value)
                } else {
                    query[fixedKey] = [value];
                }
            } else {
                query[key] = value;
            }
        }
    });

    return {
        path       : part[0],
        queryString: part[1],
        query      : query
    }
}

/**
 *
 * @param {Object} query
 * @returns {string}
 */
export function httpQueryString(query) {
    let qsArray = [];
    _.forEach(query, function (v, k) {
        if (_.isArray(v)) {
            v.forEach(value => {
                qsArray.push(k + '[]=' + value);
            })
        } else {
            qsArray.push(k + '=' + v);
        }
    });

    return qsArray.join('&');
}

export function randomString(length, pool) {
    length = length || 16;
    pool = pool || 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    return new Chance().string({length: length, pool: pool})
}

/**
 *
 * @param {string} s
 * @returns {string}
 */
export function htmlencode(s) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
export function flattenNode(input, nodeKey) {
    nodeKey = nodeKey || 'node';

    let $clone = _.clone(input);

    $clone.forEach(item => {
        if (item.hasOwnProperty(nodeKey)) {
            let nodes = item[nodeKey];
            delete item[nodeKey];
            flattened.push(item);
            flattened.concat(flattenNode(nodes, nodeKey));
        } else {
            flattened.push(item);
        }
    });

    return flattened;
}
