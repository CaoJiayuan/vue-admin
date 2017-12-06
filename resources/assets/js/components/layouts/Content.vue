<template>
    <div class="content-wrapper" style="margin-top: 50px">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                {{ title }}
                <small v-if="subtitle">{{ subtitle }}</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>
        <section class="content">
            <router-view></router-view>
        </section>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default {
        mounted   : function () {
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters({
                'title' : 'title',
                'subtitle' : 'subtitle',
                'breadcrumbs' : 'breadcrumbs'
            })
        },
        props     : {},
        components: {},
        methods   : {

        },
        created   : function () {

        }
    }
</script>
