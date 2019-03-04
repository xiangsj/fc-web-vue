                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <template>
  <div class="CardStaffDiv">
    <el-dialog opened="opened" title="售卡人员" :visible="this.$store.state.CardSaleStaffIsShow" width="30%"
               :before-close="handleClose">
      <div class="inputDiv">
        <el-input v-model="nameCode" style="width: 40%;"
                  placeholder="姓名/编号"></el-input>
        <el-select v-model="JobSelect" placeholder="请选择职位" style="width: 40%;;margin-left: 10px;" clearable>
          <el-option v-for="item in JobSelectList" :key="item.Co_Values" :label="item.Co_Name"
                     :value="item.Co_Values"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="queryLevel"></el-button>
      </div>
      <div class="listDiv">
        <el-table :data="CardStaffList" tooltip-effect="dark"
                  style="width: 100%;color: #3a3a3a;border: solid #cccccc 1px;" ref="CardStaffRef"
                  :header-cell-style="{background:'#f0f8ff'}" @selection-change="handleSelectionChange"
                  show-header align="center" height="250px">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Em_Code" label="员工编号" align="center" sortable></el-table-column>
          <el-table-column prop="Em_Name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="Em_Sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="Job_Name" label="职位" align="center"></el-table-column>
        </el-table>
        <div class="footDiv">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-sizes="[30, 60, 90, 120]" :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div style="padding-bottom: 10px;text-align: center;">
        <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addCardStaffClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {EmployeeList, CommonDictionaryTree} from '../../../config/Api.js';

  export default {
    data() {
      return {
        nameCode: '',
        JobSelect: '',
        CardStaffList: [],
        JobSelectList: [],
        currentPage: 1,
        pageSize: 30,
        total: 0,
        CardStaffData: [],
      }
    },
    created() {
      this.selectCards();
      this.queryLevelList();
    },
    methods: {
      selectCards() {
        let selected = {
          CoCode: ["AM12"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(selected)).then(resp => {

          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AM12') {
              this.JobSelectList = resp.data.data[position].List;
            }
          }
        })
      },
      handleClose() {
        this.totalClearData();
      },
      opened(){
        console.log("opened")
        console.log(this.CardListData.Ca_GUID)
      },
      addCardStaffClick() {
        this.$emit('CardStaffData', this.CardStaffData);
        this.totalClearData();

        console.log("dialog========")
        console.log(this)
      },
      totalClearData() {
        this.$store.state.CardSaleStaffIsShow = false;
        this.nameCode = '';
        this.JobSelect = '';
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.CardStaffData = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.CardStaffData.push({
            Em_Name: this.multipleSelection[i].Em_Name,
            Em_GUID: this.multipleSelection[i].Em_GUID
          });
        }
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryLevelList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryLevelList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      queryLevel() {
        this.queryLevelList(this.pageSize, this.currentPage);
      },
      queryLevelList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Keyword: this.nameCode,
          State: '',
          Job: this.JobSelect,
          Fendians: '',
        };
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
            list.push(resp.data.data[n]);
          }
          this.CardStaffList = list;
          this.total = resp.data.count;
        })
      },
    },
    name: "CardSaleStaffDialog"
  }
</script>
<style>
  .CardStaffDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .CardStaffDiv .el-dialog {
    border-radius: 20px;
  }

  .CardStaffDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .CardStaffDiv .el-dialog__title {
    color: white;
  }

  .CardStaffDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .CardStaffDiv .el-button--default span {
    color: #8ccbff;
  }

  .CardStaffDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .CardStaffDiv .el-input__inner {
    height: 38px !important;
    font-size: 14px;
  }

  .footDiv .el-input__inner {
    height: 30px !important;
    font-size: 14px;
  }

  .CardStaffDiv .el-button {
    height: 38px;
  }

</style>
<style scoped>
  .inputDiv {
    width: 100%;
  }

  .listDiv {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .footDiv {
    text-align: right;
    background-color: white;
    padding: 10px 10px 10px 20px;
  }

</style>
