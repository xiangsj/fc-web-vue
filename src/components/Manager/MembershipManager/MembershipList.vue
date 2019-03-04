<template>
  <div style="height: 100%;margin: auto;width: 99%;">
    <div class="divAdd">
      <el-button type="primary" style="margin-bottom: 10px;"
                 icon="el-icon-circle-plus-outline" @click="addMember">添加
      </el-button>
    </div>
    <AddMemberDialog ref="addCardParam" @AddMemberEmit="memberEmit" :MoreSubmit="true"></AddMemberDialog>
    <div class="divHead">
      <div style="position: absolute; z-index: 2;width: 100%;text-align: right;">
        <el-input v-model="searchValue" placeholder="姓名/会员号/联系电话" style="width: 200px;margin-top: 6px;"
                  @keyup.enter.native="searchKey" suffix-icon="el-icon-search"></el-input>
        <el-dropdown style="margin-right: 10px;">
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
      <div style="width: 100%;">
        <el-tabs type="border-card">
          <el-tab-pane label="会员信息">
            <div style="width: 100%;text-align: left;">
              <div>
                <span style="font-size: 12px;">顾客分类：</span>
                <el-radio-group v-model="CustomerClass" size="mini" @change="CardChange">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="0">持卡</el-radio-button>
                  <el-radio-button label="1">未持卡</el-radio-button>
                </el-radio-group>
              </div>
              <div style="margin-top: 5px;">
                <span style="font-size: 12px;">时间分类：</span>
                <el-radio-group v-model="TimeClass" size="mini" @change="TimeChange">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="1">超过一月未到店</el-radio-button>
                  <el-radio-button label="2">超过两月未到店</el-radio-button>
                  <el-radio-button label="3">超过三月未到店</el-radio-button>
                  <el-radio-button label="6">超过半年未到店</el-radio-button>
                </el-radio-group>
              </div>
              <div style="margin-top: 5px;">
                <span style="font-size: 12px;">近期生日：</span>
                <el-radio-group v-model="BirthClass" size="mini" @change="BirthChange">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="3">近三天过生日</el-radio-button>
                  <el-radio-button label="7">近一周过生日</el-radio-button>
                  <el-radio-button label="21">近三周过生日</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div style="width: 100%;text-align: left;" v-if="show">
              <div style="margin-top: 5px;">
                <span style="font-size: 12px;">到店频率：</span>
                <el-radio-group v-model="StoreFrequency" size="mini" @change="StoreFrequencyChange">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="1">1次以内/1月</el-radio-button>
                  <el-radio-button label="2">2次以内/1月</el-radio-button>
                  <el-radio-button label="3">3次以上/1月</el-radio-button>
                </el-radio-group>
              </div>
              <div style="margin-top: 5px;">
                <span style="font-size: 12px;">会员级别：</span>
                <el-radio-group v-model="MembershipLevel" size="mini" @change="LevelChange">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button v-for="item in LevelList" :key="item.Co_Name" :label="item.Co_Values">
                    {{item.Co_Name}}
                  </el-radio-button>
                </el-radio-group>
              </div>
              <div style="margin-top: 5px;">
                <span style="font-size: 12px;">客户来源：</span>
                <el-radio-group v-model="CustomerSource" size="mini" @change="SourceChange">
                  <el-radio label="">全部</el-radio>
                  <el-radio v-for="item in SourceList" :key="item.Co_Name" :label="item.Co_Values">{{item.Co_Name}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <el-button class="moreChage"
                       type="text" @click="MoreScreen">
              更多筛选<i class="el-icon-arrow-down el-icon--right" v-if="showImg"></i><i
              class="el-icon-arrow-up el-icon--right" v-if="show"></i>
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="managerTable">
      <el-table :data="MembershipList" tooltip-effect="dark" style="width: 100%;"
                :header-cell-style="{background:'#f0f8ff'}"
                @selection-change="handleSelectionChange" show-header align="center" height="100%">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="会员信息" align="center">
          <template slot-scope="scope">
            <router-link :to="{name:'detailMemberShip',params:{meId:`${scope.row.Me_GUID}`}}">
              {{scope.row.Me_Name}}
            </router-link>
            <div>{{scope.row.Me_Tel}}</div>
            <div>会员编号:{{scope.row.Me_Code}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Me_Code" label="会员卡" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.Fe_GName}}</div>
            <div>持卡{{scope.row.CardCount}}张</div>
          </template>
        </el-table-column>
        <el-table-column label="基本信息" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.Fe_GName}}</div>
            <div>性别:{{scope.row.Me_Sex}}</div>
            <div>生日:{{scope.row.Birthday}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Me_Address" label="上次消费" align="center">
          <template slot-scope="scope">
            <div>累积:￥{{scope.row.OrderPriceSum}}</div>
            <div>本月:{{scope.row.OrderCount}}次</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editMemberShip(scope.row)">编辑</el-button>
            <el-dropdown style="margin-right: 10px;" @command="handleCommand" trigger="click">
              <el-button type="text" size="small" @click="AddCard(scope.row,scope.$index,MembershipList)">更多
              </el-button>
              <el-dropdown-menu slot="dropdown" ref="MembershipList" style="margin-top: -2px">
                <el-dropdown-item command="开单"> 开单</el-dropdown-item>
                <el-dropdown-item command="补卡">补卡</el-dropdown-item>
                <el-dropdown-item command="删除">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;background-color: white;padding: 10px 10px 10px 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <PatchCard></PatchCard>
      <DelateCard ref="deleteCardParam"></DelateCard>
    </div>

  </div>
</template>

<script>
  import PatchCard from "./PatchCard"
  import DelateCard from "./DelateCard"
  import AddMemberDialog from "./AddMemberDialog"
  import {QueryManagerList, CommonDictionaryTree} from '../../../config/Api.js'

  export default {
    data() {
      return {
        MembershipList: [],
        searchValue: '',
        currentPage: 1,
        pageSize: 5,
        total: 0,
        CustomerClass: '',//是否持卡
        TimeClass: '',//时间分类
        BirthClass: '',//近期生日
        StoreFrequency: '',//到店频率
        MembershipLevel: '',//会员级别
        CustomerSource: '',//客户来源
        LevelList: [],
        SourceList: [],
        show: false,
        showImg: true,
        guid: '',
        index: '',
        data: [],
        rows: {},
      }
    },
    created() {
      this.getManagerList(this.pageSize, this.currentPage);
      this.queryListData();
    },
    components: {
      PatchCard, DelateCard, AddMemberDialog,
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getManagerList(this.pageSize, this.currentPage);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getManagerList(this.pageSize, this.currentPage);
      },
      queryListData() {
        let params = {
          CoCode: ["AF06", "AE05"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AF06') {
              this.LevelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AE05') {
              this.SourceList = resp.data.data[position].List;
            }
          }
        })
      },
      CardChange() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      TimeChange() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      BirthChange() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      StoreFrequencyChange() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      LevelChange() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      SourceChange() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      searchKey() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      //获取会员信息列表
      getManagerList(pageSize, currentPage) {
        let params = {
          isCard: this.CustomerClass,//是否持卡(0持卡/1不持卡)
          lastShop: this.TimeClass,//距最后一次消费时间
          RecentBirthday: this.BirthClass,//最近生日
          Me_SourceCode: this.CustomerSource,//客户来源
          Me_CustomerLevel: this.MembershipLevel,//客户级别
          OrderCount: this.StoreFrequency,//到店频率
          pageSize: pageSize,
          pageIndex: currentPage,
          Keyword: this.searchValue,
          totle: 0,
          isAsc: true,
        };
        this.$http.post(QueryManagerList, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let Sex = "";
          for (let n in resp.data.data) {
            if (resp.data.data[n].Me_Sex === 0) {
              Sex = "女";
            } else {
              Sex = "男";
            }
            resp.data.data[n]["Me_Sex"] = Sex;
            list.push(resp.data.data[n]);
          }
          this.MembershipList = list;
          this.total = resp.data.count;
        })
      },
      //添加按钮
      addMember() {
        this.$store.state.addMemberIsShow = true;
      },
      memberEmit() {
        this.getManagerList(this.pageSize, this.currentPage);
      },
      //编辑
      editMemberShip(row) {
        this.$router.push({name: 'editMemberShip', params: {Guid: row.Me_GUID}});
      },
      //点击每列
      AddCard(rows, index, data) {
        this.guid = rows.Me_GUID;
        this.data = data;
        this.index = index;
        this.rows = rows;
      },
      //下拉菜单操作
      handleCommand(command) {
        if (command === "补卡") {
          this.$store.state.MeGuid = this.guid;
          this.$store.state.patchCard = true;
        } else if (command === "删除") {
          this.$store.state.deleteMemberCard = true;
          this.$refs.deleteCardParam.currentRows = this.rows;
          this.$refs.deleteCardParam.currentIndex = this.index;
          this.$refs.deleteCardParam.deleteData = this.data;
          this.$refs.deleteCardParam.MeGuid = this.guid;
        }
      },
      MoreScreen() {
        this.show = !this.show;
        this.showImg = !this.showImg;
      },
    },
    name: "MembershipList"
  }
</script>

<style>
  .divHead .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .divHead .el-input__icon {
    line-height: 30px;
  }

  .divAdd .el-button {
    height: 38px;
  }

  .managerTable .cell a {
    color: blue;
  }
</style>

<style scoped>
  .divAdd {
    width: 99%;
    text-align: right;
  }

  .divHead {
    position: relative;
    height: auto;
  }

  .managerTable {
    margin-top: 15px;
    height: 60.5%;
  }

  .moreChage {
    text-align: right;
    width: 100%;
    margin-top: -10px;
  }
</style>
