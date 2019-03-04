<template>
  <div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="会员信息">
          <div class="detailMemberShipTable">
            <el-form :model="detailMemberForm" ref="detailMemberForm" status-icon :inline="true"
                     label-position="top">
              <!--新增会员-->
              <div style="width: 100%;background-color: white">
                <h1
                  style="float: left;width: 97.4%;text-align: left;background-color: white;height: 40px;padding-left: 10px;padding-top: 10px;">
                  新增会员</h1>
                <!--1-->
                <div class="divAddManager">
                  <el-form-item style="padding-left: 60px;float: left">
                    <Upload></Upload>
                  </el-form-item>
                  <div class="divAddItem" style="margin-left: 60px;">
                    <el-form-item prop="Me_Name" style="display: block">
                      <div class="HintName">会员名称<a>*</a></div>
                      <el-input v-model="detailMemberForm.Me_Name" style="width: 278px;" :disabled="true"
                                placeholder="请输入会员名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Birthday" style="display: block">
                      <div class="HintName">生日<a>*</a></div>
                      <el-date-picker v-model="detailMemberForm.Me_Birthday" type="date" style="width: 278px;"
                                      :disabled="true"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Me_Sex" style="display: block">
                      <div class="HintName">会员性别<a>*</a></div>
                      <el-select v-model="detailMemberForm.Me_Sex" placeholder="请选择性别" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in SexlList" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_HelpReNo" style="display: block">
                      <div class="HintName">会员卡号</div>
                      <el-input v-model="detailMemberForm.Em_HelpReNo" style="width: 278px;" :disabled="true"
                                placeholder="请输入会员卡号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Me_IdCard" style="display: block">
                      <div class="HintName">身份证号<a>*</a></div>
                      <el-input v-model="detailMemberForm.Me_IdCard" style="width: 278px;" :disabled="true"
                                placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_Level" style="display: block">
                      <div class="HintName">卡类别</div>
                      <el-select v-model="detailMemberForm.Em_Level" placeholder="请选择类别" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in CardList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <!--line-->
              <img src="../../../../static/images/line.png" style="width: 96%;"/>
              <!--基本信息-->
              <div style="width: 100%;margin-top: 20px;">
                <h1
                  style="float: left;width: 97.4%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
                  基本信息</h1>
                <div class="divAddManager" style="padding-top: 15px;padding-left: 25px;width: 96.5%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_WeChat" style="display: block">
                      <div class="HintName">微信号</div>
                      <el-input v-model="detailMemberForm.Me_WeChat" style="width: 278px;" :disabled="true"
                                placeholder="请输入微信号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Tel" style="display: block">
                      <div class="HintName">电话<a>*</a></div>
                      <el-input v-model="detailMemberForm.Me_Tel" style="width: 278px;" :disabled="true"
                                placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IsSendMessage" style="margin-top: -10px;">
                      <div class="HintName">是否发送短信消费提醒通知</div>
                      <el-radio v-model="detailMemberForm.Me_IsSendMessage" label="1" disabled>是</el-radio>
                      <el-radio v-model="detailMemberForm.Me_IsSendMessage" label="0" disabled>否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Designer" style="display: block">
                      <div class="HintName">专服设计师</div>
                      <el-select v-model="detailMemberForm.Me_Designer" placeholder="请选择设计师" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in DesignerList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_Sequence" style="display: block">
                      <div class="HintName">本店序号</div>
                      <el-input v-model="detailMemberForm.Me_Sequence" style="width: 278px;" :disabled="true"
                                placeholder="请输入本店序号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IsGroupSendMessage" style="margin-top: -10px;">
                      <div class="HintName">是否发送群消息通知</div>
                      <el-radio v-model="detailMemberForm.Me_IsGroupSendMessage" label="1" disabled>是</el-radio>
                      <el-radio v-model="detailMemberForm.Me_IsGroupSendMessage" label="0" disabled>否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Beautician" style="display: block">
                      <div class="HintName">专服美容师</div>
                      <el-select v-model="detailMemberForm.Me_Beautician" placeholder="请选择美容师" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in BeautyList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_GUID" style="display: block">
                      <div class="HintName">推荐人</div>
                      <el-select v-model="detailMemberForm.Em_GUID" placeholder="请选择推荐人" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in RecommendList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_IsWeiXin" style="margin-top: -10px;">
                      <div class="HintName">微信绑定</div>
                      <el-radio v-model="detailMemberForm.Me_IsWeiXin" label="1" :disabled="true">是</el-radio>
                      <el-radio v-model="detailMemberForm.Me_IsWeiXin" label="0" :disabled="true">否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Consultant" style="display: block">
                      <div class="HintName">专服顾问</div>
                      <el-select v-model="detailMemberForm.Me_Consultant" placeholder="请选择顾问" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in AdviserList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_SourceCode" style="display: block">
                      <div class="HintName">渠道来源<a>*</a></div>
                      <el-select v-model="detailMemberForm.Me_SourceCode" placeholder="请选择渠道来源" style="width: 278px;"
                                 :disabled="true">
                        <el-option v-for="item in ChannelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_CustomerLevel" style="display: block">
                      <div class="HintName">客户等级</div>
                      <el-select v-model="detailMemberForm.Me_CustomerLevel" placeholder="请选择客户等级" :disabled="true"
                                 style="width: 278px;">
                        <el-option v-for="item in LevelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Fe_GUID" style="display: block">
                      <div class="HintName">所属门店<a>*</a></div>
                      <el-select v-model="detailMemberForm.Fe_GUID" placeholder="请选择门店" style="width: 278px;"
                                 :disabled="true">
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
                      <el-input v-model="detailMemberForm.Me_High" style="width: 278px;" :disabled="true"
                                placeholder="请输入身高"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_QQ" style="display: block;margin-top: -10px;">
                      <div class="HintName">QQ号</div>
                      <el-input v-model="detailMemberForm.Me_QQ" style="width: 278px;" :disabled="true"
                                placeholder="请输入QQ号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Height" style="display: block">
                      <div class="HintName">体重</div>
                      <el-input v-model="detailMemberForm.Me_Height" style="width: 278px;" :disabled="true"
                                placeholder="请输入体重"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Job" style="display: block;margin-top: -10px;">
                      <div class="HintName">职业</div>
                      <el-input v-model="detailMemberForm.Me_Job" style="width: 278px;" :disabled="true"
                                placeholder="请输入职业"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Address" style="display: block">
                      <div class="HintName">地址</div>
                      <el-input v-model="detailMemberForm.Me_Address" style="width: 278px;" :disabled="true"
                                placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Company" style="margin-top: -10px;">
                      <div class="HintName">工作单位</div>
                      <el-input v-model="detailMemberForm.Me_Company" style="width: 278px;" :disabled="true"
                                placeholder="请输入工作单位"></el-input>
                    </el-form-item>
                  </div>

                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Email" style="display: block">
                      <div class="HintName">E-mail</div>
                      <el-input v-model="detailMemberForm.Me_Email" style="width: 278px;" :disabled="true"
                                placeholder="请输入会员邮箱"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>

          </div>

        </el-tab-pane>
        <el-tab-pane label="会员标签">
          <div v-for="(item,index) in resultList" :key="index"
               style="width: 100%;float:left;display: flex;flex-wrap: wrap;flex-direction: column;">
            <AddMemberTags :TotalTagsList="item" :disabledVaule="true"></AddMemberTags>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import Upload from '../../Upload'
  import AddMemberTags from './AddMemberTags'
  import {
    CommonDictionaryTree,
    QueryEmpList,
    QueryPatchCard,
    QuerySkinTags,
    queryStoreList
  } from '../../../config/Api.js'

  export default {
    data() {
      return {
        detailMemberForm: {
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
        resultList:[]
      }
    },
    created() {
      this.querySelectData();
      this.queryRecommendList();
      this.queryStoreList();
      this.queryMemberShip();
    },
    components: {
      Upload, AddMemberTags
    },
    methods: {
      querySelectData() {
        let params = {
          CoCode: ["AF06", "BD29", "AE05", 'AK11'],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AF06') {
              this.LevelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BD29') {
              this.CardList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AE05') {
              this.ChannelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AK11') {
              this.AllTagsList = resp.data.data[position].List;
              for (let i = 0; i < this.AllTagsList.length; i++) {
                this.AllTagsList[i].List.forEach(item => {
                  item.isSelect = false;
                });
                this.TagsList.push(this.AllTagsList[i]);
                this.queryTags();
              }
            }
          }
        })
      },
      queryRecommendList() {
        this.$http.post(QueryEmpList).then(resp => {
          this.RecommendList = resp.data.data;
          this.BeautyList = resp.data.data;
          this.AdviserList = resp.data.data;
          this.DesignerList = resp.data.data;
        })
      },
      queryMemberShip() {
        this.$http.get(QueryPatchCard + this.$route.params.meId).then(resp => {
          if (resp.data.code === 0) {
            this.detailMemberForm.Me_Name = resp.data.data.Me_Name;
            this.detailMemberForm.Me_Sex = resp.data.data.Me_Sex;
            this.detailMemberForm.Me_IdCard = resp.data.data.Me_IdCard;
            this.detailMemberForm.Me_Sequence = resp.data.data.Me_Sequence;
            this.detailMemberForm.Me_WeChat = resp.data.data.Me_WeChat;
            this.detailMemberForm.Me_QQ = resp.data.data.Me_QQ;
            this.detailMemberForm.Me_Company = resp.data.data.Me_Company;
            this.detailMemberForm.Me_IsSendMessage = resp.data.data.Me_IsSendMessage + '';
            this.detailMemberForm.Me_IsGroupSendMessage = resp.data.data.Me_IsGroupSendMessage + '';
            this.detailMemberForm.Me_IsWeiXin = resp.data.data.Me_IsWeiXin + '';
            this.detailMemberForm.Me_Designer = resp.data.data.Me_Designer;
            this.detailMemberForm.Me_Beautician = resp.data.data.Me_Beautician;
            this.detailMemberForm.Me_Consultant = resp.data.data.Me_Consultant;
            this.detailMemberForm.Me_CustomerLevel = resp.data.data.Me_CustomerLevel;
            this.detailMemberForm.Me_Job = resp.data.data.Me_Job;
            this.detailMemberForm.Me_Height = resp.data.data.Me_Height;
            this.detailMemberForm.Me_Address = resp.data.data.Me_Address;
            this.detailMemberForm.Me_Tel = resp.data.data.Me_Tel;
            this.detailMemberForm.Me_SourceCode = resp.data.data.Me_SourceCode;
            this.detailMemberForm.Fe_GUID = resp.data.data.Fe_GUID;
            this.detailMemberForm.Me_Birthday = resp.data.data.Me_Birthday;
            this.detailMemberForm.Me_High = resp.data.data.Me_High;
            this.detailMemberForm.Me_Email = resp.data.data.Me_Email;
          }
        })
      },
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.StoreList = resp.data.data;
        })
      },
      queryTags() {
        this.$http.post(QuerySkinTags + this.$route.params.meId).then(resp => {
          if(resp.data.code===0){
            this.filterData(resp.data.data);
          }
        })
      },
      filterData(array) {
        for (let i = 0; i < array.length; i++) {
          let item = array[i];
          for (let j = 0; j < this.TagsList.length; j++) {
            let data = this.TagsList[j];
            if (item.Mes_LableVlues === data.Co_Name) {
              let newData = item.Mes_Lables.split(",");
              for (let k = 0; k < newData.length; k++) {
                let name = newData[k];
                let isYou = false;
                for (let l = 0; l < data.List.length; l++) {
                  let itemData = data.List[l];
                  if (name !== "") {
                    if (name === itemData.Co_Name) {
                      isYou = true;
                      itemData.isSelect = true;
                    }
                  }

                }
                if (!isYou && name !== "") {
                  data.List.push({
                    Co_Name: name,
                    isSelect: true
                  });
                }
              }
            }
          }
        }
        this.resultList = this.TagsList;
      },
    },
    name: "DetailMemberShip"
  }
</script>

<style>
  .detailMemberShipTable .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

</style>
<style scoped>

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
