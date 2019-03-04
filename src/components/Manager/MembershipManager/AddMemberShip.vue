<template>
  <div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="会员信息">
          <div class="addMemberShipTable">
            <div class="btnBox">
              <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetMember('AddMemberForm')">
                重置
              </el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitMember('AddMemberForm')">保存
              </el-button>
            </div>
            <el-form :model="AddMemberForm" :rules="rules" ref="AddMemberForm" status-icon :inline="true"
                     label-position="top">
              <!--新增会员-->
              <div style="width: 100%;background-color: white">
                <h1
                  style="float: left;width: 100%;text-align: left;background-color: white;height: 40px;padding-left: 10px;padding-top: 10px;">
                  新增会员</h1>
                <!--1-->
                <div class="divAddManager">
                  <el-form-item style="padding-left: 70px;float: left">
                    <Upload></Upload>
                  </el-form-item>
                  <div class="divAddItem" style="margin-left: 70px;">
                    <el-form-item prop="Me_Name" style="display: block">
                      <div class="HintName">会员名称<a>*</a></div>
                      <el-input v-model="AddMemberForm.Me_Name"
                                placeholder="请输入会员名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IdCard" style="display: block">
                      <div class="HintName">身份证号<a>*</a></div>
                      <el-input v-model="AddMemberForm.Me_IdCard"
                                placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Me_Sex" style="display: block">
                      <div class="HintName">会员性别<a>*</a></div>
                      <el-select v-model="AddMemberForm.Me_Sex" placeholder="请选择性别">
                        <el-option v-for="item in SexlList" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_Level" style="display: block">
                      <div class="HintName">卡类别</div>
                      <el-select v-model="AddMemberForm.Em_Level" placeholder="请选择类别">
                        <el-option v-for="item in CardList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Me_Birthday" style="display: block">
                      <div class="HintName">生日<a>*</a></div>
                      <el-date-picker v-model="AddMemberForm.Me_Birthday" type="date"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="Em_HelpReNo" style="display: block">
                      <div class="HintName">会员卡号</div>
                      <el-input v-model="AddMemberForm.Em_HelpReNo"
                                placeholder="请输入会员卡号"></el-input>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <!--line-->
              <img src="../../../../static/images/line.png" style="width: 96%;"/>
              <!--基本信息-->
              <div style="width: 100%;margin-top: 20px;">
                <h1
                  style="float: left;width: 100%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
                  基本信息</h1>
                <div class="divAddManager" style="padding-top: 15px;padding-left: 25px;width:100%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_WeChat" style="display: block">
                      <div class="HintName">微信号</div>
                      <el-input v-model="AddMemberForm.Me_WeChat" style="width: 193px;"
                                placeholder="请输入微信号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Tel" style="display: block">
                      <div class="HintName">电话<a>*</a></div>
                      <el-input v-model="AddMemberForm.Me_Tel" style="width: 193px;"
                                placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IsSendMessage" style="margin-top: -10px;">
                      <div class="HintName">是否发送短信消费提醒通知</div>
                      <el-radio v-model="AddMemberForm.Me_IsSendMessage" label="1">是</el-radio>
                      <el-radio v-model="AddMemberForm.Me_IsSendMessage" label="0">否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Designer" style="display: block">
                      <div class="HintName">专服设计师</div>
                      <el-select v-model="AddMemberForm.Me_Designer" placeholder="请选择设计师">
                        <el-option v-for="item in DesignerList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_Sequence" style="display: block">
                      <div class="HintName">本店序号</div>
                      <el-input v-model="AddMemberForm.Me_Sequence" style="width: 193px;"
                                placeholder="请输入本店序号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IsGroupSendMessage" style="margin-top: -10px;">
                      <div class="HintName">是否发送群消息通知</div>
                      <el-radio v-model="AddMemberForm.Me_IsGroupSendMessage" label="1">是</el-radio>
                      <el-radio v-model="AddMemberForm.Me_IsGroupSendMessage" label="0">否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Beautician" style="display: block">
                      <div class="HintName">专服美容师</div>
                      <el-select v-model="AddMemberForm.Me_Beautician" placeholder="请选择美容师">
                        <el-option v-for="item in BeautyList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_GUID" style="display: block">
                      <div class="HintName">推荐人</div>
                      <el-select v-model="AddMemberForm.Em_GUID" placeholder="请选择推荐人">
                        <el-option v-for="item in RecommendList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_IsWeiXin" style="margin-top: -10px;">
                      <div class="HintName">微信绑定</div>
                      <el-radio v-model="AddMemberForm.Me_IsWeiXin" label="1">是</el-radio>
                      <el-radio v-model="AddMemberForm.Me_IsWeiXin" label="0">否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Consultant" style="display: block">
                      <div class="HintName">专服顾问</div>
                      <el-select v-model="AddMemberForm.Me_Consultant" placeholder="请选择顾问">
                        <el-option v-for="item in AdviserList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_SourceCode" style="display: block">
                      <div class="HintName">渠道来源<a>*</a></div>
                      <el-select v-model="AddMemberForm.Me_SourceCode" placeholder="请选择渠道来源">
                        <el-option v-for="item in ChannelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_CustomerLevel" style="display: block">
                      <div class="HintName">客户等级</div>
                      <el-select v-model="AddMemberForm.Me_CustomerLevel" placeholder="请选择客户等级">
                        <el-option v-for="item in LevelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Fe_GUID" style="display: block">
                      <div class="HintName">所属门店<a>*</a></div>
                      <el-select v-model="AddMemberForm.Fe_GUID" placeholder="请选择门店">
                        <el-option v-for="item in StoreList" :key="item.Fe_GUID" :label="item.Fe_Name"
                                   :value="item.Fe_GUID"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <img src="../../../../static/images/line.png" style="width: 96%;"/>
              <!--其他信息-->
              <div style="width: 100%;margin-top: 20px;">
                <h1
                  style="float: left;width: 97.4%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
                  其他信息</h1>
                <div class="divAddManager" style="padding-top: 15px;padding-left: 25px;width: 96.5%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_High" style="display: block">
                      <div class="HintName">身高</div>
                      <el-input v-model="AddMemberForm.Me_High" style="width: 193px;"
                                placeholder="请输入身高"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_QQ" style="display: block;margin-top: -10px;">
                      <div class="HintName">QQ号</div>
                      <el-input v-model="AddMemberForm.Me_QQ" style="width: 193px;"
                                placeholder="请输入QQ号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Height" style="display: block">
                      <div class="HintName">体重</div>
                      <el-input v-model="AddMemberForm.Me_Height" style="width: 193px;"
                                placeholder="请输入体重"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Job" style="display: block;margin-top: -10px;">
                      <div class="HintName">职业</div>
                      <el-input v-model="AddMemberForm.Me_Job" style="width: 193px;"
                                placeholder="请输入职业"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Address" style="display: block">
                      <div class="HintName">地址</div>
                      <el-input v-model="AddMemberForm.Me_Address" style="width: 193px;"
                                placeholder="请输入地址"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Email" style="display: block">
                      <div class="HintName">E-mail</div>
                      <el-input v-model="AddMemberForm.Me_Email" style="width: 193px;"
                                placeholder="请输入会员邮箱"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Company">
                      <div class="HintName">工作单位</div>
                      <el-input v-model="AddMemberForm.Me_Company" style="width: 193px;"
                                placeholder="请输入工作单位"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>

          </div>

        </el-tab-pane>
        <el-tab-pane label="会员标签">
          <div>
            <div class="btnBox" style="margin-bottom: 30px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitTags">保存
              </el-button>
            </div>
            <div v-for="(item,index) in AllTagsList" :key="index"
                 style="width: 100%;float:left;display: flex;flex-wrap: wrap;flex-direction: column;">
              <AddMemberTags :TotalTagsList="item"></AddMemberTags>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import Upload from '../../Upload'
  import AddMemberTags from './AddMemberTags'
  import {CommonDictionaryTree, QueryEmpList, queryStoreList, AddManagerShip, AddSkinTags} from '../../../config/Api.js'

  export default {
    data() {
      return {
        AddMemberForm: {
          Me_Name: '',
          Me_Birthday: '',
          Me_Sex: '',
          Me_WeChat: '',
          Me_Tel: '',
          Me_IsSendMessage: '',
          Me_IsGroupSendMessage: '',
          Me_IsWeiXin: '',
          Me_CustomerLevel: '',
          Me_Consultant: '',
          Me_Beautician: '',
          Me_Designer: '',
          Fe_GUID: '',
          Me_SourceCode: '',
          Em_GUID: '',
          Me_Sequence: '',
          Me_High: '',
          Me_QQ: '',
          Me_Height: '',
          Me_Job: '',
          Me_Company: '',
          Me_Address: '',
          Me_Email: '',
          Me_IdCard: '',
        },
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
        MemberStateList: [
          {
            value: '0',
            label: '无效',
          },
          {
            value: '1',
            label: '正常',
          },
        ],
        CardList: [],
        DesignerList: [],
        BeautyList: [],
        RecommendList: [],
        AdviserList: [],
        ChannelList: [],
        LevelList: [],
        StoreList: [],
        AllTagsList: [],
        TagsList: [],
        rules: {
          Me_Name: [
            {required: true, message: '请输入会员名称', trigger: 'blur'},
          ],
          Me_Sex: [
            {required: true, message: '请选择会员性别', trigger: 'blur'},
          ],
          Me_SourceCode: [
            {required: true, message: '请选择渠道来源', trigger: 'blur'},
          ],
          Fe_GUID: [
            {required: true, message: '请选择门店', trigger: 'blur'},
          ],
          Me_Tel: [
            {required: true, message: '请输入电话', trigger: 'blur'},
          ],
          Me_IdCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
          ],
          Me_Birthday: [
            {required: true, message: '请输入生日', trigger: 'blur'},
          ],
        },
      }
    },
    created() {
      this.querySelectData();
      this.queryRecommendListt();
      this.queryStoreList();
    },
    components: {
      Upload, AddMemberTags
    },
    methods: {
      querySelectData() {
        let params = {
          CoCode: ["AF06", "BD29", "AE05", "AK11"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let p in resp.data.data) {
            if (resp.data.data[p].Co_Code === 'AF06') {
              this.LevelList = resp.data.data[p].List;
            } else if (resp.data.data[p].Co_Code === 'BD29') {
              this.CardList = resp.data.data[p].List;
            } else if (resp.data.data[p].Co_Code === 'AE05') {
              this.ChannelList = resp.data.data[p].List;
            } else if (resp.data.data[p].Co_Code === 'AK11') {
              this.AllTagsList = resp.data.data[p].List;
              for (let i = 0; i < this.AllTagsList.length; i++) {
                this.AllTagsList[i].List.forEach(item => {
                  item.isSelect = false;
                });
                this.TagsList = this.AllTagsList[i];
              }
            }
          }
        })
      },
      //查询推荐人信息
      queryRecommendListt() {
        this.$http.post(QueryEmpList).then(resp => {
          this.RecommendList = resp.data.data;
          this.BeautyList = resp.data.data;
          this.AdviserList = resp.data.data;
          this.DesignerList = resp.data.data;
        })
      },
      addMemberShip() {
        let params = {
          Me_Name: this.AddMemberForm.Me_Name,
          Me_Sex: this.AddMemberForm.Me_Sex,
          Me_IdCard: this.AddMemberForm.Me_IdCard,
          Me_Sequence: this.AddMemberForm.Me_Sequence,
          Me_WeChat: this.AddMemberForm.Me_WeChat,
          Me_QQ: this.AddMemberForm.Me_QQ,
          Me_Company: this.AddMemberForm.Me_Company,
          Me_IsSendMessage: this.AddMemberForm.Me_IsSendMessage,
          Me_IsGroupSendMessage: this.AddMemberForm.Me_IsGroupSendMessage,
          Me_IsWeiXin: this.AddMemberForm.Me_IsWeiXin,
          Me_Designer: this.AddMemberForm.Me_Designer,
          Me_Beautician: this.AddMemberForm.Me_Beautician,
          Me_Consultant: this.AddMemberForm.Me_Consultant,
          Me_CustomerLevel: this.AddMemberForm.Me_CustomerLevel,
          Me_Job: this.AddMemberForm.Me_Job,
          Me_Height: this.AddMemberForm.Me_Height,
          Me_Address: this.AddMemberForm.Me_Address,
          Me_Tel: this.AddMemberForm.Me_Tel,
          Me_SourceCode: this.AddMemberForm.Me_SourceCode,
          Fe_GUID: this.AddMemberForm.Fe_GUID,
          Me_Birthday: this.AddMemberForm.Me_Birthday,
        };
        this.$http.post(AddManagerShip, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        })
      },
      //查询分店名称
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.StoreList = resp.data.data;
        })
      },
      resetMember(AddMemberForm) {
        this.$refs[AddMemberForm].resetFields();
      },
      submitMember(AddMemberForm) {
        this.$refs[AddMemberForm].validate((valid) => {
          if (valid) {
            this.addMemberShip();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitTags() {
        let reQuestData = {MemberSkin: []};
        for (let i = 0; i < this.AllTagsList.length; i++) {
          let rootItem = this.AllTagsList[i];
          let rootReQuestData = {
            Me_GUID: this.$route.params.Guid,
          };
          rootReQuestData.Mes_LableVlues = rootItem.Co_Name;
          let tagString = "";
          for (let j = 0; j < rootItem.List.length; j++) {
            let item = rootItem.List[j];
            if (rootItem.List[j].isSelect === true) {
              tagString += item.Co_Name + ",";
            }
          }
          // tagString.substring(tagString.length-1,);
          rootReQuestData.Mes_Lables = tagString;
          reQuestData.MemberSkin.push(rootReQuestData);
        }
        this.$http.post(AddSkinTags, this.$qs.stringify(reQuestData)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success'
            });
          }
        })
      },
    },
    name: "AddMemberShip"
  }
</script>

<style>
  .addMemberShipTable .el-input__inner {
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
    height: 0;
  }

  .divAddManager {
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

  .divBaseInfoItem {
    text-align: left;
    float: left;
    width: 18%;
    margin-right: 20px;
  }

  .divAddItem {
    text-align: left;
    float: left;
    width: 18%;
    margin-left: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
