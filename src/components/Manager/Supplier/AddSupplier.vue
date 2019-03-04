<template>
  <div>
    <div style="width: 98%;text-align: right" class="ButtonClass">
      <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetSupplierForm('AddSupplierForm')">重置
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitSupplier('AddSupplierForm')">保存
      </el-button>
    </div>

    <div style="margin-top: 10px;width: 98%;background-color: white;padding-left: 20px;padding-top: 15px;">
      <el-form :model="AddSupplierForm" :rules="rules" ref="AddSupplierForm" status-icon :inline="true"
               label-position="top">
        <div style="text-align: left;">
          <div class="divOption">
            <el-form-item prop="Unit_Name">
              <div class="HintName">供应商名称</div>
              <el-input v-model="AddSupplierForm.Unit_Name" class="InputWidth"
                        placeholder="请输入供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="open_Bank">
              <div class="HintName">开户银行</div>
              <el-input v-model="AddSupplierForm.open_Bank" class="InputWidth"
                        placeholder="请输入开户银行"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_Abbreviation">
              <div class="HintName">供应商简称</div>
              <el-input v-model="AddSupplierForm.Supplier_Abbreviation" class="InputWidth"
                        placeholder="请输入供应商简称"></el-input>
            </el-form-item>
            <el-form-item prop="Supplier_BankNum">
              <div class="HintName">银行账号</div>
              <el-input v-model="AddSupplierForm.Supplier_BankNum" class="InputWidth"
                        placeholder="请输入银行账号"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_Contacts">
              <div class="HintName">联系人</div>
              <el-input v-model="AddSupplierForm.Supplier_Contacts" class="InputWidth"
                        placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item prop="Supplier_QQ">
              <div class="HintName">QQ</div>
              <el-input v-model="AddSupplierForm.Supplier_QQ" class="InputWidth"
                        placeholder="请输入QQ号"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_ContactsNum">
              <div class="HintName">联系电话</div>
              <el-input v-model="AddSupplierForm.Supplier_ContactsNum" class="InputWidth"
                        placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item prop="Supplier_Email">
              <div class="HintName">Email</div>
              <el-input v-model="AddSupplierForm.Supplier_Email" class="InputWidth"
                        placeholder="请输入Email"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_ContactsAdress">
              <div class="HintName">联系地址</div>
              <el-input v-model="AddSupplierForm.Supplier_ContactsAdress" class="InputWidth"
                        placeholder="请输入联系地址"></el-input>
            </el-form-item>
          </div>
        </div>

        <div
          style="display: flex;text-align: left;width:98%;">
          <el-form-item>
            <div class="HintName">备注</div>
            <el-input v-model="AddSupplierForm.Remarks" type="textarea" :rows="4" class="desc"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import {AddSupplierList} from '../../../config/Api.js'

  export default {
    data() {
      return {
        AddSupplierForm: {
          Unit_Name: '',
          Supplier_Abbreviation: '',
          Supplier_Contacts: '',
          Supplier_ContactsNum: '',
          Supplier_ContactsAdress: '',
          open_Bank: '',
          Supplier_BankNum: '',
          Supplier_QQ: '',
          Supplier_Email: '',
          Remarks: '',
        }
        , rules: {
          Unit_Name: [
            {required: true, message: '请输入单位名称', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      addSupplierMethod() {
        let guid = this.$route.params.Guid;
        let param = {
          Prov_GUID: guid,
          Prov_Name: this.AddSupplierForm.Unit_Name,
          Prov_ShotName: this.AddSupplierForm.Supplier_Abbreviation,
          Prov_LinkName: this.AddSupplierForm.Supplier_Contacts,
          Prov_Phone: this.AddSupplierForm.Supplier_ContactsNum,
          Prov_Adrress: this.AddSupplierForm.Supplier_ContactsAdress,
          Prov_Bank: this.AddSupplierForm.open_Bank,
          Prov_Account: this.AddSupplierForm.Supplier_BankNum,
          Prov_QQ: this.AddSupplierForm.Supplier_QQ,
          Prov_Email: this.AddSupplierForm.Supplier_Email,
          Prov_Desc: this.AddSupplierForm.Remarks,
        };
        this.$http.post(AddSupplierList, this.$qs.stringify(param)).then(resp => {
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
      submitSupplier(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSupplierMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetSupplierForm(AddSupplierForm) {
        this.$refs[AddSupplierForm].resetFields();
      },
    },
    name: "AddSupplier"
  }
</script>

<style>
  .ButtonClass .el-button {
    height: 38px;
  }
</style>

<style scoped>
  .HintName {
    color: #606266;
    font-size: 14px;
    line-height: 25px;
  }

  .divOption {
    display: block;
    width: 20%;
    text-align: left;
    float: left;
    background-color: white;
  }

  .desc {
    width: 530px;
  }

  .InputWidth {
    width: 278px;
  }

</style>
