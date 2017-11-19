<template>
    <aside class="main-sidebar" style="position: fixed;">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img :src="user.avatar" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>{{ user.name }}</p>
                </div>
            </div>
            <!-- search form -->
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>
            <!-- /.search form -->
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">MAIN NAVIGATION</li>

                <li class="treeview" v-for="nav in navigation">
                    <a href="#">
                        <i :class="nav.icon"></i> <span>{{ nav.display_name }}</span>
                        <span class="pull-right-container" v-if="hasNode(nav)">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu" v-if="hasNode(nav)">
                        <li v-for="child in nav.node"><a href="index2.html"><i
                                :class="child.icon ? child.icon : 'fa fa-circle-o'"></i> {{ child.display_name }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        mounted   : function () {
        },
        data() {
            return {}
        },
        computed  : {
            ...mapGetters({
                navigation: 'getNavigation',
                user      : 'getUser'
            })
        },
        props     : {},
        components: {},
        methods   : {
            hasNode(nav) {
                return nav.node && nav.node.length > 0;
            }
        },
        created   : function () {
            this.$store.dispatch('loadNavigation');
            this.$store.dispatch('loadUser');
        }
    }
</script>