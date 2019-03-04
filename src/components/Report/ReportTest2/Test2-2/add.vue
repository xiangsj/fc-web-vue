<template>
    <div class="box">
       {{msg}}test2-2 add页面
    </div>
</template>


<script>


	export default {
		data() {
			return {
			    msg:"报表页面",
				tableUserList: [], //用户列表
				searchValue: "",    //查询关键字
				currentPage: 5,
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {

		},
		components: {

		},
	}
</script>

<style scoped>

    .contentBox {
        width: 99%;
        border: 1px solid #ccc;
        margin: -20px auto;
    }

    .top {
        height: 30px;
        width: 100%;
    }

    .top span {
        background-color: #ccc;
        display: inline-block;
        float: right;
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        margin-right: 20px;
    }

    .operationBox {
        height: 60px;
    }

    .filter {
        width: 600px;
        line-height: 60px;
        text-align: left;
        float: left;
        margin: auto;
    }

    .operationBtnBox {
        width: 300px;
        line-height: 60px;
        text-align: right;
        float: right;
        margin: auto;
    }

    .tableBox {
        margin-top: 20px;
        background-color: #fff;

    }

    .pageBox {

        text-align: right;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        padding-right: 20px;
    }

</style>
