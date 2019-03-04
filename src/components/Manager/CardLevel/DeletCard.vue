<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteCard" width="30%" :before-close="handleClose">
      <span>你确定删除这条记录吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="EditCard">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeletCard} from "../../../config/Api"
    export default {
      data() {
        return {
          currentRows: {},
          currentIndex: 0,
          EmpTrainData: []
        }

      },
      methods: {
        handleClose() {
          this.$store.state.deleteCard = false;
        },
        EditCard() {
          this.$http.post(DeletCard + this.currentRows.Ca_GUID).then(resp => {
            if (resp.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            }
            this.$store.state.deleteCard = false;
            this.CardData.splice(this.currentIndex, 1);
          });
          this.$store.state.deleteCard = false;

        }
      },
        name: "DeletCard"
    }
</script>

<style scoped>

</style>
