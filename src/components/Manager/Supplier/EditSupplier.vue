<template>
  <div>
    <div style="width: 98%;text-align: right">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="resetSupplierForm('EditSupplierForm')">取消
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitEditSupplier('EditSupplierForm')">保存
      </el-button>
    </div>

    <div style="margin-top: 20px;width: 98%;background-color: white;padding-left: 20px;padding-top: 10px;">
      <el-form :model="EditSupplierForm" :rules="rules" ref="EditSupplierForm" status-icon :inline="true"
               label-position="top">
        <div style="text-align: left;">
          <div class="divOption">
            <el-form-item prop="Unit_Name">
              <div class="HintName">供应商名称</div>
              <el-input v-model="EditSupplierForm.Unit_Name" style="width: 200px;padding-top: -10px"
                        placeholder="请输入供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="open_Bank">
              <div class="HintName" style="margin-top: -10px;">开户银行</div>
              <el-input v-model="EditSupplierForm.open_Bank" style="width: 200px;padding-top: -10px"
                        placeholder="请输入开户银行"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_Abbreviation">
              <div class="HintName">供应商简称</div>
              <el-input v-model="EditSupplierForm.Supplier_Abbreviation" style="width: 200px;padding-top: -10px"
                        placeholder="请输入供应商简称"></el-input>
            </el-form-item>
            <el-form-item prop="Supplier_BankNum">
              <div class="HintName" style="margin-top: -10px;">银行账号</div>
              <el-input v-model="EditSupplierForm.Supplier_BankNum" style="width: 200px;padding-top: -10px"
                        placeholder="请输入银行账号"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_Contacts">
              <div class="HintName">联系人</div>
              <el-input v-model="EditSupplierForm.Supplier_Contacts" style="width: 200px;padding-top: -10px"
                        placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item prop="Supplier_QQ">
              <div class="HintName" style="margin-top: -10px;">QQ</div>
              <el-input v-model="EditSupplierForm.Supplier_QQ" style="width: 200px;padding-top: -10px"
                        placeholder="请输入QQ号"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_ContactsNum">
              <div class="HintName">联系电话</div>
              <el-input v-model="EditSupplierForm.Supplier_ContactsNum" style="width: 200px;padding-top: -10px"
                        placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item prop="Supplier_Email">
              <div class="HintName" style="margin-top: -10px;">Email</div>
              <el-input v-model="EditSupplierForm.Supplier_Email"
                        placeholder="请输入Email"></el-input>
            </el-form-item>
          </div>
          <div class="divOption">
            <el-form-item prop="Supplier_ContactsAdress">
              <div class="HintName">联系地址</div>
              <el-input v-model="EditSupplierForm.Supplier_ContactsAdress" style="width: 200px;padding-top: -10px"
                        placeholder="请输入联系地址"></el-input>
            </el-form-item>

          </div>
        </div>

        <div style="display: flex;text-align: left;width:98%; ">
          <el-form-item prop="State" class="testAlign el-radio-group">
            <div class="HintName">状态</div>
            <el-radio @click.native.prevent="onChangeValue('0')" v-model="EditSupplierForm.radio_State" label="0">正常
            </el-radio>
            <el-radio @click.native.prevent="onChangeValue('1')" v-model="EditSupplierForm.radio_State" label="1">无效
            </el-radio>
          </el-form-item>
        </div>
        <div
          style="display: flex;text-align: left;width:98%; ">
          <el-form-item>
            <div class="HintName" style="margin-top: -20px;">备注</div>
            <el-input v-model="EditSupplierForm.Remarks" type="textarea" :rows="4" class="desc"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import {EditSupplierList, QuerySupplierList} from '../../../config/Api.js';

  export default {
    data() {
      return {
        EditSupplierForm: {
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
          radio_State: '',
        },
        rules:
          {
            Unit_Name: [
              {required: true, message: '请输入单位名称', trigger: 'blur'},
              {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
            ],
          }
      }
    },
    created() {
      this.queryInfo();
    },
    methods: {
      //查询信息
      queryInfo() {
        let Guid = this.$route.params.guid;
        this.$http.get(QuerySupplierList + Guid).then(resp => {
          this.EditSupplierForm.Unit_Name = resp.data.data.Prov_Name;
          this.EditSupplierForm.Supplier_Abbreviation = resp.data.data.Prov_ShotName;
          this.EditSupplierForm.Supplier_Contacts = resp.data.data.Prov_LinkName;
          this.EditSupplierForm.Supplier_ContactsNum = resp.data.data.Prov_Phone;
          this.EditSupplierForm.Supplier_ContactsAdress = resp.data.data.Prov_Adrress;
          this.EditSupplierForm.open_Bank = resp.data.data.Prov_Bank;
          this.EditSupplierForm.Supplier_BankNum = resp.data.data.Prov_Account;
          this.EditSupplierForm.Remarks = resp.data.data.Prov_Desc;
          this.EditSupplierForm.Supplier_QQ = resp.data.data.Prov_QQ;
          this.EditSupplierForm.Supplier_Email = resp.data.data.Prov_Email;
          this.EditSupplierForm.radio_State = resp.data.data.State + '';
        })
      },
      //修改
      editInfo() {
        console.log(this.$route.params.guid);
        let param = {
          Prov_GUID: this.$route.params.guid,
          Prov_Name: this.EditSupplierForm.Unit_Name,
          Prov_ShotName: this.EditSupplierForm.Supplier_Abbreviation,
          Prov_LinkName: this.EditSupplierForm.Supplier_Contacts,
          Prov_Phone: this.EditSupplierForm.Supplier_ContactsNum,
          Prov_Adrress: this.EditSupplierForm.Supplier_ContactsAdress,
          Prov_Bank: this.EditSupplierForm.open_Bank,
          Prov_Account: this.EditSupplierForm.Supplier_BankNum,
          Prov_Desc: this.EditSupplierForm.Remarks,
          Prov_QQ: this.EditSupplierForm.Supplier_QQ,
          Prov_Email: this.EditSupplierForm.Supplier_Email,
          State: this.EditSupplierForm.radio_State,
        }
        this.$http.post(EditSupplierList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        })
      },
      onChangeValue(data) {
        this.EditSupplierForm.radio_State = data;
      },
      //提交表单
      submitEditSupplier(EditSupplierForm) {
        this.$refs[EditSupplierForm].validate((valid) => {
          if (valid) {
            this.editInfo();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetSupplierForm(EditSupplierForm) {
        this.$refs[EditSupplierForm].resetFields();
      },
    },
    name: "EditSuppliter"
  }
</script>

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
</style>
