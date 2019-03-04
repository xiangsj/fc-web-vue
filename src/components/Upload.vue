<template>
    <div >
      <el-upload
        action=""
        :auto-upload="false"
        :multiple = "false"
        list-type="picture-card"
        :class="{hide:hideUpload}"
        :on-change="maximg"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
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
          hideUpload: false,
          dialogImageUrl: '',
          dialogVisible: false,
          fileList: [],

        }
      },
      methods:{
        handleRemove(file, fileList) {
          this.hideUpload = fileList.length >= 1;
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        maximg(file,fileList){
          this.hideUpload = fileList.length >= 1;
        },

          beforeAvatarUpload(file) {
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
        name: "Upload"
    }
</script>
<style>
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
<style scoped>

</style>
