<template>
  <div class="addCommuniceDiv">
    <el-dialog title="添加沟通" :visible="this.$store.state.addCommuniceIsShow" width="30%"
               @close="closeCommunicDialog"
               :close-on-click-modal="false" :show-close='visibleCLOSE'>
      <div>
        <el-form :model="AddCommuniceForm" :rules="rules" ref="AddCommuniceForm" status-icon :inline="true"
                 label-position="top">
          <div>
            <el-form-item prop="Mc_Item" class="divA">
              <a>*</a>
              <el-select v-model="AddCommuniceForm.Mc_Item" multiple collapse-tags
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
              <el-select v-model="AddCommuniceForm.Mc_Communicator" placeholder="请选择沟通人员">
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
              <el-input v-model="AddCommuniceForm.Mc_Record" style="width: 85%;"
                        placeholder="请输入沟通内容"></el-input>
            </el-form-item>
            <Upload></Upload>
          </div>
        </el-form>
      </div>
      <div style="padding-bottom: 10px;text-align: center;">
        <el-button @click.native="handleClose(AddCommuniceForm)" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="addCommunice(AddCommuniceForm)">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {AddCommuniceList, QueryEmpList, QueryHairType} from '../../../config/Api.js'
  import Upload from '../../Upload'

  export default {
    data() {
      return {
        AddCommuniceForm: {
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
      }
    },
    created() {
      this.queryCommuniceList();
      this.queryCairList();
    },
    components: {
      Upload
    },
    methods: {
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
      addCommunice(formName) {
        let params = {
          Me_GUID: this.MEGUID,
          Mc_Image: this.AddCommuniceForm.Mc_Image,//图片
          Mc_Item: this.AddCommuniceForm.Mc_Item + '',
          Mc_Communicator: this.AddCommuniceForm.Mc_Communicator,
          Mc_Record: this.AddCommuniceForm.Mc_Record,
        };
        this.$http.post(AddCommuniceList, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
          this.$store.state.addCommuniceIsShow = false;
          this.$emit('AddCommuniceEmit');
          if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
          }
        });
      },
      handleClose(formName) {
        this.$store.state.addCommuniceIsShow = false;
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      closeCommunicDialog() {
        this.$refs['AddCommuniceForm'].resetFields();
      }
    },
    name: "AddCommunice"
  }
</script>

<style>
  .divA a {
    color: red;
  }

  .addCommuniceDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .addCommuniceDiv .el-dialog {
    border-radius: 20px;
  }

  .addCommuniceDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .addCommuniceDiv .el-dialog__title {
    color: white;
  }

  .addCommuniceDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .addCommuniceDiv .el-button--default span {
    color: #8ccbff;
  }

  .addCommuniceDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .addCommuniceDiv .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .addCommuniceDiv .el-button {
    height: 38px;
  }

</style>

<style scoped>
  .divA {
    float: left;
  }
</style>
