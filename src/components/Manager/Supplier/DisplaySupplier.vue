<template>
  <div style="margin: auto;width: 99%;height: 100%;">
    <div class="divTop">
      <el-input v-model="searchValue" placeholder="编号/名称/联系电话" style="width: 200px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click=" searchSupplier">查询</el-button>
      <el-dropdown style="float: right;margin-top: 6px;">
            <span class="el-dropdown-link">
            <img src="/static/images/operatefold.png" alt="" align="middle" class="oprate">
            </span>
        <el-dropdown-menu slot="dropdown" ref="dddd">
          <el-dropdown-item> 打印&nbsp;&nbsp;<img src="/static/images/print.png" class="oprate">
          </el-dropdown-item>
          <el-dropdown-item>导出&nbsp;&nbsp;<img src="/static/images/import.png" class="oprate">
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" style="margin-right: 20px;float: right" icon="el-icon-circle-plus-outline"
                 @click="addSupplier">添加
      </el-button>
    </div>

    <div class="divTable">
      <el-table :data="SupplierList" tooltip-effect="dark" style="width: 100%;"
                :header-cell-style="{background:'#f0f8ff'}"
                @selection-change="handleSelectionChange" show-header align="center" height="100%">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="Prov_Code" label="供应商编号" sortable>
          <template slot-scope="scope">
            <router-link :to="{name:'detailSupplier',params:{payId:`${scope.row.Prov_GUID}`}}">
              {{scope.row.Prov_Code}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="Prov_Name" label="供应商名称"></el-table-column>
        <el-table-column prop="Prov_ShotName" label="供应商简称" align="center"></el-table-column>
        <el-table-column prop="Prov_LinkName" label="联系人" align="center"></el-table-column>
        <el-table-column prop="Prov_Phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="Prov_Adrress" label="联系地址" align="center"></el-table-column>
        <el-table-column prop="Prov_Bank" label="开户银行" align="center"></el-table-column>
        <el-table-column prop="Prov_Account" label="银行账号" align="center"></el-table-column>
        <el-table-column prop="State" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editSupplierBtn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteSupplier(scope.row,scope.$index,SupplierList)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;background-color: white;padding: 10px 10px 10px 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <DeleteSupplier ref="deleteParam"></DeleteSupplier>
  </div>
</template>

<script>
  import DeleteSupplier from './DeleteSupplier'
  import {supplierList} from '../../../config/Api.js';

  export default {
    data() {
      return {
        SupplierList: [],
        searchValue: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        Prov_GUID: '',
      }
    },
    components: {
      DeleteSupplier
    },
    created() {
      this.getSupplierList(this.pageSize, this.currentPage);
    },
    methods: {
      //筛选排序
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getSupplierList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getSupplierList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      //获取供应商列表
      getSupplierList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Keyword: this.searchValue
        };
        this.$http.post(supplierList, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let State = "";
          for (let n in resp.data.data) {
            if (resp.data.data[n].State === 0) {
              State = "正常";
            } else {
              State = "无效";
            }
            resp.data.data[n]["State"] = State; //状态
            this.Prov_GUID = resp.data.data[n].Prov_GUID;
            list.push(resp.data.data[n]);
          }
          this.SupplierList = list;
          this.total = resp.data.count;
        })
      },
      //查询搜索条件
      searchSupplier() {
        this.getSupplierList(this.pageSize, this.currentPage);
      },
      //添加
      addSupplier() {
        this.$router.push({name: 'addSupplier', params: {Guid: this.Prov_GUID}});
      },
      //编辑
      editSupplierBtn(row) {
        this.$router.push({name: 'editSupplier', params: {guid: row.Prov_GUID}});
      },
      //删除
      deleteSupplier(rows, index, data) {
        this.$store.state.deleteSupplierIsShow = true; //设置对话框显示
        this.$refs.deleteParam.currentRows = rows;
        this.$refs.deleteParam.currentIndex = index;
        this.$refs.deleteParam.supplierData = data;
      },
    },
    name: "DisplaySupplier"
  }
</script>

<style>
  .divTable .cell a {
    color: blue;
  }

  .divTop .el-input__inner {
    height: 38px !important;
  }

  .divTop .el-button {
    height: 38px;
    vertical-align: middle;
    line-height: 1;
  }
</style>
<style scoped>
  .divTop {
    width: 99%;
    background-color: white;
    padding: 10px;
    text-align: left;
    margin-bottom: 10px;
  }

  .divTable {
    height: 85%;
  }

</style>
