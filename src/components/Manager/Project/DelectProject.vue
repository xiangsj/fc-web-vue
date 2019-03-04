<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteRoomIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除此项类别：{{currentRows.Pro_Name}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteRoom">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {Delectproject} from "../../../config/Api.js"
  export default {
    data() {
      return {
        Pro_Name: "",
        currentRows: {},
        Pro_GUID:'',
        currentIndex: 0,
        roomData: []
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deleteRoomIsShow = false;
      },
      deleteRoom() {
        this.$http.post(Delectproject + this.currentRows.Pro_GUID).then(resp => {
          this.$store.state.deleteRoomIsShow = false;
          this.roomData.splice(this.currentIndex, 1);
        });
        this.$store.state.deleteRoomIsShow = false;
      }
    },
    name: "DelectProject"
  }
</script>

<style scoped>

</style>
