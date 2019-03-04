<template>
  <div class="addCardDiv">
    <el-dialog title="添加会员" :visible="this.$store.state.addMemberIsShow" width="30%"
               @close="closeAddDialog"
               :close-on-click-modal="false" :show-close='visibleCLOSE'>
      <div>
        <el-form :model="AddMemberCard" :rules="rules" ref="AddMemberCard" status-icon :inline="true"
                 label-position="top">
          <div style="width: 100%;float: left;">
            <el-form-item prop="Me_Name" class="divA">
              <a>*</a>
              <el-input v-model="AddMemberCard.Me_Name" style="width: 220px;"
                        placeholder="请输入会员名称"></el-input>
            </el-form-item>
            <el-form-item prop="Me_Sex" class="divA">
              <a>*</a>
              <el-select v-model="AddMemberCard.Me_Sex" placeholder="请选择性别">
                <el-option v-for="item in SexlList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width: 100%;float: left;">
            <el-form-item prop="Me_Tel" class="divA">
              <a>*</a>
              <el-input v-model="AddMemberCard.Me_Tel" style="width: 220px;" maxlength="11"
                        placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="Me_Birthday" class="divA">
              <a>*</a>
              <el-date-picker v-model="AddMemberCard.Me_Birthday" style="width: 193px;"
                              placeholder="年-月-日"></el-date-picker>
            </el-form-item>
          </div>
          <div style="width: 100%;float: left;">
            <el-form-item prop="Me_SourceCode" class="divA">
              <a>*</a>
              <el-select v-model="AddMemberCard.Me_SourceCode" placeholder="请选择渠道来源" style="width: 220px;">
                <el-option v-for="item in ChannelList" :key="item.Co_Values" :label="item.Co_Name"
                           :value="item.Co_Values"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Fe_GUID" class="divA">
              <a>*</a>
              <el-select v-model="AddMemberCard.Fe_GUID" placeholder="请选择门店">
                <el-option v-for="item in StoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                           :value="item.Fe_GUID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div style="padding-bottom: 10px;text-align: center;">
        <el-button @click.native="handleClose(AddMemberCard)" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="addPatchCard(AddMemberCard)">确 定
        </el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="addMore" v-if="this.MoreSubmit">保存并填写更多
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {CommonDictionaryTree, AddManagerShip, queryStoreList} from '../../../config/Api.js'

  export default {
    data() {
      return {
        visibleCLOSE: false,
        AddMemberCard: {
          Me_Name: '',
          Me_Sex: '',
          Me_Tel: '',
          Me_Birthday: '',
          Me_SourceCode: '',
          Fe_GUID: '',
        },
        SexlList: [
          {
            value: '0',
            label: '女',
          },
          {
            value: '1',
            label: '男',
          },
        ],
        ChannelList: [],
        StoreList: [],
        rules: {
          Me_Sex: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          Me_SourceCode: [
            {required: true, message: '请选择渠道来源', trigger: 'blur'},
          ],
          Me_Birthday: [
            {required: true, message: '请选择生日', trigger: 'blur'},
          ],
          Fe_GUID: [
            {required: true, message: '请选择门店', trigger: 'blur'},
          ],
          Me_Name: [
            {required: true, message: '请输入会员名称', trigger: 'blur'},
          ],
          Me_Tel: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
        },
      }
    },
    created() {
      this.querySelectData();
      this.queryStoreList();
    },
    props:['MoreSubmit'],
    methods: {
      querySelectData() {
        let params = {
          CoCode: ["AE05"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AE05') {
              this.ChannelList = resp.data.data[position].List;
            }
          }
        })
      },
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.StoreList = resp.data.data;
        })
      },
      addPatchCard(formName) {
        let params = {
          Me_Name: this.AddMemberCard.Me_Name,
          Me_Sex: this.AddMemberCard.Me_Sex,
          Me_Tel: this.AddMemberCard.Me_Tel,
          Me_SourceCode: this.AddMemberCard.Me_SourceCode,
          Me_Birthday: this.AddMemberCard.Me_Birthday,
          Fe_GUID: this.AddMemberCard.Fe_GUID,
        };
        this.$http.post(AddManagerShip, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$emit('AddMemberEmit',resp.data.data);
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
          this.$store.state.addMemberIsShow = false;
          if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
          }
        });
      },
      addMore() {
        let params = {
          Me_Name: this.AddMemberCard.Me_Name,
          Me_Sex: this.AddMemberCard.Me_Sex,
          Me_Tel: this.AddMemberCard.Me_Tel,
          Me_SourceCode: this.AddMemberCard.Me_SourceCode,
          Me_Birthday: this.AddMemberCard.Me_Birthday,
          Fe_GUID: this.AddMemberCard.Fe_GUID,
        };
        this.$http.post(AddManagerShip, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$store.state.addMemberIsShow = false;
            this.$router.push({name: 'addMemberShipManager',params: {Guid:resp.data.data.Me_GUID}});
            this.$notify({
              title: '成功',
              message: '添加基本信息成功',
              type: 'success'
            });
          }
        });
      },
      handleClose(formName) {
        this.$store.state.addMemberIsShow = false;
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      closeAddDialog() {
        this.$refs['AddMemberCard'].resetFields();
      }
    },
    name: "AddMemberDialog"
  }
</script>

<style>
  .divA a {
    color: red;
  }

  .addCardDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .addCardDiv .el-dialog {
    border-radius: 20px;
  }

  .addCardDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .addCardDiv .el-dialog__title {
    color: white;
  }

  .addCardDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .addCardDiv .el-button--default span {
    color: #8ccbff;
  }

  .addCardDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .addCardDiv .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .addCardDiv .el-button {
    height: 38px;
  }

</style>

<style scoped>
  .divA {
    float: left;
    width: 45%;
    margin-left: 0 5px 0 5px;
  }
</style>
