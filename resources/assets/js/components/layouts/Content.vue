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
                        <div class="box-header">Users</div>
                        <div class="box-body">
                            <datatable api-url="/api/users" :fields="fields"></datatable>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
</template>
<script>
    import Datatable from '../table/Datatable.vue';

    const fields = [
        {
            name        : 'avatar',
            display_name: '头像'
        },
        {
            name        : 'name',
            display_name: '姓名',
            sort        : 'name'
        },
        {
            name        : 'email',
            display_name: 'email'
        }
    ];
    export default {
        mounted   : function () {
        },
        data() {
            return {
                fields: fields
            }
        },
        props     : {},
        components: {Datatable},
        methods   : {},
        created   : function () {

        }
    }
</script>
