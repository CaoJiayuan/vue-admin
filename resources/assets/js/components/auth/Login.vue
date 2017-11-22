<template>
    <div class="login-box-body  shadow-able">
        <p class="login-box-msg">Sign in to start your session</p>

        <form>
            <div class="form-group has-feedback">
                <input v-model="user.email" type="email" class="form-control" placeholder="Email">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input v-model="user.password" type="password" class="form-control" placeholder="Password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <!-- /.col -->
                <div class="col-xs-6 col-xs-offset-3">
                    <button type="button" class="btn btn-primary btn-block btn-flat" @click="login">Sign In</button>
                </div>
                <!-- /.col -->
            </div>
        </form>

    </div>
</template>
<script>
    import {toastrNotification} from '../../app/utils';
    import UserApi from '../../app/apis/UserApi';
    export default {
        mounted   : function () {
        },
        data() {
            return {
                user : {
                    email : '',
                    password : '',
                    remember : false
                }
            }
        },
        props     : {},
        components: {},
        methods   : {
            login(){
                UserApi.login(this.user).then(data => {
                    window.localStorage.setItem('jwt_token', data.access_token);
                    window.location.href = '/';
                });
            }
        },
        created   : function () {

        }
    }
</script>
