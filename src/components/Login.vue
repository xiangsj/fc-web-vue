<template>
    <div class="box">
        <div class="top">
            <div class="topContainer">
                <div class="topLeft"><img src="../../static/images/font.png" alt="" style="padding-top: 20px;"></div>
                <div class="topRight">客服电话：400651792</div>
            </div>
        </div>
        <div class="container">
            <div class="left">
                <img src="../../static/images/show.png" alt="" style="margin: 50px auto;">
            </div>
            <div class="right" >
                <div class="formBox" ref="forgetPwd">
                    <div class="title"><span>用户登录</span></div>
                    <el-form ref="myForm" :model="form" :rules="rules" status-icon
                             class="form">

                        <el-form-item prop="code" label="">
                            <el-input v-model="form.code" placeholder="请输入连锁代码">
                                <template slot="prepend">.</template>
                            </el-input>

                        </el-form-item>

                        <el-form-item prop="name">

                            <el-input v-model="form.name" placeholder="请输入用户名/邮箱/手机号">
                                <template slot="prepend">.</template>

                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input type="password" v-model="form.password" placeholder="请输入密码">
                                <template slot="prepend">.</template>
                            </el-input>

                        </el-form-item>

                        <el-form-item prop="checkme">
                            <div class="optionBox">
                                <div class="checkme">
                                    <el-checkbox v-model="checked">记住用户名</el-checkbox>
                                </div>
                                <span class="forgetPwd">忘记密码?</span>
                            </div>
                        </el-form-item>


                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('myForm')" class="bigBtn" :loading="loadingFlag">登录</el-button>
                            <a href="#" style="text-align: center">注册</a>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
        </div>
        <div class="footer">

            <p>©2008-2018上海精点信息科技有限公司 上海翡粹信息科技有限公司 版本号V10.0</p>
            <p>沪ICP备15041644号</p>
        </div>


    </div>
</template>


<script>
	import {UserLoginApi} from "../config/Api.js"
	import validate from "../common/validata.js"

	export default {
		data() {
			//自定义校验
			var nameValidator = (rule, value, callback) => {
				if (!validate.isChar(value)) {
					return callback(new Error("格式不正确"));
				}
				callback();

			};

			return {
                loadingFlag:false,
				checked: false,
				form: {
					code: "",
					name: "",
					password: "",
				},
				rules: {
					//校验用户名账号不能为空
					code: [
						{required: true, message: '连锁代码不能为空', trigger: 'blur'},
					],
					name: [
						{required: true, message: '用户名不能为空', trigger: 'blur'},
					],
					password: [
						{required: true, message: '密码不能为空', trigger: 'blur'},
					],
				},
			}
		},
		created() {
            this.getUserInfo()
		},
		mounted() {

		},
		methods: {
			// 登录
			login() {
			    this.loadingFlag = true;
				let params = {
					UserName: this.form.name,
					UserPwd: this.form.password,
					CuCode: this.form.code
				};
				this.$http.post(UserLoginApi, this.$qs.stringify(params)).then(resp => {
					if (resp.data.code === 0) {
					               this.$store.state.FeName=resp.data.data.Fe_Name;
                        this.loadingFlag = false;
                        localStorage.setItem("Ticket", JSON.stringify(resp.data.data.Ticket));
                        if (this.checked) {
                            console.log(this.checked);
                            localStorage.removeItem("userInfo");
                            localStorage.setItem("userInfo", JSON.stringify(params));
                        }
                        this.$router.push("/navigation");
                    }
				}).catch(e => {
				    //捕获异常
                    this.loadingFlag = false;
				});
			},

            //登录时校验用户信息
			onSubmit(formVal) {
				this.$refs[formVal].validate((valid) => {
					if (valid) {
						this.login();
					} else {
						this.$notify.error({
							title: '错误',
							message: '这是一条错误的提示消息'
						});
						return false;
					}

				});

			},

			/**
			 * 记住我设置用户信息
			 */
			getUserInfo() {
				let userInfo = JSON.parse(localStorage.getItem("userInfo"));
				if (userInfo) {
					this.form.code = userInfo.CuCode;
					this.form.name = userInfo.UserName;
					this.form.password = userInfo.UserPwd;
					this.checked = true
				}

			},
/*
            forgetPassword(){
                this.$refs.forgetPwd.style.display="none";
            }*/
		},


		components: {},
	}
</script>

<style scoped>
    .box {
        width: 100%;
        height: 100%;
        background-color: #fff;

    }

    .top {
        height: 136px;
        background-color: #fff;

    }

    .topContainer {
        width: 100%;
        height: 100%;
    }

    .topLeft {
        height: 100%;
        width: 40%;
        display: inline-block;
        margin-left: 0px;
        text-align: center;
    }

    .topRight {
        height: 136px;
        width: 50%;
        display: inline-block;
        line-height: 136px;
        text-align: center;
        vertical-align: middle;
        font-family: "Microsoft YaHei";
        font-size: 30px;
        color: #7d7d7d;
        margin-top: -45px;
    }

    .container {
        height: 645px;
        background-color: #ddd;
        background-image: url("../../static/images/background.png");
        background-repeat: no-repeat;
        background-position: right;
        position: relative;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }

    .left {
        position: absolute;
        left: 0;
        top: 0;
        width: 60%;

    }

    .right {
        margin-left: 60%;
        border-style: solid;
        border-width: 1px;
        border-color: transparent;;
        height: 100%;

    }

    .formBox {
        width: 460px;
        height: 430px;
        background-color: #fff;
        border-radius: 4px;
        margin: 80px auto;
        margin-left: 80px;

    }

    .title {
        height: 80px;
        line-height: 80px;
        text-align: center;
        vertical-align: middle;
        margin-top: 30px;
    }

    .title span {
        line-height: 60px;
        text-align: center;
        vertical-align: middle;
        font-family: "Microsoft YaHei";
        font-size: 26px;
        color: #7d7d7d;
        font-weight: bold;
    }

    .form {
        width: 362px;
        margin: auto;

    }

    .optionBox {
        width: 362px;
        height: 40px;
    }

    .checkme {
        display: inline-block;
        width: 120px;
        margin-left: 0px;
        float: left;
    }

    .forgetPwd {
        display: inline-block;
        width: 230px;
        text-align: right;
        text-decoration: none;
        color: #409EFF;
        cursor: pointer;;
    }


    .bigBtn {
        width: 360px;
    }

    .footer {
        clear: both;
        background-color: #fff;
    }


</style>
