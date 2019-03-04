<template>
  <div>
    <el-button @click="dialogFormVisible = true"style="float: left">选择套餐内容</el-button>
    <div>
      <el-dialog title="选择套餐内容" :visible.sync="dialogFormVisible">
        <div>
          <el-input
            placeholder="输入套餐名称"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="data2"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree2"
            node-key="value"
            :check-on-click-node=true
            :show-checkbox=true
          >
          </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button icon="el-icon-circle-close-outline" @click="dialogFormVisible = false" style="margin-left: 15px">取
            消
          </el-button>
          <el-button
            type="button" icon="el-icon-circle-check-outline"
            @click="getCheckedNodeData()"
            style="margin-right: 17px">确 认
          </el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {GetProduct} from "../../../config/Api"
  export default {
    name: "AddMeal",
    props: ['parentMessage'],
    data(){
      return{
        dialogFormVisible:false,
        filterText: '',
        Ca_GUID:'',
        data2: [],
        defaultProps:
          {
          children: 'List',
          label: 'Co_Name',
        },
      }
    },
    created(){
      this.carded();
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods:{
      filterNode(value,data) {
        if (!value) return true;
        return data.Co_Name.indexOf(value) !== -1;
      },
      carded() {
        this.$http.get(GetProduct).then(resp => {
          this.data2 = resp.data.data;
        })
      },
      getCheckedNodeData() {
        this.dialogFormVisible = false;
        this.treeArray=this.$refs.tree2.getCheckedNodes(true, false);
        this.$emit('AddMeal',this.treeArray);
      },
    },
  }
</script>

<style scoped>

</style>
