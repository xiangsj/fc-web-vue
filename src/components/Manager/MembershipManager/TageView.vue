<template>
  <div class="divLayout" @mouseenter="mouseIn()" @mouseleave="mouseOut()">
    <i class="el-icon-error close-style" v-if="imgIsShow" @click="deleteClick"></i>
    <el-checkbox border :checked="isSelect" @change="checkChangeListener" :disabled=this.checkDiasble>{{tagName}}
    </el-checkbox>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgIsShow: false,
      };
    },
    mounted() {
      console.log(this);
    },
    methods: {
      mouseIn: function () {
        if (this.checkDiasble) {
          this.imgIsShow = false;
        } else {
          this.imgIsShow = true;
        }

      },
      mouseOut: function () {
        this.imgIsShow = false;
      },
      deleteClick: function () {
        this.$emit("deleteClickListener", this.index);
      },
      checkChangeListener: function (data) {
        this.$emit("selectChangeListener", this.index, data);
      }
    },
    props: ["tagName", "tagKey", "index", "isSelect", 'checkDiasble']
  };
</script>
<style>
  .divLayout .el-checkbox.is-bordered {
    height: 38px !important;
    display: flex;
    flex-wrap: wrap;
  }
</style>
<style>
  .divLayout {
    padding: 5px;
    width: auto;
    float: left;
    position: relative;
  }

  .close-style {
    position: absolute;
    top: -4px;
    right: -4px;
    z-index: 1;
    background: #fff;
  }
</style>
