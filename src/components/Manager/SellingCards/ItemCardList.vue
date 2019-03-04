<template>
  <div class="cardsDiv">
    <div style="text-align: right">
      <img src="../../../../static/images/close_gray.png" @click="closeCardClick" alt="">
    </div>
    <div style="width: 100%;padding-left: 10px;height:auto;display:flex;justify-content:flex-start;margin-top: -48px;">
      <div class="cardsBgDiv">
        <span style="font-size: 16px;margin-top: 10px;">{{this.CardListData.Ca_Name}}</span>
        <img src="../../../../static/images/read_card.png" style="width: 22px;margin-left: 2px;"
             v-if="'疗程卡'===this.CardListData.Ca_Type?false:true">
        <el-input placeholder="请输入卡号"
                  style="width: 150px;margin-left: 30px;"></el-input>
        <br/><br/><br/>
        <span style="font-size: 15px;">销售价格：￥{{this.CardListData.Ca_SalePrice}}</span> <br/>
        <span style="margin-top: 50px;font-size: 15px;">到期时间：{{this.CardListData.Ca_EndTimeUnit}}</span>
        <br/>
      </div>
      <div style="width: 70%;height: auto;display:flex;justify-content:flex-start;align-items: center;">
        <div style="width:20%;display:flex; flex-direction: column;">
          <span>还需支付：<span style="color: #3a8ee6;">￥{{this.CardListData.Ca_SalePrice}}</span></span>
        </div>
        <span style="width: 35%;">
                  <el-input-number v-model="numData" :disabled="'疗程卡'===this.CardListData.Ca_Type?false:true"
                                   :min="1"
                                   :max="10000" label="描述文字">
                  </el-input-number></span>
        <!--默认支付方式-->
        <div style="width: 45%;margin-top: 5px;">
          <div v-for="(item,index) in PayMethodList" :key="index">
            <PayMethodDialog :FourPayMethod="item" :CourseCardMoney="CourseCardMoneyList"></PayMethodDialog>
          </div>
        </div>
      </div>
      <div
        style="height:100%;color: #3a8ee6;text-align: right;width: 25%;margin-right: 60px;display:flex;justify-content:center;align-content: center; ">
        <OtherPayDialog :OtherPayMethod="OtherPayList"></OtherPayDialog>
      </div>
    </div>
    <hr class="hrClass">
    <div class="divProductCard">
      <span style="margin-left: 10px;width: 5%;font-size: 14px;">售卡人员:</span>
      <span class="spanCenter"> </span>
      <span class="spanBuleRight" @click="CardSaleClick" >添加售卡人员</span>
    </div>
    <div v-for="(item,index) in staffPeopleList" :key="index" style=" width: 100%;  display: flex;flex-direction: row;">
      <SaleCardDialog :staffPeopleData="item" @closeClick="StaffClick"></SaleCardDialog>
    </div>
    <CardSaleStaffDialog @CardStaffData="queryCardStaff"></CardSaleStaffDialog>
    <hr class="hrClass">
    <div class="divProductCard">
      <span style="width: 5%;margin-left: 10px;margin-bottom: 8px;font-size: 14px;">赠送项目:</span>
      <span class="spanCenter"></span>
      <GiveProjectDialog class="spanBuleRight" :CardGUID=this.CardListData.Ca_GUID></GiveProjectDialog>
    </div>
  </div>
</template>

<script>
  import CardSaleStaffDialog from './CardSaleStaffDialog'
  import GiveProjectDialog from './GiveProjectDialog'
  import PayMethodDialog from './PayMethodDialog'
  import OtherPayDialog from './OtherPayDialog'
  import SaleCardDialog from './SaleCardDialog'
  import {QueryPayMethod} from '../../../config/Api.js';

  export default {
    data() {
      return {
        numData: '',
        staffPeopleList: [],
        PayMethodList: [],
        OtherPayList: [],
        CourseCardMoneyList: '',
      }
    },
    components: {
      CardSaleStaffDialog, GiveProjectDialog, PayMethodDialog, OtherPayDialog, SaleCardDialog
    },
    props: ['CardListData', 'CourseCardList'],
    mounted() {
      console.log('this.CardListData');
      console.log(this.CardListData);
      this.queryDefultPay();
    },
    methods: {
      closeCardClick() {
        // alert("3222222222");
        // this.CardListData.splice(0, 1);
        this.$emit('closeCardClick');
      },
      StaffClick(){
        this.staffPeopleList.splice(0,1);
      },
      CardSaleClick() {
        console.log("=======click=====")
        console.log(this.CardListData.Ca_GUID)
        this.$store.state.CardSaleStaffIsShow = true;
      },
      queryCardStaff(data) {
        console.log("弹出框关闭==========")
        console.log(this.CardListData.Ca_GUID)
        this.staffPeopleList = [];
        if (data !== null || data !== '') {
          for (let i = 0; i < data.length; i++) {
            this.staffPeopleList.push({'Em_Name': data[i].Em_Name});
          }
        }
      },
      //默认支付方式
      queryDefultPay() {
        let param = {
          Payt_Type: '1',//购买项目类型(1购买卡,2是购买项目，3是购买产品)
        };
        this.$http.post(QueryPayMethod, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            console.log(this.CardListData.Ca_Type);
            if ('疗程卡' === this.CardListData.Ca_Type) {
              for (let i = 0; i < this.CourseCardList.length; i++) {
                this.PayMethodList.push({
                  'Payt_GUID': this.CourseCardList[i].Payt_GUID,
                  'Payt_Name': this.CourseCardList[i].Payt_Name,
                  'Mec_CourseDis': this.CourseCardList[i].Mec_CourseDis,
                });
              }
              this.CourseCardMoneyList = this.CardListData.Ca_SalePrice;
              for (let i = 0; i < resp.data.data.slice(0, 4 - this.CourseCardList.length).length; i++) {
                this.PayMethodList.push(resp.data.data.slice(0, 4 - this.CourseCardList.length)[i]);
              }
            } else {
              this.PayMethodList = resp.data.data.slice(0, 4);
            }
            this.OtherPayList = resp.data.data.slice(4, resp.data.data.length);
          }
        })
      },
    },
    name: "ItemCardList"
  }
</script>

<style scoped>
  .cardsDiv {
    border: solid #cccccc 1px;
    width: 99%;
    flex-direction: column;
    position: relative;
  }

  .hrClass {
    border: solid #ccc 0.5px;
  }

  .spanBuleRight {
    color: #3a8ee6;
    width: 10%;
    font-size: 14px;
  }

  .spanCenter {
    width: 80%;
    text-align: left
  }

  .divProductCard {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .cardsBgDiv {
    background: url(../../../../static/images/card_bg.png) no-repeat;
    width: 30%;
    padding: 10px 20px 0 20px;
    text-align: left;
    height: auto;
    font-size: 14px;
    margin-top: 5px;
  }
</style>
