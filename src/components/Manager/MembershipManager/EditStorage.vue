<template>
  <div>
    <div class="editStorageDiv">
      <el-dialog title="编辑寄存" @close="closeDialog" :visible.sync="editStorageIsShow" width="30%"
                 class="editStorageDialog"
                 :append-to-body="true"
                 :close-on-click-modal="false" :show-close='visibleCLOSE'>
        <div>
          <el-form :model="EditStorageHistory" :rules="rules" ref="EditStorageHistory" status-icon :inline="true"
                   label-position="top">
            <div class="divA">
              <el-form-item prop="Fe_GUID">
                <a>*</a>
                <el-select v-model="EditStorageHistory.Fe_GUID" placeholder="请选择门店" style="width: 193px;">
                  <el-option v-for="item in StoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                             :value="item.Fe_GUID"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Order_Code">
                <a>*</a>
                <el-input v-model="EditStorageHistory.Order_Code" style="width:193px;"
                          placeholder="请输入订单号"></el-input>
              </el-form-item>
            </div>
            <div class="divA">
              <el-form-item prop="Pro_Type">
                <a>*</a>
                <el-select v-model="EditStorageHistory.Pro_Type" placeholder="请选择产品类别" style="width: 193px;"
                           @change="changeProduct">
                  <el-option v-for="item in ProductList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Pro_GUID">
                <a>*</a>
                <el-select v-model="EditStorageHistory.Pro_GUID" placeholder="请选择产品" style="width:193px;">
                  <el-option v-for="item in ProductNameList" :key="item.Pro_GUID" :label="item.Pro_Name"
                             :value="item.Pro_GUID"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="divA">
              <el-form-item prop="Mdh_TotalSum">
                <a>*</a>
                <el-input v-model="EditStorageHistory.Mdh_TotalSum" style="width: 120px;"
                          placeholder="请输入总数量"></el-input>
              </el-form-item>
              <el-form-item prop="Mdh_StandardPrice">
                <a style="margin-left: 10px;">*</a>
                <el-input v-model="EditStorageHistory.Mdh_StandardPrice" style="width: 120px;"
                          placeholder="请输入标准单价"></el-input>
              </el-form-item>
              <el-form-item prop="Mdh_RemainSum">
                <a style="margin-left: 10px;">*</a>
                <el-input v-model="EditStorageHistory.Mdh_RemainSum" style="width: 120px;"
                          placeholder="请输入剩余数量"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="padding-bottom: 10px;text-align: center;">
          <el-button @click.native="handleClose(EditStorageHistory)" icon="el-icon-circle-close-outline">取 消</el-button>
          <el-button type="primary" icon="el-icon-circle-check-outline" @click="editStorageBtn(EditStorageHistory)">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <el-button type="text" size="small" @click="editStorageClick">编辑</el-button>
  </div>
</template>

<script>
  import {
    CommonDictionaryTree,
    queryStoreList,
    QueryProduct,
    QueryStorage,
    EditStorage
  } from '../../../config/Api.js'

  export default {
    data() {
      return {
        visibleCLOSE: false,
        editStorageIsShow: false,
        EditStorageHistory: {
          Pro_GUID: '',
          Order_Code: '',
          Mdh_StandardPrice: '',
          Mdh_TotalSum: '',
          Fe_GUID: '',
          Pro_Type: '',
          Mdh_RemainSum: '',
        },
        ChannelList: [],
        ProductList: [],
        ProductNameList: [],
        StoreList: [],
        rules: {
          Pro_GUID: [
            {required: true, message: '请选择产品', trigger: 'blur'},
          ], Fe_GUID: [
            {required: true, message: '请选择门店', trigger: 'blur'},
          ],
          Pro_Type: [
            {required: true, message: '请选择产品类别', trigger: 'blur'},
          ],
          Order_Code: [
            {required: true, message: '请输入订单号', trigger: 'blur'},
          ],
          Mdh_StandardPrice: [
            {required: true, message: '请输入标准单价', trigger: 'blur'},
          ],
          Mdh_TotalSum: [
            {required: true, message: '请输入总数量', trigger: 'blur'},
          ],
          Mdh_RemainSum: [
            {required: true, message: '请输入剩余数量', trigger: 'blur'},
          ],
        },
        historyData: [],
      }
    },
    created() {
      this.querySelectData();
      this.queryStoreList();
    },
    props: ['Mdh_GUID', 'Md_GUID'],
    methods: {
      editStorageClick() {
        this.editStorageIsShow = true;
        this.queryStorage();
      },
      querySelectData() {
        let params = {
          CoCode: ["AE05", "AB02"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AE05') {
              this.ChannelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AB02') {
              this.ProductList = resp.data.data[position].List;
            }
          }
        })
      },
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.StoreList = resp.data.data;
        })
      },
      changeProduct(data) {
        this.queryPruductName(data);
      },
      //查询产品
      queryPruductName(data) {
        this.$http.post(QueryProduct + data).then(resp => {
          if (resp.data.code === 0) {
            this.ProductNameList = resp.data.data;
          }
        });
      },
      queryStorage() {
        this.$http.get(QueryStorage + this.Mdh_GUID).then(resp => {
            if (resp.data.code === 0) {
              this.EditStorageHistory.Pro_GUID = resp.data.data.Pro_GUID;
              this.EditStorageHistory.Order_Code = resp.data.data.Order_Code;
              this.EditStorageHistory.Mdh_TotalSum = resp.data.data.Mdh_TotalSum;
              this.EditStorageHistory.Mdh_StandardPrice = resp.data.data.Mdh_StandardPrice;
              this.EditStorageHistory.Fe_GUID = resp.data.data.Fe_GUID;
              this.EditStorageHistory.Pro_Type = resp.data.data.Pro_Type;
              this.EditStorageHistory.Mdh_RemainSum = resp.data.data.Mdh_RemainSum;
              this.queryPruductName(this.EditStorageHistory.Pro_Type);
            }
          }
        )
      },
      editStorageBtn(formName) {
        let params = {
          Me_GUID: this.Md_GUID,
          Mdh_GUID: this.Mdh_GUID,
          Pro_GUID: this.EditStorageHistory.Pro_GUID,
          Order_Code: this.EditStorageHistory.Order_Code,
          Mdh_TotalSum: this.EditStorageHistory.Mdh_TotalSum,
          Mdh_StandardPrice: this.EditStorageHistory.Mdh_StandardPrice,
          Fe_GUID: this.EditStorageHistory.Fe_GUID,
          Pro_Type: this.EditStorageHistory.Pro_Type,
          Mdh_RemainSum: this.EditStorageHistory.Mdh_RemainSum,
        };
        this.$http.post(EditStorage, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'
            });
          }
          this.editStorageIsShow = false;
          this.$emit('AddStorageEmit');
          if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
          }
        });
      },
      handleClose(formName) {
        this.editStorageIsShow = false;
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      closeDialog() {
        this.$refs['EditStorageHistory'].resetFields();
      }
    },
    name: "EditStorage"
  }
</script>

<style>
  .divStorage .cell a {
    color: red;
  }

  .editStorageDialog .el-dialog__header {
    background-color: #8ccbff;
  }

  .editStorageDialog .el-dialog {
    border-radius: 20px;
  }

  .editStorageDialog .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .editStorageDialog .el-dialog__title {
    color: white;
  }

  .editStorageDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .editStorageDialog .el-button--default span {
    color: #8ccbff;
  }

  .editStorageDialog .el-dialog__body {
    padding: 10px 10px 0;
  }

  .editStorageDialog .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .editStorageDialog .el-button {
    height: 38px;
  }

</style>

<style scoped>
  .divA {
    float: left;
    width: 100%;
  }

  .editStorageDiv {
    width: 30%;
    height: auto;
  }

</style>

