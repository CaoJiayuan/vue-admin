<template>
    <div class="content-wrapper" style="margin-top: 50px">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Dashboard
                <small>Control panel</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="box">
                        <div class="box-header">
                            <div class="box-title">
                                Users
                            </div>
                            <div class="box-tools col-sm-3">
                                <div class="input-group input-group-sm">
                                    <input type="text" name="filter" v-model="filter" class="form-control pull-right"
                                           placeholder="Search" @input="search">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-default"><i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-body">
                            <datatable api-url="/api/users" :fields="fields" :actions="actions" ref="table"></datatable>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal modal-info fade in" id="img-preview">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                    </div>
                    <img :src="img" alt="" class="img-responsive center-block" style="width: 100%;">
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.content -->
    </div>
</template>
<script>
    import Datatable from '../table/Datatable.vue';
    import {throttle} from "../../app/utils";

    const fields = [
        {
            name        : 'id',
            display_name: 'ID',
            sort        : 'id'
        },
        {
            name        : 'avatar',
            display_name: '头像',
            callback    : 'showImage',
            click       : 'preview'
        },
        {
            name        : 'name',
            display_name: '姓名',
            sort        : 'name'
        },
        {
            name        : 'email',
            display_name: 'email',
            sort        : 'email'
        },
        {
            name        : 'created_at',
            display_name: '创建时间',
            sort        : 'created_at'
        }
    ];
    const actions = [
        {
            display_name: '编辑',
            click       : 'edit',
            display     : 'displayEdit'
        },
        {
            display_name: '删除',
            class       : 'btn btn-sm btn-danger',
            granted     : 'grantDelete'
        },
    ];
    export default {
        mounted   : function () {
        },
        data() {
            return {
                fields : fields,
                actions: actions,
                img    : null,
                filter : null
            }
        },
        props     : {},
        components: {Datatable},
        methods   : {
            showImage(img) {
                return `<img src="${img}" class="img-responsive center-block" style="height: 50px;"/>`
            },
            preview(img) {
                this.img = img;
                this.$nextTick(() => $('#img-preview').modal('show'))
            },
            edit(item) {
                window.console.log(JSON.stringify(item))
            },
            displayEdit(item) {
                return item.id > 10;
            },
            grantDelete() {
                return true;
            },
            search() {
                throttle(() => {
                    this.$refs.table.search(this.filter);
                }, 500)
            }
        },
        created   : function () {

        }
    }
</script>
