<template>
  <div class="patchCardDiv">
    <el-dialog title="会员补卡" :visible="this.$store.state.patchCard" width="30%"
                @close="closeDialog"
               :close-on-click-modal="false"  :show-close='visibleCLOSE'>
      <div>
        <el-form :model="AddPatchCard" :rules="rules" ref="AddPatchCard" status-icon :inline="true"
                 label-position="top">
          <div>
            <el-form-item prop="SelectCard" class="divA">
              <a>*</a>
              <el-select v-model="AddPatchCard.SelectCard" placeholder="选择需要补的卡" style="width: 248px;"
                         @click.native="selectClick">
                <el-option v-for="item in SelectCardList" :key="item.Mec_GUID" :label="item.Mec_CardNo"
                           :value="item.Mec_GUID"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Money" class="divA">
              <el-input v-model="AddPatchCard.Money" style="width: 248px;"
                        placeholder="输入金额"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="NewCardNum" class="divA">
              <a>*</a>
              <el-input v-model="AddPatchCard.NewCardNum" style="width: 248px;padding-top: -30px;"
                        placeholder="新卡卡号"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="CarExplain">
              <el-input v-model="AddPatchCard.CarExplain" type="textarea" :rows="4" cols="300"
                        style="width: 510px;padding-right: 10px"
                        placeholder="补卡说明"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div style="padding-bottom: 10px;">
        <el-button @click.native="handleClose(AddPatchCard)" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="surePatchCard(AddPatchCard)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {ExplainCard, QueryAllCard} from '../../../config/Api.js'

  export default {
    data() {
      return {
        visibleCLOSE:false,
        AddPatchCard: {
          SelectCard: '',
          Money: '',
          NewCardNum: '',
          CarExplain: '',
        },
        SelectCardList: [],
        rules: {
          SelectCard: [
            {required: true, message: '请选择需要补的卡', trigger: 'blur'},
          ],
          NewCardNum: [
            {required: true, message: '请输入新卡卡号', trigger: 'blur'},
          ],
        },
        MeGuid: '',
      }
    },
    created() {

    },
    methods: {
      selectClick() {
        this.MeGuid = this.$store.state.MeGuid;
        this.queryCard(this.MeGuid);
      },
      handleClose(formName) {
        this.$store.state.patchCard = false;
        this.$refs[formName].resetFields();
      },
      closeDialog() {
        this.$refs['AddPatchCard'].resetFields();
      }
      , //查卡
      queryCard() {
        this.$http.get(QueryAllCard + this.MeGuid).then(resp => {
          if (resp.data.code === 0) {
            this.SelectCardList = resp.data.data;
          }
        })
      }
      ,
      surePatchCard(formName) {
        let param = {
          Mec_GUID: this.AddPatchCard.SelectCard, //旧卡号
          Mec_CardNo: this.AddPatchCard.NewCardNum, //新卡号
          Mec_Desc: this.AddPatchCard.CarExplain,
        };
        this.$http.post(ExplainCard, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '补卡成功',
              type: 'success'
            });
          }
          this.$store.state.patchCard = false;
          this.$refs[formName].resetFields();
        });
        this.$store.state.patchCard = false;
      }
    }
    ,
    name: "PatchCard"
  }
</script>

<style>
  .divA a {
    color: red;
  }

  .patchCardDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .patchCardDiv .el-dialog {
    border-radius: 20px;
  }

  .patchCardDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .patchCardDiv .el-dialog__title {
    color: white;
  }

  .patchCardDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .patchCardDiv .el-button--default span {
    color: #8ccbff;
  }

  .patchCardDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .patchCardDiv .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .patchCardDiv .el-button {
    height: 38px;
  }

</style>

<style scoped>
  .divA {
    float: left;
  }
</style>
