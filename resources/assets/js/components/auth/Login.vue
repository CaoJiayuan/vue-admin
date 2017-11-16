<template>
    <div class="login-box-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form action="../../index2.html" method="post">
            <div class="form-group has-feedback">
                <input type="email" class="form-control" placeholder="Email">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="Password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-8">
                    <div class="checkbox icheck">
                        <label>
                            <input type="checkbox"> Remember Me
                        </label>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                </div>
                <!-- /.col -->
            </div>
        </form>

    </div>
</template>
<script>
    export default {
        mounted   : function () {
           this.$nextTick(() => {
               $('.icheck').iCheck({
                   checkboxClass: 'icheckbox_square-blue',
                   radioClass: 'iradio_square-blue',
                   increaseArea: '20%' // optional
               });
           })
        },
        data() {
            return {}
        },
        props     : {},
        components: {},
        methods   : {},
        created   : function () {

        }
    }
</script>