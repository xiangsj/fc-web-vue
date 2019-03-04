<template>
  <div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="infoBox" style="padding: 10px;">
            <el-form :model="DetailPayForm" ref="DetailPayForm" status-icon :inline="true"
                     label-position="top">
              <div style="text-align: left;">
                <el-form-item label="类型名称" prop="Payt_Name" class="testAlign">
                  <el-input v-model="DetailPayForm.Payt_Name" style="width: 200px;" :disabled="true"
                            placeholder="请输入类型名称"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="Payt_Type" class="testAlign">
                  <el-select v-model="DetailPayForm.Payt_Type" placeholder="请选择类型" style="width: 200px"
                             :disabled="true">
                    <el-option v-for="item in Payt_Type" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="购项目是否使用" prop="Payt_IsUseItem" class="testAlign">
                  <el-radio v-model="radio_Item" @click.native.prevent="onChangeUseItem('1')" label="1" disabled>是
                  </el-radio>
                  <el-radio v-model="radio_Item" @click.native.prevent="onChangeUseItem('0')" label="0" disabled>否
                  </el-radio>
                </el-form-item>

                <el-form-item label="购卡是否使用" prop="Payt_IsUseCard" class="testAlign">
                  <el-radio v-model="radio_Card" @click.native.prevent="onChangeUseCard('1')" label="1" disabled>是
                  </el-radio>
                  <el-radio v-model="radio_Card" @click.native.prevent="onChangeUseCard('0')" label="0" disabled>否
                  </el-radio>
                </el-form-item>

                <el-form-item label="购产品是否使用" prop="Payt_IsUseProduct" class="testAlign">
                  <el-radio v-model="radio_Product" @click.native.prevent="onChangeUseProduct('1')" label="1" disabled>
                    是
                  </el-radio>
                  <el-radio v-model="radio_Product" @click.native.prevent="onChangeUseProduct('0')" label="0" disabled>
                    否
                  </el-radio>
                </el-form-item>

                <el-form-item prop="State" class="testAlign el-radio-group" >
                  <div class="HintName">状态</div>
                  <el-radio  v-model="radio_State" label="0"  disabled>正常
                  </el-radio>
                  <el-radio  v-model="radio_State" label="1"  disabled>无效
                  </el-radio>
                </el-form-item>
              </div>
              <div style="text-align: left;margin-top: -20px;">
                <el-form-item label="说明">
                  <el-input v-model="Textarea" type="textarea" :rows="4" class="desc" :disabled="true"
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
  import {QueryPayApi} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        DetailPayForm: {
          Payt_Name: '',  //类型名称
          Payt_Type: "",//类型
        },
        // Payt_Num: "",//排序
        radio_Item: '',
        radio_item_id: '',
        radio_Card: '',
        radio_Product: '',
        radio_Product_id: '',
        radio_State: '',
        Textarea: '', //说明
        //门店
        tableUserList: [],
      }
    },
    created() {
      this.detailPayInfo();
    },
    mounted() {

    },
    methods: {
      //获取编辑页面的支付信息
      detailPayInfo() {
        let Payt_GUID = this.$route.params.payId;
        this.$http.get(QueryPayApi + Payt_GUID).then(resp => {
          this.DetailPayForm.Payt_Name = resp.data.data.Payt_Name;
          this.DetailPayForm.Payt_Type = resp.data.data.Payt_Type;
          // this.Payt_Num = resp.data.data.Payt_Code;
          this.radio_Item = resp.data.data.Payt_IsUseItem + "";
          this.radio_Card = resp.data.data.Payt_IsUseCard + "";
          this.radio_Product = resp.data.data.Payt_IsUseProduct + "";
          this.radio_State = resp.data.data.State + "";
          this.Textarea = resp.data.data.Payt_Desc;
        });
      },
      // onChangeUseItem(data) {
      //   this.radio_Item = data;
      // },
      // onChangeUseCard(data) {
      //   this.radio_Card = data;
      // },
      // onChangeUseProduct(data) {
      //   this.radio_Product = data;
      // },
    },
    name: "DetailPay"
  }
</script>

<style scoped>
  .desc {
    width: 500px;
    margin-top: -15px;
  }

  .testAlign {
    width: 18%;
  }

</style>
