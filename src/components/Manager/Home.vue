<template>
  <div class="box">
    <el-container style="height:100%;">
      <!--头部部分-->
      <el-header style="height: 42px">
        <div class="topleft">
          <img @click="returnBack" src="../../../static/images/treturn.png" alt="" align="left"
               vertical-align="middle"
               style="margin-top: 10px;margin-left: 10px">
          <img src="../../../static/images/topjdfont.png" alt="" style="margin-top:6px">
        </div>

        <div class="topmiddle">
          <img class="imgs" src="../../../static/images/thelp.png" alt="" align="left" title="帮助">
          <img class="imgs" src="../../../static/images/tzd.png" alt="" align="left" title="显示或隐藏菜单"
               style="margin-top:12px"
               @click="isCollapseMenu">
          <img @click="pgeRefresh" class="imgs" src="../../../static/images/tsx.png" alt="" align="left"
               title="刷新">
          <img :src="navigateImageUrl" alt="" align="center" style="margin-top: 10px"
               @click="showOrHidenMenu">
        </div>

        <div class="topHomeRight">
          <span><img src="../../../static/images/tkf.png" alt="" title="客服" align="absmiddle"
                     style="margin-top:8px"></span>
          <span><img src="../../../static/images/tme.png" alt="" title="消息" align="absmiddle"
                     style="margin-top: 6px"></span>
          <span>
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                <img src="../../../static/images/tme.png" alt="" align="absmiddle"
                                     style="margin-top: 6px">
                                <i class="el-icon-arrow-down "></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" ref="dddd" style="width: 120px">
                                <el-dropdown-item command="modifyUserPassword">修改密码</el-dropdown-item>
                                <el-dropdown-item command="logoutSystem">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
        </div>
      </el-header>

      <el-container>
        <!--左侧菜单-->
        <el-menu default-active="2" class="menuStyle" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i><img src="../../../static/images/menuSystemManger.png" alt=""></i>&nbsp;&nbsp;
              <span class="menuTitle">系统管理</span>
            </template>

            <el-menu-item-group class="menuImg">
              <router-link :to="{name:`systemManagerIndex`}">
                <el-menu-item index="1-1">
                                    <span class="submenuimg">
                                    <img src="../../../static/images/submenu01.png" align="absmiddle" alt="">
                                    </span>
                  <span class="submenufont">用户</span>
                </el-menu-item>
              </router-link>
              <router-link :to="{name:`systemManagerRoleIndex`}">
                <el-menu-item index="1-2">
                                    <span class="submenuimg">
                                    <img src="../../../static/images/submenu02.png" align="absmiddle" alt="">
                                    </span>
                  <span class="submenufont">角色</span>
                </el-menu-item>
              </router-link>
              <router-link :to="{name:`managerMenuList`}">
                <el-menu-item index="1-3">
                                <span class="submenuimg">
                                    <img src="../../../static/images/submenu03.png" align="absmiddle" alt="">
                                    </span>
                  <span class="submenufont">菜单</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i><img src="../../../static/images/menuLocalUnfo.png" alt=""></i>&nbsp;&nbsp;
              <span class="menuTitle">基础信息设置</span>
            </template>
            <el-menu-item-group>

              <router-link :to="{name:'payMethodPay'}">
                <el-menu-item index="2-1">
                  <span class="submenuimg"><img src="../../../static/images/submenu2-01.png" alt=""
                                                align="absmiddle"></span>
                  <span class="submenufont">支付方式</span>
                </el-menu-item>
              </router-link>

              <router-link :to="{name:'displaySupplier'}">
                <el-menu-item index="2-2">
                <span class="submenuimg"><img src="../../../static/images/submenu2-02.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">供应商</span>
                </el-menu-item>
              </router-link>

              <router-link :to="{name:'indexRoom'}">
                <el-menu-item index="2-3">
                <span class="submenuimg"><img src="../../../static/images/submenu2-03.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">房间</span>
                </el-menu-item>
              </router-link>

              <router-link :to="{name:'paramConfigIndex'}">
                <el-menu-item index="2-4">
                <span class="submenuimg"><img src="../../../static/images/submenu2-04.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">参数配置</span>
                </el-menu-item>
              </router-link>
              <router-link :to="{name:'CardIndex'}">
                <el-menu-item index="2-5">
                <span class="submenuimg"><img src="../../../static/images/submenu2-05.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">卡级类别</span>
                </el-menu-item>
              </router-link>
              <router-link :to="{name:'storeManagerIndex'}">
                <el-menu-item index="2-6">
                <span class="submenuimg"><img src="../../../static/images/submenu2-06.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">门店层级管理</span>
                </el-menu-item>
              </router-link>

              <router-link :to="{name:'indexEmployeeManager'}">
                <el-menu-item index="2-7">
                <span class="submenuimg"><img src="../../../static/images/submenu2-07.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">员工管理</span>
                </el-menu-item>
              </router-link>

              <router-link :to="{name:'indexProject'}">
                <el-menu-item index="2-8">
                <span class="submenuimg"><img src="../../../static/images/submenu2-08.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">项目管理</span>
                </el-menu-item>
              </router-link>

              <router-link :to="{name:'productIndex'}">
                <el-menu-item index="2-9">
                <span class="submenuimg"><img src="../../../static/images/product.png" alt=""
                                              align="absmiddle"></span>
                  <span class="submenufont">产品管理</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i><img src="../../../static/images/managerIcon.png" alt=""></i>&nbsp;&nbsp;
              <span class="menuTitle">会员管理</span>
            </template>
            <el-menu-item-group>
              <router-link :to="{name:'ManagershipList'}">
                <el-menu-item index="3-1">
                  <span class="submenuimg"><img src="../../../static/images/member_info.png" alt=""
                                                align="absmiddle"></span>
                  <span class="submenufont">会员信息</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i><img src="../../../static/images/cashier_center.png" alt=""></i>&nbsp;&nbsp;
              <span class="menuTitle">收银买单</span>
            </template>
            <el-menu-item-group>

              <router-link :to="{name:'payMethodPay'}">
                <el-menu-item index="4-1">
                  <span class="submenuimg"><img src="../../../static/images/cashier_icon.png" alt=""
                                                align="absmiddle"></span>
                  <span class="submenufont">前台收银</span>
                </el-menu-item>
              </router-link>
              <el-menu-item index="4-2">
                  <span class="submenuimg"><img src="../../../static/images/order_icon.png" alt=""
                                                align="absmiddle"></span>
                <span class="submenufont">订单</span>
              </el-menu-item>
              <router-link :to="{name:'CardsList'}">
                <el-menu-item index="4-3">
                  <span class="submenuimg"><img src="../../../static/images/sell_card.png" alt=""
                                                align="absmiddle"></span>
                  <span class="submenufont">卖卡</span>
                </el-menu-item>
              </router-link>
              <el-menu-item index="4-4">
                  <span class="submenuimg"><img src="../../../static/images/recharge.png" alt=""
                                                align="absmiddle"></span>
                <span class="submenufont">充值</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>

        <!--tags-->


        <!--主要内容部分-->
        <el-main>
          <div ref="menuBox" :class="{menuBox:true}" :style="aa" v-show="navigateIsshow" @mouseover="" @mouseout="">
            <!--点击显示项目模块菜单-->
            <!-- swiper -->
            <swiper :options="swiperOption">
              <swiper-slide><img :src="navigateImageList[0]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[1]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[2]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[3]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[4]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[5]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[6]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[7]"></swiper-slide>
              <swiper-slide><img :src="navigateImageList[8]"></swiper-slide>
              <!--   <div class="swiper-pagination" slot="pagination"></div>-->
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <router-view></router-view>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
  import {MenuTreeApi} from "../../config/Api.js"

  export default {
    data() {
      return {
        dropDownStyle: {
          top: "10px",
          border: "1px solid #0cf",
        },
        aa: {border: '1px solid #0cf'},
        isCollapse: false,
        border: "border: 1px solid #0cf",
        status: false,
        navigateIsshow: false,
        navigateImageUrl: "../../../static/images/down.png",
        navigateImageList: [
          "../../../static/images/sm_menu01.png",
          "../../../static/images/sm_menu02.png",
          "../../../static/images/sm_menu03.png",
          "../../../static/images/sm_menu04.png",
          "../../../static/images/sm_menu05.png",
          "../../../static/images/sm_menu06.png",
          "../../../static/images/sm_menu07.png",
          "../../../static/images/sm_menu08.png",
        ],
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: -50,
          slidesPerGroup: 5,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        menu: [],
      }
    },

    components: {},

    created() {
      /*this.getMenuList()*/
    },

    mounted() {

    },

    computed: {},

    methods: {
      //获取菜单
      getMenuList() {
        this.$http.post(MenuTreeApi).then(resp => {
          console.log(resp.data.data);
          this.menu = resp.data.data
        })
      },
      setDropDownStyle() {
        this.dropDownStyle = {
          top: "0px",
        };
      },

      //子菜单开关
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      //点击折叠图标显示管理中心菜单
      showOrHidenMenu() {
        if (this.navigateIsshow) {
          console.log(true);
          this.navigateImageUrl = "../../../static/images/down.png";
        } else {
          console.log(false);
          this.navigateImageUrl = "../../../static/images/up.png";
        }
        this.navigateIsshow = !this.navigateIsshow;
      },

      /*	hideMenu() {
                    this.navigateImageUrl = "../../../static/images/tme.png";
                    this.navigateIsshow = false;
                },*/

      //是否折叠左边菜单
      isCollapseMenu() {
        if (this.isCollapse) {
          this.isCollapse = !this.isCollapse
        } else {
          this.isCollapse = !this.isCollapse
        }
      },

      //返回上一级菜单
      returnBack() {
        this.$router.go(-1);//返回上一页
      },

      //刷新功能
      pgeRefresh() {
        console.log("刷新页面");
        window.location.href = location.href
      },

      //处理下拉菜单选项
      handleCommand(command) {
        switch (command) {
          case "modifyUserPassword":
            this.$message('click on item modifyUserPassword');
            break;

          case "logoutSystem": //退出系统
            location.href = "/";
            break;
        }

      }


    },

  }
</script>


<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-image: url("../../../static/images/topbackground.png");
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

  }

  .topleft {
    height: 100%;
    width: 200px;
    margin-left: -20px;
    float: left;
  }

  .topmiddle {
    height: 100%;
    width: calc(100% - 510px);
    float: left;

  }

  .imgs {
    margin-top: 10px;
    margin-left: 40px;
  }

  .submenuimg {
    display: inline-block;
    text-align: right;
  }

  .submenufont {
    display: inline-block;
    width: 80px;
    text-align: left;
    margin-left: 2px;
  }

  .topHomeRight {
    height: 42px;
    width: 300px;
    float: right;
  }

  .topHomeRight span {
    display: inline-block;
    width: 80px;
    margin-left: 0px;
    height: 34px;
    line-height: 34px;
    text-align: right;

  }

  .menuStyle:not(.el-menu--collapse) {
    width: 200px;
    background-color: #f0f8ff;
    text-align: center;
    line-height: calc(100% - 60px);
    min-height: 400px;
    overflow:auto;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .menuBox {
    position: absolute;
    left: 25%;
    background-color: #fff;
    width: 45%;
    border-radius: 4px;
    text-align: center;
    margin: -20px auto;
    zoom: normal;
    z-index: 1001;
    color: #fff;
    font-weight: bold;
    overflow: hidden;
  }

  .menuBox ul {
    height: 145px;
  }

  .menuBox ul li {
    list-style: none;
    float: left;
    margin-left: 20px;
  }

  .el-main {
    clear: both;
    background-color: #f1f4f6;
    margin-top: 0;
  }


</style>
