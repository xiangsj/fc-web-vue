<template>
  <div class="addStorageDiv">
    <el-dialog title="编辑沟通" :visible="this.$store.state.editCommuniceIsShow" width="30%"
               @close="closeCommunicDialog"
               :close-on-click-modal="false" :show-close='visibleCLOSE'>
      <div>
        <el-form :model="EditCommuniceForm" :rules="rules" ref="EditCommuniceForm" status-icon :inline="true"
                 label-position="top">
          <div>
            <el-form-item prop="Mc_Item" class="divA">
              <a>*</a>
              <el-select v-model="EditCommuniceForm.Mc_Item" multiple collapse-tags
                         placeholder="请选择服务项目">
                <el-option v-for="item in ServiceItemsList" :key="item.Pro_Name" :label="item.Pro_Name"
                           :value="item.Pro_Name">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="Mc_Communicator" class="divA">
              <a>*</a>
              <el-select v-model="EditCommuniceForm.Mc_Communicator" placeholder="请选择沟通人员">
                <el-option v-for="item in CommuniceList" :key="item.Fe_GUID" :label="item.Fe_Name"
                           :value="item.Fe_GUID"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
          </div>
          <div style="width: 100%;">
            <el-form-item prop="Mc_Record" class="divA">
              <a>*</a>
              <el-input v-model="EditCommuniceForm.Mc_Record" style="width: 85%;"
                        placeholder="请输入沟通内容"></el-input>
            </el-form-item>
            <Upload></Upload>
          </div>
        </el-form>
      </div>
      <div style="padding-bottom: 10px;text-align: center;">
        <el-button @click.native="handleClose(EditCommuniceForm)" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="editCommunice(EditCommuniceForm)">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {EditCommuniceList, QueryEmpList, QueryHairType,QueryCommuniceList} from '../../../config/Api.js'
  import Upload from '../../Upload'

  export default {
    data() {
      return {
        EditCommuniceForm: {
          Mc_Communicator: '',
          Mc_Record: '',
          Mc_Item: '',
        },
        CommuniceList: [],
        ServiceItemsList: [],
        visibleCLOSE: false,
        rules: {
          Mc_Communicator: [
            {required: true, message: '请选择沟通人员', trigger: 'blur'},
          ],
          Mc_Item: [
            {required: true, message: '请选择服务项目', trigger: 'blur'},
          ],
        },
        NAME: '',
        Mc_GUID: '',
        CommuniceData:[],
      }
    },
    created() {
      this.queryCommuniceList();
      this.queryCairList();
    },
    watch: {
      NAME() {
        this.queryCommunice();
      }
    },
    components: {
      Upload
    },
    methods: {
      queryCommunice() {
        // alert("哈哈哈");
        if (this.NAME === 'NAME') {
          this.$http.get(QueryCommuniceList + this.Mc_GUID).then(resp => {
            if (resp.data.code === 0) {
              this.EditCommuniceForm.Mc_Communicator = resp.data.data.Mc_Communicator;
              this.EditCommuniceForm.Mc_Record = resp.data.data.Mc_Record;
              this.EditCommuniceForm.Mc_Item = resp.data.data.Mc_Item;
            }
          });
        }
      },
      queryCairList() {
        this.$http.post(QueryHairType + "2").then(resp => {
          this.ServiceItemsList = resp.data.data;
        })
      },
      queryCommuniceList() {
        this.$http.post(QueryEmpList).then(resp => {
          this.CommuniceList = resp.data.data;
        })
      },
      editCommunice(formName) {
        let params = {
          Me_GUID: this.MEGUID,
          Mc_Image: this.EditCommuniceForm.Mc_Image,//图片
          Mc_Item: this.EditCommuniceForm.Mc_Item + '',
          Mc_Communicator: this.EditCommuniceForm.Mc_Communicator,
          Mc_Record: this.EditCommuniceForm.Mc_Record,
        };
        this.$http.post(EditCommuniceList, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
          this.$store.state.editCommuniceIsShow = false;
          this.$emit('AddCommuniceEmit');
          if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
          }
        });
      },
      handleClose(formName) {
        this.$store.state.editCommuniceIsShow = false;
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      closeCommunicDialog() {
        this.$refs['EditCommuniceForm'].resetFields();
      }
    },
    name: "EditCommunice"
  }
</script>

<style>
  .divA a {
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
  }
</style>
