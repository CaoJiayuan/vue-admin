<template>
    <header class="main-header ">
        <!-- Logo -->
        <a href="#" class="logo shadow-able"  style="position: fixed;">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>A</b>LT</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Admin</b>LTE</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-fixed-top shadow-able">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-envelope-o"></i>
                            <span class="label label-success">4</span>
                        </a>
                    </li>
                    <!-- Notifications: style can be found in dropdown.less -->
                    <li class="dropdown notifications-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                            <span class="label label-warning">10</span>
                        </a>
                    </li>
                    <!-- Tasks: style can be found in dropdown.less -->
                    <li class="dropdown tasks-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-flag-o"></i>
                            <span class="label label-danger">9</span>
                        </a>
                    </li>
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img :src="user.avatar" class="user-image" :alt="user.name">
                            <span class="hidden-xs">{{ user.name }}</span>
                        </a>
                        <ul class="dropdown-menu shadow-able">
                            <li class="text-center">
                                <a href="#">Profile</a>
                            </li>
                            <li class="text-center">
                                <a href="#" @click="signOut">Sign out</a>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

</template>
<script>
    import {mapGetters} from 'vuex';
    import UserApi from '../../app/apis/UserApi';

    export default {
        mounted   : function () {

        },
        data() {
            return {}
        },
        computed  : {
            ...mapGetters({
                user: 'getUser'
            })
        },
        props     : {},
        components: {},
        methods   : {
            signOut() {
                UserApi.logout().then(data => {
                    window.location.href = '/login';
                });
            }
        },
        created   : function () {

        }
    }
</script>
