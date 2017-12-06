const state = {
    breadcrumbs: [],
    title      : '',
    subtitle   : ''
};

const getters = {
    breadcrumbs: state => state.breadcrumbs,
    title      : state => state.title,
    subtitle   : state => state.subtitle
};

const actions = {};

const mutations = {
    setTitle(state, {title, subtitle}) {
        state.title = title;
        state.subtitle = subtitle;
    },
    pushBreadcrumb(state, {title, level}) {
        let using = state.breadcrumbs.filter(breadcrumb => breadcrumb.level <= level).forEach(breadcrumb => {
            breadcrumb.active = false;
            return breadcrumb;
        }).sort((a, b) => a - b);
        let found = using.filter(use => use.level === level);
        if (found.length > 0) {
            found[0] = {
                title : title,
                active: true,
                level : level
            }
        } else  {

        }
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}