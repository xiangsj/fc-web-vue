<template>
  <div style="height: 100%;width: 99%;margin: auto;">
    <div class="divEmpTop">
      <el-input v-model="searchValue" placeholder="姓名/联系电话/员工编号" style="width: 10%;float: left"></el-input>
      <el-select v-model="StateSelect" placeholder="请选择状态" style="float: left;width: 10%;margin-left: 20px;" clearable>
        <el-option v-for="item in StateSelectList" :key="item.value" :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
      <el-select v-model="JobSelect" placeholder="请选择职位" style="float: left;width: 10%;margin-left: 20px;" clearable>
        <el-option v-for="item in JobSelectList" :key="item.Co_Values" :label="item.Co_Name"
                   :value="item.Co_Values"></el-option>
      </el-select>
      <el-select v-model="StoreSelect" placeholder="请选择门店" style="float: left;width: 10%;margin-left: 20px;" clearable>
        <el-option v-for="item in StoreSelectList" :key="item.Fe_GUID" :label="item.Fe_Name"
                   :value="item.Fe_GUID"></el-option>
      </el-select>

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
      <el-button type="primary" style="margin-right: 10px;float: right" icon="el-icon-circle-plus-outline"
                 @click="addEmpManager">添加
      </el-button>
      <el-button type="primary" icon="el-icon-search" @click="searchEmpManager"
                 style="float: right;margin-right: 20px;">
        查询
      </el-button>
    </div>

    <div class="divEmpTable">
      <el-table :data="EmpManagerList" tooltip-effect="dark" style="width: 100%;"
                :header-cell-style="{background:'#f0f8ff'}"
                @selection-change="handleSelectionChange" show-header align="center" height="700px">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="Em_Code" label="员工编号" sortable>
          <template slot-scope="scope">
            <router-link :to="{name:'detailEmployeeManager',params:{EmGUID:`${scope.row.Em_GUID}`}}">
              {{scope.row.Em_Code}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="Em_Name" label="员工姓名"></el-table-column>
        <el-table-column prop="Fe_Name" label="门店" align="center"></el-table-column>
        <el-table-column prop="Job_Name" label="职位" align="center"></el-table-column>
        <el-table-column prop="Em_Sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="Em_Phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="Em_StateName" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editEmpManager(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteEmpManager(scope.row,scope.$index,EmpManagerList)">删除
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
    <DeleteEmpManager ref="deleteEmpParam"></DeleteEmpManager>
  </div>
</template>

<script>
  import DeleteEmpManager from './DeleteEmpManager'
  import {EmployeeList, queryStoreList, CommonDictionaryTree} from '../../../config/Api.js';

  export default {
    data() {
      return {
        StateSelect: '',
        JobSelect: '',
        StoreSelect: '',
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
        JobSelectList: [],//职位
        StoreSelectList: [],//门店
        EmpManagerList: [],
        searchValue: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        Em_GUID: '',
      }
    },
    components: {
      DeleteEmpManager
    },
    created() {
      this.getEmpList(this.pageSize, this.currentPage);
      this.queryStoreList();
      this.queryLevelData();
    },
    methods: {
      //筛选排序
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getEmpList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getEmpList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      //查询所有下拉框数据
      queryLevelData() {
        let params = {
          CoCode: ["AM12"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AM12') {
              this.JobSelectList = resp.data.data[position].List;
            }
          }
        })
      },
      //查询分店名称
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.StoreSelectList = resp.data.data;
        })
      },
      //获取员工列表
      getEmpList(pageSize, currentPage) {
        let params={};
        if (this.StateSelect==='') {
           params = {
            pageSize: pageSize,
            pageIndex: currentPage,
            totle: 0,
            isAsc: true,
            Keyword: this.searchValue,
            Job: this.JobSelect,
            Fendians: this.StoreSelect,
          };
        }else{
           params = {
            pageSize: pageSize,
            pageIndex: currentPage,
            totle: 0,
            isAsc: true,
            Keyword: this.searchValue,
            State: this.StateSelect,
            Job: this.JobSelect,
            Fendians: this.StoreSelect,
          };
        }
        this.$http.post(EmployeeList, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let Sex = "";
          for (let n in resp.data.data) {
            if (resp.data.data[n].Em_Sex === "0") {
              Sex = "女";
            } else {
              Sex = "男";
            }
            resp.data.data[n]["Em_Sex"] = Sex;
            this.Em_GUID = resp.data.data[n].Em_GUID;
            list.push(resp.data.data[n]);
          }
          this.EmpManagerList = list;
          this.total = resp.data.count;
        })
      },
      //查询搜索条件
      searchEmpManager() {
        this.getEmpList(this.pageSize, this.currentPage);
      },
      //添加
      addEmpManager() {
        this.$router.push({name: 'addEmployeeManager', params: {Guid: this.Em_GUID}});
      },
      //编辑
      editEmpManager(row) {
        this.$router.push({name: 'editEmployeeManager', params: {Guid: row.Em_GUID}});
      },
      //删除
      deleteEmpManager(rows, index, data) {
        this.$store.state.deleteEmpManagerIsShow = true; //设置对话框显示
        this.$refs.deleteEmpParam.currentRows = rows;
        this.$refs.deleteEmpParam.currentIndex = index;
        this.$refs.deleteEmpParam.EmpManagerData = data;
      },
    },

    name: "EmployeListIndex"
  }
</script>

<style>
  .divEmpTable .cell a {
    color: blue;
  }
</style>
<style scoped>
  .divEmpTop {
    width: 98%;
    background-color: white;
    padding: 10px;
    float: left;
    margin-bottom: 10px;
  }
</style>
