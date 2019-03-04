<template>
  <div class="CardsDiv">

    <!--搜索部分-->
    <div class="queryMemberDiv">
      <el-input v-model="namePhone" style="width: 30%;margin-left: 10px;float: left;" placeholder="请输入会员名/手机号"
                @focus="clickQuery" v-on:input.native="clickQuery"></el-input>
      <div class="nav" v-if="showInfoResult">
        <ul id="example-1">
          <li v-for="item in memberInfoList" v-on:click="itemClick(item)">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.Me_Code}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.Me_Tel}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.Me_Name }}</span>
          </li>
        </ul>
      </div>
      <div style="float: left;margin-left: 10px;">
        <img src="../../../../static/images/scan_icon.png" @click="scanClick"></div>
      <el-input v-model="manualNumber" style="width: 20%;margin-left: 30px;"
                placeholder="输入手工单号"></el-input>
      <span style="width: 20%;margin-left: 30px;">分店名称：{{this.$store.state.FeName}}</span>
      <el-button type="primary" style="float: right"
                 icon="el-icon-circle-plus-outline" @click="addCardMember">添加
      </el-button>
    </div>


    <AddMemberDialog ref="addCardParam" @AddMemberEmit="AddMemberEmit" :MoreSubmit="false"></AddMemberDialog>

    <!--会员信息部分-隐藏-->
    <div v-if="memberInfoIsShow" class="memberInfoDiv">
      <div class="memberInfoItem">
        <!--<div style="height: 100%; flex-direction: row;">-->
        <!--<img src="{{headImg}}" v-model="headImg">-->
        会员名： <span v-model="name" style="vertical-align: center;color: #3a8ee6;">{{name}}</span>
        <br/>
        <span v-model="tel">手机号：{{tel}}</span>
        <!--</div>-->
      </div>
      <img src="../../../../static/images/gray_line.png" style="float: left;">
      <div class="memberInfoItem">
        <span v-model="memberCode">会员号：{{memberCode}}</span>
        <br/>
        <span v-model="CardCount">持卡：{{CardCount}}张</span>
      </div>
      <img src="../../../../static/images/gray_line.png" style="float: left;">
      <div class="memberInfoItem">
        <span v-model="OrderCount">本月：{{OrderCount}}次</span>
      </div>
    </div>

    <!--卖卡部分-->
    <div class="sellCardsDiv">
      <el-tabs type="border-card">
        <el-tab-pane label="卖卡" style="height: 500px;overflow: hidden;position: relative;">
          <!--默认显示图片-->
          <div class="imgDisplay" v-if="cardsIsShow">
            <img src="../../../../static/images/search_big_icon.png" @click="SelectCards">
            <h3 @click="SelectCards">点击选择您要购买的卡</h3>
          </div>

          <div v-if="payMoneyIsShow"
               style="overflow-y:scroll;height: 100%;position: absolute;left: 0;top: 0;right: -17px;">
            <!--111111111111111111111111-->
            <div v-for="(item,index) in AllCardData" :key="index">
              <ItemCardList :CardListData="item" style="margin-top:10px;" @closeCardClick="CardClick"
                            :CourseCardList="CourseCardList"></ItemCardList>
            </div>
            <!--<GiveProjectDialog class="spanBuleRight" :CardGUID=this.CardListData.Ca_GUID></GiveProjectDialog>-->
          </div>
        </el-tab-pane>
      </el-tabs>
      <SelectCardsDialog @selectCardsData="selectCardsData"></SelectCardsDialog>
    </div>
    <!--添加项目部分-->
    <div v-if="payMoneyIsShow" style="background: #ffffff;width: 100%;height: 4%;">
      <el-button type="text" icon="el-icon-circle-plus-outline" @click="SelectCards">添加项目</el-button>
    </div>
    <hr v-if="payMoneyIsShow" style="margin: 0; border: solid #cccccc 0.5px;">
    <!--添加备注部分-->
    <div class="remarkDiv" v-if="payMoneyIsShow">
      <span style="width: 5%;float: left;height: 100%;margin-top: 10px;padding-left: 10px;font-size: 15px;">备注信息:</span>
      <el-input v-model="remarksInfo" style="width: 92%;float: left;"></el-input>
    </div>

    <!--添加结账部分-->
    <div v-if="payMoneyIsShow" class="payMoneyDiv">
      总需要支付:
      <el-button type="text" style=" font-size: 18px;">￥5555</el-button>
      <el-button type="primary" @click="confirmReceipt"
                 style="float: right;">确认收款
      </el-button>
      <el-button @click="submitInfo"
                 style="float: right;">保存
      </el-button>

    </div>
  </div>
</template>

<script>
  import SelectCardsDialog from './SelectCardsDialog'
  import ItemCardList from './ItemCardList'
  import {QueryCardsInfo, AllCourseCard, OpenCards} from '../../../config/Api.js';
  import GiveProjectDialog from './GiveProjectDialog'
  import AddMemberDialog from "../MembershipManager/AddMemberDialog"

  export default {
    data() {
      return {
        namePhone: '',
        manualNumber: '',
        memberInfoIsShow: false,
        showInfoResult: false,
        payMoneyIsShow: false,
        cardsIsShow: true,
        memberInfoList: [],
        name: '',
        tel: '',
        memberCode: '',
        CardCount: '',
        OrderCount: '',
        // headImg: '../../../../static/images/gray_squre.png',
        staffPeople: '',
        giveProgect: '',
        CAGUID: '',
        AllCardData: [],
        CourseCardList: [],
        remarksInfo: '',
      }
    },
    created() {
    },
    components: {
      SelectCardsDialog, ItemCardList, GiveProjectDialog, AddMemberDialog
    },
    methods: {
      clickQuery() {
        if (this.namePhone === '') {
          this.memberInfoList = [];
          this.showInfoResult = false;
          this.memberInfoIsShow = false;
          return;
        }
        this.$http.get(QueryCardsInfo + this.namePhone).then(resp => {
          if (resp.data.code === 0) {
            this.memberInfoList = resp.data.data;
            if (this.memberInfoList === null) {
              this.memberInfoList = [];
              this.showInfoResult = false;
            } else {
              this.showInfoResult = true;
            }
          }
        });
      },
      //添加会员信息
      addCardMember() {
        this.$store.state.addMemberIsShow = true;
      },
      AddMemberEmit(data) {
        //设置显示隐藏
        this.memberInfoIsShow = true;
        this.namePhone = data.Me_Name;
        this.name = data.Me_Name;
        this.tel = data.Me_Tel;
        this.memberCode = data.Me_Code;
        this.CardCount = data.CardCount;
        this.queryCourseCardData(data.Me_GUID);
        if (data.OrderCount === null || data.OrderCount === '') {
          this.OrderCount = '0';
        } else {
          this.OrderCount = data.OrderCount;
        }
      },
      itemClick(item) {
        this.showInfoResult = false;
        this.memberInfoIsShow = true;
        this.namePhone = item.Me_Name;
        this.name = item.Me_Name;
        this.tel = item.Me_Tel;
        this.memberCode = item.Me_Code;
        this.CardCount = item.CardCount;
        this.queryCourseCardData(item.Me_GUID);
        if (item.OrderCount === null || item.OrderCount === '') {
          this.OrderCount = '0';
        } else {
          this.OrderCount = item.OrderCount;
        }
      },
      //只有疗程卡查询会员卡 Mec_CourseDis折扣
      queryCourseCardData(Me_GUID) {
        this.$http.get(AllCourseCard + Me_GUID).then(resp => {
          if (resp.data.code === 0) {
            for (let i = 0; i < resp.data.data.length; i++) {
              this.CourseCardList.push({
                'Payt_GUID': resp.data.data[i].Payt_GUID,
                'Payt_Name': resp.data.data[i].Payt_Name,
                'Mec_CourseDis': resp.data.data[i].Mec_CourseDis
              })
            }
          }
        });
      },
      scanClick() {
        alert("二维码");
      },
      SelectCards() {
        this.$store.state.SelectCardIsShow = true;
      },
      submitInfo() {
        alert("submitInfo");
      },
      confirmReceipt() {
        if (this.memberInfoIsShow === false) {
          alert("请先选择会员");
        } else {
          let param = {
            MemberCardList: [],
            Order_HanId: this.manualNumber,
            Fe_GUID: '',
            Me_GUID: '',
            Order_TotalPrice: '',
            Order_Arrear: '',
            CaiwuList: '',
          };
          this.$http.post(OpenCards, this.$qs.stringify(param)).then(resp => {
            if (resp.data.code === 0) {

            }
          })
        }

      },
      selectCardsData(data) {
        if (data !== null) {
          this.AllCardData = data;
          for (let i = 0; i < data.length; i++) {
            this.CAGUID = data[i].Ca_GUID
          }
          this.payMoneyIsShow = true;
          this.cardsIsShow = false;
        }
      },
      CardClick() {
        this.AllCardData.splice(0, 1);
      }
    },
    name: "AddSellCards"
  }
</script>

<style>
  .queryMemberDiv .el-input__inner {
    height: 38px !important;
    font-size: 14px;
  }

  .sellCardsDiv .el-tabs__nav-scroll {
    background: #b3d8ff;
  }

  .payMoneyDiv .el-button {
    border-radius: 0;
    height: 100%;
  }

  .payMoneyDiv .el-button + .el-button {
    width: 140px;
    font-size: 18px;
    margin-left: 0;
  }

  .cardsBgDiv .el-input__inner {
    height: 30px;
  }

  .el-main {
    padding: 20px 0 0 20px;
  }

  .remarkDiv .el-input__inner {
    background: no-repeat 0 0 scroll ＃EEEEEE;
    border: none;
    outline: medium;
  }

</style>
<style scoped>
  .queryMemberDiv {
    background: #b3d8ff;
    text-align: left;
    padding: 10px 10px 12px 10px;
    height: 4%;
  }

  .CardsDiv {
    width: 98%;
    height: 100%;
    position: relative;
  }

  .memberInfoDiv {
    background: #ffffff;
    padding: 10px;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .memberInfoItem {
    width: 30%;
    text-align: center;
  }

  .sellCardsDiv {
    margin-top: 20px;
    height: auto;
  }

  .imgDisplay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .payMoneyDiv {
    background: #ffffff;
    height: 6%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    border: solid #cccccc 1px;
  }

  .remarkDiv {
    width: 100%;
    background: #ffffff;
    height: 5%;
  }

  .nav ul {
    width: 29%;
    text-align: left;
    border: 1px solid #999;
    position: absolute;
    z-index: 99;
    background: #fff;
    margin: 38px 0 0 10px;
    overflow-y: scroll;
    white-space: nowrap;
    padding: 0 0.1rem;
    height: 150px;
    overflow: -moz-scrollbars-none;
    overflow: -moz-scrollbars-none;
    -webkit-overflow-scrolling: touch;
  }

  .nav li {
    margin-top: 5px;
  }

  .nav ul::-webkit-scrollbar {
    display: none;
  }

</style>
