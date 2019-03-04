<template>
  <div style="margin-top: 20px;width: 98%;background-color: white;padding-left: 20px;padding-top: 10px;">
    <el-form :model="DetailSupplierForm" ref="DetailSupplierForm" status-icon :inline="true"
             label-position="top">
      <div style="text-align: left;">
        <div class="divOption">
          <el-form-item prop="Unit_Name">
            <div class="HintName">供应商名称</div>
            <el-input v-model="DetailSupplierForm.Unit_Name" style="width: 200px;padding-top: -10px" :disabled="true"
                      placeholder="请输入供应商名称"></el-input>
          </el-form-item>
          <el-form-item prop="open_Bank">
            <div class="HintName" style="margin-top: -10px;">开户银行</div>
            <el-input v-model="DetailSupplierForm.open_Bank" style="width: 200px;padding-top: -10px" :disabled="true"
                      placeholder="请输入开户银行"></el-input>
          </el-form-item>
        </div>
        <div class="divOption">
          <el-form-item prop="Supplier_Abbreviation">
            <div class="HintName">供应商简称</div>
            <el-input v-model="DetailSupplierForm.Supplier_Abbreviation" style="width: 200px;padding-top: -10px"
                      :disabled="true"
                      placeholder="请输入供应商简称"></el-input>
          </el-form-item>
          <el-form-item prop="Supplier_BankNum">
            <div class="HintName" style="margin-top: -10px;">银行账号</div>
            <el-input v-model="DetailSupplierForm.Supplier_BankNum" style="width: 200px;padding-top: -10px"
                      :disabled="true"
                      placeholder="请输入银行账号"></el-input>
          </el-form-item>
        </div>
        <div class="divOption">
          <el-form-item prop="Supplier_Contacts">
            <div class="HintName">联系人</div>
            <el-input v-model="DetailSupplierForm.Supplier_Contacts" style="width: 200px;padding-top: -10px"
                      :disabled="true"
                      placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item prop="Supplier_QQ">
            <div class="HintName" style="margin-top: -10px;">QQ</div>
            <el-input v-model="DetailSupplierForm.Supplier_QQ" style="width: 200px;padding-top: -10px" :disabled="true"
                      placeholder="请输入QQ号"></el-input>
          </el-form-item>
        </div>
        <div class="divOption">
          <el-form-item prop="Supplier_ContactsNum">
            <div class="HintName">联系电话</div>
            <el-input v-model="DetailSupplierForm.Supplier_ContactsNum" style="width: 200px;padding-top: -10px"
                      :disabled="true"
                      placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item prop="Supplier_Email">
            <div class="HintName" style="margin-top: -10px;">Email</div>
            <el-input v-model="DetailSupplierForm.Supplier_Email" :disabled="true"
                      placeholder="请输入Email"></el-input>
          </el-form-item>
        </div>
        <div class="divOption">
          <el-form-item prop="Supplier_ContactsAdress">
            <div class="HintName">联系地址</div>
            <el-input v-model="DetailSupplierForm.Supplier_ContactsAdress" style="width: 200px;padding-top: -10px"
                      :disabled="true"
                      placeholder="请输入联系地址"></el-input>
          </el-form-item>

        </div>
      </div>

      <div style="display: flex;text-align: left;width:98%; ">
        <el-form-item prop="State" class="testAlign el-radio-group">
          <div class="HintName">状态</div>
          <el-radio v-model="DetailSupplierForm.radio_State" label="0" disabled>正常
          </el-radio>
          <el-radio v-model="DetailSupplierForm.radio_State" label="1" disabled>无效
          </el-radio>
        </el-form-item>
      </div>
      <div
        style="display: flex;text-align: left;width:98%; ">
        <el-form-item>
          <div class="HintName" style="margin-top: -20px;">备注</div>
          <el-input v-model="DetailSupplierForm.Remarks" type="textarea" :rows="4" class="desc" :disabled="true"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>
  import {QuerySupplierList} from '../../../config/Api.js';

  export default {
    data() {
      return {
        DetailSupplierForm: {
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
      }
    },
    created() {
      this.queryInfo();
    },
    methods: {
      //查询信息
      queryInfo() {
        let Guid = this.$route.params.payId;
        this.$http.get(QuerySupplierList + Guid).then(resp => {
          this.DetailSupplierForm.Unit_Name = resp.data.data.Prov_Name;
          this.DetailSupplierForm.Supplier_Abbreviation = resp.data.data.Prov_ShotName;
          this.DetailSupplierForm.Supplier_Contacts = resp.data.data.Prov_LinkName;
          this.DetailSupplierForm.Supplier_ContactsNum = resp.data.data.Prov_Phone;
          this.DetailSupplierForm.Supplier_ContactsAdress = resp.data.data.Prov_Adrress;
          this.DetailSupplierForm.open_Bank = resp.data.data.Prov_Bank;
          this.DetailSupplierForm.Supplier_BankNum = resp.data.data.Prov_Account;
          this.DetailSupplierForm.Remarks = resp.data.data.Prov_Desc;
          this.DetailSupplierForm.Supplier_QQ = resp.data.data.Prov_QQ;
          this.DetailSupplierForm.Supplier_Email = resp.data.data.Prov_Email;
          this.DetailSupplierForm.radio_State = resp.data.data.State + '';
        })
      },
    },
    name: "DetailSupplier"
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
