<template>
    <div>
        <table class="table dataTable" :class="tableClass" :id="tableId">
            <thead>
            <tr>
                <template v-for="field in fields">
                    <th :class="thClass(field)" v-if="field.sort" @click="sorting(field.sort)">
                        {{ field.display_name }}
                    </th>
                    <th v-else>{{ field.display_name }}</th>
                </template>
                <th v-if="actions.length > 0 && grantActions > 0" class="text-center">操作</th>
            </tr>
            <tr class="progress table-progress" v-if="requesting">
                <th :colspan="loadCol" style="border:none;padding: 0;height: 6px;">
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100"
                         aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
                <template v-for="field in fields">
                    <td v-html="renderField(item, field.name, field.callback)" v-if="field.click"
                        @click="renderField(item, field.name, field.click)"></td>
                    <td v-html="renderField(item, field.name, field.callback)" v-else>
                    </td>
                </template>
                <td v-if="actions.length > 0 && grantActions > 0" class="text-center">
                    <div class="btn-group">
                        <button :class="action.class ? action.class : 'btn btn-sm btn-primary'"
                                v-for="action in actions" @click="applyParentCallback(action.click, item)"
                                v-if="displayAction(item, action)">
                            {{ action.display_name }}
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <slot name="placeholder" v-if="items.length < 1 && requested">
            <div class="text-center col-lg-12 table-placeholder">
                还没有相关数据
            </div>
        </slot>
        <paginator :url="apiUrl" :onDataLoad="onDataLoad" :beforeLoad="beforeLoad" ref="paginator"
                   :onRefresh="refresh"></paginator>
    </div>
</template>

<script>
    import 'datatables/media/js/jquery.dataTables'
    import collect from 'collect.js';
    import * as _ from "lodash";
    import Paginator from './Paginator.vue';
    import {randomString} from "../../app/utils";
    import * as Chance from "chance";

    export default {
        data() {
            return {
                sort          : {},
                items         : [],
                requested     : false,
                requesting    : false,
                displayActions: {}
            }
        },
        props     : {
            apiUrl    : {
                type    : String,
                required: true
            },
            fields    : {
                type   : Array,
                default: () => []
            },
            tableClass: {
                type   : String,
                default: () => 'table-bordered table-hover'
            },
            actions   : {
                type   : Array,
                default: () => []
            }
        },
        computed  : {
            theads() {
                return collect(this.fields).pluck('display_name').all();
            },
            tableId() {
                return 'datatable' + _.random(1, 50);
            },
            loadCol() {
                let count = this.fields.length;
                if (this.actions.length > 0) {
                    count += 1;
                }
                return count;
            },
            grantActions() {
                return this.actions.filter(action => action.granted).length;
            }
        },
        components: {Paginator},
        methods   : {
            thClass(field) {
                if (field.sort) {
                    let clz = 'sorting ';
                    if (this.sort.name === field.sort) {
                        clz += 'sorting_' + this.sort.sort;
                    }
                    return clz
                }
                return '';
            },
            onDataLoad(data) {
                this.items = data;
                this.requested = true;
                this.requesting = false;
                this.$nextTick(() => {
                    $(this.tableId).dataTable()
                })
            },
            beforeLoad() {
                this.requesting = true;
            },
            sorting(name) {
                if (this.sort.name === name) {
                    this.sort.sort = this.sort.sort === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sort = {
                        name: name,
                        sort: 'asc'
                    }
                }
                this.$refs.paginator.sendData({sort: this.sort.name + '|' + this.sort.sort, page: 1});
            },
            refresh() {
                this.sort = {};
            },
            reload() {
                return this.$refs.paginator.refresh();
            },
            renderField(item, name, callback) {
                let value = item[name];
                let cb = this.getParentCallback(callback);
                if (cb) {
                    return cb.apply(this.$parent, [value, item]);
                }
                return value;
            },
            getParentCallback(cb) {
                let $parent = this.$parent;
                if (cb && $parent.hasOwnProperty(cb) && _.isFunction($parent[cb])) {
                    return $parent[cb];
                }
                return false;
            },
            applyParentCallback(cb, ...args) {
                let $parent = this.$parent;
                let callback = this.getParentCallback(cb);
                if (callback) {
                    return callback.apply($parent, args);
                }
                return false;
            },
            displayAction(item, action) {
                if (!action.granted) {
                    return false;
                }
                let display = true;
                if (action.display !== undefined) {
                    if (this.getParentCallback(action.display)) {
                        display = this.applyParentCallback(action.display, item)
                    } else {
                        display = action.display
                    }
                }
                return display;
            },
            fixActions() {
                this.actions.forEach(action => {
                    action.id = randomString();
                    let granted = true;
                    if (action.granted !== undefined) {
                        if (this.getParentCallback(action.granted)) {
                            granted = this.applyParentCallback(action.granted)
                        } else {
                            granted = action.granted
                        }
                    }
                    action.granted = granted;
                });
            },
            sendData(data) {
                return this.$refs.paginator.sendData(data);
            },
            search(filter) {
                if (!filter || filter.length < 1){
                    return this.reload();
                }

                return this.sendData({
                    filter: filter
                })
            }
        },
        mounted() {
            this.fixActions();
        },
        created() {

        },

    }
</script>
<style>
    .table-placeholder {
        height: 100px;
        line-height: 100px;
        background-color: #f5f5f5;
    }

    .table-progress {
        height: 6px;
        margin: 0;
        padding: 0;
    }
</style>