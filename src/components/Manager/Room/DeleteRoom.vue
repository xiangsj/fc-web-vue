<template>
<div>
  <el-dialog title="提示" :visible="this.$store.state.deleteRoomIsShow" width="30%" :before-close="handleClose">
    <span>你确定删除此项类别：{{currentRows.Ro_Name}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteRoom">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
  import {DeleteRoomList} from "../../../config/Api.js"
    export default {
      data() {
        return {
          Ro_Name: "",
          currentRows: {},
          Ro_GUID:'',
          currentIndex: 0,
          roomData: []
        }
      },
      methods: {
        handleClose() {
          this.$store.state.deleteRoomIsShow = false;
        },
        deleteRoom() {
          this.$http.post(DeleteRoomList + this.currentRows.Ro_GUID).then(resp => {
            this.$store.state.deleteRoomIsShow = false;
            this.roomData.splice(this.currentIndex, 1);
          });
          this.$store.state.deleteRoomIsShow = false;
        }
      },
        name: "DeleteRoom"
    }
</script>

<style scoped>

</style>
