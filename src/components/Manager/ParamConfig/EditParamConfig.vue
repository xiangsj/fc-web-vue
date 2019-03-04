<template>
  <div>
    <!--保存按钮-->
    <div align="right">
      <el-button type="primary" style="margin-right: 50px;height: 36px;" icon="el-icon-circle-plus-outline"
                 @click="saveConfig('EditConfigForm')">保存
      </el-button>
    </div>
    <!--参数设置div-->
    <div class="formBox"
         style="padding:10px 0 0 20px;width: 100%;text-align: left;background-color: white;margin-top: 10px">
      <el-form :model="EditConfigForm" :rules="rules" ref="EditConfigForm" class="EditConfigForm" status-icon
               :inline="true"
               label-position="top">
        <div>
          <el-form-item prop="Co_Name" class="testAlign">
            <div>名称</div>
            <el-input v-model="EditConfigForm.Config_Name" style="width: 260px;"></el-input>
          </el-form-item>
          <el-form-item prop="Co_Order" class="testAlign">
            <div>排序</div>
            <el-input v-model="EditConfigForm.Config_Num" style="width: 260px;"
                      @change="checkNo(EditConfigForm.Config_Num)"
                      type="text"
                      onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                      :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item prop="State" class="testAlign el-radio-group">
            <div>状态</div>
            <el-radio @click.native.prevent="onChangeValue('0')" v-model="radio_State" label="0">正常</el-radio>
            <el-radio @click.native.prevent="onChangeValue('1')" v-model="radio_State" label="1">无效</el-radio>
          </el-form-item>
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
  import {QueryConfigList, UpdateConfigList} from '../../../config/Api.js'

  export default {
    data() {
      return {
        EditConfigForm: {
          Config_Name: "",
          Config_Num: "",
        },
        radio_State: '',
        Textarea: "",
        rules:
          {
            Config_Name: [
              {required: true, message: '请输入课程名称', trigger: 'blur'},
              {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
            ],
          },
        Co_ParentCode: "",
      }
    },
    created() {
      this.getConfigInfo();
    },
    mounted() {

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
      //获取编辑页面信息
      getConfigInfo() {
        this.$http.get(QueryConfigList + this.$route.params.Co_GUID).then(resp => {
          this.EditConfigForm.Config_Name = resp.data.data.Co_Name;
          this.EditConfigForm.Config_Num = resp.data.data.Co_Order;
          this.radio_State = resp.data.data.State + "";
          this.Textarea = resp.data.data.Co_Desc;
          this.Co_ParentCode = resp.data.data.Co_ParentCode;
        });
      },
      //修改编辑页信息
      updateConfigInfo() {
        let LEVEL = this.$route.params.Co_Level;
        let param = {
          Co_Name: this.EditConfigForm.Config_Name,
          Co_GUID: this.$route.params.Co_GUID,//Guid
          Co_ParentCode: this.Co_ParentCode,//父节点
          Co_Level: LEVEL,//大类等级
          Co_Desc: this.Textarea,
          Co_Order: this.EditConfigForm.Config_Num,
          State: this.radio_State,
        }
        this.$http.post(UpdateConfigList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        })
      },
      //保存按钮
      saveConfig(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateConfigInfo();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onChangeValue(data) {
        this.radio_State = data;
      }
    },
    name: "EditConfig"
  }
</script>

<style scoped>
  .testAlign {
    width: 20%;
  }

  .desc {
    width: 500px;
    margin-top: -15px;
  }
</style>
