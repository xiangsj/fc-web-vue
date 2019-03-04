<template>
  <div style="width: 98%;">
    <!--保存按钮-->
    <div align="right">
      <el-button type="primary" style="height: 38px;" icon="el-icon-circle-close-outline"
                 @click="resetEditRoomFrom('EditRoomForm')">重置
      </el-button>
      <el-button type="primary" style="height: 38px;" icon="el-icon-circle-plus-outline"
                 @click="saveEditRoom('EditRoomForm')">保存
      </el-button>
    </div>

    <!--参数设置div-->
    <div class="formBox"
         style="padding: 10px;width: 100%;text-align: left;background-color: white;margin-top: 10px;padding-left: 20px;">
      <el-form :model="EditRoomForm" :rules="rules" ref="EditRoomForm" status-icon :inline="true"
               label-position="top">
        <div>
          <el-form-item class="testAlign" prop="roomName">
            <div>房间名称</div>
            <el-input v-model="EditRoomForm.roomName"></el-input>
          </el-form-item>
          <el-form-item class="testAlign" prop="shopStore">
            <div>所属门店</div>
            <el-select v-model="EditRoomForm.shopStore" placeholder="请选择类型" style="width: 202px">
              <el-option v-for="item in shopStoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                         :value="item.Fe_GUID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="testAlign" prop="roomNum">
            <div>床位数</div>
            <el-input v-model="EditRoomForm.roomNum"></el-input>
          </el-form-item>
          <el-form-item prop="State" class="testAlign el-radio-group">
            <div style="margin-top: 5px;">状态</div>
            <el-radio @click.native.prevent="onChangeValue('0')" v-model="EditRoomForm.radio_State" label="0">正常
            </el-radio>
            <el-radio @click.native.prevent="onChangeValue('1')" v-model="EditRoomForm.radio_State" label="1">无效
            </el-radio>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {DetailRoomList, queryStoreList, EditRoomList} from '../../../config/Api.js'

  export default {
    data() {
      return {
        EditRoomForm: {
          roomName: '',
          shopStore: '',
          roomNum: '',
          radio_State:'',
        },
        shopStoreList: [],
        rules:
          {
            roomName: [
              {required: true, message: '请输入房间名称', trigger: 'blur'},
            ],
            roomNum: [
              {required: true, message: '请输入床位数', trigger: 'blur'},
            ],
          },
      }
    },
    created() {
      this.queryStoreList();
      this.queryRoomList();
    },
    methods: {
      //查询门店数据
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.shopStoreList = resp.data.data;
        })
      },
      //查询房间数据
      queryRoomList() {
        this.$http.get(DetailRoomList + this.$route.params.Guid).then(resp => {
          this.EditRoomForm.roomName = resp.data.data.Ro_Name;
          this.EditRoomForm.shopStore = resp.data.data.Fe_GUID;
          this.EditRoomForm.roomNum = resp.data.data.Ro_Number;
          this.EditRoomForm.radio_State = resp.data.data.State + '';
        })
      },
      onChangeValue(data){
        this.EditRoomForm.radio_State = data;
      },
      editRoomMethod() {
        let param = {
          Ro_GUID: this.$route.params.Guid,
          Ro_Name: this.EditRoomForm.roomName,
          Fe_GUID: this.EditRoomForm.shopStore,
          Ro_Number: this.EditRoomForm.roomNum,
          State: this.EditRoomForm.radio_State,
        };
        this.$http.post(EditRoomList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        });
      },
      //提交表单
      saveEditRoom(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editRoomMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetEditRoomFrom(EditRoomForm) {
        this.$refs[EditRoomForm].resetFields();
      },
    },
    name: "EditRoom"
  }
</script>

<style scoped>

</style>
