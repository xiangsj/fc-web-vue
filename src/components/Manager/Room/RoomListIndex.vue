<template>
  <div style="margin: auto;width: 99%;height: 100%;">
    <div class="divRoomHead">
      <el-input v-model="searchValue" placeholder="编号/名称" style="width: 200px; "></el-input>
      <el-button type="primary" icon="el-icon-search" @click=" searchRoomVaule">
        查询
      </el-button>

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
                 @click="addRoomClick">添加
      </el-button>
    </div>

    <div class="divRoom">
      <el-table :data="RoomList" tooltip-effect="dark" style="width: 100%;"
                :header-cell-style="{background:'#f0f8ff'}"
                @selection-change="handleSelectionChange" show-header align="center" height="100%">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="Ro_Code" label="房间编号">
          <template slot-scope="scope">
            <router-link :to="{name:'detailRoom',params:{payId:`${scope.row.Ro_GUID}`}}">
              {{scope.row.Ro_Code}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="Ro_Name" label="房间名称"></el-table-column>
        <el-table-column prop="Fe_Name" label="所属门店" align="center"></el-table-column>
        <el-table-column prop="Ro_Number" label="床位数" align="center"></el-table-column>
        <el-table-column prop="State" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRoomBtn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRoom(scope.row,scope.$index,RoomList)">删除
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
    <DeleteRoom ref="deleteRoomParam"></DeleteRoom>

  </div>
</template>

<script>
  import DeleteRoom from './DeleteRoom'
  import {RoomList} from "../../../config/Api.js"

  export default {
    data() {
      return {
        searchValue: '',
        RoomList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        Ro_GUID: '',
      }
    },
    components: {
      DeleteRoom
    },
    created() {
      this.getRoomList(this.pageSize, this.currentPage);
    },
    methods: {
      //筛选排序
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getRoomList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRoomList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      //获取房间列表
      getRoomList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Keyword: this.searchValue
        };
        this.$http.post(RoomList, this.$qs.stringify(params)).then(resp => {
          let list = [];
          let State = "";
          for (let n in resp.data.data) {
            if (resp.data.data[n].State === 0) {
              State = "正常";
            } else {
              State = "无效";
            }
            resp.data.data[n]["State"] = State; //状态
            this.Ro_GUID = resp.data.data[n].Ro_GUID;
            list.push(resp.data.data[n]);
          }
          this.RoomList = list;
          this.total = resp.data.count;
        })
      },
      //搜索框
      searchRoomVaule() {
        this.getRoomList(this.pageSize, this.currentPage);
      },
      //添加按钮
      addRoomClick() {
        this.$router.push({name: 'addRoom'});
      },
      //编辑
      editRoomBtn(row) {
        this.$router.push({name: 'editRoom', params: {Guid: row.Ro_GUID}});
      },
      //删除
      deleteRoom(rows, index, data) {
        this.$store.state.deleteRoomIsShow = true; //设置对话框显示
        this.$refs.deleteRoomParam.currentRows = rows;
        this.$refs.deleteRoomParam.currentIndex = index;
        this.$refs.deleteRoomParam.roomData = data;
      },
    },
    name: "RoomListIndex"
  }
</script>

<style>
  .divRoom .cell a {
    color: blue;
  }
</style>
<style scoped>
  .divRoomHead {
    width: 99%;
    background-color: white;
    padding: 10px;
    text-align: left;
    margin-bottom: 10px;
  }

  .divRoom {
    height: 84%;
  }
</style>
