<template>
  <div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="会员信息">
          <div class="editMemberShipTable">
            <div class="btnBox">
              <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetMember('EditMemberForm')">
                重置
              </el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitMember('EditMemberForm')">保存
              </el-button>
            </div>
            <el-form :model="EditMemberForm" :rules="rules" ref="EditMemberForm" status-icon :inline="true"
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
                  <div class="divAddItem" style="margin-left:70px;">
                    <el-form-item prop="Me_Name" style="display: block">
                      <div class="HintName">会员名称<a>*</a></div>
                      <el-input v-model="EditMemberForm.Me_Name" style="width: 193px;"
                                placeholder="请输入会员名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_HelpReNo" style="display: block">
                      <div class="HintName">会员卡号</div>
                      <el-input v-model="EditMemberForm.Em_HelpReNo" style="width: 193px;"
                                placeholder="请输入会员卡号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Me_Sex" style="display: block">
                      <div class="HintName">会员性别<a>*</a></div>
                      <el-select v-model="EditMemberForm.Me_Sex" placeholder="请选择性别">
                        <el-option v-for="item in SexlList" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_IdCard" style="display: block">
                      <div class="HintName">身份证号<a>*</a></div>
                      <el-input v-model="EditMemberForm.Me_IdCard" maxlength="18" style="width: 193px;"
                                placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Me_Birthday" style="display: block">
                      <div class="HintName">生日<a>*</a></div>
                      <el-date-picker v-model="EditMemberForm.Me_Birthday" type="date" style="width: 193px;"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="Em_Level" style="display: block">
                      <div class="HintName">卡类别</div>
                      <el-select v-model="EditMemberForm.Em_Level" placeholder="请选择类别">
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
                <div class="divAddManager" style="padding-top: 15px;padding-left: 25px;width: 100%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_WeChat" style="display: block;width: 193px;">
                      <div class="HintName">微信号</div>
                      <el-input v-model="EditMemberForm.Me_WeChat"
                                placeholder="请输入微信号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Tel" style="display: block;width: 193px;">
                      <div class="HintName">电话<a>*</a></div>
                      <el-input v-model="EditMemberForm.Me_Tel"
                                placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IsSendMessage" style="margin-top: -10px;">
                      <div class="HintName">是否发送短信消费提醒通知</div>
                      <el-radio @click.native.prevent="onMessageValue('1')" v-model="EditMemberForm.Me_IsSendMessage"
                                label="1">是
                      </el-radio>
                      <el-radio @click.native.prevent="onMessageValue('0')" v-model="EditMemberForm.Me_IsSendMessage"
                                label="0">否
                      </el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Designer" style="display: block">
                      <div class="HintName">专服设计师</div>
                      <el-select v-model="EditMemberForm.Me_Designer" placeholder="请选择设计师">
                        <el-option v-for="item in DesignerList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_Sequence" style="display: block;width: 193px;">
                      <div class="HintName">本店序号</div>
                      <el-input v-model="EditMemberForm.Me_Sequence"
                                placeholder="请输入本店序号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_IsGroupSendMessage" style="margin-top: -10px;">
                      <div class="HintName">是否发送群消息通知</div>
                      <el-radio @click.native.prevent="onMessageGroupValue('1')"
                                v-model="EditMemberForm.Me_IsGroupSendMessage" label="1">是
                      </el-radio>
                      <el-radio @click.native.prevent="onMessageGroupValue('0')"
                                v-model="EditMemberForm.Me_IsGroupSendMessage" label="0">否
                      </el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Beautician" style="display: block">
                      <div class="HintName">专服美容师</div>
                      <el-select v-model="EditMemberForm.Me_Beautician" placeholder="请选择美容师">
                        <el-option v-for="item in BeautyList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_GUID" style="display: block">
                      <div class="HintName">推荐人</div>
                      <el-select v-model="EditMemberForm.Em_GUID" placeholder="请选择推荐人">
                        <el-option v-for="item in RecommendList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_IsWeiXin" style="margin-top: -10px;">
                      <div class="HintName">微信绑定</div>
                      <el-radio @click.native.prevent="onWeiXinValue('1')" v-model="EditMemberForm.Me_IsWeiXin"
                                label="1">是
                      </el-radio>
                      <el-radio @click.native.prevent="onWeiXinValue('0')" v-model="EditMemberForm.Me_IsWeiXin"
                                label="0">否
                      </el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Consultant" style="display: block">
                      <div class="HintName">专服顾问</div>
                      <el-select v-model="EditMemberForm.Me_Consultant" placeholder="请选择顾问">
                        <el-option v-for="item in AdviserList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Me_SourceCode" style="display: block">
                      <div class="HintName">渠道来源<a>*</a></div>
                      <el-select v-model="EditMemberForm.Me_SourceCode" placeholder="请选择渠道来源">
                        <el-option v-for="item in ChannelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="State" style="display: block;margin-top: -10px;">
                      <div class="HintName">状态<a>*</a></div>
                      <el-radio @click.native.prevent="onChangeValue('0')" v-model="EditMemberForm.State"
                                label="0">正常
                      </el-radio>
                      <el-radio @click.native.prevent="onChangeValue('1')" v-model="EditMemberForm.State"
                                label="1">无效
                      </el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_CustomerLevel" style="display: block">
                      <div class="HintName">客户等级</div>
                      <el-select v-model="EditMemberForm.Me_CustomerLevel" placeholder="请选择客户等级">
                        <el-option v-for="item in LevelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Fe_GUID" style="display: block">
                      <div class="HintName">所属门店<a>*</a></div>
                      <el-select v-model="EditMemberForm.Fe_GUID" placeholder="请选择门店">
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
                <div class="divAddManager" style="padding-top: 15px;padding-left: 25px;width: 100%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_High" style="display: block;width: 193px;">
                      <div class="HintName">身高</div>
                      <el-input v-model="EditMemberForm.Me_High"
                                placeholder="请输入身高"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_QQ" style="display: block;margin-top: -10px;width: 193px;">
                      <div class="HintName">QQ号</div>
                      <el-input v-model="EditMemberForm.Me_QQ"
                                placeholder="请输入QQ号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Height" style="display: block;width: 193px;">
                      <div class="HintName">体重</div>
                      <el-input v-model="EditMemberForm.Me_Height"
                                placeholder="请输入体重"></el-input>
                    </el-form-item>
                    <el-form-item prop="Me_Job" style="display: block;margin-top: -10px;width: 193px;">
                      <div class="HintName">职业</div>
                      <el-input v-model="EditMemberForm.Me_Job"
                                placeholder="请输入职业"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Address" style="display: block;width: 193px;">
                      <div class="HintName">地址</div>
                      <el-input v-model="EditMemberForm.Me_Address"
                                placeholder="请输入地址"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Email" style="display: block;width: 193px;">
                      <div class="HintName">E-mail</div>
                      <el-input v-model="EditMemberForm.Me_Email"
                                placeholder="请输入会员邮箱"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Me_Company" style="display: block;width: 193px;">
                      <div class="HintName">工作单位</div>
                      <el-input v-model="EditMemberForm.Me_Company"
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
            <div v-for="(item,index) in resultList" :key="index"
                 style="width: 100%;float:left;display: flex;flex-wrap: wrap;flex-direction: column;">
              <AddMemberTags :TotalTagsList="item"></AddMemberTags>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="寄存历史">
          <div>
            <div class="btnBoxHistory">
              <el-button type="text" @click="addStorageDialog" icon="el-icon-circle-plus">添加</el-button>
            </div>
            <div class="divStorage">
              <el-table :data="StorageList" tooltip-effect="dark" style="width: 100%;"
                        :header-cell-style="{background:'#f0f8ff'}"
                        @selection-change="handleSelectionChange" show-header align="center" height="700px">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="Fe_Name" label="门店" align="center"></el-table-column>
                <el-table-column prop="Order_Code" label="订单号" align="center"></el-table-column>
                <el-table-column prop="Pro_Name" label="产品名称" align="center"></el-table-column>
                <el-table-column prop="Pro_TypeName" label="产品类别" align="center"></el-table-column>
                <el-table-column prop="Mdh_TotalSum" label="总数量" align="center"></el-table-column>
                <el-table-column prop="Mdh_StandardPrice" label="标准单价" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <EditStorage :Mdh_GUID="scope.row.Mdh_GUID" :Md_GUID="GUID" style="margin-right: 30px"
                                 @AddStorageEmit="AddStorageEmit">
                    </EditStorage>
                    <el-button type="text" size="small" style="position:absolute;margin-top: -31px;margin-left: 10px;" @click="deleteStorageBtn(scope.row,scope.$index,StorageList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: right;background-color: white;padding: 10px 10px 10px 20px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage" :page-sizes="[30, 60, 90, 120]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
              <DeleteStorage ref="deleteStorageParam"></DeleteStorage>
            </div>
            <AddStorage @AddStorageEmit="AddStorageEmit" ref="addStorageParam"></AddStorage>
          </div>
        </el-tab-pane>
        <el-tab-pane label="沟通记录">
          <div>
            <div class="btnBoxHistory">
              <el-button type="text" @click="addCommuniceDialog" icon="el-icon-circle-plus">添加</el-button>
            </div>
            <div class="divStorage">
              <el-table :data="CommuniceList" tooltip-effect="dark" style="width: 100%;"
                        :header-cell-style="{background:'#f0f8ff'}"
                        @selection-change="SelectionComChange" show-header align="center" height="700px">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="Mc_Communicator" label="服务人员" align="center"></el-table-column>
                <el-table-column prop="Mc_Item" label="服务项目" align="center"></el-table-column>
                <el-table-column prop="Mc_Record" label="沟通内容" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editCommuniceBtn(scope.row)">编辑</el-button>
                    <el-button type="text" size="small"
                               @click="deleteCommuniceBtn(scope.row,scope.$index,CommuniceList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <EditCommunice ref="editCommuniceParam" @AddCommuniceEmit="AddCommuniceEmit"></EditCommunice>
              <div style="text-align: right;background-color: white;padding: 10px 10px 10px 20px;">
                <el-pagination @size-change="sizeCommuniceChange" @current-change="currentCommuniceChange"
                               :current-page="currentPageCommunice" :page-sizes="[30, 60, 90, 120]"
                               :page-size="pageSizeCommunice"
                               layout="total, sizes, prev, pager, next, jumper" :total="totalCommunice">
                </el-pagination>
              </div>
              <DeleteCommunice ref="deleteCommuniceParam"></DeleteCommunice>
            </div>
            <AddCommunice ref="addCommuniceParam" @AddCommuniceEmit="AddCommuniceEmit"></AddCommunice>
          </div>
        </el-tab-pane>
        <el-tab-pane label="效果图">
          <div>
            <Upload></Upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="计次项目">
          <div>
            <div class="btnBoxHistory">
              <el-button type="text" @click="DelayDialogClick" icon="el-icon-time">延期</el-button>
              <el-button type="text" @click="TransferCardClick" icon="el-icon-sort">计次转综合卡</el-button>
            </div>
            <DelayDialog :TimeGUIDList="guidList"></DelayDialog>
            <div class="divStorage">
              <el-table :data="CountItemsList" tooltip-effect="dark" style="width: 100%;height:700px;"
                        :header-cell-style="{background:'#f0f8ff'}"
                        @selection-change="SelectionItemsChange" show-header align="center">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="Me_Code" label="会员编号" align="center"></el-table-column>
                <el-table-column prop="Me_Name" label="会员姓名" align="center"></el-table-column>
                <el-table-column prop="Order_Code" label="单据号" align="center"></el-table-column>
                <el-table-column prop="CreateDate" label="购买时间" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="Time_UseEndDate" label="有效期" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="Pro_Code" label="项目编号" align="center"></el-table-column>
                <el-table-column prop="Pro_Name" label="项目名称" align="center"></el-table-column>
                <el-table-column prop="Time_AllNumber" label="总次数" align="center"></el-table-column>
                <el-table-column prop="Time_YNumber" label="已用次数" align="center"></el-table-column>
                <el-table-column prop="Time_SNumber" label="剩余次数" align="center"></el-table-column>
              </el-table>
              <div style="text-align: right;background-color: white;padding: 10px 10px 10px 20px;">
                <el-pagination @size-change="sizeItemsChange" @current-change="currentItemsChange"
                               :current-page="currentPageItems" :page-sizes="[30, 60, 90, 120]"
                               :page-size="pageSizeCommunice"
                               layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
                </el-pagination>
              </div>
            </div>
            <TransferCardDialog></TransferCardDialog>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import Upload from '../../Upload'
  import AddStorage from './AddStorage'
  import DeleteStorage from './DeleteStorage'
  import EditStorage from './EditStorage'
  import AddCommunice from './AddCommunice'
  import DeleteCommunice from './DeleteCommunice'
  import EditCommunice from './EditCommunice'
  import AddMemberTags from './AddMemberTags'
  import DelayDialog from './DelayDialog'
  import TransferCardDialog from './TransferCardDialog'
  import {
    CommonDictionaryTree,
    QueryEmpList,
    queryStoreList,
    QueryPatchCard,
    EditPatchCard, QueryStorageList, GetCommuniceList, QueryCountItems, QuerySkinTags, AddSkinTags
  } from '../../../config/Api.js'

  export default {
    data() {
      return {
        EditMemberForm: {
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
          State: '',
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
        StorageList: [],
        CommuniceList: [],
        CountItemsList: [],
        AllTagsList: [],
        TagsList: [],
        resultList: [],
        MesGUIDData: [],
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
          State: [
            {required: true, message: '请选择状态', trigger: 'blur'},
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
        currentPage: 1,
        currentPageCommunice: 1,
        currentPageItems: 1,
        pageSize: 30,
        pageSizeCommunice: 30,
        pageSizeItems: 30,
        total: 0,
        totalCommunice: 0,
        totalItems: 0,
        countItemsSelection: [],
        guidList: [],
        GUID: '',
      }
    },
    created() {
      this.GUID = this.$route.params.Guid;
      this.querySelectData();
      this.queryRecommendList();
      this.queryStoreList();
      this.queryMemberShip();
      this.queryStorageList();
      this.queryCommuniceList();
      this.queryCountItemsList();
    },
    components: {
      Upload,
      AddStorage,
      DeleteStorage,
      EditStorage,
      AddCommunice,
      DeleteCommunice,
      EditCommunice,
      AddMemberTags,
      DelayDialog,
      TransferCardDialog,
    },
    methods: {
      querySelectData() {
        let params = {
          CoCode: ["AF06", "BD29", "AE05", "AK11"],
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
        this.$http.get(QueryPatchCard + this.$route.params.Guid).then(resp => {
          if (resp.data.code === 0) {
            this.EditMemberForm.Me_Name = resp.data.data.Me_Name;
            this.EditMemberForm.Me_Sex = resp.data.data.Me_Sex;
            this.EditMemberForm.Me_IdCard = resp.data.data.Me_IdCard;
            this.EditMemberForm.Me_Sequence = resp.data.data.Me_Sequence;
            this.EditMemberForm.Me_WeChat = resp.data.data.Me_WeChat;
            this.EditMemberForm.Me_QQ = resp.data.data.Me_QQ;
            this.EditMemberForm.Me_Company = resp.data.data.Me_Company;
            this.EditMemberForm.Me_IsSendMessage = resp.data.data.Me_IsSendMessage + '';
            this.EditMemberForm.Me_IsGroupSendMessage = resp.data.data.Me_IsGroupSendMessage + '';
            this.EditMemberForm.Me_IsWeiXin = resp.data.data.Me_IsWeiXin + '';
            this.EditMemberForm.State = resp.data.data.State + '';
            this.EditMemberForm.Me_Designer = resp.data.data.Me_Designer;
            this.EditMemberForm.Me_Beautician = resp.data.data.Me_Beautician;
            this.EditMemberForm.Me_Consultant = resp.data.data.Me_Consultant;
            this.EditMemberForm.Me_CustomerLevel = resp.data.data.Me_CustomerLevel;
            this.EditMemberForm.Me_Job = resp.data.data.Me_Job;
            this.EditMemberForm.Me_Height = resp.data.data.Me_Height;
            this.EditMemberForm.Me_Address = resp.data.data.Me_Address;
            this.EditMemberForm.Me_Tel = resp.data.data.Me_Tel;
            this.EditMemberForm.Me_SourceCode = resp.data.data.Me_SourceCode;
            this.EditMemberForm.Fe_GUID = resp.data.data.Fe_GUID;
            this.EditMemberForm.Me_Birthday = resp.data.data.Me_Birthday;
            this.EditMemberForm.Me_High = resp.data.data.Me_High;
            this.EditMemberForm.Me_Email = resp.data.data.Me_Email;
          }
        })
      },
      queryStoreList() {
        this.$http.post(queryStoreList).then(resp => {
          this.StoreList = resp.data.data;
        })
      },
      editCard() {
        let params = {
          Me_GUID: this.$route.params.Guid,
          Me_Name: this.EditMemberForm.Me_Name,
          Me_Sex: this.EditMemberForm.Me_Sex,
          Me_IdCard: this.EditMemberForm.Me_IdCard,
          Me_Sequence: this.EditMemberForm.Me_Sequence,
          Me_WeChat: this.EditMemberForm.Me_WeChat,
          Me_QQ: this.EditMemberForm.Me_QQ,
          Me_Company: this.EditMemberForm.Me_Company,
          Me_IsSendMessage: this.EditMemberForm.Me_IsSendMessage,
          Me_IsGroupSendMessage: this.EditMemberForm.Me_IsGroupSendMessage,
          Me_IsWeiXin: this.EditMemberForm.Me_IsWeiXin,
          Me_Designer: this.EditMemberForm.Me_Designer,
          Me_Beautician: this.EditMemberForm.Me_Beautician,
          Me_Consultant: this.EditMemberForm.Me_Consultant,
          Me_CustomerLevel: this.EditMemberForm.Me_CustomerLevel,
          Me_Job: this.EditMemberForm.Me_Job,
          Me_Height: this.EditMemberForm.Me_Height,
          Me_Address: this.EditMemberForm.Me_Address,
          Me_Tel: this.EditMemberForm.Me_Tel,
          Me_SourceCode: this.EditMemberForm.Me_SourceCode,
          Fe_GUID: this.EditMemberForm.Fe_GUID,
          Me_Birthday: this.EditMemberForm.Me_Birthday,
          Me_High: this.EditMemberForm.Me_High,
          Me_Email: this.EditMemberForm.Me_Email,
        };
        this.$http.post(EditPatchCard, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        })
      },
      onWeiXinValue(data) {
        this.EditMemberForm.Me_IsWeiXin = data;
      },
      onMessageValue(data) {
        this.EditMemberForm.Me_IsSendMessage = data;
      },
      onMessageGroupValue(data) {
        this.EditMemberForm.Me_IsGroupSendMessage = data;
      },
      onChangeValue(data) {
        this.EditMemberForm.State = data;
      },
      resetMember(EditMemberForm) {
        this.$refs[EditMemberForm].resetFields();
      },
      submitMember(EditMemberForm) {
        this.$refs[EditMemberForm].validate((valid) => {
          if (valid) {
            this.editCard();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * 会员标签
       */
      queryTags() {
        this.$http.post(QuerySkinTags + this.$route.params.Guid).then(resp => {
          if (resp.data.code === 0) {
            this.filterData(resp.data.data);
            for (let i = 0; i < resp.data.data.length; i++) {
              this.MesGUIDData.push(resp.data.data[i].Mes_GUID);
            }
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
          rootReQuestData.Mes_Lables = tagString;
          for (let i = 0; i < this.MesGUIDData.length; i++) {
            rootReQuestData.Mes_GUID = this.MesGUIDData[i];
          }
          reQuestData.MemberSkin.push(rootReQuestData);
        }
        this.$http.post(AddSkinTags, this.$qs.stringify(reQuestData)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        })
      },
      /**
       * 寄存历史
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryStorageList(this.pageSize, this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryStorageList(this.pageSize, this.currentPage);
        console.log(`当前页: ${val}`);
      },
      queryStorageList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Me_GUID: this.$route.params.Guid,
        };
        this.$http.get(QueryStorageList, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.StorageList = resp.data.data;
            this.total = resp.data.count;
          }
        })
      },
      addStorageDialog() {
        this.$store.state.addStorageIsShow = true;
        this.$refs.addStorageParam.MEGUID = this.$route.params.Guid;
      },
      AddStorageEmit() {
        this.queryStorageList();
      },
      deleteStorageBtn(rows, index, data) {
        this.$store.state.deleteStorageIsShow = true;
        this.$refs.deleteStorageParam.currentRows = rows;
        this.$refs.deleteStorageParam.currentIndex = index;
        this.$refs.deleteStorageParam.deleteStorageData = data;
      },
      /**
       * 沟通记录
       */
      SelectionComChange(val) {
        this.multipleSelection = val;
      },
      sizeCommuniceChange(val) {
        this.pageSizeCommunice = val;
        this.queryCommuniceList(this.pageSizeCommunice, this.currentPageCommunice);
        console.log(`每页 ${val} 条`);
      },
      currentCommuniceChange(val) {
        this.currentPageCommunice = val;
        this.queryCommuniceList(this.pageSizeCommunice, this.currentPageCommunice);
        console.log(`当前页: ${val}`);
      },
      queryCommuniceList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Me_GUID: this.$route.params.Guid,
        };
        this.$http.get(GetCommuniceList, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.CommuniceList = resp.data.data;
            this.totalCommunice = resp.data.count;
          }
        })
      },
      AddCommuniceEmit() {
        this.queryCommuniceList();
      },
      addCommuniceDialog() {
        this.$store.state.addCommuniceIsShow = true;
        this.$refs.addCommuniceParam.MEGUID = this.$route.params.Guid;
      },
      editCommuniceBtn(row) {
        this.$store.state.editCommuniceIsShow = true;
        this.$refs.editCommuniceParam.Mc_GUID = row.Mc_GUID;
        this.$refs.editCommuniceParam.Md_GUID = this.$route.params.Guid;
        this.$refs.editCommuniceParam.NAME = 'NAME';
      },
      deleteCommuniceBtn(rows, index, data) {
        this.$store.state.deleteCommuniceIsShow = true;
        this.$refs.deleteCommuniceParam.currentRows = rows;
        this.$refs.deleteCommuniceParam.currentIndex = index;
        this.$refs.deleteCommuniceParam.deleteCommuniceData = data;
      },
      /**
       * 计次项目
       * 必须先选中某一项才能弹出模态框
       */
      DelayDialogClick() {
        if (this.countItemsSelection.length > 0) {
          this.$store.state.addDelayIsShow = true;
          for (let i = 0; i < this.countItemsSelection.length; i++) {
            this.guidList.push(this.countItemsSelection[i].Time_GUID);
          }
        } else {
          alert("请先选择某一项或多项会员卡");
        }
      },
      TransferCardClick() {
        this.$store.state.addTransferCardIsShow = true;
      },
      SelectionItemsChange(val) {
        this.countItemsSelection = val;
      },
      sizeItemsChange(val) {
        this.pageSizeItems = val;
        this.queryCountItemsList(this.pageSizeItems, this.currentPageItems);
        console.log(`每页 ${val} 条`);
      },
      currentItemsChange(val) {
        this.currentPageItems = val;
        this.queryCountItemsList(this.pageSizeItems, this.currentPageItems);
        console.log(`当前页: ${val}`);
      },
      queryCountItemsList(pageSize, currentPage) {
        let params = {
          pageSize: pageSize,
          pageIndex: currentPage,
          totle: 0,
          isAsc: true,
          Me_GUID: this.$route.params.Guid,
        };
        this.$http.post(QueryCountItems, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.CountItemsList = resp.data.data;
            this.totalItems = resp.data.count;
          }
        })
      },
    }
    ,
    name: "EditMemberShip"
  }
</script>

<style>
  .editMemberShipTable .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .btnBox .el-button {
    height: 38px;
  }

  .divStorage .cell a {
    color: blue;
  }

</style>
<style scoped>

  .btnBox {
    width: 98%;
    text-align: end;
    height: 0;
  }

  .btnBoxHistory {
    text-align: left;
    width: 98%;
    height: 0;
    color: #0082d6;
  }

  .divAddManager {
    width: 100%;
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

  .divStorage {
    margin-top: 35px;
  }
</style>
