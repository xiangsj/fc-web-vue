<template>
  <div>
    <!--参数设置div-->
    <div class="formBox"
         style="padding:10px 0 0 20px;width: 100%;text-align: left;background-color: white;margin-top: 10px">
      <el-form :model="DetailConfigForm" ref="DetailConfigForm" status-icon
               :inline="true"
               label-position="top">
        <div>
          <el-form-item prop="Co_Name" class="testAlign">
            <div>名称<a>*</a></div>
            <el-input v-model="DetailConfigForm.Config_Name" style="width: 260px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="Co_Order" class="testAlign">
            <div>排序</div>
            <el-input v-model="DetailConfigForm.Config_Num" style="width: 260px;" :disabled="true"
                      @change="checkNo(DetailConfigForm.Config_Num)"
                      type="text"
                      onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                      :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item prop="State" class="testAlign el-radio-group">
            <div>状态</div>
            <el-radio v-model="radio_State" label="0" :disabled="true">正常</el-radio>
            <el-radio v-model="radio_State" label="1" :disabled="true">无效</el-radio>
          </el-form-item>
        </div>
        <!--备注-->
        <div style="margin-top: -10px;">
          <el-form-item label="备注">
            <el-input v-model="Textarea" type="textarea" :rows="4" class="desc" :disabled="true"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {QueryConfigList} from '../../../config/Api.js'
  export default {
    data() {
      return {
        DetailConfigForm: {
          Config_Name: "",
          Config_Num: "",
        },
        radio_State: '',
        Textarea: "",
      }
    },
    created() {
      this.getConfigInfo();
    },
   methods:{
     //获取编辑页面信息
     getConfigInfo() {
       this.$http.get(QueryConfigList + this.$route.params.payId).then(resp => {
         this.DetailConfigForm.Config_Name = resp.data.data.Co_Name;
         this.DetailConfigForm.Config_Num = resp.data.data.Co_Order;
         this.radio_State = resp.data.data.State + "";
         this.Textarea = resp.data.data.Co_Desc;
       });
     },
   },
    name: "DetailParamConfig"
  }
</script>

<style scoped>

</style>
