<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteSupplierIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除供应商：  {{currentRows.Prov_Name}}吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deletePayItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeleteSupplierList} from "../../../config/Api.js"

  export default {
    data() {
      return {
        Prov_Name: "",
        currentRows: {},
        currentIndex: 0,
        supplierData: []
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deleteSupplierIsShow = false;
      },
      deletePayItem() {
        this.$http.post(DeleteSupplierList + this.currentRows.Prov_GUID).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
          this.$store.state.deleteSupplierIsShow = false;
          this.supplierData.splice(this.currentIndex, 1);
        });
        this.$store.state.deleteSupplierIsShow = false;
      }
    },
    name: "DeleteSupplier"
  }
</script>

<style scoped>

</style>
