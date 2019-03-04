<template>
  <div>
    <el-button @click="teg">卡级选择</el-button>
    <div>
      <el-dialog title="卡级选择" :visible.sync="dialogFormVisible" v-if="qwe">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="Ca_Name"
            label="卡级">
          </el-table-column>
          <el-table-column
            label="卡级价格">
            <template  slot-scope="scope">
              <el-input
                v-model="scope.row.ProF_CardPrice"
                placeholder="请输入卡级价格" disabled>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="卡级折扣">
            <template  slot-scope="scope">
              <el-input
                v-model="scope.row.ProF_CardDiscount"
                placeholder="请输入卡级折扣" disabled>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button icon="el-icon-circle-close-outline" @click="dialogFormVisible = false" style="margin-left: 15px">取
            消
          </el-button>
          <el-button
            type="button" icon="el-icon-circle-check-outline"
            @click="getCheckedNodeData()"
            style="margin-right: 17px">确 认
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {GetCard,GetCaed} from "../../../config/Api"
  export default {
    name: "DetaiProCard",
    props: [
      'parentMessage',
      'Proid'
    ],
    data(){
      return{
        dialogFormVisible:false,
        Ca_GUID:'',
        qwe:true,
        tadg:'',
        addProCard:{
          ProF_CardPrice:'',
          ProF_CardDiscount:'',
        },
        tableData: [],
      }
    },
    created(){

    },
    methods:{
      //批量设置
      reload(){
        this.qwe = false;
        this.$nextTick(function () {
          this.qwe = true;
        })
      },
      //点击触发
      teg(){
        this.dialogFormVisible = true;
        this.carded();
        this.getCard();
      },
      //获取卡级信息
      carded(){
        this.$http.get( GetCard + this.parentMessage).then(resp=>{
          this.tableData = resp.data.data;
          for (var i=0;i<this.tableData.length;i++){
            for (var j=0;j<this.tadg.length;j++) {
              if (this.tableData[i].Ca_GUID === this.tadg[j].Ca_GUID){
                this.tableData[i].ProF_CardPrice = this.tadg[j].ProF_CardPrice;
                this.tableData[i].ProF_CardDiscount = this.tadg[j].ProF_CardDiscount;
              }
            }
          }
        });
      },
      //请求卡级接口
      getCard(){
        if(this.Proid === undefined){
        }else {
          this.$http.post( GetCaed + this.Proid + '?fdid=' + this.parentMessage).then(resp=> {
            this.tadg = resp.data.data;
          });
          this.reload();
        }
      },
      //确定按钮
      getCheckedNodeData() {
        this.dialogFormVisible = false;
      },
    },
  }
</script>

<style scoped>

</style>
