<template>
    <div class="box">
        <div style="border: 1px solid #ccc;width: 200px;height: 900px;float: left">我是左边菜单</div>
        <div style="border: 1px solid #0cf;width: 800px;height: 900px;float: right">
            <router-view></router-view>
        </div>


    </div>
</template>

<script>


    export default {
        data() {
            return {


            }
        },
        created() {

        },
        mounted() {
            console.log("mounted");
        },
        methods: {


        },

        components: {}

    }
</script>

<style scoped>
    .box {
        width: 100%;
        height: 100%;
        background-color: #dfe4ed;
    }

</style>
