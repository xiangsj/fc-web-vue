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
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.ProF_CardPrice"
                placeholder="请输入卡级价格">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="卡级折扣">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.ProF_CardDiscount"
                placeholder="请输入卡级折扣">
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
  import {GetCard, GetCaed} from "../../../config/Api"

  export default {
    name: "AddProCard",
    props: [
      'parentMessage',
      'Proid',
      'AddOrUpdata',
      'submitSuccess',
    ],
    data() {
      return {
        dialogFormVisible: false,
        Ca_GUID: '',
        qwe: true,
        tadg: [],
        addProCard: {
          ProF_CardPrice: '',
          ProF_CardDiscount: '',
        },
        tableData: [],
        ProFCardPrice: '',
        ProFCardDiscount: '',
        TwoData: [],
      }
    },
    created() {
    },
    methods: {
      //批量设置
      reload() {
        this.qwe = false;
        this.$nextTick(function () {
          this.qwe = true;
        })
      },
      //点击触发
      teg() {
        this.dialogFormVisible = true;
        if (this.AddOrUpdata === 'AddCardPrice') {
          this.carded();
        } else if (this.AddOrUpdata === 'UpdataCardPrice') {
          this.getCard();
        }
      },

      //获取卡级信息 ==新增
      carded() {
        if (this.parentMessage === undefined) {
        } else {
          this.$http.get(GetCard + this.parentMessage).then(resp => {
            this.tableData = resp.data.data;
            if (this.submitSuccess !== 'Success') {
              if(this.TwoData.length>0){
                this.tableData = this.TwoData;
                for (let i = 0; i < this.TwoData.length; i++) {
                  this.tableData[i].ProF_CardPrice = this.TwoData[i].ProF_CardPrice;
                  this.tableData[i].ProF_CardDiscount = this.TwoData[i].ProF_CardDiscount;
                }
              }
            }
          });
        }
      },
      //请求卡级接口          ==修改
      getCard() {
        if (this.Proid !== undefined) {
          this.$http.post(GetCaed + this.Proid + '?fdid=' + this.parentMessage).then(resp => {
            this.tableData=[];
            this.tableData = resp.data.data;
            if (this.submitSuccess !== 'Success') {
              if(this.TwoData.length>0){
                this.tableData = this.TwoData;
                for (let i = 0; i < this.TwoData.length; i++) {
                  this.tableData[i].ProF_CardPrice = this.TwoData[i].ProF_CardPrice;
                  this.tableData[i].ProF_CardDiscount = this.TwoData[i].ProF_CardDiscount;
                }
              }
            }
          });
          this.reload();
        }
      },
      //确定按钮
      getCheckedNodeData() {
        this.dialogFormVisible = false;
        if (this.tableData.length > 0) {
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].parentMessage = this.parentMessage;
          }
          this.TwoData = this.tableData;
          this.$emit('AddProCard', this.tableData);
        }
      },
    },
  }
</script>

<style scoped>

</style>
