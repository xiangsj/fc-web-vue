<template>
  <div class="divMain">
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetEmpForm('AddEmpManagerForm')">重置
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitEmpMethod('AddEmpManagerForm')">保存
      </el-button>
    </div>
    <!--表格-->
    <div class="divAddEmpTable" >
      <el-form :model="AddEmpManagerForm" :rules="rules" ref="AddEmpManagerForm" status-icon :inline="true"
               label-position="top">
        <!--新增人员-->
        <div style="width: 100%;background-color: white">
          <h1
            style="float: left;width: 97.4%;text-align: left;background-color: white;height: 35px;padding-left: 10px;padding-top: 10px;">
            新增人员</h1>
          <!--1-->
          <div class="divAddEmp">
            <el-form-item style="padding-left: 60px;float: left">
              <Upload></Upload>
            </el-form-item>
            <div class="divAddItem" style="margin-left: 60px;">
              <el-form-item prop="Em_Name" style="display: block">
                <div class="HintName">员工姓名<a>*</a></div>
                <el-input v-model="AddEmpManagerForm.Em_Name" style="width: 278px;"
                          placeholder="请输入员工姓名"></el-input>
              </el-form-item>
              <el-form-item prop="Em_Level" style="display: block">
                <div class="HintName">员工级别<a>*</a></div>
                <el-select v-model="AddEmpManagerForm.Em_Level" placeholder="请选择级别" style="width: 278px;">
                  <el-option v-for="item in LevelList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="divAddItem">
              <el-form-item prop="Em_Sex" style="display: block">
                <div class="HintName">员工性别<a>*</a></div>
                <el-select v-model="AddEmpManagerForm.Em_Sex" placeholder="请选择性别" style="width: 278px;">
                  <el-option v-for="item in SexlList" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="De_GUID" style="display: block">
                <div class="HintName">归属部门<a>*</a></div>
                <el-select v-model="AddEmpManagerForm.De_GUID" placeholder="请选择部门" style="width: 278px;">
                  <el-option v-for="item in GuidlList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="divAddItem">
              <el-form-item prop="Em_IdCard" style="display: block">
                <div class="HintName">身份证号<a>*</a></div>
                <el-input v-model="AddEmpManagerForm.Em_IdCard" style="width: 278px;" :maxlength="18" size="small"
                          placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item prop="Fe_GUID" style="display: block">
                <div class="HintName">分店名称<a>*</a></div>
                <el-select v-model="AddEmpManagerForm.Fe_GUID" placeholder="请选择分店名称" style="width: 278px;">
                  <el-option v-for="item in FeNameList" :key="item.Fe_GUID" :label="item.Fe_Name"
                             :value="item.Fe_GUID"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="divAddItem">
              <el-form-item prop="Em_HelpReNo" style="display: block">
                <div class="HintName">员工助记号</div>
                <el-input v-model="AddEmpManagerForm.Em_HelpReNo" style="width: 278px;"
                          placeholder="请输入员工助记号"></el-input>
              </el-form-item>
            </div>
          </div>

        </div>
        <!--line-->

        <!--基本信息-->
        <div style="width: 100%;">
          <h1
            style="float: left;width: 97.4%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
            基本信息</h1>
          <div class="divAddEmp" style="padding-top: 15px;padding-left: 25px;width: 96.5%;">
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_WorkDate">
                <div class="HintName">到职日期<a>*</a></div>
                <el-date-picker v-model="AddEmpManagerForm.Em_WorkDate" type="date" style="width: 278px;"
                                placeholder="年-月-日">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="Em_HealthNo" style="display: block">
                <div class="HintName">健康证号</div>
                <el-input v-model="AddEmpManagerForm.Em_HealthNo" style="width: 278px;"
                          placeholder="请输入健康证号"></el-input>
              </el-form-item>
              <el-form-item prop="Em_HairItem" style="display: block">
                <div class="HintName">剪发项目</div>
                <el-select v-model="AddEmpManagerForm.Em_HairItem" placeholder="请选择项目" style="width: 278px;">
                  <el-option v-for="item in HairItemList" :key="item.Pro_Name" :label="item.Pro_Name"
                             :value="item.Pro_Name"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_Birthday">
                <div class="HintName">生日</div>
                <el-date-picker v-model="AddEmpManagerForm.Em_Birthday" type="date" style="width: 278px;"
                                placeholder="年-月-日">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="Em_HealthTrem">
                <div class="HintName">证件期限</div>
                <el-date-picker v-model="AddEmpManagerForm.Em_HealthTrem" type="date" style="width: 278px;"
                                placeholder="年-月-日">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="Em_Account" style="display: block">
                <div class="HintName">员工手机端登录账号</div>
                <el-input v-model="AddEmpManagerForm.Em_Account" style="width: 278px;"
                          placeholder="请输入员工手机端登录账号"></el-input>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_HireType" style="display: block">
                <div class="HintName">聘雇性质</div>
                <el-select v-model="AddEmpManagerForm.Em_HireType" placeholder="请选择聘雇性质" style="width: 278px;">
                  <el-option v-for="item in HairTypeList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Em_ArrivalFenTime">
                <div class="HintName">来店时间<a>*</a></div>
                <el-date-picker v-model="AddEmpManagerForm.Em_ArrivalFenTime" type="date" style="width: 278px;"
                                placeholder="年-月-日">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="Em_PassWord" style="display: block">
                <div class="HintName">员工手机端登录密码</div>
                <el-input v-model="AddEmpManagerForm.Em_PassWord" style="width: 278px;"
                          placeholder="请输入员工手机端登录密码"></el-input>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_Introducer" style="display: block">
                <div class="HintName">介绍人</div>
                <el-select v-model="AddEmpManagerForm.Em_Introducer" placeholder="请选择介绍人" style="width: 278px;">
                  <el-option v-for="item in IntroducerList" :key="item.Em_Name" :label="item.Em_Name"
                             :value="item.Em_Name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Em_Salary" style="display: block">
                <div class="HintName">基本工资</div>
                <el-input v-model="AddEmpManagerForm.Em_Salary" style="width: 278px;"
                          placeholder="请输入基本工资"></el-input>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_WeChatNo" style="display: block">
                <div class="HintName">员工微信号</div>
                <el-input v-model="AddEmpManagerForm.Em_WeChatNo"
                          style="width: 278px;" placeholder="请输入员工微信号"></el-input>
              </el-form-item>
              <el-form-item prop="Em_JobTitle" style="display: block">
                <div class="HintName">职称<a>*</a></div>
                <el-select v-model="AddEmpManagerForm.Em_JobTitle" placeholder="请选择职称" style="width: 278px;">
                  <el-option v-for="item in JobTitleList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

        </div>
        <!--line-->

        <!--其他信息-->
        <div style="width: 100%;">
          <h1
            style="float: left;width: 97.4%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
            其他信息</h1>
          <div class="divAddEmp" style="padding-top: 15px;padding-left: 25px;width: 96.5%;">
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_Stage" style="display: block">
                <div class="HintName">员工艺名</div>
                <el-input v-model="AddEmpManagerForm.Em_Stage" style="width: 278px;"
                          placeholder="请输入员工艺名"></el-input>
              </el-form-item>
              <el-form-item prop="Em_Address" style="display: block;margin-top: -10px;">
                <div class="HintName">联系地址</div>
                <el-input v-model="AddEmpManagerForm.Em_Address" style="width: 278px;"
                          placeholder="请输入联系地址"></el-input>
              </el-form-item>
              <el-form-item label="个人描述" prop="Em_PersonalStatement" style="display: block;margin-top: -25px;">
                <el-input v-model="AddEmpManagerForm.Em_PersonalStatement" type="textarea" :rows="3"
                          style="margin-top: -18px;width: 278px;"
                          placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_High" style="display: block">
                <div class="HintName">身高</div>
                <el-input v-model="AddEmpManagerForm.Em_High" style="width: 278px;"
                          placeholder="请输入身高"></el-input>
              </el-form-item>
              <el-form-item prop="Em_Email" style="display: block;margin-top: -10px;">
                <div class="HintName">E-mail</div>
                <el-input v-model="AddEmpManagerForm.Em_Email" style="width: 278px;"
                          placeholder="请输入员工邮箱"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="Em_Desc" style="display: block;margin-top: -25px;">
                <el-input v-model="AddEmpManagerForm.Em_Desc" type="textarea" :rows="3"
                          style="margin-top: -18px;width: 278px;"
                          placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_Height" style="display: block">
                <div class="HintName">体重</div>
                <el-input v-model="AddEmpManagerForm.Em_Height" style="width: 278px;"
                          placeholder="请输入体重"></el-input>
              </el-form-item>
              <el-form-item prop="Em_ManSignCode" style="margin-top: -10px;">
                <div class="HintName">经理签单</div>
                <div>
                  <el-radio prop="Em_IsManagerSign" v-model="AddEmpManagerForm.Em_IsManagerSign"
                            @click.native.prevent="onChangeValue"
                            label="1" style="float: left;margin-top: 14px;">授权
                  </el-radio>
                  <el-input v-model="AddEmpManagerForm.Em_ManSignCode" v-bind:disabled="disabledInput"
                            style="float: left;width: 200px;margin-left: 10px;"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="Em_IsReserve" style="margin-top: -10px;">
                <div class="HintName">是否可预约</div>
                <el-radio v-model="AddEmpManagerForm.Em_IsReserve" label="1">是</el-radio>
                <el-radio v-model="AddEmpManagerForm.Em_IsReserve" label="0">否</el-radio>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_Tel" style="display: block">
                <div class="HintName">家庭电话</div>
                <el-input v-model="AddEmpManagerForm.Em_Tel" style="width: 278px;"
                          placeholder="请输入家庭电话"></el-input>
              </el-form-item>
              <el-form-item prop="Em_Education" style="display: block;margin-top: -10px;">
                <div class="HintName">最高学历</div>
                <el-input v-model="AddEmpManagerForm.Em_Education" style="width: 278px;"
                          placeholder="请输入最高学历"></el-input>
              </el-form-item>
              <el-form-item prop="Em_IsPad" style="margin-top: -10px;">
                <div class="HintName">是否Pad接单</div>
                <el-radio v-model="AddEmpManagerForm.Em_IsPad" label="1">是</el-radio>
                <el-radio v-model="AddEmpManagerForm.Em_IsPad" label="0">否</el-radio>
              </el-form-item>
            </div>
            <div class="divBaseInfoItem">
              <el-form-item prop="Em_Phone" style="display: block">
                <div class="HintName">联系电话<a>*</a></div>
                <el-input v-model="AddEmpManagerForm.Em_Phone" style="width: 278px;" :maxlength="11" size="small"
                          placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item prop="Em_Business" style="margin-top: -5px;display: block">
                <div class="HintName">是否业务</div>
                <el-radio v-model="AddEmpManagerForm.Em_Business" label="1">是</el-radio>
                <el-radio v-model="AddEmpManagerForm.Em_Business" label="0">否</el-radio>
              </el-form-item>
              <el-form-item prop="State" style="margin-top: -20px;display: block">
                <div class="HintName">在职/离职<a>*</a></div>
                <el-select v-model="AddEmpManagerForm.State" placeholder="请选择员工状态" style="width: 278px;">
                  <el-option v-for="item in StateList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

        </div>

      </el-form>

    </div>

  </div>
</template>

<script>
  import Upload from '../../Upload'
  import {
    AddEmployeeList,
    CommonDictionaryTree,
    queryStoreList,
    QueryEmpList,
    QueryHairType
  } from "../../../config/Api.js"

  export default {
    data() {
      return {
        AddEmpManagerForm: {
          Em_Name: '',
          Em_Level: '',
          Em_Sex: '',
          De_GUID: '',
          Em_IdCard: '',
          Fe_GUID: '',
          Em_HelpReNo: '',
          Em_WorkDate: '',
          Em_HealthNo: '',
          Em_HairItem: '',
          Em_Birthday: '',
          Em_HealthTrem: '',
          Em_Account: '',
          Em_HireType: '',
          Em_ArrivalFenTime: '',
          Em_PassWord: '',
          Em_Introducer: '',
          Em_Salary: '',
          Em_JobTitle: '',
          Em_WeChatNo: '',
          Em_PersonalStatement: '',
          Em_Stage: '',
          Em_Address: '',
          Em_High: '',
          Em_Desc: '',
          Em_Email: '',
          Em_Height: '',
          Em_Education: '',
          Em_Tel: '',
          Em_Phone: '',
          Em_IsPad: '',
          Em_IsReserve: '',
          Em_Business: '',
          Em_IsManagerSign: '1',
          Em_ManSignCode: '',
          State: '',
        },
        LevelList: [],
        FeNameList: [],
        HairTypeList: [],
        StateList: [],
        IntroducerList: [],
        JobTitleList: [],
        SexlList: [
          {
            value: '0',
            label: '女',
          },
          {
            value: '1',
            label: '男',
          },
        ],
        GuidlList: [],
        HairItemList: [],
        List: '',
        rules: {
          Em_Name: [
            {required: true, message: '请输入单位名称', trigger: 'blur'},
          ],
          Em_Sex: [
            {required: true, message: '请选择员工性别', trigger: 'blur'},
          ],
          Em_Level: [
            {required: true, message: '请选择员工级别', trigger: 'blur'},
          ],
          De_GUID: [
            {required: true, message: '请选择归属部门', trigger: 'blur'},
          ],
          Fe_GUID: [
            {required: true, message: '请选择分店名称', trigger: 'blur'},
          ],
          Em_IdCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
          ],
          Em_Phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {min: 11, max: 11, message: '长度在11个字符', trigger: 'blur'}
          ],
          Em_WorkDate: [
            {required: true, message: '请选择年月日', trigger: 'blur'},
          ],
          Em_ArrivalFenTime: [
            {required: true, message: '请选择年月日', trigger: 'blur'},
          ],
          State: [
            {required: true, message: '请选择员工状态', trigger: 'blur'},
          ],
          Em_JobTitle: [
            {required: true, message: '请选择职称', trigger: 'blur'},
          ],
        },
        disabledInput: false,
      }
    },
    components: {
      Upload
    },
    created() {
      this.querySelectData();
      this.queryStoreList();
      this.queryIntroduceList();
      this.queryHairTypeList();
    },
    methods: {
      onChangeValue() {   //经理签单 0为否1为是
        if (this.AddEmpManagerForm.Em_IsManagerSign === "1") {
          this.AddEmpManagerForm.Em_IsManagerSign = "0";
          this.AddEmpManagerForm.Em_ManSignCode = '';
          this.disabledInput = true;
        } else {
          this.AddEmpManagerForm.Em_IsManagerSign = '1';
          this.disabledInput = false;
        }
      },
      //查询所有下拉框数据
      querySelectData() {
        let params = {
          CoCode: ["AN13", "AV21", "AM12", "BE30", "BG32"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AN13') {
              this.LevelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AV21') {
              this.GuidlList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AM12') {
              this.JobTitleList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BE30') {
              this.HairTypeList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BG32') {
              this.StateList = resp.data.data[position].List;
            }
          }
        })
      },
      //查询分店名称
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.FeNameList = resp.data.data;
        })
      },
      //查询介绍人信息
      queryIntroduceList() {
        this.$http.post(QueryEmpList).then(resp => {
          this.IntroducerList = resp.data.data;
        })
      },
      //查询剪发项目
      queryHairTypeList() {
        this.$http.post(QueryHairType + "2").then(resp => {
          this.HairItemList = resp.data.data;
        })
      },
      addEmpManagerMethod() {
        alert("Em_IsManagerSign=" + this.AddEmpManagerForm.Em_IsManagerSign);
        let param = {
          Em_Name: this.AddEmpManagerForm.Em_Name,
          Em_Stage: this.AddEmpManagerForm.Em_Stage,
          Em_Level: this.AddEmpManagerForm.Em_Level,
          De_GUID: this.AddEmpManagerForm.De_GUID,
          Fe_GUID: this.AddEmpManagerForm.Fe_GUID,
          Em_Sex: this.AddEmpManagerForm.Em_Sex,
          Em_Salary: this.AddEmpManagerForm.Em_Salary,
          Em_IdCard: this.AddEmpManagerForm.Em_IdCard,
          Em_Birthday: this.AddEmpManagerForm.Em_Birthday,
          Em_Tel: this.AddEmpManagerForm.Em_Tel,
          Em_Phone: this.AddEmpManagerForm.Em_Phone,
          Em_Address: this.AddEmpManagerForm.Em_Address,
          Em_ArrivalFenTime: this.AddEmpManagerForm.Em_ArrivalFenTime,
          Em_JobTitle: this.AddEmpManagerForm.Em_JobTitle,
          Em_WeChatNo: this.AddEmpManagerForm.Em_WeChatNo,
          Em_HelpReNo: this.AddEmpManagerForm.Em_HelpReNo,
          Em_Image: '',//员工头像
          Em_High: this.AddEmpManagerForm.Em_High,
          Em_Height: this.AddEmpManagerForm.Em_Height,
          Em_HealthNo: this.AddEmpManagerForm.Em_HealthNo,
          Em_HealthTrem: this.AddEmpManagerForm.Em_HealthTrem,
          Em_HireType: this.AddEmpManagerForm.Em_HireType,
          Em_Introducer: this.AddEmpManagerForm.Em_Introducer,
          Em_WorkDate: this.AddEmpManagerForm.Em_WorkDate,
          Em_IsReserve: this.AddEmpManagerForm.Em_IsReserve,
          Em_IsPad: this.AddEmpManagerForm.Em_IsPad,
          Em_Business: this.AddEmpManagerForm.Em_Business,
          State: this.AddEmpManagerForm.State,
          Em_HairItem: this.AddEmpManagerForm.Em_HairItem,
          Em_Education: this.AddEmpManagerForm.Em_Education,
          Em_Email: this.AddEmpManagerForm.Em_Email,
          Em_IsManagerSign: this.AddEmpManagerForm.Em_IsManagerSign,//经理签单 0为否1为是
          Em_ManSignCode: this.AddEmpManagerForm.Em_ManSignCode,//经理签单口令
          Em_Account: this.AddEmpManagerForm.Em_Account,
          Em_PassWord: this.AddEmpManagerForm.Em_PassWord,
          Em_PersonalStatement: this.AddEmpManagerForm.Em_PersonalStatement,
          Em_Desc: this.AddEmpManagerForm.Em_Desc,
        };
        this.$http.post(AddEmployeeList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        });
      },
      //提交表单
      submitEmpMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addEmpManagerMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetEmpForm(AddEmpManagerForm) {
        this.$refs[AddEmpManagerForm].resetFields();
      },
    },
    name: "AddEmpManager"
  }
</script>

<style>
  .divAddEmpTable .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .btnBox .el-button {
    height: 38px;
  }
</style>

<style scoped>
  .btnBox {
    width: 98%;
    text-align: end;
  }

  .divAddEmp {
    width: 98%;
    float: left;
    background-color: white;
    margin-top: -20px;
  }

  .HintName {
    color: #606266;
    font-size: 14px;
    line-height: 15px;
  }

  .HintName a {
    color: red;
  }

  .divAddItem {
    text-align: left;
    float: left;
    width: 18%;
    margin-left: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .divBaseInfoItem {
    text-align: left;
    float: left;
    width: 18%;
    margin-right: 20px;
  }

</style>
