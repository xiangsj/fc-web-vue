<template>
    <div>
        <el-dialog title="提示" :visible="this.$store.state.isShow" width="30%" :before-close="handleClose">
            <span>你确定删除用户：{{currentRows.User_Name}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteUser">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {DeleteUserApi} from "../../../../config/Api.js"

    export default {
        data() {
            return {
                currentRows: {},
                currentIndex: 0,
                tableData:[],
            }
        },
        methods: {
            handleClose() {
                //this.$emit("refreshTable");
                this.$store.state.isShow = false;
            },

            deleteUser() {
                this.$http.post(DeleteUserApi + this.currentRows.User_GUID).then(resp => {
                   this.tableData.splice(this.currentIndex, 1);
                    this.$store.state.isShow = false;
                });
                this.$store.state.isShow = false;
            }


        }
    }
</script>

<style scoped>

</style>