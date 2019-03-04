<template>

  <div class="contentBox">
    <div class="operationBox">
      <el-input v-model="searchValue" placeholder="编号/用户名" style="width: 200px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
      <el-dropdown style="float: right;height: 100%;margin-top: 8px;">
                            <span class="el-dropdown-link">
                                <img src="../../../../../static/images/operatefold.png" alt="" align="absmiddle"
                                     class="oprate">
                            </span>
        <el-dropdown-menu slot="dropdown" ref="dddd" style="margin-top: -2px">
          <el-dropdown-item> 打印&nbsp;&nbsp;<img src="../../../../../static/images/print.png" class="oprate">
          </el-dropdown-item>
          <el-dropdown-item>导出&nbsp;&nbsp;<img src="../../../../../static/images/import.png" class="oprate">
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" style="margin-right: 20px;float: right;" icon="el-icon-circle-plus-outline"
                 @click="addUser">添加
      </el-button>
    </div>

    <div class="tableBox">
      <el-table :data="tableUserList" tooltip-effect="dark" style="width: 100%; color: #3a3a3a;"
                :header-cell-style="{background:'#f0f8ff'}"
                @selection-change="handleSelectionChange" show-header align="center" height="100%">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="User_Code" label="编号" sortable>
          <template slot-scope="scope">
            <router-link :to="{name:'systemManagerDetailUser',params:{userId:`${scope.row.User_GUID}`}}">
              {{scope.row.User_Code}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="User_Name" label="用户名称"></el-table-column>
        <el-table-column prop="User_Name" label="角色"></el-table-column>
        <el-table-column prop="CreateDate" label="时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="User_State_Str" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUserBtn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.$index, scope.row, tableUserList)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Delete ref="deleteParam"></Delete>
      <div class="pageBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>
  </div>


</template>


<script>
  import Delete from "./Delete"
  import {UserListApi, DeleteUserApi} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        tableUserList: [], //用户列表
        searchValue: "",    //查询关键字
        currentPage: 1,
        pageSize: 10,
        total: 0,
        User_GUID: "",
      }
    },

    created() {
      this.getUserList(this.pageSize, this.currentPage);
    },
    mounted() {

    },
    components: {
      Delete
    },
    methods: {
      //筛选排序
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getUserList(this.pageSize, this.currentPage);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserList(this.pageSize, this.currentPage);
      },
      searchUser() {
        this.getUserList(this.pageSize, this.currentPage);
      },

      /**
       * 获取用户列表信息
       */
      getUserList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          total: "",
          isAsc: true,
          Keyword: this.searchValue,
        };

        this.$http.post(UserListApi, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let User_State_Str = "";
          for (let n in resp.data.data) {
            if (resp.data.data[n].User_State === 0) {
              User_State_Str = "有效"
            } else {
              User_State_Str = "无效";
            }
            resp.data.data[n]["User_State_Str"] = User_State_Str;
            resp.data.data[n]["CreateDate"] = (new Date(resp.data.data[n].CreateDate)).Format("yyyy-MM-dd hh:mm:ss");

            list.push(resp.data.data[n]);
          }
          this.tableUserList = list;
          this.total = resp.data.count;

          console.log(`this.total: ${this.total}`);
        })
      },

      addUser() {
        this.$router.push({name: "systemManagerAddUser"});
      },
      /*详情页面跳转*/
      editUserBtn(row) {
        let user_id = row.User_GUID;
        this.$router.push({name: "systemManagerEditUser", params: {userId: user_id}});
      },

      deleteUser(index, currentRows, data) {
        this.$store.state.isShow = true; //设置对话框显示
        this.$refs.deleteParam.currentRows = currentRows;
        this.$refs.deleteParam.currentIndex = index;
        this.$refs.deleteParam.tableData = data;
      },
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
    padding: 10px;
    background-color: #fff;
    text-align: left;
  }

  .oprate {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }


  .tableBox {
    margin-top: 10px;
    background-color: #fff;
    height: 85%;
  }

  .pageBox {
    padding-top: 10px;
    text-align: right;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    padding-right: 20px;
    background-color: #fff;
  }

</style>
