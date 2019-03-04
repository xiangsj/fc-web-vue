<template>
  <div class="addCardDiv">
    <el-dialog title="选择卡级" :visible="this.$store.state.SelectCardIsShow" width="30%"
               :before-close="handleClose">
      <div class="inputDiv">
        <a style="margin-left: 10px;">*</a>
        <el-input v-model="nameVaule" style="width: 40%;"
                  placeholder="卡名/编号"></el-input>
        <el-select v-model="Ca_Type" clearable placeholder="请选择类别"
                   style="width: 40%;;margin-left: 10px;">
          <el-option
            v-for="item in CourseTypeList"
            :key="item.Co_Values"
            :label="item.Co_Name"
            :value="item.Co_Values">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="queryList"></el-button>
      </div>
      <div class="listDiv">
        <el-table :data="SelectCardsList" tooltip-effect="dark"
                  style="width: 100%;color: #3a3a3a;border: solid #cccccc 1px;"
                  highlight-current-row ref="TableDatas"
                  :header-cell-style="{background:'#f0f8ff'}" @selection-change="handleSelectionChange"
                  show-header align="center" height="250px">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Ca_Code" label="卡编号" align="center" sortable></el-table-column>
          <el-table-column prop="Ca_Name" label="卡名" align="center"></el-table-column>
          <el-table-column prop="Ca_Type" label="类别" align="center"></el-table-column>
          <el-table-column prop="Ca_SalePrice" label="标注价" align="center"></el-table-column>
        </el-table>
      </div>
      <div style="padding-bottom: 10px;text-align: center;">
        <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addTransferCardClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {SelectCardsInfo, CommonDictionaryTree} from '../../../config/Api.js';

  export default {
    data() {
      return {
        nameVaule: '',
        Ca_Type: '',
        SelectCardsList: [],
        CourseTypeList: [],
      }
    },
    created() {
      this.selectCards();
      this.queryList();
    },
    methods: {
      selectCards() {
        let selected = {
          CoCode: ["BD29"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(selected)).then(resp => {

          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'BD29') {
              this.CourseTypeList = resp.data.data[position].List;
            }
          }
        })
      },
      handleClose() {
        this.commendMothed();
      },
      addTransferCardClick() {
        if (this.multipleSelection !== undefined) {
          this.$emit('selectCardsData', this.multipleSelection);
          console.log(this.multipleSelection);
        }
        this.commendMothed();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      commendMothed() {
        this.$store.state.SelectCardIsShow = false;
        this.nameVaule = '';
        this.Ca_Type = '';
      },
      queryList() {
        let param = {
          Keyword: this.nameVaule,
          Ca_Type: this.Ca_Type,
        };
        this.$http.post(SelectCardsInfo, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.SelectCardsList = resp.data.data;
          }
        });
      },
    },
    name: "SelectCardsDialog"
  }
</script>
<style>
  .inputDiv a {
    color: red;
  }

  .addCardDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .addCardDiv .el-dialog {
    border-radius: 20px;
  }

  .addCardDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .addCardDiv .el-dialog__title {
    color: white;
  }

  .addCardDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .addCardDiv .el-button--default span {
    color: #8ccbff;
  }

  .addCardDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .addCardDiv .el-input__inner {
    height: 38px !important;
    font-size: 14px;
  }

  .addCardDiv .el-button {
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
</style>
