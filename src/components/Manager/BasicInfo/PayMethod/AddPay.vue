<template>
  <div>

    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetForm('AddPayForm')">重置</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitPayMethod('AddPayForm')">保存</el-button>
    </div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="infoBox" style="padding: 10px;margin-top: -20px;">
            <el-form :model="AddPayForm" :rules="rules" ref="AddPayForm" status-icon :inline="true"
                     label-position="top">
              <div style="text-align: left;">
                <el-form-item prop="Payt_Name" class="testAlign">
                  <div class="textClass">类型名称<a>*</a></div>
                  <el-input v-model="AddPayForm.Payt_Name" style="width:260px;padding-top: -10px;"
                            placeholder="请输入类型名称"></el-input>
                </el-form-item>
                <el-form-item prop="Payt_Type" class="testAlign">
                  <div class="textClass">类型<a>*</a></div>
                  <el-select v-model="AddPayForm.Payt_Type" placeholder="请选择类型">
                    <el-option v-for="item in PaytTypeList" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="radio_Item" class="testAlign">
                  <div class="textClass">购项目是否使用</div>
                  <el-radio v-model="AddPayForm.radio_Item" label="1">是</el-radio>
                  <el-radio v-model="AddPayForm.radio_Item" label="0">否</el-radio>
                </el-form-item>

                <el-form-item prop="radio_Card" class="testAlign">
                  <div class="textClass">购卡是否使用</div>
                  <el-radio v-model="AddPayForm.radio_Card" label="1">是</el-radio>
                  <el-radio v-model="AddPayForm.radio_Card" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="radio_Product" class="testAlign">
                  <div class="textClass">购产品是否使用</div>
                  <el-radio v-model="AddPayForm.radio_Product" label="1">是</el-radio>
                  <el-radio v-model="AddPayForm.radio_Product" label="0">否</el-radio>
                </el-form-item>
              </div>

              <div style="text-align: left;">
                <el-form-item prop="Payt_Order" class="testAlign">
                  <div class="textClass">排序</div>
                  <el-input v-model="AddPayForm.Payt_Order" style="width:220px;padding-top: -10px;"
                            placeholder="请输入排序号"></el-input>
                </el-form-item>
                <el-form-item prop="Payt_IsOffen" class="testAlign">
                  <div class="textClass">是否为常用支付方式</div>
                  <el-radio v-model="AddPayForm.Payt_IsOffen" label="1">是</el-radio>
                  <el-radio v-model="AddPayForm.Payt_IsOffen" label="0">否</el-radio>
                </el-form-item>
              </div>

              <div style="text-align: left;">
                <el-form-item label="说明" prop="Textarea" style="margin-top: -10px;margin-bottom: -5px">
                  <el-input v-model="AddPayForm.Textarea" type="textarea" :rows="4" class="desc"
                            placeholder="请输入内容"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>


        </el-tab-pane>
        <el-tab-pane label="选择使用门店">
          <div style="text-align: left">
            <div style="display:inline"><img src="../../../../../static/images/select_store.png"/>
            <ModelBox style="display:inline" @modelBox="modelBox"></ModelBox>
            </div>
          </div>
          <div class="changeStore">
            <el-table :data="tableUserList" style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
              <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="deleteAddPayStore(scope.row,scope.$index,tableUserList)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <DeleteAddStore ref="deleteStoreParam" @AddStoreEmit="AddStoreData"></DeleteAddStore>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>

<script>
  import {AddPayApi, CommonDictionaryTree} from "../../../../config/Api.js"
  import ModelBox from "../../../ModelBox"
  import DeleteAddStore from "./DeleteAddStore"

  export default {
    data() {
      return {
        AddPayForm: {
          Payt_Name: '',  //类型名称
          Payt_Type: "",//类型
          radio_Item: '0',
          radio_Card: '0',
          radio_Product: '0',
          Payt_IsOffen: '0',
          Payt_Order: '1',
          Textarea: '', //说明
        },
        // Payt_Num: "",//排序
        PaytTypeList: [],//类型
        rules: {
          Payt_Name: [
            {required: true, message: '请输入类型名称', trigger: 'blur'},
          ],
          Payt_Type: [
            {required: true, message: '请选择类型', trigger: 'blur'}]
        },
        //门店
        tableUserList: [],
        FenGuidList: [],
      }
    },
    created() {
      this.queryPayTypeData();
    },
    components: {
      ModelBox, DeleteAddStore
    },
    methods: {
      //  验证排序只能输入正整数
      // number() {
      //   this.Payt_Num = this.Payt_Num.replace(/[^\.\d]/g, '');
      //   this.Payt_Num = this.Payt_Num.replace('.', '');
      // },
      //查询支付方式下拉框数据
      queryPayTypeData() {
        let params = {
          CoCode: ["AP15"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AP15') {
              this.PaytTypeList = resp.data.data[position].List;
            }
          }
        })
      },
      //获取门店数据
      modelBox(value) {
        this.tableUserList = value;
        for (let i = 0; i < this.tableUserList.length; i++) {
          this.FenGuidList[i] = this.tableUserList[i].value;
        }
      },
      AddStoreData(data) {
        this.FenGuidList=[];
        for (let i = 0; i < data.length; i++) {
          this.FenGuidList[i] = data[i].value;
        }
      },
      addPayMethod() {
        let params = {
          Payt_Name: this.AddPayForm.Payt_Name,
          Payt_IsUseItem: this.AddPayForm.radio_Item,
          Payt_IsUseProduct: this.AddPayForm.radio_Product,
          Payt_IsUseCard: this.AddPayForm.radio_Card,
          Payt_Type: this.AddPayForm.Payt_Type,
          Payt_Desc: this.AddPayForm.Textarea,
          FendianName: this.FenGuidList,
          Payt_IsOffen: this.AddPayForm.Payt_IsOffen,
          Payt_Order: this.AddPayForm.Payt_Order,
        };
        this.$http.post(AddPayApi, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        })
      },
      //提交表单
      submitPayMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addPayMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetForm(AddPayForm) {
        this.$refs[AddPayForm].resetFields();
      },
      deleteAddPayStore(rows, index, data) {
        this.$store.state.deleteStorePayIsShow = true;
        this.$refs.deleteStoreParam.currentRows = rows;
        this.$refs.deleteStoreParam.currentIndex = index;
        this.$refs.deleteStoreParam.storeAddData = data;
      },
    },
    name: "AddPay"
  }
</script>

<style>
  .infoBox .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .infoBox .el-button {
    height: 38px;
  }
</style>

<style scoped>

  .btnBox {
    height: 49px;
    text-align: end;
  }

  .desc {
    width: 500px;
    margin-top: -15px;
  }

  .testAlign {
    width: 18%;
  }

  .textClass {
    margin-top: 10px;
    line-height: 25px;
  }

  .textClass a {
    color: red;
  }

</style>
