<template>
    <div class="contentBox">
      <div class="operationBox">

        <el-input v-model="searchValue" placeholder="编号/名称" style="width: 200px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click=" searchPayMethod">查询</el-button>


        <el-dropdown style="float: right;margin-top: 8px;">
            <span class="el-dropdown-link">
            <img src="/static/images/operatefold.png" alt="" align="absmiddle" class="oprate">
            </span>
          <el-dropdown-menu slot="dropdown" ref="dddd" style="margin-top: -2px">
            <el-dropdown-item> 打印&nbsp;&nbsp;<img src="/static/images/print.png" class="oprate">
            </el-dropdown-item>
            <el-dropdown-item>导出&nbsp;&nbsp;<img src="/static/images/import.png" class="oprate">
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" style="margin-right: 20px;float: right;" icon="el-icon-circle-plus-outline"
                   @click="addPay">添加
        </el-button>
      </div>

      <div class="tableBox">
        <el-table :data="tablePayList" tooltip-effect="dark" style="width: 100%;color: #3a3a3a;"
                  :header-cell-style="{background:'#f0f8ff'}"
                  @selection-change="handleSelectionChange" show-header align="center" height="720px">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="Payt_Code" label="交易编号" align="center" sortable>
            <template slot-scope="scope">
              <router-link :to="{name:'payMethodDetailPay',params:{payId:`${scope.row.Payt_GUID}`}}">
                {{scope.row.Payt_Code}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="Payt_Name" label="交易名称" align="center"></el-table-column>
          <el-table-column prop="Payt_Type" label="交易类型" align="center"></el-table-column>
          <el-table-column prop="Project_IsUse" label="购项目是否使用" align="center"></el-table-column>
          <el-table-column prop="Product_IsUse" label="购产品是否使用" align="center"></el-table-column>
          <el-table-column prop="Card_IsUse" label="购卡是否使用" align="center"></el-table-column>
          <el-table-column prop="Pay_State_Str" label="状态" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editPayBtn(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deletePay(scope.row,scope.$index,tablePayList)">删除
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
  import Delete from "./DeletePay"
  import {PayMethodApi} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        dialogVisible: false,
        tablePayList: [], //支付列表
        searchValue: "",//搜索关键字
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    components: {
      Delete  //引入delete.vue文件
    },
    created() {
      this.getPayMethodList(this.pageSize, this.currentPage);
    },
    mounted() {

    },
    methods: {  //接口数据方法
      //筛选排序
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPayMethodList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getPayMethodList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      searchPayMethod() {
        this.getPayMethodList(this.pageSize, this.currentPage);
      },
      //获取支付方式列表
      getPayMethodList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Keyword: this.searchValue
        };
        this.$http.post(PayMethodApi, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let Pay_State_Str = "";
          let Project_IsUse = "";//购项目是否使用
          let Product_IsUse = "";//购产品是否使用
          let Card_IsUse = "";//购卡是否使用
          for (let n in resp.data.data) {
            if (resp.data.data[n].State === 0) {
              Pay_State_Str = "正常";
            } else {
              Pay_State_Str = "无效";
            }
            if (resp.data.data[n].Payt_IsUseItem === 1) {
              Project_IsUse = "使用";
            } else {
              Project_IsUse = "不使用";
            }
            if (resp.data.data[n].Payt_IsUseProduct === 1) {
              Product_IsUse = "使用";
            } else {
              Product_IsUse = "不使用";
            }
            if (resp.data.data[n].Payt_IsUseCard === 1) {
              Card_IsUse = "使用";
            } else {
              Card_IsUse = "不使用";
            }
            resp.data.data[n]["Pay_State_Str"] = Pay_State_Str; //状态
            resp.data.data[n]["Project_IsUse"] = Project_IsUse;
            resp.data.data[n]["Product_IsUse"] = Product_IsUse;
            resp.data.data[n]["Card_IsUse"] = Card_IsUse;

            list.push(resp.data.data[n]);
          }
          this.tablePayList = list;
          this.total = resp.data.count;
        })
      },
      addPay() {
        this.$router.push({name: "payMethodAddPay"});
      },
      editPayBtn(row) {  //编辑按钮跳转  Payt_GUID
        this.$router.push({name: "payMethodEditPay", params: {payId: row.Payt_GUID, state: row.State}})
      },
      deletePay(rows, index, data) { //删除框
        this.$store.state.deletePayIsShow = true; //设置对话框显示
        this.$refs.deleteParam.currentRows = rows;
        this.$refs.deleteParam.currentIndex = index;
        this.$refs.deleteParam.tableData = data;
      },
    },
    name: "Pay"
  }
</script>

<style>
  .operationBox .el-input__inner {
    height: 38px !important;
  }

  .operationBox .el-button {
    height: 38px;
    vertical-align: middle;
    line-height: 1;
  }

  .tableBox .cell a {
    color: blue;
  }
</style>

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
    text-align: left;
    background-color: #fff;
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
