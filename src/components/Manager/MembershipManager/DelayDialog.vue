<template>
  <div class="addDelayDiv">
    <el-dialog title="延期" :visible="this.$store.state.addDelayIsShow" width="25%" :before-close="handleClose">

      <div style="width: 100%;">
        <div style="width: 50%;float: left;margin-top: 20px;">
          <el-radio v-model="radioData" label="0" @change="onChangradioData('0')">固定时长</el-radio>
          <el-radio v-model="radioData" label="1" @change="onChangradioData('1')">设置日期</el-radio>
        </div>
        <div style="width: 50%;float: left;margin-top: 10px;" v-if="visiblefixed">
          <el-input v-model="fixedDurationData" style="width: 30%;"
                    placeholder=""></el-input>
          <el-select v-model="yearData" style="width:30%;margin-left: 10px;">
            <el-option v-for="item in yearList" :key="item.vaule" :label="item.lable"
                       :value="item.vaule"></el-option>
          </el-select>
        </div>
        <div style="width: 40%;float: left;margin-top: 10px;" v-if="visibleDate">
          <el-date-picker v-model="settingDate" type="date" style="width: 150px;margin-left: 20px;"
                          placeholder="年-月-日">
          </el-date-picker>
        </div>
      </div>
      <div style="width: 100%;">
        <el-button @click="handleClose" style="margin-top: 30px;">取 消</el-button>
        <el-button type="primary" @click="addDelayClick" style="margin-top: 30px;">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {AddDelay} from '../../../config/Api.js'

  export default {
    data() {
      return {
        radioData: '0',
        fixedDurationData: '',
        settingDate: '',
        yearData: '年',
        yearList: [
          {
            vaule: '年',
            lable: '年',
          }, {
            vaule: '月',
            lable: '月',
          }, {
            vaule: '日',
            lable: '日',
          }
        ],
        visibleDate: false,
        visiblefixed: true,
        requestData: [],
      }
    },
    props: ['TimeGUIDList'],
    methods: {
      onChangradioData(data) {
        if (data === '0') {
          this.visibleDate = false;
          this.visiblefixed = true;
        } else {
          this.visibleDate = true;
          this.visiblefixed = false;
        }
      },
      handleClose() {
        this.$store.state.addDelayIsShow = false;
        this.radioData = '0';
        this.yearData = '年';
        this.settingDate = '';
        this.fixedDurationData = '';
        this.visibleDate = false;
        this.visiblefixed = true;
      },
      addDelayClick() {
        console.log('this.radioData');
        console.log(this.radioData);
        if (this.radioData === '0') {
          this.requestData=[];
          //固定时长
          this.requestData = {
            Time_GUIDList: this.TimeGUIDList,
            New_UseEndDate: '',
            Ca_Term: this.fixedDurationData,//	 有效期
            Ca_TermUnit: this.yearData,//	 	  有效期单位
          };
        } else if (this.radioData === '1') {
          this.requestData=[];
          this.requestData = {
            Time_GUIDList: this.TimeGUIDList,
            New_UseEndDate: this.settingDate,//	 日期
            Ca_Term: '',
            Ca_TermUnit: '',
          };
        }
        this.$http.post(AddDelay, this.$qs.stringify(this.requestData)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.handleClose();
          }
        });
      },
    },
    name: "DelayDialog"
  }
</script>

<style>
  .addDelayDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .addDelayDiv .el-dialog {
    border-radius: 20px;
  }

  .addDelayDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .addDelayDiv .el-dialog__title {
    color: white;
  }

  .addDelayDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .addDelayDiv .el-button--default span {
    color: #8ccbff;
  }

  .addDelayDiv .el-dialog__body {
    padding: 10px 0 10px 0;
  }

  .addDelayDiv .el-button {
    height: 38px;
  }

  .addDelayDiv .el-input__icon {
    line-height: 30px;
  }

  .addDelayDiv .el-input__inner {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    height: 30px;
  }

</style>
<style scoped>

</style>
