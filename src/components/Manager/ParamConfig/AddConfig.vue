<template>
  <div style="width: 98%;">
    <!--保存按钮-->
    <div align="right">
      <el-button type="primary" style="height: 38px;" icon="el-icon-circle-plus-outline"
                 @click="saveConfig('ConfigForm')">保存
      </el-button>
    </div>
    <!--参数设置div-->
    <div class="formBox"
         style="padding: 10px;width: 100%;text-align: left;background-color: white;margin-top: 10px;padding-left: 20px;">
      <el-form :model="ConfigForm" :rules="rules" ref="ConfigForm" class="ConfigForm" status-icon :inline="true"
               label-position="top">
        <div>
          <el-form-item prop="Config_Name" class="testAlign">
            <div>名称</div>
            <el-input v-model="ConfigForm.Config_Name"></el-input>
          </el-form-item>
          <el-form-item prop="Config_Num" class="testAlign" style="margin-left: 30px;">
            <div>排序</div>
            <el-input v-model="ConfigForm.Config_Num"
                      @change="checkNo(ConfigForm.Config_Num)"
                      type="text"
                      onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                      :maxlength="6"></el-input>
          </el-form-item>
          <!--<el-form-item label="是否使用" prop="State" class="testAlign">-->
          <!--<el-radio v-model="radio_State" label="1">是</el-radio>-->
          <!--<el-radio v-model="radio_State" label="0">否</el-radio>-->
          <!--</el-form-item>-->
        </div>
        <!--备注-->
        <div style="margin-top: -10px;">
          <el-form-item label="备注">
            <el-input v-model="Textarea" type="textarea" :rows="4" class="desc"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>


  </div>
</template>

<script>
  import {AddConfigList} from "../../../config/Api.js"

  export default {
    data() {
      return {
        ConfigForm: {
          Config_Name: "",
          Config_Num: "",
        },
        // radio_State: '1',
        Textarea: "",
        rules:
          {
            Config_Name: [
              {required: true, message: '请输入类别名称', trigger: 'blur'},
            ],
          }
        ,
      }
    },
    methods: {
      //只能输入数字
      checkNo(value) {
        let reg = /^[1-9]\d*$/;
        if (value) {
          if (value > 999999 || new RegExp(reg).test(value) === false) {
            this.ConfigForm.Config_Num = '';
          }
        }
      },

      //添加参数设置
      addConfigParam() {
        let gUid = this.$route.params.Co_GUID;
        let LEVEL = this.$route.params.Co_Level;
        let param = {
          Co_Name: this.ConfigForm.Config_Name,
          Co_ParentCode: gUid,//Guid
          Co_Level: LEVEL,//大类等级
          Co_Desc: this.Textarea,
          Co_Order: this.ConfigForm.Config_Num,
        }
        this.$http.post(AddConfigList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        })
      },
      //保存按钮
      saveConfig(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addConfigParam();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    name: "Add"
  }
</script>

<style scoped>
  .testAlign {
    width: 23%;
  }

  .desc {
    width: 390px;
    margin-top: -15px;
  }


</style>
