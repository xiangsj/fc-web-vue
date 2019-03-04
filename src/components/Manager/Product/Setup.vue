<template>
  <div>
  <el-button type="text" @click="teg">批量设置</el-button>
  <el-dialog title="批量设置" :visible.sync="dialogFormVisible" width="500px">
    <el-form  ref="form" :model="Setup">
      <el-form-item >
        <el-select v-model="Setup.name" style="width: 300px" placeholder="请选择批量设置的列" >
          <el-option label="销售成本" value="1"></el-option>
          <el-option label="门店价格" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-input v-model="Setup.value" style="width: 300px" autocomplete="off" placeholder="将此列设置为" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        icon="el-icon-circle-close-outline"
        @click="dialogFormVisible = false"
        style="margin-left: 15px">取 消
      </el-button>
      <el-button
        type="primary" icon="el-icon-circle-check-outline"
        @click="getCheckedNodeData()"
        style="margin-right: 17px">确 认
      </el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Setup",
      data(){
          return{
            dialogFormVisible:false,
            Setup:{
              name:'',
              value:'',
            },

        }
      },
      methods:{
        teg(){
          this.dialogFormVisible = true;
        },
        //确定按钮
        getCheckedNodeData() {
          this.dialogFormVisible = false;
            this.$emit('setup',this.Setup);
        },
      }
    }
</script>

<style scoped>

</style>
