<template>
  <div>
    <div>
      <div style="width: 98%;text-align: right">
        <el-button type="primary" icon="el-icon-circle-close-outline" @click="Update('UpdateCard')">重置
        </el-button>
        <el-button type="primary" icon="el-icon-edit-outline" @click="UpdateCards('UpdateCard')">保存
        </el-button>
      </div>

      <!--//卡片页面-->
      <div style="margin-top: 20px">
        <el-tabs type="border-card">
          <!--基本信息-->
          <el-tab-pane label="基本信息">
            <div class="infoBox">
              <el-form :model="UpdateCard" :rules="rules" ref="UpdateCard" class="addForm" status-icon :inline="true"
                       label-position="top">
                <!--第一行-->
                <div style="text-align: left;width: 100%;height: 40px" class="divOption">
                  <el-form-item>
                    卡类别<a>*</a>
                    <el-radio-group v-model="UpdateCard.Ca_Type" :disabled="true">
                      <el-radio :disabled="true"
                                v-for='item in Ca_Type' :key="item.Co_Values" :label="item.Co_Values"
                                v-model="UpdateCard.Ca_Type">
                        {{item.Co_Name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div style="float: left;margin-top: 30px" >
                  <el-form-item v-if="radios" style="margin-left: 20px">
                    疗程卡类型
                    <el-select v-model="UpdateCard.Ca_CourseType" placeholder="请选择疗程卡类型">
                      <el-option v-for="item in Ca_CourseType" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values" placeholder="请选择疗程卡类型"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="Ca_MinPrice" v-if="inputs" style="margin-left: 20px;width: 130px">
                    最低续充金额
                    <el-input v-model="UpdateCard.Ca_MinPrice" placeholder="请输入最低续充金额"></el-input>
                  </el-form-item>
                  <el-form-item prop="Ca_ItemDis" style="width: 130px" v-if="inputs">
                    项目折扣
                    <el-input v-model="UpdateCard.Ca_ItemDis" placeholder="请输入项目折扣"></el-input>
                  </el-form-item>
                  <el-form-item prop="Ca_ProductDis" style="width: 130px" v-if="inputs">
                    产品折扣
                    <el-input v-model="UpdateCard.Ca_ProductDis" placeholder="请输入产品折扣"></el-input>
                  </el-form-item>
                  <el-form-item prop="Ca_CourseDis" style="width: 130px" v-if="inputs">
                    疗程折扣
                    <el-input v-model="UpdateCard.Ca_CourseDis" placeholder="请输入疗程折扣"></el-input>
                  </el-form-item>
                </div>
                <div style="clear:left">
                  <!--第一列-->
                  <div class="divOption">
                    <el-form-item>
                      <div>卡级名称 <a>*</a></div>
                      <el-input v-model="UpdateCard.Ca_Name" placeholder="请输入卡级名称"></el-input>
                    </el-form-item>
                    <el-form-item label="停止销售/充值">
                      <el-radio-group v-model="UpdateCard.Ca_IsStopSale">
                        <div class="HintName"></div>
                        <el-radio @click.native.prevent="onChangeValue('1')" v-model="UpdateCard.Ca_IsStopSale"
                                  label="1">是
                        </el-radio>
                        <el-radio @click.native.prevent="onChangeValue('0')" v-model="UpdateCard.Ca_IsStopSale"
                                  label="0">否
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <!--第二列-->

                  <div class="divOption" style="width: 20%">
                    <el-form-item>
                      <div>有效期 <a>*</a></div>
                      <el-input v-model="UpdateCard.Ca_Term" style="width: 50%"></el-input>
                      <el-select v-model="UpdateCard.options" style="width: 38%">
                        <el-option

                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="停止是否允许修改价格">
                      <el-radio-group v-model="UpdateCard.Ca_IsChangePrice">
                        <div class="HintName"></div>
                        <el-radio @click.native.prevent="onChangeChValue('1')" v-model="UpdateCard.Ca_IsChangePrice"
                                  label="1">是
                        </el-radio>
                        <el-radio @click.native.prevent="onChangeChValue('0')" v-model="UpdateCard.Ca_IsChangePrice"
                                  label="0">否
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <!--第三列-->
                  <div class="divOption" style="width: 15%">

                    <el-form-item>
                      <div>销售价格 <a>*</a></div>
                      <el-input v-model="UpdateCard.Ca_SalePrice" placeholder="请输入销售价格"></el-input>
                    </el-form-item>

                    <el-form-item label="过期能否消费">
                      <el-radio-group v-model="UpdateCard.Ca_IsSale">
                        <div class="HintName"></div>
                        <el-radio @click.native.prevent="onChangeSaValue('1')" v-model="UpdateCard.Ca_IsSale" label="1">
                          是
                        </el-radio>
                        <el-radio @click.native.prevent="onChangeSaValue('0')" v-model="UpdateCard.Ca_IsSale" label="0">
                          否
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="divOption" style="width: 15%">
                    <el-form-item label="赠送积分">
                      <el-radio-group v-model="UpdateCard.Ca_IsIntegral">
                        <div class="HintName"></div>
                        <el-radio @click.native.prevent="onChangeInValue('1')" v-model="UpdateCard.Ca_IsIntegral"
                                  label="1">是
                        </el-radio>
                        <el-radio @click.native.prevent="onChangeInValue('0')" v-model="UpdateCard.Ca_IsIntegral"
                                  label="0">否
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="过期能否充值">
                      <el-radio-group v-model="UpdateCard.Ca_IsReCharge">
                        <div class="HintName"></div>
                        <el-radio @click.native.prevent="onChangeIsValue('1')" v-model="UpdateCard.Ca_IsReCharge"
                                  label="1">是
                        </el-radio>
                        <el-radio @click.native.prevent="onChangeIsValue('0')" v-model="UpdateCard.Ca_IsReCharge"
                                  label="0">否
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="divOption" style="width: 15%">
                    <el-form-item label="状态" prop="State">
                      <el-radio-group v-model="UpdateCard.State">
                        <div class="HintName"></div>
                        <el-radio @click.native.prevent="onChangeStateValue('1')" v-model="UpdateCard.State" label="1">
                          无效
                        </el-radio>
                        <el-radio @click.native.prevent="onChangeStateValue('0')" v-model="UpdateCard.State" label="0">
                          正常
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
                <div class="divOption" style="width: 100%">
                  <el-form-item class="testAlign" style="margin:-15px 0px 0px 15px">
                    <div class="textClass">售卡需知</div>
                    <el-input v-model="UpdateCard.Ca_Desc" type="textarea" :rows="4" cols="80" class="desc"
                              placeholder="请输入售卡需知"></el-input>
                  </el-form-item>
                </div>
                <div class="divOption" style="width: 100%">

                  <el-form-item class="testAlign" style="margin:-15px 0px 0px 15px">
                    <div class="textClass">用途</div>
                    <el-input v-model="UpdateCard.Ca_Method" type="textarea" :rows="4" cols="80" class="desc"
                              placeholder="请输入用途"></el-input>
                  </el-form-item>
                </div>

              </el-form>
            </div>
          </el-tab-pane>
          <!--//选择使用门店-->
          <el-tab-pane label="修改门店">
            <div v-if="qwe">
              <div class="store">
                <div style="display:inline"><img src="../../../../static/images/select_store.png"/>
                  <ModelBox style="display:inline" :FendianNoded=this.FendianNode @modelBox="modelBox"></ModelBox>
                </div>
              </div>
              <el-table :data=acmodexTreeb style="width: 100%; color: #3a3a3a;"
                        :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
                <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
                <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
                <el-table-column label="是否允许消费" align="center">

                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.CaF_IsSales" prop="CaF_IsSales" true-label="1" false-label="0"
                                 :checked="1===scope.row.CaF_IsSales?true:false"
                    ></el-checkbox>
                    <!--	是否允许消费 0为否1为是-->
                  </template>
                </el-table-column>
                <el-table-column label="项目折扣" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.CaF_ItemDis" prop="CaF_ItemDis"
                              placeholder="项目折扣">
                      {{scope.row.CaF_ItemDis}}
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="产品折扣" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.CaF_ProductDis" prop="CaF_ProductDis" placeholder="产品折扣">
                      {{scope.row.CaF_ProductDis}}
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="疗程折扣" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.CaF_CourseDis" prop="CaF_CourseDis" placeholder="疗程折扣">
                      {{scope.row.CaF_CourseDis}}
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="售价" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.CaF_SalePrice" prop="CaF_SalePrice" placeholder="售价">
                      {{scope.row.CaF_SalePrice}}
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="续充最低金额" v-if="inputs" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.CaF_MinPrice" prop="CaF_MinPrice" placeholder="最低金额">
                      {{scope.row.CaF_MinPrice}}
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="CaF_StartDate" label="销售开始日期" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-date-picker
                        class="input-class"
                        v-model="scope.row.CaF_StartDate"
                        type="date"
                        placeholder="开始日期">{{scope.row.CaF_StartDate}}
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="storeName" label="销售结束日期" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-date-picker
                        class="input-class"
                        v-model="scope.row.CaF_EndDate"
                        type="date"
                        placeholder="结束日期">{{scope.row.CaF_EndDate}}
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!--//赠送额-->
          <el-tab-pane label="赠送额设置" v-if="zengSong">
            <el-button style="float: left" @click="button">添加一行</el-button>
            <el-table :data=tableList style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column label="赠送额 " align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaFr_FreePrice" placeholder="请输入赠送额"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="CaF_StartDate" label="开始日期" align="center">
                <template slot-scope="scope">
                  <div class="block">
                    <el-date-picker
                      class="input-class"
                      v-model="scope.row.CaFr_StartDate"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="storeName" label="结束日期" align="center">
                <template slot-scope="scope">
                  <div class="block">
                    <el-date-picker
                      class="input-class"
                      v-model="scope.row.CaFr_EndDate"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="有效期">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaFr_Trem" style="width: 50%"></el-input>
                  <el-select v-model="scope.row.CaFr_TermUnit" style="width: 38%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!--//选择套餐-->
          <el-tab-pane label="选择套餐内容">
            <div>
              <AddMeal @AddMeal="AddMeal"></AddMeal>
              <div style="width:100%;float: left">
                <el-table :data=addmeal style="width: 100%; color: #3a3a3a;"
                          :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
                  <el-table-column prop="Co_Code" width="100px" label="编号" align="center"></el-table-column>
                  <el-table-column prop="Co_Name" width="100px" label="名称" align="center"></el-table-column>
                  <el-table-column label="项目次数 " width="120px" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.IT_ProItemTime" placeholder="项目次数"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="价格 " width="90px" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.It_Price" placeholder="价格"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="It_BuyStartDate" label="开始日期 " align="center">
                    <template slot-scope="scope">
                      <div class="block">
                        <el-date-picker
                          v-model="scope.row.It_BuyStartDate"
                          type="date"
                          placeholder="开始日期">
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="It_BuyEndDate" label="结束日期 " align="center">
                    <template slot-scope="scope">
                      <div class="block">
                        <el-date-picker
                          v-model="scope.row.It_BuyEndDate"
                          type="date"
                          placeholder="结束日期">
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="类别 " width="100px" align="center">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.It_TypeId" placeholder="类别">
                        <el-option
                          v-for="item in typeid"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="有效期 " align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.It_Trem" style="width: 50%"></el-input>
                      <el-select v-model="scope.row.It_TermUnit" style="width: 38%">
                        <el-option
                          v-for="item in options"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="是否自动计算价格 " width="80px" align="center">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.It_IsAutoPrice"
                        active-value="1"
                        inactive-value="0"
                      >
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="是否指定本门店使用 " width="80px" align="center">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.It_IsFenUse"
                        active-value="1"
                        inactive-value="0"
                      >
                      </el-switch>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CommonDictionaryTree,
    ItemTime,
    CardFree,
    CardFen,
    AddFenCard,
    OneCard,
    UpdateCard,
    AddItemTime,
    AddCardItem
  } from "../../../config/Api"
  import ModelBox from "../../ModelBox"
  import AddMeal from "./AddMeal"

  export default {
    components: {
      ModelBox,
      AddMeal,
    },
    name: "UpdateCard",
    data() {
      return {
        Ca_Term: '',//有效期
        zengSong: false,
        typeid: [
          {
            value: 1,
            label: '赠送'
          },
          {
            value: 2,
            label: '购买'
          }
        ],
        options: [{
          value: 1,
          label: '年'
        }, {
          value: 2,
          label: '月'
        }, {
          value: 3,
          label: '日'
        }], //有效期单位
        Ca_TermUnit: '',//有效期单位
        tableList: [],
        Ca_Type: '',//卡类别
        qwe: true,
        // resource:'',
        Ca_Name: '',//卡名称
        Ca_IsIntegral: '0',//是否赠送积分 0否1为是
        Ca_IsSale: '0',//过期能否消费 0为否1为是
        Ca_IsReCharge: '',//过期能否充值 0为否1为是
        Ca_IsStopSale: '',//停止消费/充值 0为否1为是
        Ca_CourseType: '',//疗程卡类型
        Ca_MinPrice: '',//最低续充金额
        radios: false,//疗程卡选择状态
        inputs: false,//续充金额状态
        Ca_ItemDis: '',//项目折扣
        Ca_ProductDis: '',//产品折扣
        Ca_CourseDis: '',//疗程折扣
        Ca_SalePrice: '',//销售价格
        Ca_Desc: '',//售卡须知
        Ca_Method: '',//用途
        acmodexTreeb: [],
        State: '',//状态
        FendianNode: [],
        UpdateCard: {
          Ca_Type: '',//卡类别
          Ca_Name: '',//卡名称
          Ca_Term: '',//有效期
          options: '',//单位
          Ca_IsIntegral: '',//赠送积分
          Ca_IsReCharge: '',//充值
          Ca_IsSale: '',//消费
          Ca_IsStopSale: '',//停止消费
          Ca_IsChangePrice: '',//卡消费是否允许修改价格 0为否1为是
          Ca_CourseType: '',//疗程卡类型
          Ca_MinPrice: '',//最低续充金额
          Ca_ItemDis: '',//项目折扣
          Ca_ProductDis: '',//产品折扣
          Ca_CourseDis: '',//疗程折扣
          Ca_SalePrice: '',//销售价格
          Ca_Desc: '',//售卡须知
          Ca_Method: '',//用途
          State: '',//状态
        },
        addmeal: [],
        rules: {
          Ca_Name: [
            {required: true, message: '请输入卡级名称', trigger: 'blur'},
          ],
          Ca_Type: [
            {required: true, message: '请选择卡类别', trigger: 'blur'},
          ],
          Ca_Term: [
            {required: true, message: '请输入有效期', trigger: 'blur'},
          ],
          Ca_IsReCharge: [
            {required: true, message: '请选择过期能否消费', trigger: 'blur'},
          ],
        },
        FeGUID: '',
        CaGUID: '',
        StoresTagData: [],
      }
    },

    created() {
      this.queryCardList();
      this.radio();
      this.mendian();//获取门店数组
      this.taocan();//获取赠送
      this.Item();
    },
    methods: {
      //套餐
      Item() {
        this.$http.post(ItemTime + this.$route.params.Guid).then(resp => {
          this.addmeal = resp.data.data;
        });
        this.reload();
      },
      radio() {
        let radio = {
          CoCode: ["BD29", "AD04"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(radio)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'BD29') {
              this.Ca_Type = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AD04') {
              this.Ca_CourseType = resp.data.data[position].List;
            }
          }
        })
      },
      //批量设置
      reload() {
        this.qwe = false;
        this.$nextTick(function () {
          this.qwe = true;
        })
      },
      //动态添加input赠送额
      button() {
        this.tableList.push({})
      },
      //套餐Model
      AddMeal(value) {
        this.addmeal = value;
      },
      //赠送
      taocan() {
        this.$http.post(CardFree + this.$route.params.Guid).then(resp => {
          this.tableList = resp.data.data;
        });
        this.reload();
      },
      //获取门店接口
      mendian() {
        this.$http.post(CardFen + this.$route.params.Guid).then(resp => {
          this.acmodexTreeb = resp.data.data;
          this.FendianNode = this.acmodexTreeb;
          for (let i = 0; i < this.acmodexTreeb.length; i++) {
            this.CaGUID = resp.data.data[i].Ca_GUID;
          }
        });
        this.reload();
      },
      //添加赠送额
      addTable() {
        var zengsong = {};
        var lab = {};
        if (this.tableList.length > 0) {
          for (var i = 0; i < this.tableList.length; i++) {
            this.tableList[i].Ca_GUID = this.CaGUID;
          }
          lab = this.tableList;
          zengsong.CardFreeItem = lab;
          this.$http.post(AddCardItem, this.$qs.stringify(zengsong)).then(resp => {
          });
        }
      },
      //添加卡级对应的门店价格 提交接口
      addFenCard() {
        var fendian = {};
        var obj = {};
        if (this.acmodexTreeb.length > 0) {
          for (let i = 0; i < this.acmodexTreeb.length; i++) {
            if (this.StoresTagData.length > 0) {
              this.acmodexTreeb[i].Fe_GUID = this.acmodexTreeb[i].value;
            } else {
              this.acmodexTreeb[i].Fe_GUID = this.acmodexTreeb[i].Fe_GUID;
            }
            this.acmodexTreeb[i].Ca_GUID = this.CaGUID;
          }
          obj = this.acmodexTreeb;
          fendian.CardFenDianPrice = obj;
          this.$http.post(AddFenCard, this.$qs.stringify(fendian)).then(resp => {
          });
        }
      },
      //添加套餐
      AddItem() {
        var taocan = {};
        var list = {};
        if (this.addmeal.length > 0) {
          for (var i = 0; i < this.addmeal.length; i++) {
            this.addmeal[i].Pro_GUID = this.addmeal[i].Co_GUID;
            this.addmeal[i].Ca_GUID = this.CaGUID;
          }
          list = this.addmeal;
          taocan.ItemTime = list;
          this.$http.post(AddItemTime, this.$qs.stringify(taocan)).then(resp => {
          });
        }
      },
      //父传子 弹出框返回的数据
      modelBox(val) {
        this.StoresTagData = val;
        this.acmodexTreeb = [];
        for (let i = 0; i < val.length; i++) {
          let item = val[i];
          item.CaF_IsSales = 0;
          this.acmodexTreeb.push(item);
        }
        if (this.acmodexTreeb.length > 0) {
          for (let i = 0; i < this.acmodexTreeb.length; i++) {
            this.FeGUID = this.acmodexTreeb[i].value;
          }
        }
      },
      //提交表单
      UpdateCards(UpdateCard) {
        this.$refs[UpdateCard].validate((valid) => {
          if (valid) {
            this.EditCard();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //清空
      Update(UpdateCard) {
        this.$refs[UpdateCard].resetFields();
      },
      //单选
      onChangeValue(data) {
        this.UpdateCard.Ca_IsStopSale = data;
      },
      onChangeIsValue(data) {
        this.UpdateCard.Ca_IsReCharge = data;
      },
      onChangeSaValue(data) {
        this.UpdateCard.Ca_IsSale = data;
      },
      onChangeChValue(data) {
        this.UpdateCard.Ca_IsChangePrice = data;
      },
      onChangeInValue(data) {
        this.UpdateCard.Ca_IsIntegral = data;
      },
      onChangeStateValue(data) {
        this.UpdateCard.State = data;
      },
      //修改方法
      EditCard() {
        let params = {
          Ca_GUID: this.$route.params.Guid,
          Ca_Type: this.UpdateCard.Ca_Type,//卡类别
          Ca_Name: this.UpdateCard.Ca_Name,//卡名称
          Ca_Term: this.UpdateCard.Ca_Term,//有效期
          Ca_TermUnit: this.UpdateCard.options,//单位
          Ca_IsIntegral: this.UpdateCard.Ca_IsIntegral,//赠送积分
          Ca_IsReCharge: this.UpdateCard.Ca_IsReCharge,//充值
          Ca_IsSale: this.UpdateCard.Ca_IsSale,//消费
          Ca_IsStopSale: this.UpdateCard.Ca_IsStopSale,//停止消费
          Ca_IsChangePrice: this.UpdateCard.Ca_IsChangePrice,//卡消费是否允许修改价格 0为否1为是
          Ca_CourseType: this.UpdateCard.Ca_CourseType,//疗程卡类型
          Ca_MinPrice: this.UpdateCard.Ca_MinPrice,//最低续充金额
          Ca_ItemDis: this.UpdateCard.Ca_ItemDis,//项目折扣
          Ca_ProductDis: this.UpdateCard.Ca_ProductDis,//产品折扣
          Ca_CourseDis: this.UpdateCard.Ca_CourseDis,//疗程折扣
          Ca_SalePrice: this.UpdateCard.Ca_SalePrice,//销售价格
          Ca_Desc: this.UpdateCard.Ca_Desc,//售卡须知
          Ca_Method: this.UpdateCard.Ca_Method,//用途
          State: this.UpdateCard.State,//状态
        };
        this.$http.post(UpdateCard, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.addFenCard();
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
          this.addTable();
          this.AddItem();
        });
      },
      queryCardList() {
        this.$http.get(OneCard + this.$route.params.Guid).then(resp => {
            this.UpdateCard.Ca_Type = resp.data.data.Ca_Type;//卡类别
            this.UpdateCard.Ca_Name = resp.data.data.Ca_Name;//卡名称
            this.UpdateCard.Ca_Term = resp.data.data.Ca_Term;//有效期
            this.UpdateCard.options = resp.data.data.Ca_TermUnit;//单位
            this.UpdateCard.Ca_IsIntegral = resp.data.data.Ca_IsIntegral + '';//赠送积分
            this.UpdateCard.Ca_IsReCharge = resp.data.data.Ca_IsReCharge + '';//充值
            this.UpdateCard.Ca_IsSale = resp.data.data.Ca_IsSale + '';//消费
            this.UpdateCard.Ca_IsStopSale = resp.data.data.Ca_IsStopSale + '';//停止消费
            this.UpdateCard.Ca_IsChangePrice = resp.data.data.Ca_IsChangePrice + '';//卡消费是否允许修改价格 0为否1为是
            this.UpdateCard.Ca_CourseType = resp.data.data.Ca_CourseType;//疗程卡类型
            this.UpdateCard.Ca_MinPrice = resp.data.data.Ca_MinPrice;//最低续充金额
            this.UpdateCard.Ca_ItemDis = resp.data.data.Ca_ItemDis;//项目折扣
            this.UpdateCard.Ca_ProductDis = resp.data.data.Ca_ProductDis;//产品折扣
            this.UpdateCard.Ca_CourseDis = resp.data.data.Ca_CourseDis;//疗程折扣
            this.UpdateCard.Ca_SalePrice = resp.data.data.Ca_SalePrice;//销售价格
            this.UpdateCard.Ca_Desc = resp.data.data.Ca_Desc;//售卡须知
            this.UpdateCard.Ca_Method = resp.data.data.Ca_Method;//用途
            this.UpdateCard.State = resp.data.data.State + '';//状态
            if (this.UpdateCard.Ca_Type === "BD003" || this.UpdateCard.Ca_Type === "BD002") {
              this.inputs = false;
              this.zengSong = false;
            } else {
              this.inputs = true;
              this.zengSong = true;
            }
            if (this.UpdateCard.Ca_Type === "BD002") {
              this.radios = true; //疗程卡
            } else {
              this.radios = false;
            }
          }
        )
      },
      // change() {
      //   if (this.UpdateCard.Ca_Type === "BD003") {
      //     // 计次卡
      //     this.radios = false;
      //     this.inputs = false;
      //     this.zengSong = false;
      //   } else if (this.UpdateCard.Ca_Type === "BD001") {
      //     //储值卡
      //     this.radios = false;
      //     this.inputs = true;
      //     this.zengSong = true;
      //   } else if (this.UpdateCard.Ca_Type === "BD002") {
      //     //疗程卡
      //     this.radios = true;
      //     this.inputs = false;
      //     this.zengSong = false;
      //   }
      // },
      radio() {
        let radio = {
          CoCode: ["BD29", "AD04"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(radio)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'BD29') {
              this.Ca_Type = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AD04') {
              this.Ca_CourseType = resp.data.data[position].List;
            }
          }
        })
      },
    }
    ,
  }
</script>

<style scoped>
  .divOption {
    display: block;
    width: 15%;
    text-align: left;
    float: left;
    background-color: white;
    padding: 10px 20px 0 20px;
  }

  .HintName {
    width: 200px;
  }

  .textClass {
    /*margin:0px 0px -17px 0px;*/
  }

  .divOption a {
    color: red;
  }

  .store {
    overflow: hidden;
    color: #0082d6;
    float: left;
  }
</style>
