<template>
  <div>
    <div>
      <div style="width: 98%;text-align: right">
        <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetSupplierForm('AddCard')">取消
        </el-button>
        <el-button type="primary" icon="el-icon-edit-outline" @click ="submitSupplier('AddCard')">保存
        </el-button>
      </div>
      <!--//卡片页面-->
      <div style="margin-top: 20px">
        <el-tabs type="border-card">
          <!--基本信息-->
          <el-tab-pane label="基本信息">
            <div class="infoBox" >
              <el-form :model="AddCard"  :rules="rules" ref="AddCard" class="addForm" status-icon :inline="true"
                       label-position="top">
                <!--第一行-->
                <div style="text-align: left;width: 100%;height: 40px">
                  <el-form-item prop="Ca_Type">
                    卡类别<a >*</a>
                    <el-radio-group v-model="AddCard.Ca_Type" :change="change()" >
                      <el-radio v-for='item in Ca_Type' :key="item.Co_Values" :label="item.Co_Values">
                        {{item.Co_Name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div style="float: left;margin-top: 30px">
                  <el-form-item v-if="radios">
                    疗程卡类型
                    <el-select v-model="AddCard.Ca_CourseType" placeholder="请选择疗程卡类型" >
                        <el-option v-for = "item in Ca_CourseType" :key="item.Co_Values" :label="item.Co_Name"
                                    :value="item.Co_Values" placeholder="请选择疗程卡类型"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="Ca_MinPrice" v-if="inputs" style="margin-left: 20px;width: 130px">
                    最低续充金额
                    <el-input v-model="AddCard.Ca_MinPrice" placeholder="请输入最低续充金额" ></el-input>
                  </el-form-item>
                  <el-form-item prop="Ca_ItemDis" style="width: 130px" v-if="inputs">
                    项目折扣
                    <el-input v-model="AddCard.Ca_ItemDis" placeholder="请输入项目折扣" ></el-input>
                  </el-form-item>
                  <el-form-item prop="Ca_ProductDis" style="width: 130px" v-if="inputs">
                    产品折扣
                    <el-input v-model="AddCard.Ca_ProductDis" placeholder="请输入产品折扣" ></el-input>
                  </el-form-item>
                  <el-form-item prop="Ca_CourseDis" style="width: 130px" v-if="inputs">
                    疗程折扣
                    <el-input v-model="AddCard.Ca_CourseDis" placeholder="请输入疗程折扣" ></el-input>
                  </el-form-item>
                  </div>
                <!--第一列-->
            <div style="clear:left">
                <div class="divOption" >
                  <el-form-item prop="Ca_Name">
                    <div>卡级名称 <a>*</a> </div>
                    <el-input v-model="AddCard.Ca_Name" placeholder="请输入卡级名称" ></el-input>
                  </el-form-item>
                  <el-form-item  label="停止销售/充值">
                    <el-radio-group v-model="AddCard.Ca_IsStopSale">
                      <div class="HintName"></div>
                      <el-radio  label="1">是</el-radio>
                      <el-radio  label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <!--第二列-->

                <div class="divOption"style="width: 20%">
                  <el-form-item prop="Ca_Term">
                    <div>有效期 <a>*</a> </div>
                    <el-input v-model="AddCard.Ca_Term" style="width: 50%"></el-input>
                    <el-select v-model="AddCard.options" style="width: 38%" prop="options">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item  label="停止是否允许修改价格">
                    <el-radio-group v-model="AddCard.Ca_IsChangePrice">
                      <div class="HintName"></div>
                      <el-radio  label="1">是</el-radio>
                      <el-radio  label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                  <!--第三列-->
                <div class="divOption"style="width: 15%">

                  <el-form-item>
                    <div>销售价格 <a>*</a></div>
                    <el-input v-model="AddCard.Ca_SalePrice" placeholder="请输入销售价格" ></el-input>
                  </el-form-item>
                  <el-form-item  label="过期能否消费">
                    <el-radio-group v-model="AddCard.Ca_IsSale">
                      <div class="HintName"></div>
                      <el-radio  label="1">是</el-radio>
                      <el-radio  label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="divOption"style="width: 15%">
                <el-form-item  label="赠送积分">
                  <el-radio-group v-model="AddCard.Ca_IsIntegral">
                      <div class="HintName"></div>
                      <el-radio  label="1">是</el-radio>
                      <el-radio  label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>

                  <el-form-item  label="过期能否充值" prop="Ca_IsReCharge">
                    <el-radio-group v-model="AddCard.Ca_IsReCharge">
                      <div class="HintName"></div>
                      <el-radio  label="1">是</el-radio>
                      <el-radio  label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
            </div>
                <div class="divOption"style="width: 100%">

                  <el-form-item class="testAlign"  style="margin:-15px 0px 0px 15px">
                    <div class="textClass">售卡需知</div>
                    <el-input v-model="AddCard.Ca_Desc" type="textarea" :rows="4" cols="80" class="desc"
                              placeholder="请输入售卡需知"></el-input>
                  </el-form-item>
                </div>
                <div class="divOption"style="width: 100%">
                  <el-form-item class="testAlign"  style="margin:-15px 0px 0px 15px">
                    <div class="textClass">用途</div>
                    <el-input v-model="AddCard.Ca_Method" type="textarea" :rows="4" cols="80" class="desc"
                              placeholder="请输入用途"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <!--//选择门店-->
          <el-tab-pane label="选择使用门店">
            <div >
              <div class="store" >
                <div style="display:inline"><img src="../../../../static/images/select_store.png"/>
                  <ModelBox style="display:inline" @modelBox="modelBox"></ModelBox>
                </div>
              </div>
            </div>
            <el-table :data=acmodexTreeb style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
              <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
              <el-table-column   label="是否允许消费" align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.CaF_IsSales"
                    active-value="1"
                    inactive-value="0"
                    >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column  label="项目折扣" style="width: 100px" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaF_ItemDis" placeholder="项目折扣"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="产品折扣" style="width: 100px" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaF_ProductDis"  placeholder="产品折扣"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="疗程折扣" style="width: 100px" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaF_CourseDis"  placeholder="疗程折扣"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="售价" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaF_SalePrice"  placeholder="售价"></el-input>
                </template>
              </el-table-column>
              <el-table-column  v-if="inputs" label="续充最低金额" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaF_MinPrice"  placeholder="最低金额"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="CaF_StartDate"  label="销售开始日期" align="center">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      class="input-class"
                      v-model="scope.row.CaF_StartDate"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="storeName" label="销售结束日期" align="center">
                <template slot-scope="scope" >
                  <div >
                    <el-date-picker
                      class="input-class"
                      v-model="scope.row.CaF_EndDate"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!--//赠送额-->
          <el-tab-pane label="赠送额设置" v-if="zengSong">
            <el-button style="float: left" @click="button">添加一行</el-button>
            <el-table :data=tableList style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column  label="赠送额 " align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.CaFr_FreePrice"  placeholder="请输入赠送额"></el-input>
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
                  <el-table-column prop="Co_Code" width="100px" label="编号" align="center" ></el-table-column>
                  <el-table-column prop="Co_Name" width="100px" label="名称" align="center"></el-table-column>
                  <el-table-column  label="项目次数 " width="120px" align="center">
                    <template slot-scope ="scope">
                      <el-input v-model="scope.row.IT_ProItemTime"  placeholder="项目次数"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column  label="价格 " width="90px" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.It_Price"  placeholder="价格"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="It_BuyStartDate"  label="开始日期 "  align="center">
                    <template slot-scope="scope" >
                      <div class="block" >
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
                  <el-table-column  label="类别 " width="100px" align="center">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.It_TypeId" placeholder="类别" >
                        <el-option
                          v-for="item in typeid"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column  label="有效期 " align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.It_Trem" style="width: 50%" ></el-input>
                      <el-select v-model="scope.row.It_TermUnit" style="width: 38%" >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column  label="是否自动计算价格 " width="80px" align="center">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.It_IsAutoPrice"
                      active-value="1"
                      inactive-value="0"
                      >
                    </el-switch>
                  </template>
                  </el-table-column>
                  <el-table-column  label="是否指定本门店使用 " width="80px" align="center">
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
  import {CommonDictionaryTree,AddCard, AddFenCard,AddItemTime,AddCardItem} from "../../../config/Api"
  import ModelBox from "../../ModelBox"
  import AddMeal from "./AddMeal"
    export default {
      components: {
        ModelBox,
        AddMeal,
      },
        name: "AddCard",
      data(){
          return{
            tableList:[
              {},
            ],
            data2: [],
            zengSong:false,
            Ca_GUID:'',
            Ca_Term:'',//有效期
            filterText: '',
            CaF_ItemDis:{},
            CaF_ProductDis:{},
            CaF_CourseDis:{},
            CaF_SalePrice:{},
            CaF_MinPrice:{},
            Date:[
              {CaF_StartDate:this.CaF_StartDate},
              {CaF_EndDate:this.CaF_EndDate},
            ],
            CaF_StartDate:{},
            CaF_EndDate:{},
            defaultProps: {
              children: 'list',
              label: 'name',
              id: 'code'
            },
            typeid:[
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
              }
              ], //有效期单位
            It_TermUnit:'年',
            Ca_TermUnit:'',//有效期单位
            Ca_Type:'',//卡类别
            Ca_Name:'',//卡名称
            Ca_IsIntegral:'',//是否赠送积分 0否1为是
            Ca_IsSale:'',//过期能否消费 0为否1为是
            Ca_IsReCharge:'',//过期能否充值 0为否1为是
            Ca_IsStopSale:'',//停止消费/充值 0为否1为是
            Ca_CourseType:'',//疗程卡类型
            Ca_MinPrice:'',//最低续充金额
            radios:false,//疗程卡选择状态
            inputs:false,//续充金额状态
            Ca_ItemDis:'',//项目折扣
            Ca_ProductDis:'',//产品折扣
            Ca_CourseDis:'',//疗程折扣
            Ca_SalePrice:'',//销售价格
            Ca_Desc:'',//售卡须知
            Ca_Method:'',//用途
            Ca_IsChangePrice:'',
            acmodexTreeb:[],
            addmeal:[],
            AddFenCard:{
              Ca_GUID:'',
              CaF_IsSales:'',
            },
            AddCard:{
              Ca_Type:'BD003',//卡类别
              Ca_Name:'',//卡名称
              Ca_Term:'',//有效期
              options:'年',//单位
              Ca_IsIntegral:'1',//赠送积分
              Ca_IsReCharge:'1',//充值
              Ca_IsSale:'1',//消费
              Ca_IsStopSale:'1',//停止消费
              Ca_IsChangePrice:'1',//是否允许修改价格 0为否1为是
              Ca_CourseType:'',//疗程卡类型
              Ca_MinPrice:'',//最低续充金额
              Ca_ItemDis:'',//项目折扣
              Ca_ProductDis:'',//产品折扣
              Ca_CourseDis:'',//疗程折扣
              Ca_SalePrice:'0',//销售价格
              Ca_Desc:'',//售卡须知
              Ca_Method:'',//用途
            },
            rules:
              {
                Ca_Name: [
                  {required: true, message: '请输入卡级名称', trigger: 'blur'},
                ],
                Ca_Term: [
                  {required: true, message: '请输入有效期', trigger: 'blur'},
                ],
                options: [
                  {required: true, message: '请选择单位', trigger: 'blur'},
                ],
                Ca_MinPrice: [
                  {required: true, message: '请输入最低续充金额', trigger: 'blur'},
                ],
                Ca_ItemDis: [
                  {required: true, message: '请输入项目折扣', trigger: 'blur'},
                ],
                Ca_ProductDis: [
                  {required: true, message: '请输入产品折扣', trigger: 'blur'},
                ],
                Ca_CourseDis: [
                  {required: true, message: '请输入疗程折扣', trigger: 'blur'},
                ],
                Ca_CourseType: [
                  {required: true, message: '请选择疗程类型', trigger: 'blur'},
                ],
              },
          }
      },
      created(){
        this.radio();
      },

      methods:{
        //动态添加input赠送额
        button(){
          this.tableList.push({
            }
          )
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        //父传子套餐模态框
        AddMeal(value){
          this.addmeal = value;
        },
        //父传子门店模态框
        modelBox(value){
          this.acmodexTreeb = value;
        },
        //取消保存事件
        resetSupplierForm(formName){
          this.$refs[formName].resetFields();
        },
          //保存事件
        submitSupplier(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addCard();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //添加基本信息
        addCard(){
          let params = {
            Ca_Type:this.AddCard.Ca_Type,//卡类别
            Ca_Name:this.AddCard.Ca_Name,//卡名称
            Ca_Term:this.AddCard.Ca_Term,//有效期
            Ca_TermUnit:this.AddCard.options,//单位
            Ca_IsIntegral:this.AddCard.Ca_IsIntegral,//赠送积分
            Ca_IsReCharge:this.AddCard.Ca_IsReCharge,//充值
            Ca_IsSale:this.AddCard.Ca_IsSale,//消费
            Ca_IsStopSale:this.AddCard.Ca_IsStopSale,//停止消费
            Ca_IsChangePrice:this.AddCard.Ca_IsChangePrice,//卡消费是否允许修改价格 0为否1为是
            Ca_CourseType:this.AddCard.Ca_CourseType,//疗程卡类型
            Ca_MinPrice:this.AddCard.Ca_MinPrice,//最低续充金额
            Ca_ItemDis:this.AddCard.Ca_ItemDis,//项目折扣
            Ca_ProductDis:this.AddCard.Ca_ProductDis,//产品折扣
            Ca_CourseDis:this.AddCard.Ca_CourseDis,//疗程折扣
            Ca_SalePrice:this.AddCard.Ca_SalePrice,//销售价格
            Ca_Desc:this.AddCard.Ca_Desc,//售卡须知
            Ca_Method:this.AddCard.Ca_Method,//用途
          };
          this.$http.post(AddCard, this.$qs.stringify(params)).then(resp => {
            this.AddFenCard.Ca_GUID = resp.data.data.Ca_GUID;
            if (resp.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '添加卡级成功',
                type: 'success'
              });
            }
            this.addFenCard();
            this.addTable();
            this.AddItem();
          })
        },
        //添加赠送额
        addTable(){
          var zengsong= {};
          var lab ={};
          if(this.tableList.length>0){
            for(var i=0;i<this.tableList.length;i++) {
              this.tableList[i].Ca_GUID = this.AddFenCard.Ca_GUID;
            }
            lab = this.tableList;
            zengsong.CardFreeItem = lab;
            this.$http.post(AddCardItem, this.$qs.stringify(zengsong)).then(resp => {
            });
          }
        },
     //添加卡级对应的门店价格
        addFenCard(){
          var fendian= {};
          var obj ={};
          if(this.acmodexTreeb.length>0){
          for(var i=0;i<this.acmodexTreeb.length;i++){
            this.acmodexTreeb[i].Fe_GUID = this.acmodexTreeb[i].value;
            this.acmodexTreeb[i].Ca_GUID = this.AddFenCard.Ca_GUID;
          }
          obj = this.acmodexTreeb;
          fendian.CardFenDianPrice = obj;
          this.$http.post(AddFenCard, this.$qs.stringify(fendian)).then(resp => {
          });

          }
        },
        //添加套餐
        AddItem(){
          var taocan= {};
          var list ={};
          if(this.addmeal.length>0){
          for(var i=0;i<this.addmeal.length;i++){
            this.addmeal[i].Pro_GUID = this.addmeal[i].Co_GUID;
            this.addmeal[i].Ca_GUID = this.AddFenCard.Ca_GUID;
          }
          list = this.addmeal;
          taocan.ItemTime = list;
          this.$http.post(AddItemTime, this.$qs.stringify(taocan)).then(resp => {
          });
          }
        },
          //单选框判定条件
        change(){
          if(this.AddCard.Ca_Type === "BD003"){
            // 计次卡
            this.radios = false;
            this.inputs = false;
            this.zengSong = false;
            this.rules.Ca_MinPrice[0].required = false;
            this.rules.Ca_ItemDis[0].required = false;
            this.rules.Ca_CourseDis[0].required = false;
            this.rules.Ca_CourseType[0].required = false;
            this.rules.Ca_ProductDis[0].required = false;
          }else if (this.AddCard.Ca_Type === "BD001") {
            //储值卡
            this.radios = false;
            this.inputs = true;
            this.zengSong = true;
            this.rules.Ca_MinPrice[0].required = true;
            this.rules.Ca_ItemDis[0].required = true;
            this.rules.Ca_CourseDis[0].required = true;
            this.rules.Ca_CourseType[0].required = false;
            this.rules.Ca_ProductDis[0].required = true;
          }else if (this.AddCard.Ca_Type === "BD002") {
            //疗程卡
            this.radios = true;
            this.inputs = false;
            this.zengSong = false;
            this.rules.Ca_MinPrice[0].required = false;
            this.rules.Ca_ItemDis[0].required = false;
            this.rules.Ca_CourseDis[0].required = false;
            this.rules.Ca_CourseType[0].required = true;
            this.rules.Ca_ProductDis[0].required = false;
          }
        },
        radio(){
          let radio ={
            CoCode: ["BD29","AD04"],
          };
          this.$http.post(CommonDictionaryTree,this.$qs.stringify(radio)).then(resp=>{
            for (let position in resp.data.data) {
              if (resp.data.data[position].Co_Code === 'BD29') {
                this.Ca_Type = resp.data.data[position].List;
              }else if (resp.data.data[position].Co_Code === 'AD04') {
                this.Ca_CourseType  = resp.data.data[position].List;
              }
            }
          })
        },
      },
      watch: {

      },
      component:{

      }
    }
</script>
<style>
.input-class{
width: 100%;
}
</style>
<style scoped>

  .divOption {
    display: block;
    width: 15%;
    text-align: left;
    float: left;
    background-color: white;
    padding: 10px 20px 0 20px;
  }
  .HintName{
    width: 200px;
  }
  .textClass{
    /*margin:0px 0px -17px 0px;*/
  }
  .divOption a{
    color: red;
  }
  .store{
    overflow: hidden;
    color:#0082d6;
    float: left;
  }
</style>
