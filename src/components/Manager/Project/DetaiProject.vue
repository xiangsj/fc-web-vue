<template>
    <div style="margin-top: 20px">
      <el-tabs type="border-card">
        <!--基本信息-->
        <el-tab-pane label="基本信息">
          <div class="infoBox" >
            <el-form :model="detaiProject"   ref="detaiProject" class="addForm" status-icon :inline="true"
                     label-position="top">
              <!--:rules="rules"-->
              <div style="text-align: left;" class="divOption">
                <el-form-item  class="testAlign">
                  <div class="textClass">项目名称<a>*</a></div>
                  <el-input v-model="detaiProject.Pro_Name"
                            placeholder="请输入项目名称" disabled></el-input>
                </el-form-item>

                <el-form-item  class="testAlign">
                  <div class="textClass">归属部门</div>
                  <el-select v-model="detaiProject.Pro_DepartmentCode" placeholder="请选择项目类别" disabled >
                    <el-option v-for="item in Pro_DepartmentCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">项目条码</div>
                  <el-input v-model="detaiProject.Pro_Barcode"
                            placeholder="请输入项目条码" disabled></el-input>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">收费性质</div>
                  <el-select v-model="detaiProject.Pro_ChargType" placeholder="请选择收费性质" disabled>
                    <el-option v-for="item in Pro_ChargType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item >
                <div>
                  图片
                </div>
                <!--<Upload></Upload>-->
              </div>
              <div class="divOption">
                <el-form-item  class="testAlign">
                  <div class="textClass">项目类别<a>*</a></div>
                  <el-select v-model="detaiProject.Pro_PIClassType" placeholder="请选择项目类别" disabled>
                    <el-option v-for="item in Pro_PIClassType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">计次方式</div>
                  <el-select v-model="detaiProject.Pro_TimesCountType" placeholder="请选择计次方式" disabled>
                    <el-option v-for="item in Pro_TimesCountType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">标准工时</div>
                  <el-input v-model="detaiProject.Pro_StandardHour"
                            placeholder="请输入标准工时" disabled></el-input>
                </el-form-item>
                <el-form-item class="testAlign">
                  <div class="textClass">安全次数</div>
                  <el-input v-model="detaiProject.Pro_ShortLimit"
                            placeholder="请输入安全次数" disabled></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item  class="testAlign">
                  <div class="textClass">销售单价<a>*</a></div>
                  <el-input v-model="detaiProject.Pro_SalePrice"
                            placeholder="请输入项目条码" disabled></el-input>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">积分方式</div>
                  <el-select v-model="detaiProject.Pro_IntegralTypeCode" placeholder="请选择积分方式" disabled>
                    <el-option v-for="item in Pro_IntegralTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">积分比率</div>
                  <el-input v-model="detaiProject.Pro_IntegralRate"
                            placeholder="请输入积分比率" disabled></el-input>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">消费间隔</div>
                  <el-input v-model="detaiProject.Pro_It_SaleInterval"
                            placeholder="请输入消费间隔" disabled></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item  class="testAlign">
                  <div class="textClass">回访间隔</div>
                  <el-input v-model="detaiProject.Pro_VisitInterval"
                            placeholder="请输入回访间隔" disabled></el-input>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">统计分类</div>
                  <el-select v-model="detaiProject.Pro_StatisticalTypeCode" placeholder="请选择统计分类"disabled >
                    <el-option v-for="item in Pro_StatisticalTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">是否可以使用现金</div>
                  <el-radio @click.native.prevent="onIsUseValue('1')" v-model="detaiProject.Pro_IsUseCash" label="1" disabled>是</el-radio>
                  <el-radio @click.native.prevent="onIsUseValue('0')" v-model="detaiProject.Pro_IsUseCash" label="0" disabled>否</el-radio>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">是否可以评价</div>
                  <el-radio @click.native.prevent="onIsComentValue('1')" v-model="detaiProject.Pro_IsUseComent" label="1" disabled>是</el-radio>
                  <el-radio @click.native.prevent="onIsComentValue('0')" v-model="detaiProject.Pro_IsUseComent" label="0" disabled>否</el-radio>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item  class="testAlign">
                  <div class="textClass">门店体验价格</div>
                  <el-input v-model="detaiProject.Pro_FenDianPrice"
                            placeholder="请输入门店体验价格" disabled></el-input>
                </el-form-item>

                <el-form-item  class="testAlign">
                  <div class="textClass">是否启用门店体验价格</div>
                  <el-radio @click.native.prevent="onIsPriceValue('1')" v-model="detaiProject.Pro_IsFenDianPrice" label="1" disabled>是</el-radio>
                  <el-radio @click.native.prevent="onIsPriceValue('0')" v-model="detaiProject.Pro_IsFenDianPrice" label="0" disabled>否</el-radio>
                </el-form-item>

                <el-form-item  class="testAlign">
                  <div class="textClass">统一会员价格</div>
                  <el-input v-model="detaiProject.Pro_MemberPrice"
                            placeholder="请输入门店体验价格" disabled></el-input>
                </el-form-item>

                <el-form-item  class="testAlign">
                  <div class="textClass">是否启用统一会员价格</div>
                  <el-radio @click.native.prevent="onIsMemberValue('1')" v-model="detaiProject.Pro_IsMemberPrice" label="1" disabled>是</el-radio>
                  <el-radio @click.native.prevent="onIsMemberValue('0')" v-model="detaiProject.Pro_IsMemberPrice" label="0" disabled>否</el-radio>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"   style="margin:-15px 0px 0px 15px">
                  <div class="textClass">备注</div>
                  <el-input v-model="detaiProject.Pro_Desc" type="textarea" :rows="7" class="desc"
                            placeholder="请输入备注" disabled></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <!--//选择门店-->
        <el-tab-pane label="选择使用门店/价格">
          <div class="changeStore" v-if="qwe">
            <el-table :data=acmodexTreeb style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
              <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
              <el-table-column  label="销售成本" align="center">
                <template  slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_SalePrice"
                    placeholder="请输入销售成本"disabled>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column  label="门店价格" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_FendianPrice"
                    placeholder="请输入门店价格" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="卡级价格" align="center">
                <template slot-scope="scope">
                  <DetaiProCard  :parentMessage="scope.row.Fe_GUID" :Proid="Proid"></DetaiProCard>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import {UpdateProject,CommonDictionaryTree,ProFenItem} from "../../../config/Api"
  import DetaiProCard from "./DetaiProCard"
    export default {
        name: "DetaiProject",
      components:{
        DetaiProCard
      },
      data(){
        return{
          Pro_IntegralTypeCode:'',
          Pro_StatisticalTypeCode:[],
          Pro_ChargType:[],
          Pro_TimesCountType:'',
          Pro_PIClassType:'',
          Pro_DepartmentCode:'',
          acmodexTreeb:[],
          qwe:true,
          Proid:this.$route.params.Proid,
          detaiProject:{
            Pro_Name: '',
            Pro_PIClassType:'',
            Pro_Barcode: '',
            Pro_SalePrice:'',
            Pro_DepartmentCode: '',
            Pro_TimesCountType: '',
            Pro_StandardHour: '',
            Pro_ShortLimit: '',
            Pro_ChargType: '',
            Pro_IntegralTypeCode: '',
            Pro_IntegralRate: '',
            Pro_It_SaleInterval: '',
            Pro_VisitInterval: '',
            Pro_StatisticalTypeCode: '',
            Pro_IsMemberPrice:'',
            Pro_IsUseCash:'',
            Pro_IsUseComent:'',
            Pro_IsFenDianPrice:'',
          },
          selectTree:[],
        }
      },
      created(){
        this.queryProjectList();
        this.querySelectList();
        this.mendian();
      },
      methods:{
        //批量设置
        reload(){
          this.qwe = false;
          this.$nextTick(function () {
            this.qwe = true;
          })
        },
        //获取自组件数组
        modelBox(value){
          this.acmodexTreeb=value;
        },
        //获取门店接口
        mendian(){
          this.$http.post(ProFenItem + this.$route.params.Proid).then(resp=> {
            this.acmodexTreeb = resp.data.data;
          });
          this.reload();
        },
        //获取卡级数组
        AddProCard(val){
          this.table = val;
          let tabg = {};
          if(this.table.length > 0){
            for(var i=0;i<this.table.length;i++) {
              tabg = {};
              this.tabg.ProF_CardPrice = this.table[i].ProF_CardPrice;
              this.tabg.ProF_CardDiscount = this.table[i].ProF_CardDiscount;
              this.tabg.Fe_GUID = this.table[i].parentMessage;
              this.tabg.Ca_GUID = this.table[i].Ca_GUID;
              this.tableData.push(tabg);
            }
          }
        },
        queryProjectList(){
          this.$http.post(UpdateProject + this.$route.params.Proid).then(resp=>{
            this.detaiProject.Pro_Name = resp.data.data.Pro_Name;
            this.detaiProject.Pro_PIClassType = resp.data.data.Pro_PIClassType;
            this.detaiProject.Pro_Barcode = resp.data.data.Pro_Barcode;
            this.detaiProject.Pro_SalePrice = resp.data.data.Pro_SalePrice;
            this.detaiProject.Pro_DepartmentCode = resp.data.data.Pro_DepartmentCode;
            this.detaiProject.Pro_TimesCountType = resp.data.data.Pro_TimesCountType;
            this.detaiProject.Pro_StandardHour = resp.data.data.Pro_StandardHour;
            this.detaiProject.Pro_ShortLimit = resp.data.data.Pro_ShortLimit;
            this.detaiProject.Pro_ChargType = resp.data.data.Pro_ChargType;
            this.detaiProject.Pro_IntegralTypeCode = resp.data.data.Pro_IntegralTypeCode;
            this.detaiProject.Pro_IntegralRate = resp.data.data.Pro_IntegralRate;
            this.detaiProject.Pro_It_SaleInterval = resp.data.data.Pro_It_SaleInterval;
            this.detaiProject.Pro_VisitInterval = resp.data.data.Pro_VisitInterval;
            this.detaiProject.Pro_StatisticalTypeCode = resp.data.data.Pro_StatisticalTypeCode;
            this.detaiProject.Pro_IsMemberPrice = resp.data.data.Pro_IsMemberPrice+'';
            this.detaiProject.Pro_IsUseCash = resp.data.data.Pro_IsUseCash+'';
            this.detaiProject.Pro_IsUseComent = resp.data.data.Pro_IsUseComent+'';
            this.detaiProject.Pro_IsFenDianPrice = resp.data.data.Pro_IsFenDianPrice+'';
          })
        },
        querySelectList(){
          let radio = {
            CoCode:["AW22","AY24","BB27","AX23","AV21","AC03"],
          };
          this.$http.post(CommonDictionaryTree,this.$qs.stringify(radio)).then(resp=>{
            for (let i in resp.data.data) {
              if (resp.data.data[i].Co_Code === 'AW22') {
                this.Pro_ChargType = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AY24') {
                this.Pro_IntegralTypeCode  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'BB27') {
                this.Pro_StatisticalTypeCode  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AX23') {
                this.Pro_TimesCountType  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AV21') {
                this.Pro_DepartmentCode  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AC03') {
                this.Pro_PIClassType  = resp.data.data[i].List;
              }
            }
          })
        },
      },
    }
</script>
<style>
  .infoBox .el-input__inner {
    height: 30px !important;
    font-size: 12px;
    margin-right:2px;
    /*width:180px;*/
  }
  .infoBox{
    text-align: left;
    margin-left: 20px;
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
  .textClass{
    margin:0px 0px -17px 0px;
  }
  .textClass a{
    color: red;
  }
  .desc{
    margin-top: 7px;
    width: 300px;
  }
  .store{
    overflow: hidden;

    color:#0082d6;
    float: left;
  }
</style>
