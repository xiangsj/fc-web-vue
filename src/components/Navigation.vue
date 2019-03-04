<template>
  <div class="box">
    <div class="top">
      <div class="topLeft">
        <p class="p1">欢迎使用精点软件</p>
        <p class="p2">精点 . 让美业生意更好做</p>
      </div>
      <div class="topRight">
        <img src="../../static/images/msg.png" alt="">
        <img src="../../static/images/off.png" alt="">
      </div>
    </div>


    <div class="container">
      <div class="rowItem">
        <div class="title">常用系统</div>
        <ul>
          <li>
            <router-link :to="{path:`/cashier/cashierHome/`}"><img src="../../static/images/navigation_01.png"
                                                                   @mouseover="checkImg"></router-link>
          </li>
          <li class="lil">
            <router-link :to="{path:`/manager/home/`}"><img ref="imgsrc" src="../../static/images/navigation_02.png"
                                                            @mouseover="checkImg"></router-link>
          </li>
          <li class="lil"><a href="#"><img src="../../static/images/navigation_03.png"></img></a></li>
          <li class="lil"><a href="#"><img src="../../static/images/navigation_04.png"></img></a></li>
        </ul>
      </div>

      <div class="rowItem">
        <div class="title">营销模式</div>
        <ul>
          <li><a href="#"><img src="../../static/images/navigation_05.png"></img></a></li>
          <li class="lil"><a href="#"><img src="../../static/images/navigation_06.png"></img></a></li>

        </ul>
      </div>

      <div class="rowItem">
        <div class="title">移动店务</div>
        <ul>
          <li><a href="#"><img src="../../static/images/navigation_07.png"></img></a></li>
          <li class="lil"><a href="#"><img src="../../static/images/navigation_08.png"></img></a></li>

        </ul>

      </div>
    </div>

  </div>
</template>


<script>
  import {LoginApi} from "../config/Api.js"
  import validate from "../common/validata.js"

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        checked: true,
        form: {
          number: "",
          name: "",
          password: "",
        },

      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      checkImg() {
        //this.$refs.imgsrc.src="../../static/images/yg.png"
      }
    },

    components: {},
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    margin: 0;
    background: url(../../static/images/bluebackg.png) no-repeat;
    background-size: cover;
    -moz-background-size: 100% 100%;
  }

  .top {
    width: 100%;
    height: 12%;
  }

  .topLeft {
    float: left;
    width: 40%;
    height: 100%;
    margin-left: 80px;
  }

  .p1 {
    height: 48px;
    line-height: 48px;
    text-align: left;
    font-family: "Microsoft YaHei";
    font-size: 48px;
    color: #ececec;
    margin-top: 20px;

  }

  .p2 {
    height: 48px;
    line-height: 48px;
    text-align: left;
    font-family: "Microsoft YaHei", serif;
    font-size: 24px;
    color: #e5e4e4;
    margin-top: -45px;

  }

  .topRight {
    height: 100%;
    text-align: right;
    padding-top: 30px;
    padding-right: 20px;
  }

  .topRight img {
    margin-right: 30px;
  }

  .container {
    width: 90%;
    height: 85%;
    margin-right: 0;
  }

  .rowItem {
    height: 29%;
    margin-left: 80px;
    margin-top: 20px;
  }

  .title {
    font-family: "Microsoft YaHei";
    font-size: 30px;
    color: #ffffff;
    font-weight: bold;
    text-align: left;
    margin-left: 0;
    margin-bottom: 10px;
  }

  ul {
    margin-top: 2px;
  }

  ul li {
    height: auto;
    width: 220px;
    float: left;
    list-style: none;
    margin-left: -38px;
  }

  .lil {
    margin-left: 60px;
  }

</style>
