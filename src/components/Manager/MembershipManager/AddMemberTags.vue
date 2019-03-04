<template>
  <div>
    <div class="divTitle">{{TotalTagsList.Co_Name}}</div>
    <div style="display: flex;align-items: center;flex-wrap: wrap">
      <TageView
        v-for="(item, index) in TotalTagsList.List"
        :key="item.Co_Values"
        :index="index"
        :tagName="item.Co_Name"
        :tagKey="item.Co_Values"
        :isSelect="item.isSelect"
        :checkDiasble="AddBtndisabled"
        v-on:deleteClickListener="deleteClickListener"
        v-on:selectChangeListener="selectChangeListener"
      ></TageView>

      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"
                ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="medium" @click="showInput" :disabled="AddBtndisabled">添加
      </el-button>
    </div>
  </div>
</template>

<script>
  import TageView from './TageView'

  export default {
    data() {
      return {
        inputValue: '',
        inputVisible: false,
        imgIsShow: false,
        AddBtndisabled: false,
    }
    },
    props: ['TotalTagsList', 'disabledVaule'],
    components: {
      TageView
    },
    mounted() {
      if (this.disabledVaule === true) {
        this.AddBtndisabled = true;
      }
    },
    methods: {
      //删除监听
      deleteClickListener(data) {
        this.TotalTagsList.List.splice(data, 1);
        this.updataData();
      },
      //选择监听
      selectChangeListener: function (index, data) {
        this.TotalTagsList.List[index].isSelect = data;
        this.updataData();
      },
      //拿出已经选中的值
      updataData: function () {
        this.selectValue = [];
        this.TotalTagsList.List.forEach(item => {
          if (item.isSelect) {
            this.selectValue.push(item);
          }
        });
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.TotalTagsList.List.push({'Co_Name': inputValue});
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    },
    name: "AddMemberTags"
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-tag {
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 10px;
    display: flex;
  }

  .divTitle {
    background-color: #b3d8ff;
    text-align: left;
    font-size: 15px;
    padding: 8px;
    margin: 15px 0 10px 0;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }

  .button-new-tag {
    margin: 5px;
  }

</style>
