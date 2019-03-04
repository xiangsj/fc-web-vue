<template>
  <div>
    <el-button type="text" @click="mendianed">选择门店</el-button>
    <el-dialog title="选择门店" :visible.sync="dialogFormVisible" width="500px">
      <div>
        <el-input
          placeholder="输入门店名称"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree2"
          node-key="id"
          empty-text="无数据"
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
    <!--<p>-->
    <!--<button @click="test">Test</button>-->
    <!--</p>-->
  </div>


</template>
<style>
  .el-dialog__header {
    background-color: #8ccbff;
  }

  .el-dialog {
    border-radius: 20px;
  }

  .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .el-dialog__title {
    color: white;
  }

  .el-button--default {
    border: solid 1px #8ccbff;
  }

  .el-button--default span {
    color: #8ccbff;
  }
</style>
<script>
  import {StoreTreeList} from "../config/Api.js"
  // import modelshop from "./storeModel"

  export default {
    props: ['FendianNoded'],
    components: {
      // modelshop
      // props: ['FendianNode'],
    },
    data() {
      return {
        filterText: '',
        data2: [],
        treeArray: '',
        data: [],
        Smodel: '',
        defaultProps: {
          children: 'list',
          label: 'name',
          id: 'code'
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
      }
    },

    created() {
      this.getstoreModel();
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      //获取node使模态框获得节点
      mendianed() {
        this.dialogFormVisible = true;
        var tab = [];
        var tag = {};
        if (this.FendianNoded == null) {
          return;
        }
        if (this.FendianNoded.length > 0) {
          for (var i = 0; i < this.FendianNoded.length; i++) {
            tag = {};
            tag.id = this.FendianNoded[i].code;
            tag.label = this.FendianNoded[i].name;
            tab.push(tag);
          }
        }
        this.$refs.tree2.setCheckedNodes(tab);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      getstoreModel() {
        this.$http.post(StoreTreeList).then(resp => {
          this.data2 = resp.data.data;
        })
      },
      //确定按钮事件
      getCheckedNodeData() {
        this.treeArray = this.$refs.tree2.getCheckedNodes(true, false);
        this.dialogFormVisible = false;
        this.$emit('modelBox', this.treeArray);
      },//
    },
  }
</script>
