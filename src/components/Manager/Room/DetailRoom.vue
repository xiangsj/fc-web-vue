<template>
  <div class="formBox"
       style="padding: 10px;width: 100%;text-align: left;background-color: white;margin-top: 10px;padding-left: 20px;">
    <el-form :model="DetailRoomForm" ref="DetailRoomForm" status-icon :inline="true"
             label-position="top">
      <div>
        <el-form-item class="testAlign" prop="roomName">
          <div>房间名称</div>
          <el-input v-model="DetailRoomForm.roomName" disabled></el-input>
        </el-form-item>
        <el-form-item class="testAlign" prop="shopStore">
          <div>所属门店</div>
          <el-select v-model="DetailRoomForm.shopStore" placeholder="请选择类型" style="width: 202px" disabled>
            <el-option v-for="item in shopStoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                       :value="item.Fe_GUID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="testAlign" prop="roomNum">
          <div>床位数</div>
          <el-input v-model="DetailRoomForm.roomNum" disabled></el-input>
        </el-form-item>
        <el-form-item prop="State" class="testAlign el-radio-group">
          <div style="margin-top: 5px;">状态</div>
          <el-radio @click.native.prevent="onChangeValue('0')" v-model="DetailRoomForm.radio_State" label="0" disabled>正常
          </el-radio>
          <el-radio @click.native.prevent="onChangeValue('1')" v-model="DetailRoomForm.radio_State" label="1" disabled>无效
          </el-radio>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {DetailRoomList, queryStoreList} from '../../../config/Api.js'

  export default {
    data() {
      return {
        DetailRoomForm: {
          roomName: '',
          shopStore: '',
          roomNum: '',
          radio_State: '',
        },
        shopStoreList: [],
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
        this.$http.get(DetailRoomList + this.$route.params.payId).then(resp => {
          this.DetailRoomForm.roomName = resp.data.data.Ro_Name;
          this.DetailRoomForm.shopStore = resp.data.data.Fe_GUID;
          this.DetailRoomForm.roomNum = resp.data.data.Ro_Number;
          this.DetailRoomForm.radio_State = resp.data.data.State + '';
        })
      },
    },
    name: "DetailRoom"
  }
</script>

<style scoped>

</style>
