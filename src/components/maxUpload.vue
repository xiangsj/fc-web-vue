<template>
  <div >
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :multiple = "true"
      :on-change="maximgs"
      :before-upload="beforeAvatar"
      :on-preview="handlePictureCard"
      :on-remove="handleRemov">
      <img src="../../static/images/upload.png">
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        action:'',
      }
    },
    methods:{
      handleRemov(file, fileList) {
      },
      handlePictureCard(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      maximgs(file){
        console.log(file);
        this.action = file.url;
      },

      beforeAvatar(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      }

    },
    name: "maxUpload"
  }
</script>
<style>

</style>
<style scoped>

</style>
