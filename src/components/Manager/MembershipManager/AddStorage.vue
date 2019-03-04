<template>
  <div class="addStorageDiv">
    <el-dialog title="添加寄存" :visible="this.$store.state.addStorageIsShow" width="30%"
               @close="closeDialog"
               :close-on-click-modal="false" :show-close='visibleCLOSE'>
      <div>
        <el-form :model="AddStorageHistory" :rules="rules" ref="AddStorageHistory" status-icon :inline="true"
                 label-position="top">
          <div style="width: 100%">
            <el-form-item prop="Fe_GUID" class="divA">
              <a>*</a>
              <el-select v-model="AddStorageHistory.Fe_GUID" placeholder="请选择门店">
                <el-option v-for="item in StoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                           :value="item.Fe_GUID"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Order_Code" class="divA">
              <a>*</a>
              <el-input v-model="AddStorageHistory.Order_Code" style="width: 193px;"
                        placeholder="请输入订单号"></el-input>
            </el-form-item>
          </div>
          <div style="width: 100%">
            <el-form-item prop="Pro_Type" class="divA">
              <a>*</a>
              <el-select v-model="AddStorageHistory.Pro_Type" placeholder="请选择产品类别"
                         @change="changeProduct">
                <el-option v-for="item in ProductList" :key="item.Co_Values" :label="item.Co_Name"
                           :value="item.Co_Values"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Pro_GUID" class="divA">
              <a>*</a>
              <el-select v-model="AddStorageHistory.Pro_GUID" placeholder="请选择产品">
                <el-option v-for="item in ProductNameList" :key="item.Pro_GUID" :label="item.Pro_Name"
                           :value="item.Pro_GUID"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 100%;">
            <el-form-item prop="Mdh_TotalSum" class="divB">
              <a>*</a>
              <el-input v-model="AddStorageHistory.Mdh_TotalSum" style="width: 120px;"
                        placeholder="请输入总数量"></el-input>
            </el-form-item>
            <el-form-item prop="Mdh_StandardPrice" class="divB">
              <a style="margin-left: 10px;">*</a>
              <el-input v-model="AddStorageHistory.Mdh_StandardPrice" style="width: 120px;"
                        placeholder="请输入标准单价"></el-input>
            </el-form-item>
            <el-form-item prop="Mdh_RemainSum" class="divB">
              <a style="margin-left: 10px;">*</a>
              <el-input v-model="AddStorageHistory.Mdh_RemainSum" style="width: 120px;"
                        placeholder="请输入剩余数量"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" >
        <el-button @click.native="handleClose(AddStorageHistory)" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="addPatchCard(AddStorageHistory)">确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {CommonDictionaryTree, AddStorage, queryStoreList, QueryProduct} from '../../../config/Api.js'

  export default {
    data() {
      return {
        visibleCLOSE: false,
        AddStorageHistory: {
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
        MEGUID: '',
      }
    },
    created() {
      this.querySelectData();
      this.queryStoreList();
    },
    methods: {
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
      addPatchCard(formName) {
        let params = {
          Me_GUID: this.MEGUID,
          Pro_GUID: this.AddStorageHistory.Pro_GUID,
          Order_Code: this.AddStorageHistory.Order_Code,
          Mdh_TotalSum: this.AddStorageHistory.Mdh_TotalSum,
          Mdh_StandardPrice: this.AddStorageHistory.Mdh_StandardPrice,
          Fe_GUID: this.AddStorageHistory.Fe_GUID,
          Pro_Type: this.AddStorageHistory.Pro_Type,
          Mdh_RemainSum: this.AddStorageHistory.Mdh_RemainSum,
        };
        this.$http.post(AddStorage, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
          this.$store.state.addStorageIsShow = false;
          this.$emit('AddStorageEmit');
          if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
          }
        });
      },
      handleClose(formName) {
        this.$store.state.addStorageIsShow = false;
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      closeDialog() {
        this.$refs['AddStorageHistory'].resetFields();
      }
    },
    name: "AddStorage"
  }
</script>

<style>
  .divA a {
    color: red;
  }

  .divB a {
    color: red;
  }

  .addStorageDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .addStorageDiv .el-dialog {
    border-radius: 20px;
  }

  .addStorageDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .addStorageDiv .el-dialog__title {
    color: white;
  }

  .addStorageDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .addStorageDiv .el-button--default span {
    color: #8ccbff;
  }

  .addStorageDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .addStorageDiv .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .addStorageDiv .el-button {
    height: 38px;
  }

</style>

<style scoped>
  .divA {
    float: left;
    width: 45%;
  }

  .divB {
    float: left;
    width: 30%;
  }
</style>

