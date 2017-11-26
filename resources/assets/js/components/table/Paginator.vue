<template>
    <div class="row">
        <div class="col-sm-7">
            <ul class="pagination pull-left" v-if="paginator.total > paginator.per_page">
                <li v-if="paginator.prev_page_url" class="click-able">
                    <a aria-label="Previous" @click="changePage(paginator.prev_page_url)"><span
                            aria-hidden="true">&laquo;</span></a>
                </li>
                <li v-for="page in pages" :class="{ 'active': page.page == paginator.current_page }" class="click-able">
                    <a @click="changePage(page.url)" v-if="page.page != paginator.current_page"> {{ page.page}}</a>
                    <a v-else="page.page == paginator.current_page"> {{ page.page }}</a>
                </li>
                <li v-if="paginator.next_page_url" class="click-able">
                    <a aria-label="Next" @click="changePage(paginator.next_page_url)"><span
                            aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>
            <button class="btn btn-primary pull-left table-info table-refresh" @click="refresh"><i class="fa fa-refresh"
                                                                                                   aria-hidden="true"></i>
            </button>
        </div>
        <div class="col-sm-5 table-info">
            <div class="col-sm-3 pull-right">
                <multiselect :options="sizeOptions" v-model="perPage" @select="changeSize" placeholder="条/每页"
                             selectLabel="" deselectLabel="" selectedLabel="已选" :allowEmpty="false"></multiselect>
            </div>
            <p class="pull-right" role="status" aria-live="polite">
                显示{{paginator.from}}到{{paginator.to}}条，共{{paginator.total}}条
            </p>
        </div>
    </div>
</template>

<script>
    import Api from './api';
    import {setQuery} from "../../app/utils";
    import Multiselect from 'vue-multiselect';

    export default {
        data() {
            return {
                paginator : {
                    current_page  : 1,
                    data          : [],
                    first_page_url: null,
                    from          : null,
                    last_page     : null,
                    last_page_url : null,
                    next_page_url : null,
                    path          : null,
                    per_page      : null,
                    prev_page_url : null,
                    to            : null,
                    total         : null,
                },
                perPage   : 15,
                currentUrl: null
            }
        },
        props     : {
            url        : {
                type    : String,
                required: true
            },
            onDataLoad : {
                type   : Function,
                default: data => {
                }
            },
            beforeLoad : {
                type   : Function,
                default: () => {
                }
            },
            onRefresh  : {
                type   : Function,
                default: () => {
                }
            },
            sizeOptions: {
                type   : Array,
                default: () => [10, 15, 30, 50]
            }
        },
        computed  : {
            pages() {
                if (this.paginator.last_page < 2) {
                    return;
                }
                let pages, index, maxPage, start, distance;
                distance = 4;
                pages = [];
                pages.push({
                    url : this.getUrl(1),
                    page: 1
                });
                start = this.paginator.current_page - distance;
                if (start > 2) {
                    pages.push({
                        url : this.getUrl(start - 1),
                        page: '...'
                    })
                } else {
                    start = 2;
                }
                maxPage = this.paginator.current_page + distance;
                if (maxPage > this.paginator.last_page - 1) {
                    maxPage = this.paginator.last_page - 1;
                }
                for (index = start; index < maxPage + 1; index++) {
                    let page = {
                        url : this.getUrl(index),
                        page: index
                    };
                    pages.push(page);
                }
                if (this.paginator.last_page - maxPage > 1) {
                    pages.push({
                        url : this.getUrl(maxPage + 1),
                        page: '...'
                    });
                }
                pages.push({
                    url : this.getUrl(this.paginator.last_page),
                    page: this.paginator.last_page
                });
                return pages;
            }
        },
        components: {Multiselect},
        methods   : {
            changePage(url) {
                this.currentUrl = url;
                this.beforeLoad();
                return Api.getList(url).then(data => {
                    this.paginator = data;
                    this.perPage = data.per_page;
                    this.onDataLoad(data.data);
                    return data;
                })
            },
            getUrl(page) {
                return setQuery(this.currentUrl, {
                    page: page
                });
            },
            changeSize(size) {
                let url = setQuery(this.currentUrl, {
                    per_page: size
                });
               return this.changePage(url)
            },
            sendData(data){
                let url = setQuery(this.currentUrl, data);
                return this.changePage(url);
            },
            refresh() {
                let perPage = this.perPage ? this.perPage : 15;
                let promise = this.changePage(setQuery(this.url, {
                    per_page:perPage
                }));
                this.onRefresh();
                return promise;
            }
        },
        mounted() {
            this.currentUrl = this.url;
            this.changePage(this.url)
        },
        created() {

        },

    }
</script>
<style>
    @import "~vue-multiselect/dist/vue-multiselect.min.css";

    .table-info {
        white-space: nowrap;
        margin: 22px 0;
    }

    .table-info p {
        line-height: 36px;
    }

    .table-refresh {
        border-radius: 5px;
        margin-left: 10px;
    }

    .multiselect__content-wrapper{
        -webkit-box-shadow: 0 1px 3px #c2c4bf;
        -moz-box-shadow: 0 1px 3px #c2c4bf;
        box-shadow: 0 1px 3px #c2c4bf;
    }
</style>