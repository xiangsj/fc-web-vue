<template>
  <div style="width: 98%;">
    <!--保存按钮-->
    <div align="right">
      <el-button type="primary" style="height: 38px;" icon="el-icon-circle-close-outline"
                 @click="resetAddRoomFrom('AddRoomForm')">重置
      </el-button>
      <el-button type="primary" style="height: 38px;" icon="el-icon-circle-plus-outline"
                 @click="saveAddRoom('AddRoomForm')">保存
      </el-button>
    </div>

    <!--参数设置div-->
    <div class="formBox"
         style="padding: 10px;width: 100%;text-align: left;background-color: white;margin-top: 10px;padding-left: 20px;">
      <el-form :model="AddRoomForm" :rules="rules" ref="AddRoomForm" status-icon :inline="true"
               label-position="top">
        <div>
          <el-form-item class="testAlign" prop="roomName">
            <div>房间名称</div>
            <el-input v-model="AddRoomForm.roomName"></el-input>
          </el-form-item>
          <el-form-item class="testAlign" prop="shopStore">
            <div>所属门店</div>
            <el-select v-model="AddRoomForm.shopStore" placeholder="请选择类型" style="width: 202px">
              <el-option v-for="item in shopStoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                         :value="item.Fe_GUID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="testAlign"  prop="roomNum">
            <div>床位数</div>
            <el-input v-model="AddRoomForm.roomNum"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {AddRoomList, queryStoreList} from '../../../config/Api.js'

  export default {
    data() {
      return {
        AddRoomForm: {
          roomName: '',
          shopStore: '',
          roomNum: '',
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
    },
    methods: {
      //查询门店数据
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.shopStoreList = resp.data.data;
        })
      },
      addRoomMethod() {
        let param = {
          Ro_Name: this.AddRoomForm.roomName,
          Fe_GUID: this.AddRoomForm.shopStore,
          Ro_Number: this.AddRoomForm.roomNum,
        };
        this.$http.post(AddRoomList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        });
      },
      //提交表单
      saveAddRoom(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addRoomMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetAddRoomFrom(AddRoomForm) {
        this.$refs[AddRoomForm].resetFields();
      },
    },
    name: "AddRoom"
  }
</script>

<style scoped>

</style>
