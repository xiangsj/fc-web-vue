<template>
  <div style="width: 99%;height: 100%;margin: auto;">
    <div class="searchDiv">
      <el-input v-model="cardPhone" style="width: 15%;" :maxlength="18"
                placeholder="会员卡号/手机号"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="sellCards"
                 style="float: right;margin-right: 20px;">卖卡
      </el-button>
      <el-button type="primary" icon="el-icon-search" @click="searchCards"
                 style="float: right;margin-right: 20px;">查询
      </el-button>
    </div>
    <div class="listDiv">
      <el-table :data="CardsList" tooltip-effect="dark" style="width: 100%;color: #3a3a3a;"
                :header-cell-style="{background:'#f0f8ff'}"
                @selection-change="handleSelectionChange" show-header align="center" height="720px">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="会员信息" align="center" sortable>
          <template slot-scope="scope">
            <router-link :to="{name:'detailMemberShip',params:{meId:`${scope.row.Order_GUID}`}}">
              {{scope.row.Me_Name}}
            </router-link>
            <div>{{scope.row.Me_Phone}}</div>
            <div>会员编号:{{scope.row.Me_Code}}</div>
          </template>
        </el-table-column>
        <el-table-column label="订单号/买卡时间" align="center">
          <template slot-scope="scope">

            {{scope.row.Order_Code}}

            <div>{{scope.row.Orderr_PayDate}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Payt_Type" label="卡级" align="center"></el-table-column>
        <el-table-column prop="Project_IsUse" label="卖卡人员" align="center"></el-table-column>
        <el-table-column prop="Product_IsUse" label="消费金额" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editPayBtn(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="deletePay(scope.row,scope.$index,tablePayList)">退单
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pageDiv">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import {QueryCardsList} from '../../../config/Api.js';

  export default {
    data() {
      return {
        cardPhone: '',
        CardsList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      this.queryCards();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryCards(this.pageSize, this.currentPage);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryCards(this.pageSize, this.currentPage);
      },
      queryCards(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          Keyword: this.cardPhone,
          totle: 0,
          isAsc: true,
        };
        this.$http.post(QueryCardsList, this.$qs.stringify(params)).then(resp => {
          // let list = [];
          // let Sex = "";
          // for (let n in resp.data.data) {
          //   if (resp.data.data[n].Me_Sex === 0) {
          //     Sex = "女";
          //   } else {
          //     Sex = "男";
          //   }
          //   resp.data.data[n]["Me_Sex"] = Sex;
          //   list.push(resp.data.data[n]);
          // }
          this.CardsList = resp.data.data;
          this.total = resp.data.count;
        })
      },
      searchCards() {

      },
      sellCards() {
        // this.$router.push({name: 'editMemberShip', params: {Guid: row.Me_GUID}});
        this.$router.push({name: 'CardsAdd'});
      },
    },
    name: "CardHomeList"
  }
</script>

<style>
  .searchDiv .el-input__inner {
    height: 38px !important;
    font-size: 14px;
  }

  .searchDiv .el-button {
    height: 38px;
  }

</style>
<style scoped>
  .searchDiv {
    background: #ffffff;
    text-align: left;
    padding: 10px;
  }

  .listDiv {
    margin-top: 20px;
    background-color: #fff;
    color: #3a3a3a;
  }

  .pageDiv {
    text-align: right;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    padding-right: 20px;
    margin-top: 10px;
  }

</style>
