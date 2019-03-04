<template>
    <div class="contentBox">
      <div class="operationBox">
        <div class="filter">
          <el-input v-model="searchValue" clearable placeholder="卡级名称/编号" style="height: 40px; width: 150px;">
          </el-input>
          <el-select v-model="Co_Type" @change="selectd" clearable placeholder="请选择卡级别" style="height: 40px;width: 150px;margin-left: 20px;">
            <el-option
              v-for="item in Co_CourseType"
              :key="item.Co_Values"
              :label="item.Co_Name"
              :value="item.Co_Values">
            </el-option>
          </el-select>
          <el-select v-model="Ca_CourseTypeVal" v-show="selected" clearable placeholder="请选择疗程卡类别" style="height: 40px;width: 200px;margin-left: 20px;">
            <el-option
              v-for="item in options"
              :key="item.Co_Values"
              :label="item.Co_Name"
              :value="item.Co_Values">
            </el-option>
          </el-select>

      <div class="operationBtnBox">
    <el-button type="primary" style="margin-right: 20px" icon="el-icon-search" @click=" searchRoomValue">
      查询
    </el-button>
    <el-button type="primary" @click="addCard" style="margin-right: 20px" icon="el-icon-circle-plus-outline">添加
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
    <div class="tableBox">
      <el-table
        :data="CardArray"
        tooltip-effect="dark"
        style="width: 100%;color: #3a3a3a;"
        :header-cell-style="{background:'#f0f8ff'}"
        show-header align="center" height="720px"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="Ca_Code" label="卡级编号" sortable width="180">
          <template slot-scope="scope">
            <router-link :to="{name:'detaiCard',params:{CaId:`${scope.row.Ca_GUID}`}}">
              {{scope.row.Ca_Code}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="Ca_Name" label="卡级名称" width="180"></el-table-column>
        <el-table-column prop="Ca_Type" label="类别" align="center"></el-table-column>
        <el-table-column prop="Ca_CourseType" label="疗程卡类别" align="center"></el-table-column>
        <el-table-column prop="Ca_Term" label="有效期" align="center"></el-table-column>
        <el-table-column prop="State" label="状态"  show-overflow-tooltip align="center"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateCard(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="EditCard(scope.row,scope.$index,CardArray)">删除
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
      <DeletCard ref="deleteCard"></DeletCard>
    </div>
      </div>
    </div>


</template>

<script>
  import {CardClassAPI} from "../../../config/Api"
  import {CommonDictionaryTree} from "../../../config/Api"
  import DeletCard from "./DeletCard"


    export default {
      components:{
        DeletCard,
      },
    data(){
      return{
        Ca_Code:'',
        Ca_Term:'',
        total:0,
        Ca_terms:{},
        currentPage: 1,
        pageSize: 10,
        CardArray:[],
        selected:false,
        options:[],//疗程卡类别
        Co_CourseType:[],//卡级类别
        searchValue:'',
        Ca_Name:'',
        Ca_Type:'',
        Ca_CourseTypeVal:'',
        Ca_GUID:'',
        Co_Type:'',
      }
    },
      created(){
        this.CardIndex(this.pageSize,this.currentPage);
        this.select();
      },
      methods:{
        //疗程卡框显示
        selectd(val){

          if(val === 'BD001'){
            this.selected = false;
          }
          else if(val === 'BD002'){
            this.selected = true;
          }
          else if(val === 'BD003'){
            this.selected = false;
          }
        },
        //获取下拉列表框
        select() {
          let selected = {
            CoCode: ["BD29", "AD04"],
          };
          this.$http.post(CommonDictionaryTree,this.$qs.stringify(selected)).then(resp=>{

            for (let position in resp.data.data) {
              if (resp.data.data[position].Co_Code === 'BD29') {
                this.Co_CourseType = resp.data.data[position].List;
              } else if (resp.data.data[position].Co_Code === 'AD04') {
                this.options = resp.data.data[position].List;
              }
            }
          })
        },
        //分页
        handleSizeChange(val) {
          this.pageSize = val;
          this.getConfigTreeList(this.pageSize, this.currentPage);
          console.log(`每页 ${val} 条`);
        },
        //分页
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getConfigTreeList(this.pageSize, this.currentPage);
          console.log(`当前页: ${val}`);
        },
        //搜索框
        searchRoomValue() {
          this.CardIndex(this.pageSize, this.currentPage);
        },
        //删除
        EditCard(rows, index, data) {
          this.$store.state.deleteCard = true; //设置对话框显示
          this.$refs.deleteCard.currentRows = rows;
          this.$refs.deleteCard.currentIndex = index;
          this.$refs.deleteCard.CardData = data;
        },
        //添加页面
        addCard(){
          this.$router.push({name:"AddCard"});
        },
        //编辑页面
        updateCard(row) {
          this.$router.push({name: 'UpdateCard', params: {Guid: row.Ca_GUID}});
        },
        CardIndex(pageSize,currentPage){
          let params = {
            pageSize: pageSize,
            pageIndex: currentPage,
            isAsc: false,
            Keyword: this.searchValue,
            Ca_CourseType:this.Ca_CourseTypeVal,//疗程卡类型
            Ca_Type:this.Co_Type,
          };

          //获取接口数据
          this.$http.post(CardClassAPI,this.$qs.stringify(params)).then(resp=>{
            this.CardArray = resp.data.data;
            for(let i =0;i<this.CardArray.length;i++){
              this.CardArray[i].Ca_Term = this.CardArray[i].Ca_Term +''+this.CardArray[i].Ca_TermUnit;
            }
            for(var i= 0;i<this.CardArray.length;i++){
              if(this.CardArray[i].State ===1){
                this.CardArray[i].State = "无效"
              }else {
                this.CardArray[i].State = "正常"
              }
              // resp.data.data[i]["State"] = State; //状态
              this.Ca_Guid = resp.data.data[i].Ca_Guid;
            }
            this.total = resp.data.count;
          })
        },
      },

        name: "CardIndex"
    }
</script>

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
