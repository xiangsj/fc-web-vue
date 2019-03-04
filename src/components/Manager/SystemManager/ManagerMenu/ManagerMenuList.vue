<template>
  <div class="MenuDiv">
    <div class="menuTop">
      <el-input v-model="searchValue" placeholder="菜单名称" style="width: 200px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchMenu">查询</el-button>
    </div>
    <div class="tableBox">
      <el-table :data="tableMenuList" tooltip-effect="dark" style="width: 100%;color: #3a3a3a;"
                :header-cell-style="{background:'#f0f8ff'}" height="100%"
                @selection-change="handleSelectionChange" show-header>
        <el-table-column prop="Menu_Code" label="菜单编号" align="center"></el-table-column>
        <el-table-column prop="Menu_Name" label="菜单名称" align="center"></el-table-column>
        <el-table-column prop="Menu_Url" label="菜单URL" show-overflow-tooltip align="center"></el-table-column>
      </el-table>

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
  import {QueryMenuList} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        tableMenuList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchValue: '',
      }
    },
    created() {
      this.getMenuList(this.pageSize, this.currentPage);
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
        this.getMenuList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getMenuList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      searchMenu() {
        this.getMenuList(this.pageSize, this.currentPage);
      },
      /**
       * 获取用户列表信息
       */
      getMenuList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          total: "",
          isAsc: true,
          Keyword: this.searchValue,
          Menu_Type: '1',//菜单类型1是菜单，2是功能
        };

        this.$http.post(QueryMenuList, this.$qs.stringify(params)).then(resp => {
          this.tableMenuList = resp.data.data;
          this.total = resp.data.count;
        })
      },
    },
    name: "ManagerMenuList"
  }
</script>

<style scoped>
  .MenuDiv {
    width: 99%;
    height: 100%;
    margin: auto;
  }

  .menuTop {
    padding: 10px;
    text-align: left;
    background-color: #fff;
  }

  .pageBox {
    text-align: right;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    padding-right: 20px;
    background-color: #fff;
    padding-top: 10px;
  }

  .tableBox {
    margin-top: 10px;
    background-color: #fff;
    color: #3a3a3a;
    height: 85%;
  }

</style>
