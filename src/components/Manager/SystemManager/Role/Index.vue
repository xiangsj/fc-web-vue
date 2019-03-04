<template>
  <div class="contentBox">

    <div class="operationBox">
      <el-input v-model="searchValue" placeholder="角色名称" style="width: 200px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchRole">查询</el-button>
      <el-dropdown style="float: right;height: 100%;margin-top: 8px;">
        <span class="el-dropdown-link">
          <img src="../../../../../static/images/operatefold.png" alt="" align="absmiddle" class="oprate"></span>
        <el-dropdown-menu slot="dropdown" ref="dddd" style="margin-top: -2px">
          <el-dropdown-item> 打印&nbsp;&nbsp;<img src="../../../../../static/images/print.png" class="oprate">
          </el-dropdown-item>
          <el-dropdown-item>导出&nbsp;&nbsp;<img src="../../../../../static/images/import.png" class="oprate">
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" style="margin-right: 20px;float: right" icon="el-icon-circle-plus-outline" @click="addRole">添加</el-button>
    </div>

    <div class="tableBox">
      <el-table :data="tableUserList" tooltip-effect="dark" style="width: 100%;color: #3a3a3a;"
                :header-cell-style="{background:'#f0f8ff'}" height="100%"
                @selection-change="handleSelectionChange" show-header align="center">

        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="Role_Code" label="角色编号" sortable>
          <template slot-scope="scope">
            <router-link :to="{name:'systemManagerDetailRole',params:{roleId:`${scope.row.Role_GUID}`}}">
              {{scope.row.Role_Code}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="Role_Name" label="角色名称"></el-table-column>
        <el-table-column prop="Role_State_Str" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRoleBtn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRole(scope.row,scope.$index,tableUserList)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pageBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <Delete ref="deleteParam"></Delete>
    </div>
  </div>

</template>


<script>
  import Delete from "./Delete"
  import {RoleListApi, DeleteUserApi} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        dialogVisible: false,
        tableUserList: [], //用户列表
        searchValue: "",    //查询关键字
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    components: {
      Delete
    },
    created() {
      this.getRoleList(this.pageSize, this.currentPage);
    },
    mounted() {

    },
    methods: {
      //筛选排序
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getRoleList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRoleList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      searchRole() {
        this.getRoleList(this.pageSize, this.currentPage);
      },

      /**
       * 获取用户列表信息
       */
      getRoleList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          total: "",
          isAsc: true,
          Keyword: this.searchValue,
        };

        this.$http.post(RoleListApi, this.$qs.stringify(params)).then(resp => {
          console.log(resp.data);
          let list = [];
          let Role_State_Str = "";
          for (let n in resp.data.data) {
            if (resp.data.data[n].State === 0) {
              Role_State_Str = "有效"
            } else {
              Role_State_Str = "无效";
            }
            resp.data.data[n]["Role_State_Str"] = Role_State_Str;
            list.push(resp.data.data[n]);
          }
          this.tableUserList = list;
          this.total = resp.data.count;
        })
      },

      addRole() {
        this.$router.push({name: "systemManagerAddRole"});
      },
      /*详情页面跳转*/
      editRoleBtn(row) {
        this.$router.push({name: "systemManagerEditRole", params: {roleId: row.Role_GUID, state: row.State}});
      },

      deleteRole(rows, index, data) {
        this.$store.state.deleteRoleIsShow = true; //设置对话框显示
        this.$refs.deleteParam.currentRows = rows;
        this.$refs.deleteParam.currentIndex = index;
        this.$refs.deleteParam.tableData = data;
      }
    },

  }
</script>

<style scoped>
  .contentBox {
    width: 99%;
    margin: auto;
    height: 100%;
  }

  .top span {
    background-color: #ccc;
    display: inline-block;
    float: right;
    width: 40px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
    margin-right: 20px;
  }

  .operationBox {
    background-color: #fff;
    text-align: left;
    padding: 10px;
  }

  .oprate {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }

  .tableBox {
    margin-top: 10px;
    background-color: #fff;
    color: #3a3a3a;
    height: 85%;
  }

  .pageBox {
    text-align: right;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    padding-right: 20px;
    padding-top: 10px;
    background-color: #fff;
  }

</style>
