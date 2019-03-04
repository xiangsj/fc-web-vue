<template>
  <div>
    <span @click="GiveClick">赠送</span>
    <div class="giveProjectDiv">
        <el-dialog title="赠送项目" :visible="this.$store.state.GiveProjectIsShow" width="30%" @opened="openGiveProjectDialog"
                 :before-close="handleClose">
        <div class="listDiv">
          <el-table :data="ListNewData" tooltip-effect="dark"
                    style="width: 100%;color: #3a3a3a;border: solid #cccccc 1px;"
                    highlight-current-row ref="ProjectDatas"
                    :header-cell-style="{background:'#f0f8ff'}" @selection-change="handleSelectionChange"
                    show-header align="center" height="250px">
            <el-table-column prop="Co_Code" label="项目编号" align="center" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.Co_Code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Co_Name" label="项目名" align="center"></el-table-column>
            <el-table-column prop="Pro_PIClassType" label="类别" align="center"></el-table-column>
            <el-table-column prop="It_Price" label="标注价" align="center"></el-table-column>
          </el-table>
        </div>
        <div style="padding-bottom: 10px;text-align: center;">
          <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addTransferCardClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {ItemTime} from '../../../config/Api.js';

  export default {
    data() {
      return {
        GiveProjectList: [],//列表list
        ListData: [],
        ListNewData:[],
        Card_GUID: '',
      }
    },
    created() {
    },
    props: ['CardGUID'],
    mounted() {
    },
    methods: {
      GiveClick() {
        console.log("点击======")
        this.$store.state.GiveProjectIsShow = true;
        this.queryList();
      },
      openGiveProjectDialog() {
        // console.log('CardGUID');
        // console.log(this.CardGUID);
        console.log('进2');
        console.log(this.CardGUID);
        this.ListNewData = this.GiveProjectList;
       //this.queryList();
      },
      queryList() {
        console.log('进33333');
        this.$http.post(ItemTime + this.CardGUID).then(resp => {
          if (resp.data.code === 0) {
            this.GiveProjectList = resp.data.data;
          }
        });
        console.log("================")
        console.log(this.GiveProjectList)
      },
      handleClose() {
        this.$store.state.GiveProjectIsShow = false;
       // this.GiveProjectList = [];
      },
      addTransferCardClick() {
        this.$store.state.GiveProjectIsShow = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    name: "GiveProjectDialog"
  }
</script>
<style>
  .giveProjectDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .giveProjectDiv .el-dialog {
    border-radius: 20px;
  }

  .giveProjectDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .giveProjectDiv .el-dialog__title {
    color: white;
  }

  .giveProjectDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .giveProjectDiv .el-button--default span {
    color: #8ccbff;
  }

  .giveProjectDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .giveProjectDiv .el-input__inner {
    height: 38px !important;
    font-size: 14px;
  }

  .giveProjectDiv .el-button {
    height: 38px;
  }

</style>
<style scoped>
  .listDiv {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
