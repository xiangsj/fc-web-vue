<template>
  <div>
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetForm('EditPayForm')">重置</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitEditPayMethod('EditPayForm')">保存
      </el-button>
    </div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="infoBox" style="padding: 10px;margin-top: -20px;">
            <el-form :model="EditPayForm" :rules="rules" ref="EditPayForm" class="addForm" status-icon :inline="true"
                     label-position="top">
              <div style="text-align: left;">
                <el-form-item prop="Payt_Name" class="testAlign">
                  <div class="textClass">类型名称</div>
                  <el-input v-model="EditPayForm.Payt_Name" style="padding-top: -10px;width: 220px;"
                            placeholder="请输入类型名称"></el-input>
                </el-form-item>
                <el-form-item prop="Payt_Type" class="testAlign">
                  <div class="textClass">类型</div>
                  <el-select v-model="EditPayForm.Payt_Type" placeholder="请选择类型">
                    <el-option v-for="item in PaytTypeList" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <!--<el-form-item label="排序" prop="Payt_Num" class="testAlign">-->
                <!--<el-input v-model="Payt_Num" style="width: 160px;padding-top: -10px" @keyup.native="number"-->
                <!--placeholder="请输入排序号"></el-input>-->
                <!--</el-form-item>-->

                <el-form-item prop="radio_Item" class="testAlign el-radio-group">
                  <div class="textClass">购项目是否使用</div>
                  <el-radio v-model="EditPayForm.radio_Item" @click.native.prevent="onChangeUseItem('1')" label="1">是
                  </el-radio>
                  <el-radio v-model="EditPayForm.radio_Item" @click.native.prevent="onChangeUseItem('0')" label="0">否
                  </el-radio>
                </el-form-item>

                <el-form-item prop="radio_Card" class="testAlign el-radio-group">
                  <div class="textClass">购卡是否使用</div>
                  <el-radio v-model="EditPayForm.radio_Card" @click.native.prevent="onChangeUseCard('1')" label="1">是
                  </el-radio>
                  <el-radio v-model="EditPayForm.radio_Card" @click.native.prevent="onChangeUseCard('0')" label="0">否
                  </el-radio>
                </el-form-item>

                <el-form-item prop="radio_Product" class="testAlign el-radio-group">
                  <div class="textClass">购产品是否使用</div>
                  <el-radio v-model="EditPayForm.radio_Product" @click.native.prevent="onChangeUseProduct('1')"
                            label="1">是
                  </el-radio>
                  <el-radio v-model="EditPayForm.radio_Product" @click.native.prevent="onChangeUseProduct('0')"
                            label="0">否
                  </el-radio>
                </el-form-item>
                <el-form-item prop="State" class="testAlign el-radio-group">
                  <div class="textClass">状态</div>
                  <el-radio @click.native.prevent="onChangeValue('0')" v-model="EditPayForm.radio_State" label="0">正常
                  </el-radio>
                  <el-radio @click.native.prevent="onChangeValue('1')" v-model="EditPayForm.radio_State" label="1">无效
                  </el-radio>
                </el-form-item>
              </div>

              <div style="text-align: left;margin-top: -15px;margin-bottom: -20px;">
                <el-form-item label="说明" prop="Textarea">
                  <el-input v-model="EditPayForm.Textarea" type="textarea" :rows="4" class="desc"
                            placeholder="请输入内容"></el-input>
                </el-form-item>
              </div>

            </el-form>
          </div>


        </el-tab-pane>
        <el-tab-pane label="选择使用门店">
          <div class="changeStore">
            <el-table :data="tableUserList" style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column prop="storeNum" label="门店编号" align="center"></el-table-column>
              <el-table-column prop="storeName" label="门店名称" align="center"></el-table-column>
            </el-table>

            <!--<div class="pageBox">-->
            <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
            <!--:current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"-->
            <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
            <!--</el-pagination>-->
            <!--</div>-->


          </div>

        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>

<script>
  import {QueryPayApi, EditPayApi, CommonDictionaryTree} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        EditPayForm: {
          Payt_Name: '',  //类型名称
          Payt_Type: "",//类型
          Textarea: '', //说明
          radio_Item: '',
          radio_Card: '',
          radio_Product: '',
          radio_State: '',
        },
        // Payt_Num: "",//排序
        PaytTypeList: [],
        rules: {
          Payt_Name: [
            {required: true, message: '请输入类型名称', trigger: 'blur'},
          ],
          Payt_Type: [
            {required: true, message: '请选择类型', trigger: 'blur'}]
        },

        //门店
        tableUserList: [],
      }
    },
    created() {
      this.queryPayTypeData();
      this.getPayInfo();
    },
    mounted() {

    },
    methods: {
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
      //获取编辑页面的支付信息
      getPayInfo() {
        let Payt_GUID = this.$route.params.payId;
        this.$http.get(QueryPayApi + Payt_GUID).then(resp => {
          this.EditPayForm.Payt_Name = resp.data.data.Payt_Name;
          this.EditPayForm.Payt_Type = resp.data.data.Payt_Type;
          // this.Payt_Num = resp.data.data.Payt_Code;
          this.EditPayForm.radio_Item = resp.data.data.Payt_IsUseItem + '';
          this.EditPayForm.radio_Card = resp.data.data.Payt_IsUseCard + '';
          this.EditPayForm.radio_Product = resp.data.data.Payt_IsUseProduct + '';
          this.EditPayForm.radio_State = resp.data.data.State + '';
          this.EditPayForm.Textarea = resp.data.data.Payt_Desc;
        });
      },
      //修改支付信息
      editPayInfo() {
        let params = {
          Payt_GUID: this.$route.params.payId,
          Payt_Name: this.EditPayForm.Payt_Name,
          Payt_IsUseItem: this.EditPayForm.radio_Item,
          Payt_IsUseProduct: this.EditPayForm.radio_Product,
          Payt_IsUseCard: this.EditPayForm.radio_Card,
          Payt_Type: this.EditPayForm.Payt_Type,
          Payt_Desc: this.EditPayForm.Textarea,
          State: this.EditPayForm.radio_State,
          FendianName: ["67EC2443-A98C-433E-9326-233FA89D5976"],
        }
        this.$http.post(EditPayApi, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'
            });
          }
        })
      },
      onChangeUseItem(data) {
        this.EditPayForm.radio_Item = data;
      },
      onChangeUseCard(data) {
        this.EditPayForm.radio_Card = data;
      },
      onChangeUseProduct(data) {
        this.EditPayForm.radio_Product = data;
      },
      onChangeValue(data) {
        this.EditPayForm.radio_State = data;
      },
      //提交表单
      submitEditPayMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editPayInfo()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetForm(EditPayForm) {
        this.$refs[EditPayForm].resetFields();
      },
    },
    name: "EditPay"
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
    width: 15%;
  }

  .textClass {
    margin-top: 10px;
    line-height: 25px;
  }

</style>
