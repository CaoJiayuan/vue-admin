<template>
    <div class="login-box-body">
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
                <div class="col-xs-8">
                    <div class="checkbox icheck">
                        <label>
                            <input type="checkbox" v-model="user.remember"> Remember Me
                        </label>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-xs-4">
                    <button type="button" class="btn btn-primary btn-block btn-flat" @click="login">Sign In</button>
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
                axios.post('/api/login', this.user).then(response => {
                    window.localStorage.setItem('jwt_token', response.data.access_token);
                    window.location.href = '/';
                }).catch(error => {
                    window.console.log(error)
                })
            }
        },
        created   : function () {

        }
    }
</script>