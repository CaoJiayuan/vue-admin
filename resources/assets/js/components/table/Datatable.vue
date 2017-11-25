<template>
    <div>
        <table class="table dataTable" :class="tableClass" :id="tableId">
            <thead>
            <tr>
                <template v-for="field in fields">
                    <th :class="thClass(field)" v-if="field.sort" @click="sorting(field.sort)">{{ field.display_name }}</th>
                    <th v-else>{{ field.display_name }}</th>
                </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
                <td v-for="field in fields">{{ item[field.name] }}</td>
            </tr>
            </tbody>
        </table>
        <slot name="placeholder" v-if="items.length < 1">
            <div class="text-center col-lg-12 table-placeholder">
                还没有相关数据
            </div>
        </slot>
        <paginator :url="apiUrl" :onDataLoad="onDataLoad"></paginator>
    </div>
</template>

<script>
    import 'datatables/media/js/jquery.dataTables'
    import collect from 'collect.js';
    import * as _ from "lodash";
    import Paginator from './Paginator.vue';

    export default {
        data() {
            return {
                sorts: [],
                items: []
            }
        },
        props     : {
            apiUrl    : {
                type    : String,
                required: true
            },
            fields    : {
                type    : Array,
                required: true
            },
            tableClass: {
                type   : String,
                default: () => 'table-bordered table-hover'
            }
        },
        computed  : {
            theads() {
                return collect(this.fields).pluck('display_name').all();
            },
            tableId() {
                return 'datatable' + _.random(1, 50);
            }
        },
        components: {Paginator},
        methods   : {
            thClass(field) {
                if (field.sort) {
                    let clz = 'sorting ';
                    let thisSort = this.sorts.filter(sort => sort.name === field.sort);
                    if (thisSort.length > 0) {
                        let sort = _.head(thisSort);
                        clz +=  'sorting_' + sort.sort;
                    }
                    return clz
                }
                return '';
            },
            onDataLoad(data) {
                this.items = data;
                this.$nextTick(() => {
                    $(this.tableId).dataTable()
                })
            },
            sorting(name){
                let thisSort = this.sorts.filter(sort => sort.name === name);
                if (thisSort.length > 0){
                    thisSort[0].sort = thisSort[0].sort === 'asc' ? 'desc' : 'asc'
                } else {
                    let s = {
                        name:name,
                        sort:'asc'
                    };
                    this.sorts.push(s)
                }
            }
        },
        mounted() {

        },
        created() {

        },

    }
</script>
<style>
    @import "~datatables/media/css/jquery.dataTables.css";
    .table-placeholder{
        height:100px;
        line-height:100px;
        background-color: #f5f5f5;
    }
</style>