<template>
  <div style="height: 100%;width: 99%;margin: auto">
    <div align="right" class="divButton">
      <template>
        <el-button type="primary" style="margin-right: 20px" icon="el-icon-circle-plus-outline" @click="addConfig"
                   class="add">添加
        </el-button>
      </template>
    </div>
    <div style="width: 100%;height: 92%;margin-top: 10px">
      <!--右边父类item-list-->
      <div class="divLeft" style="width: 81%;text-align: right;float: right;height: 100%;">
        <el-table :data="configTreeList" style="width: 100%;color: #3a3a3a;height: 100%;"
                  :header-cell-style="{background:'#f0f8ff'}">
          <el-table-column prop="Co_Code" label="项目编号" align="center">
            <template slot-scope="scope">
              <router-link :to="{name:'paramConfigDetail',params:{payId:`${scope.row.Co_GUID}`}}">
                {{scope.row.Co_Code}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="Co_Name" label="类别名称" align="center"></el-table-column>
          <el-table-column prop="Co_Level" label="级别" align="center"></el-table-column>
          <el-table-column prop="State" label="是否使用" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editTreeListBtn(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteTreeList(scope.row,scope.$index,configTreeList)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBox">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-sizes="[10,20, 30, 40]" :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <!--左边父类tree-->
      <div class="divRight" style="width: 18%; background-color: white;float: left;height: 100%;overflow-y:scroll;overflow-x:hidden;">
        <el-input v-model="searchValue" placeholder="请输入内容"
                  style="margin: 10px 0 10px 5px;width: 96%;padding-right: 10px;">
        </el-input>
        <el-tree node-key="value" :default-expanded-keys="[0,1]" :default-checked-keys="[0,2]"
                 :filter-node-method="filterNode" ref="treeParam"
                 :data="configList" :props="configProps" @check-change="getCheckedNodes" @node-click="handleNodeClick">
        </el-tree>

      </div>
    </div>
    <DeleteConfig ref="deleteParam"></DeleteConfig>
  </div>
</template>

<script>
  import DeleteConfig from "./DeleteConfig"
  import {QueryConfigTree, QueryConfigTreeList} from "../../../config/Api.js"

  export default {
    data() {
      return {
        searchValue: "",    //搜索父类关键字
        configList: [],
        configProps: {
          children: 'List',
          label: 'Co_Name'
        },
        Co_GUID: '',
        Co_Level: '',//类别等级
        currentPage: 1,
        pageSize: 10,
        total: 0,
        configTreeList: [],
      }
    },
    created() {
      this.getConfigTree();
    },
    mounted() {

    },
    components: {
      DeleteConfig  //引入delete.vue文件
    },
    watch: {
      searchValue(val) {
        this.$refs.treeParam.filter(val);
      }
    },
    methods: {
      //获取父类的tree
      getConfigTree() {
        this.$http.post(QueryConfigTree).then(resp => {
          this.configList = resp.data.data;
        })
      },
      //节点改变时获取
      getCheckedNodes(data, checked, indeterminate) {
        console.log(data.Co_Name, checked, indeterminate);
        console.log(data.value, checked, indeterminate);
      },
      handleNodeClick(data) {
        this.Co_GUID = data.Co_GUID;
        this.Co_Level = data.Co_Level;
        this.getConfigTreeList(this.pageSize, this.currentPage, data.Co_GUID);
      },
      //获取item父类底下的列表
      getConfigTreeList(pageSize, currentPage, Co_GUID) {
        let params = {
          Co_ParentCode: Co_GUID,
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Keyword: this.searchValue
        };
        this.$http.post(QueryConfigTreeList, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let State = ""; //状态是否使用
          for (let n in resp.data.data) {
            if (resp.data.data[n].State === 0) {
              State = "正常";
            } else {
              State = "无效";
            }
            resp.data.data[n]["State"] = State; //状态
            list.push(resp.data.data[n]);
          }
          this.configTreeList = resp.data.data;
          this.total = resp.data.count;
        })
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getConfigTreeList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getConfigTreeList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.Co_Name.indexOf(value) !== -1;
      },
      addConfig() {
        this.$router.push({name: "paramConfigAdd", params: {Co_GUID: this.Co_GUID, Co_Level: this.Co_Level}});
      },
      editTreeListBtn(row) {
        this.$router.push({name: "paramConfigEdit", params: {Co_GUID: row.Co_GUID, Co_Level: row.Co_Level,}});
      },
      deleteTreeList(rows, index, data) {
        this.$store.state.deleteRoleIsShow = true; //设置对话框显示
        this.$refs.deleteParam.currentRows = rows;
        this.$refs.deleteParam.currentIndex = index;
        this.$refs.deleteParam.tableData = data;
      },
    },
    name: "Index"
  }
</script>

<style>
  .divRight .el-input__inner {
    height: 30px !important;
  }

  .divButton .el-button {
    height: 38px;
  }

  .divLeft .cell a {
    color: blue;
  }
</style>

<style scoped>
  .pageBox {
    width: 99%;
    position: relative;
    left: 0;
    bottom: 50px;
  }
</style>
