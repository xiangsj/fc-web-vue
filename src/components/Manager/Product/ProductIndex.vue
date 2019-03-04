<template>
  <div class="box">
    <div class="contentBox">
      <div class="operationBox">
        <div class="filter">
          <el-input v-model="searchValue" clearable placeholder="产品名称/产品类别"
                    style="height: 40px; width: 210px"></el-input>
          <el-select v-model="Pro_PIClassType" clearable placeholder="请选择产品类别" style="height: 40px;width: 150px">
            <el-option
              v-for="item in options"
              :key="item.Co_Values"
              :label="item.Co_Name"
              :value="item.Co_Values">
            </el-option>
          </el-select>
          <el-select v-model="State" clearable placeholder="请选择状态" style="width: 200px;margin-left: 20px;">
            <el-option v-for="item in StateSelectList" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-button style="height: 40px;padding-top: 1px">
            <modelBox style="display: inline-block" @modelBox="modelBox"></modelBox>
          </el-button>
          <div class="operationBtnBox">
            <el-button type="primary" style="margin-right: 20px" @click=" searchRoomVaule" icon="el-icon-search">
              查询
            </el-button>
            <el-button type="primary" @click="addProject" style="margin-right: 20px" icon="el-icon-circle-plus-outline">
              添加
            </el-button>
            <el-dropdown>
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
          </div>
        </div>
      </div>
      <div class="tableBox">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;color: #3a3a3a;"
          :header-cell-style="{background:'#f0f8ff'}"
          show-header align="center" height="720px"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Pro_Code" label="产品编号" sortable width="150">
            <template slot-scope="scope">
              <router-link :to="{name:'detaiProduct',params:{Guid:`${scope.row.Pro_GUID}`}}">
                {{scope.row.Pro_Code}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="Pro_Name" label="产品名称" width="150"></el-table-column>
          <el-table-column prop="Pro_PIClassTypeName" label="产品类别" align="center"></el-table-column>
          <el-table-column prop="Pro_MnemonicCode" label="产品助记码" align="center"></el-table-column>
          <el-table-column prop="Pro_Unit" label="计量单位" align="center"></el-table-column>
          <el-table-column prop="Pro_SalePrice" label="销售价" align="center"></el-table-column>
          <el-table-column prop="Pro_CostPrice" label="成本价" align="center"></el-table-column>
          <el-table-column prop="State" label="状态" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateProject(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="delectProject(scope.row,scope.$index,tableData)">删除
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
    </div>
    <Delect ref="delectProjectParam"></Delect>
  </div>
</template>
<script>
  import {Project} from "../../../config/Api"
  import {CommonDictionaryTree, StoreTreeList} from "../../../config/Api"
  import Delect from "./DelProduct"
  import modelBox from "../../ModelBox"

  export default {
    components: {
      Delect, modelBox
    },
    data() {
      return {
        Pro_PIClassType: '',
        Project: [],
        options: [],
        value: '',
        options2: [],
        // label: '江苏',
        // cities: []
        StateSelectList: [ //状态
          {
            value: '0',
            label: '正常',
          },
          {
            value: '1',
            label: '无效',
          }
        ],
        props: {
          value: 'label',
          children: 'cities'
        },
        State: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchValue: '',
        tableData: [],
        ProductFendians: '',
      }
    },
    mounted() {

    },
    created() {
      this.queryData(this.pageSize, this.currentPage);
      this.select();
    },
    methods: {
      select() {
        let selected = {
          //ab02产品类别03项目
          CoCode: ["AB02"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(selected)).then(resp => {
          for (let position in resp.data.data) {

            //02产品类别03项目
            if (resp.data.data[position].Co_Code === 'AB02') {
              this.options = resp.data.data[position].List;
            }
          }
        });
        this.$http.post(StoreTreeList).then(resp => {
          this.date = resp;
        });
      },
      modelBox(value) {
        this.ProductFendians = '';
        for (var i = 0; i < value.length; i++) {
          this.ProductFendians += value[i].value + ','
        }
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryData(this.pageSize, this.currentPage);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryData(this.pageSize, this.currentPage);
      },
      //获取项目列表
      queryData(pageSize, currentPage) {
        let Param = {
          PorI: '1',//(1产品、2项目)
          pageSize: pageSize,
          pageIndex: currentPage,
          isAsc: false,
          Keyword: this.searchValue,
          Ba_Value: this.Pro_PIClassType,
          State: this.State,
          totle: 0,
          Fendians: this.ProductFendians,
        };
        //获取接口数据
        this.$http.post(Project, this.$qs.stringify(Param)).then(resp => {
          this.tableData = resp.data.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].State === 1) {
              this.tableData[i].State = "无效"
            } else {
              this.tableData[i].State = "正常"
            }
          }
          this.total = resp.data.count;
        })
      },
      //搜索框
      searchRoomVaule() {
        this.queryData(this.pageSize, this.currentPage);
      },
      //修改按钮
      updateProject(row) {
        this.$router.push({name: 'updProduct', params: {Guid: row.Pro_GUID}});
      },
      //添加按钮
      addProject() {
        this.$router.push({name: "addProduct"});
      },
      //删除按钮
      delectProject(rows, index, data) {
        this.$store.state.deleteRoomIsShow = true; //设置对话框显示
        this.$refs.delectProjectParam.currentRows = rows;
        this.$refs.delectProjectParam.currentIndex = index;
        this.$refs.delectProjectParam.roomData = data;
      },
    }
  }
</script>
<style>
  .el-radio {
    margin-left: 10px !important;
  }

  .el-button {
    height: 38px;
  }
</style>
<style scoped>
  .contentBox {
    width: 99%;
    margin: auto;
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
    height: 60px;
    background-color: #fff;
  }

  .oprate {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }

  .filter span {
    font-size: 14px;
    margin-left: 10px;
  }

  .filter {
    width: 98%;
    line-height: 60px;
    text-align: left;
    float: left;
    display: inline-block;
    margin-left: 10px;

  }

  .operationBtnBox {
    width: 300px;
    line-height: 60px;
    text-align: right;
    float: right;
    margin: auto;
  }

  .tableBox {
    margin-top: 20px;
    background-color: #fff;
    color: #3a3a3a;
  }

  .pageBox {
    text-align: right;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    padding-right: 20px;
    margin-top: 10px;
  }

</style>
