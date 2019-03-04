<template>
  <div>
    <div class="tabSwitch">
      <el-tabs type="border-card">
        <el-tab-pane label="员工信息">
          <div class="divAddEmpTable">
            <div class="btnBox">
              <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetEmpForm('EditEmpManagerForm')">
                重置
              </el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitEmpMethod('EditEmpManagerForm')">保存
              </el-button>
            </div>
            <el-form :model="EditEmpManagerForm" :rules="rules" ref="EditEmpManagerForm" status-icon :inline="true"
                     label-position="top">
              <!--新增人员-->
              <div style="width: 100%;background-color: white">
                <h1
                  style="float: left;width: 97.4%;text-align: left;background-color: white;height: 40px;padding-left: 10px;padding-top: 10px;">
                  新增人员</h1>
                <!--1-->
                <div class="divAddEmp">
                  <el-form-item style="padding-left: 60px;float: left">
                    <el-upload
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false">
                      <!--:on-preview="handlePictureCardPreview"-->
                      <!--:on-remove="handleRemove">-->
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                  <div class="divAddItem" style="margin-left: 60px;">
                    <el-form-item prop="Em_Name" style="display: block">
                      <div class="HintName">员工姓名</div>
                      <el-input v-model="EditEmpManagerForm.Em_Name" style="width: 278px;"
                                placeholder="请输入员工姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_Level" style="display: block">
                      <div class="HintName">员工级别</div>
                      <el-select v-model="EditEmpManagerForm.Em_Level" placeholder="请选择级别" style="width: 278px;">
                        <el-option v-for="item in LevelList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Em_Sex" style="display: block">
                      <div class="HintName">员工性别</div>
                      <el-select v-model="EditEmpManagerForm.Em_Sex" placeholder="请选择性别" style="width: 278px;">
                        <el-option v-for="item in SexlList" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="De_GUID" style="display: block">
                      <div class="HintName">归属部门</div>
                      <el-select v-model="EditEmpManagerForm.De_GUID" placeholder="请选择部门" style="width: 278px;">
                        <el-option v-for="item in GuidlList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Em_IdCard" style="display: block">
                      <div class="HintName">身份证号</div>
                      <el-input v-model="EditEmpManagerForm.Em_IdCard" style="width: 278px;"
                                placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Fe_GUID" style="display: block">
                      <div class="HintName">分店名称</div>
                      <el-select v-model="EditEmpManagerForm.Fe_GUID" placeholder="请选择分店名称" style="width: 278px;">
                        <el-option v-for="item in FeNameList" :key="item.Fe_GUID" :label="item.Fe_Name"
                                   :value="item.Fe_GUID"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divAddItem">
                    <el-form-item prop="Em_HelpReNo" style="display: block">
                      <div class="HintName">员工助记号</div>
                      <el-input v-model="EditEmpManagerForm.Em_HelpReNo" style="width: 278px;"
                                placeholder="请输入员工助记号"></el-input>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <!--line-->
              <div style="background-color: #dd6161;line-height: 2px;width: 95%;"></div>
              <!--基本信息-->
              <div style="width: 100%;">
                <h1
                  style="float: left;width: 97.4%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
                  基本信息</h1>
                <div class="divAddEmp" style="padding-top: 15px;padding-left: 25px;width: 96.5%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_WorkDate">
                      <div class="HintName">到职日期</div>
                      <el-date-picker v-model="EditEmpManagerForm.Em_WorkDate" type="date" style="width: 278px;"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="Em_HealthNo" style="display: block">
                      <div class="HintName">健康证号</div>
                      <el-input v-model="EditEmpManagerForm.Em_HealthNo" style="width: 278px;"
                                placeholder="请输入健康证号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_HairItem" style="display: block">
                      <div class="HintName">剪发项目</div>
                      <el-select v-model="EditEmpManagerForm.Em_HairItem" placeholder="请选择项目" style="width: 278px;">
                        <el-option v-for="item in HairItemList" :key="item.Pro_Name" :label="item.Pro_Name"
                                   :value="item.Pro_Name"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_Birthday">
                      <div class="HintName">生日</div>
                      <el-date-picker v-model="EditEmpManagerForm.Em_Birthday" type="date" style="width: 278px;"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="Em_HealthTrem">
                      <div class="HintName">证件期限</div>
                      <el-date-picker v-model="EditEmpManagerForm.Em_HealthTrem" type="date" style="width: 278px;"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="Em_Account" style="display: block">
                      <div class="HintName">员工手机端登录账号</div>
                      <el-input v-model="EditEmpManagerForm.Em_Account" style="width: 278px;"
                                placeholder="请输入员工手机端登录账号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_HireType" style="display: block">
                      <div class="HintName">聘雇性质</div>
                      <el-select v-model="EditEmpManagerForm.Em_HireType" placeholder="请选择聘雇性质" style="width: 278px;">
                        <el-option v-for="item in HairTypeList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_ArrivalFenTime">
                      <div class="HintName">来店时间</div>
                      <el-date-picker v-model="EditEmpManagerForm.Em_ArrivalFenTime" type="date" style="width: 278px;"
                                      placeholder="年-月-日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="Em_PassWord" style="display: block">
                      <div class="HintName">员工手机端登录密码</div>
                      <el-input v-model="EditEmpManagerForm.Em_PassWord" style="width: 278px;"
                                placeholder="请输入员工手机端登录密码"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_Introducer" style="display: block">
                      <div class="HintName">介绍人</div>
                      <el-select v-model="EditEmpManagerForm.Em_Introducer" placeholder="请选择介绍人" style="width: 278px;">
                        <el-option v-for="item in IntroducerList" :key="item.Em_Name" :label="item.Em_Name"
                                   :value="item.Em_Name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="Em_Salary" style="display: block">
                      <div class="HintName">基本工资</div>
                      <el-input v-model="EditEmpManagerForm.Em_Salary" style="width: 278px;"
                                placeholder="请输入基本工资"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_WeChatNo" style="display: block">
                      <div class="HintName">员工微信号</div>
                      <el-input v-model="EditEmpManagerForm.Em_WeChatNo"
                                style="width: 278px;" placeholder="请输入员工微信号"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_JobTitle" style="display: block">
                      <div class="HintName">职称</div>
                      <el-select v-model="EditEmpManagerForm.Em_JobTitle" placeholder="请选择职称" style="width: 278px;">
                        <el-option v-for="item in JobTitleList" :key="item.Co_Values" :label="item.Co_Name"
                                   :value="item.Co_Values"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <!--line-->
              <div style="background-color: #dd6161;line-height: 2px;width: 95%;"></div>
              <!--其他信息-->
              <div style="width: 100%;">
                <h1
                  style="float: left;width: 97.4%;text-align: left;background-color: white;margin-top: -5px;padding-left: 10px">
                  其他信息</h1>
                <div class="divAddEmp" style="padding-top: 15px;padding-left: 25px;width: 96.5%;">
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_Stage" style="display: block">
                      <div class="HintName">员工艺名</div>
                      <el-input v-model="EditEmpManagerForm.Em_Stage" style="width: 278px;"
                                placeholder="请输入员工艺名"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_Address" style="display: block;margin-top: -10px;">
                      <div class="HintName">联系地址</div>
                      <el-input v-model="EditEmpManagerForm.Em_Address" style="width: 278px;"
                                placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                    <el-form-item label="个人描述" prop="Em_PersonalStatement" style="display: block;margin-top: -25px;">
                      <el-input v-model="EditEmpManagerForm.Em_PersonalStatement" type="textarea" :rows="3"
                                style="margin-top: -18px;width: 278px;"
                                placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_High" style="display: block">
                      <div class="HintName">身高</div>
                      <el-input v-model="EditEmpManagerForm.Em_High" style="width: 278px;"
                                placeholder="请输入身高"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_Email" style="display: block;margin-top: -10px;">
                      <div class="HintName">E-mail</div>
                      <el-input v-model="EditEmpManagerForm.Em_Email" style="width: 278px;"
                                placeholder="请输入员工邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="Em_Desc" style="display: block;margin-top: -25px;">
                      <el-input v-model="EditEmpManagerForm.Em_Desc" type="textarea" :rows="3"
                                style="margin-top: -18px;width: 278px;"
                                placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_Height" style="display: block">
                      <div class="HintName">体重</div>
                      <el-input v-model="EditEmpManagerForm.Em_Height" style="width: 278px;"
                                placeholder="请输入体重"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_ManSignCode" style="margin-top: -10px;">
                      <div class="HintName">经理签单</div>
                      <div>
                        <el-radio prop="Em_IsManagerSign" v-model="EditEmpManagerForm.Em_IsManagerSign"
                                  @click.native.prevent="onChangeValue"
                                  label="1" style="float: left;margin-top: 14px;">授权
                        </el-radio>
                        <el-input v-model="EditEmpManagerForm.Em_ManSignCode"
                                  style="float: left;width: 200px;margin-left: 10px;"></el-input>
                      </div>
                    </el-form-item>
                    <el-form-item prop="Em_IsReserve" style="margin-top: -10px;">
                      <div class="HintName">是否可预约</div>
                      <el-radio v-model="EditEmpManagerForm.Em_IsReserve" label="1">是</el-radio>
                      <el-radio v-model="EditEmpManagerForm.Em_IsReserve" label="0">否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_Tel" style="display: block">
                      <div class="HintName">家庭电话</div>
                      <el-input v-model="EditEmpManagerForm.Em_Tel" style="width: 278px;"
                                placeholder="请输入家庭电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_Education" style="display: block;margin-top: -10px;">
                      <div class="HintName">最高学历</div>
                      <el-input v-model="EditEmpManagerForm.Em_Education" style="width: 278px;"
                                placeholder="请输入最高学历"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_IsPad" style="margin-top: -10px;">
                      <div class="HintName">是否Pad接单</div>
                      <el-radio v-model="EditEmpManagerForm.Em_IsPad" label="1">是</el-radio>
                      <el-radio v-model="EditEmpManagerForm.Em_IsPad" label="0">否</el-radio>
                    </el-form-item>
                  </div>
                  <div class="divBaseInfoItem">
                    <el-form-item prop="Em_Phone" style="display: block">
                      <div class="HintName">联系电话</div>
                      <el-input v-model="EditEmpManagerForm.Em_Phone" style="width: 278px;"
                                placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="Em_Business" style="margin-top: -5px;display: block">
                      <div class="HintName">是否业务</div>
                      <el-radio v-model="EditEmpManagerForm.Em_Business" label="1">是</el-radio>
                      <el-radio v-model="EditEmpManagerForm.Em_Business" label="0">否</el-radio>
                    </el-form-item>
                    <el-form-item prop="State" style="margin-top: -20px;display: block;margin-left: 5px;">
                      <div class="HintName">在职/离职</div>
                      <el-radio v-model="EditEmpManagerForm.State" label="1">离职</el-radio>
                      <el-radio v-model="EditEmpManagerForm.State" label="0">在职</el-radio>
                    </el-form-item>
                  </div>
                </div>

              </div>

            </el-form>

          </div>

        </el-tab-pane>
        <el-tab-pane label="员工升迁">
          <div>
            <div style="width: 98%;text-align: left;">
              <el-form :model="AddEmpPromotionForm" :rules="rules" ref="AddEmpPromotionForm" status-icon :inline="true"
                       label-position="top">
                <el-form-item prop="Emp_Month" style="float: left;width: 21%;text-align: left">
                  <div class="HintNameTwo">升迁月份</div>
                  <el-select v-model="AddEmpPromotionForm.Emp_Month" placeholder="请选择月份" style="width: 278px;">
                    <el-option v-for="item in MonthList" :key="item.value" :label="item.name"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Emp_OLevel" style="width: 21%;">
                  <div class="HintNameTwo">升迁原职位</div>
                  <el-select v-model="AddEmpPromotionForm.Emp_OLevel" placeholder="请选择原职位" style="width: 278px;">
                    <el-option v-for="item in OLevelList" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Emp_NLevel" style="width: 21%;">
                  <div class="HintNameTwo">升迁后职位</div>
                  <el-select v-model="AddEmpPromotionForm.Emp_NLevel" placeholder="请选择现职位" style="width: 278px;">
                    <el-option v-for="item in NLevelList" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Emp_IsNowExec" style="width: 21%;">
                  <div class="HintNameTwo">是否立即生效</div>
                  <el-radio v-model="AddEmpPromotionForm.Emp_IsNowExec" label="1"
                            @click.native.prevent="onChangeNowValue('1')">是
                  </el-radio>
                  <el-radio v-model="AddEmpPromotionForm.Emp_IsNowExec" label="0"
                            @click.native.prevent="onChangeNowValue('0')">否
                  </el-radio>
                </el-form-item>
              </el-form>
            </div>
            <div class="btnEmpProBox">
              <el-button type="primary" icon="el-icon-circle-close-outline"
                         @click="resetEmpProForm('AddEmpPromotionForm')">重置
              </el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitEmpProMethod('AddEmpPromotionForm')">保存
              </el-button>
            </div>
            <div>
              <el-table :data="EmpPromotionList" style="width: 98%; color: #3a3a3a;"
                        :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
                <el-table-column prop="Emp_Month" label="升迁月份" align="center"></el-table-column>
                <el-table-column prop="Emp_OName" label="原职位" align="center"></el-table-column>
                <el-table-column prop="Emp_NName" label="现职位" align="center"></el-table-column>
                <el-table-column prop="CreateDate" label="时间" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editEmpPromotion(scope.row)">编辑</el-button>
                    <el-button type="text" size="small"
                               @click="deleteEmpPromotion(scope.row,scope.$index,EmpPromotionList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <DeleteEmpPro ref="deleteEmpParam"></DeleteEmpPro>
          </div>
        </el-tab-pane>
        <el-tab-pane label="员工培训">
          <div>
            <div style="width: 98%;text-align: left;">
              <el-form :model="AddEmpTrainForm" :rules="rules" ref="AddEmpTrainForm" status-icon :inline="true"
                       label-position="top">
                <div>
                  <el-form-item prop="Emt_Name">
                    <div class="HintNameTwo">课程名称</div>
                    <el-input v-model="AddEmpTrainForm.Emt_Name" placeholder="请输入课程名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="Emt_Teacher">
                    <div class="HintNameTwo">培训老师</div>
                    <el-input v-model="AddEmpTrainForm.Emt_Teacher" placeholder="请输入培训老师"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="Emt_StartDate">
                    <div class="HintNameTwo">开始日期</div>
                    <el-date-picker v-model="AddEmpTrainForm.Emt_StartDate" type="date"
                                    placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item prop="Emt_EndDate">
                    <div class="HintNameTwo">结束日期</div>
                    <el-date-picker v-model="AddEmpTrainForm.Emt_EndDate" type="date"
                                    placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item prop="Emt_IsFinish">
                    <div class="HintNameTwo">是否毕业</div>
                    <el-radio v-model="AddEmpTrainForm.Emt_IsFinish" label="1"
                              @click.native.prevent="onChangeFinishValue('1')">是
                    </el-radio>
                    <el-radio v-model="AddEmpTrainForm.Emt_IsFinish" label="0"
                              @click.native.prevent="onChangeFinishValue('0')">否
                    </el-radio>
                  </el-form-item>
                </div>
                <div style="margin-top: -15px;margin-bottom: -20px">
                  <el-form-item prop="Emt_Content">
                    <div class="HintNameTwo">培训内容</div>
                    <el-input v-model="AddEmpTrainForm.Emt_Content" type="textarea" :rows="3" style="width: 500px;"
                              placeholder="请输入内容"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="btnEmpProBox">
              <el-button type="primary" icon="el-icon-circle-close-outline"
                         @click="resetEmpTrainForm('AddEmpTrainForm')">重置
              </el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitEmpTrainMethod('AddEmpTrainForm')">保存
              </el-button>
            </div>
            <div>
              <el-table :data="EmpTrainList" style="width: 98%; color: #3a3a3a;"
                        :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
                <el-table-column prop="Emt_Name" label="课程名称" align="center"></el-table-column>
                <el-table-column prop="Emt_Teacher" label="培训老师" align="center"></el-table-column>
                <el-table-column prop="Emt_StartDate" label="开始时间" align="center"></el-table-column>
                <el-table-column prop="Emt_EndDate" label="结束时间" align="center"></el-table-column>
                <el-table-column prop="Emt_IsFinish" label="是否毕业" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editEmpTrain(scope.row)">编辑</el-button>
                    <el-button type="text" size="small"
                               @click="deleteEmpTrain(scope.row,scope.$index,EmpTrainList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <DeleteEmpTrain ref="deleteEmpTrainParam"></DeleteEmpTrain>
          </div>
        </el-tab-pane>
        <el-tab-pane label="员工调店">
          <div>
            <div style="width: 98%;text-align: left;">
              <el-form :model="AddEmpChangeForm" :rules="rules" ref="AddEmpChangeForm" status-icon :inline="true"
                       label-position="top">
                <div>
                  <el-form-item prop="OFe_GUID">
                    <div class="HintNameTwo">老门店名称</div>
                    <el-select v-model="AddEmpChangeForm.OFe_GUID" placeholder="请选择老门店名称" style="width: 278px;">
                      <el-option v-for="item in OFeGUIDList" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="OEm_GUID">
                    <div class="HintNameTwo">老员工编号</div>
                    <el-input v-model="AddEmpChangeForm.OEm_GUID" placeholder="请输入老员工编号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="Ec_OLevel">
                    <div class="HintNameTwo">老门店职位</div>
                    <el-select v-model="AddEmpChangeForm.Ec_OLevel" placeholder="请选择老门店职位" style="width: 278px;">
                      <el-option v-for="item in EcOLevelList" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="NFe_GUID">
                    <div class="HintNameTwo">新门店名称</div>
                    <el-select v-model="AddEmpChangeForm.NFe_GUID" placeholder="请选择新门店名称" style="width: 278px;">
                      <el-option v-for="item in NFeGUIDList" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="Ec_NLevel">
                    <div class="HintNameTwo">新门店职位</div>
                    <el-select v-model="AddEmpChangeForm.Ec_NLevel" placeholder="请选择新门店职位" style="width: 278px;">
                      <el-option v-for="item in EcNLevelList" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="margin-top: -15px;margin-bottom: -20px">
                  <el-form-item prop="NEm_GUID">
                    <div class="HintNameTwo">新员工编号</div>
                    <el-input v-model="AddEmpChangeForm.NEm_GUID" placeholder="请输入新员工编号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="Ec_DispatchType">
                    <div class="HintNameTwo">派遣类型</div>
                    <el-select v-model="AddEmpChangeForm.Ec_DispatchType" placeholder="请选择派遣类型" style="width: 278px;">
                      <el-option v-for="item in EcDispatchTypeList" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="Ec_DispatchDesc">
                    <div class="HintNameTwo">派遣说明</div>
                    <el-input v-model="AddEmpChangeForm.Ec_DispatchDesc" type="textarea" :rows="3" style="width: 500px;"
                              placeholder="请输入内容"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="btnEmpProBox">
              <el-button type="primary" icon="el-icon-circle-close-outline"
                         @click="resetEmpChangeForm('AddEmpChangeForm')">重置
              </el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline"
                         @click="submitEmpChangeMethod('AddEmpChangeForm')">保存
              </el-button>
            </div>
            <div>
              <el-table :data="EmpChangeList" style="width: 98%; color: #3a3a3a;"
                        :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
                <el-table-column prop="OFe_Name" label="老门店名称" align="center"></el-table-column>
                <el-table-column prop="Emp_OName" label="老门店职位" align="center"></el-table-column>
                <el-table-column prop="NFe_Name" label="新门店名称" align="center"></el-table-column>
                <el-table-column prop="Emp_NName" label="新门店职位" align="center"></el-table-column>
                <el-table-column prop="Ec_DispatchType" label="派遣类别" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editEmpTrain(scope.row)">编辑</el-button>
                    <el-button type="text" size="small"
                               @click="deleteEmpChange(scope.row,scope.$index,EmpChangeList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <DeleteEmpTrain ref="deleteEmpTrainParam"></DeleteEmpTrain>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>

<script>
  import DeleteEmpPro from './DeleteEmpPro'
  import DeleteEmpTrain from './DeleteEmpTrain'
  import {
    DetailEmployeeList,
    EditEmployeeList,
    CommonDictionaryTree,
    queryStoreList,
    QueryEmpList,
    QueryHairType,
    QueryEmpPromotionList,
    AddEmpPromotionList,
    QueryEp,
    EditEP,
    AddEmpTrainList,
    QueryEmpTrainList,
    QueryEt,EditET
  } from "../../../config/Api.js"

  export default {
    data() {
      return {
        EditEmpManagerForm: {
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
          Em_IsManagerSign: '',
          Em_ManSignCode: '',
          State: '',
        },
        LevelList: [],
        FeNameList: [],
        HairTypeList: [],
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
          ],
          Em_WorkDate: [
            {required: true, message: '请选择年月日', trigger: 'blur'},
          ],
          Em_ArrivalFenTime: [
            {required: true, message: '请选择年月日', trigger: 'blur'},
          ],
          Em_JobTitle: [
            {required: true, message: '请选择职称', trigger: 'blur'},
          ],
        },
        //员工升迁
        EmpPromotionList: [],
        AddEmpPromotionForm: {
          Emp_Month: '',
          Emp_OLevel: '',
          Emp_NLevel: '',
          Emp_IsNowExec: '',
        },
        OLevelList: [],
        NLevelList: [],
        MonthList: [
          {
            name: '1',
            value: '1',
          },
          {
            name: '2',
            value: '2',
          },
          {
            name: '3',
            value: '3',
          },
          {
            name: '4',
            value: '4',
          },
          {
            name: '5',
            value: '5',
          },
          {
            name: '6',
            value: '6',
          },
          {
            name: '7',
            value: '7',
          },
          {
            name: '8',
            value: '8',
          },
          {
            name: '9',
            value: '9',
          },
          {
            name: '10',
            value: '10',
          },
          {
            name: '11',
            value: '11',
          },
          {
            name: '12',
            value: '12',
          },
        ],
        //需要传入的guid
        Emp_GUID: '',
        EmpTrainGUID: '',
        //员工培训
        AddEmpTrainForm: {
          Emt_Name: '',
          Emt_Teacher: '',
          Emt_StartDate: '',
          Emt_EndDate: '',
          Emt_Content: '',
          Emt_IsFinish: '',
        },
        EmpTrainList: [],
        //员工调店
        AddEmpChangeForm:{
          OFe_GUID:'',
          OEm_GUID:'',
          Ec_OLevel:'',
          NFe_GUID:'',
          NEm_GUID:'',
          Ec_NLevel:'',
          Ec_DispatchType:'',
          Ec_DispatchDesc:'',
        },
        EmpChangeList:[],
        EcDispatchTypeList:[],//派遣类别
        EcNLevelList:[],//新门店职位
        EcOLevelList:[],//老门店职位
        NFeGUIDList:[],//新门店名称
        OFeGUIDList:[],//老门店名称
      }
    },
    components: {
      DeleteEmpPro, DeleteEmpTrain
    },
    created() {
      this.querySelectData();
      this.queryStoreList();
      this.queryIntroduceList();
      this.queryHairTypeList();
      this.queryEmpManagerMethod();
      this.queryEmpPromotionList();
      this.queryEmpTrainList();
    },
    methods: {
      onChangeValue() {   //经理签单 0为否1为是
        if (this.AddEmpManagerForm.Em_IsManagerSign === "0") {
          this.AddEmpManagerForm.Em_IsManagerSign = "1";
        } else {
          this.AddEmpManagerForm.Em_IsManagerSign = '0';
          this.AddEmpManagerForm.Em_ManSignCode = '';
        }
      },
      //查询所有下拉框数据
      querySelectData() {
        let params = {
          CoCode: ["AN13", "AV21", "AM12", "BE30"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AN13') {
              this.LevelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AV21') {
              this.GuidlList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AM12') {
              this.JobTitleList = resp.data.data[position].List;
              this.OLevelList = resp.data.data[position].List;
              this.NLevelList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BE30') {
              this.HairTypeList = resp.data.data[position].List;
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
      //查询员工信息
      queryEmpManagerMethod() {
        let Guid = this.$route.params.Guid;
        this.$http.get(DetailEmployeeList + Guid).then(resp => {
          if (resp.data.code === 0) {
            this.EditEmpManagerForm.Em_Name = resp.data.data.Em_Name;
            this.EditEmpManagerForm.Em_Stage = resp.data.data.Em_Stage;
            this.EditEmpManagerForm.Em_Level = resp.data.data.Em_Level;
            this.EditEmpManagerForm.De_GUID = resp.data.data.De_GUID;
            this.EditEmpManagerForm.Fe_GUID = resp.data.data.Fe_GUID;
            this.EditEmpManagerForm.Em_Sex = resp.data.data.Em_Sex;
            this.EditEmpManagerForm.Em_Salary = resp.data.data.Em_Salary;
            this.EditEmpManagerForm.Em_IdCard = resp.data.data.Em_IdCard;
            this.EditEmpManagerForm.Em_Birthday = resp.data.data.Em_Birthday;
            this.EditEmpManagerForm.Em_Tel = resp.data.data.Em_Tel;
            this.EditEmpManagerForm.Em_Phone = resp.data.data.Em_Phone;
            this.EditEmpManagerForm.Em_Address = resp.data.data.Em_Address;
            this.EditEmpManagerForm.Em_ArrivalFenTime = resp.data.data.Em_ArrivalFenTime;
            this.EditEmpManagerForm.Em_JobTitle = resp.data.data.Em_JobTitle;
            this.EditEmpManagerForm.Em_WeChatNo = resp.data.data.Em_WeChatNo;
            this.EditEmpManagerForm.Em_HelpReNo = resp.data.data.Em_HelpReNo;
            this.EditEmpManagerForm.Em_Image = resp.data.data.Em_Image;//员工头像
            this.EditEmpManagerForm.Em_High = resp.data.data.Em_High;
            this.EditEmpManagerForm.Em_Height = resp.data.data.Em_Height;
            this.EditEmpManagerForm.Em_HealthNo = resp.data.data.Em_HealthNo;
            this.EditEmpManagerForm.Em_HealthTrem = resp.data.data.Em_HealthTrem;
            this.EditEmpManagerForm.Em_HireType = resp.data.data.Em_HireType;
            this.EditEmpManagerForm.Em_Introducer = resp.data.data.Em_Introducer;
            this.EditEmpManagerForm.Em_WorkDate = resp.data.data.Em_WorkDate;
            this.EditEmpManagerForm.Em_IsReserve = resp.data.data.Em_IsReserve;
            this.EditEmpManagerForm.Em_IsPad = resp.data.data.Em_IsPad;
            this.EditEmpManagerForm.Em_Business = resp.data.data.Em_Business;
            this.EditEmpManagerForm.State = resp.data.data.State;
            this.EditEmpManagerForm.Em_HairItem = resp.data.data.Em_HairItem;
            this.EditEmpManagerForm.Em_Education = resp.data.data.Em_Education;
            this.EditEmpManagerForm.Em_Email = resp.data.data.Em_Email;
            this.EditEmpManagerForm.Em_IsManagerSign = resp.data.data.Em_IsManagerSign;//经理签单 0为否1为是
            this.EditEmpManagerForm.Em_ManSignCode = resp.data.data.Em_ManSignCode;//经理签单口令
            this.EditEmpManagerForm.Em_Account = resp.data.data.Em_Account;
            this.EditEmpManagerForm.Em_PassWord = resp.data.data.Em_PassWord;
            this.EditEmpManagerForm.Em_PersonalStatement = resp.data.data.Em_PersonalStatement;
            this.EditEmpManagerForm.Em_Desc = resp.data.data.Em_Desc;
          }
        });
      },
      editEmpManagerMethod() {
        let param = {
          Em_GUID: this.$route.params.Guid,
          Em_Name: this.EditEmpManagerForm.Em_Name,
          Em_Stage: this.EditEmpManagerForm.Em_Stage,
          Em_Level: this.EditEmpManagerForm.Em_Level,
          De_GUID: this.EditEmpManagerForm.De_GUID,
          Fe_GUID: this.EditEmpManagerForm.Fe_GUID,
          Em_Sex: this.EditEmpManagerForm.Em_Sex,
          Em_Salary: this.EditEmpManagerForm.Em_Salary,
          Em_IdCard: this.EditEmpManagerForm.Em_IdCard,
          Em_Birthday: this.EditEmpManagerForm.Em_Birthday,
          Em_Tel: this.EditEmpManagerForm.Em_Tel,
          Em_Phone: this.EditEmpManagerForm.Em_Phone,
          Em_Address: this.EditEmpManagerForm.Em_Address,
          Em_ArrivalFenTime: this.EditEmpManagerForm.Em_ArrivalFenTime,
          Em_JobTitle: this.EditEmpManagerForm.Em_JobTitle,
          Em_WeChatNo: this.EditEmpManagerForm.Em_WeChatNo,
          Em_HelpReNo: this.EditEmpManagerForm.Em_HelpReNo,
          Em_Image: '',//员工头像
          Em_High: this.EditEmpManagerForm.Em_High,
          Em_Height: this.EditEmpManagerForm.Em_Height,
          Em_HealthNo: this.EditEmpManagerForm.Em_HealthNo,
          Em_HealthTrem: this.EditEmpManagerForm.Em_HealthTrem,
          Em_HireType: this.EditEmpManagerForm.Em_HireType,
          Em_Introducer: this.EditEmpManagerForm.Em_Introducer,
          Em_WorkDate: this.EditEmpManagerForm.Em_WorkDate,
          Em_IsReserve: this.EditEmpManagerForm.Em_IsReserve,
          Em_IsPad: this.EditEmpManagerForm.Em_IsPad,
          Em_Business: this.EditEmpManagerForm.Em_Business,
          State: this.EditEmpManagerForm.State,
          Em_HairItem: this.EditEmpManagerForm.Em_HairItem,
          Em_Education: this.EditEmpManagerForm.Em_Education,
          Em_Email: this.EditEmpManagerForm.Em_Email,
          Em_IsManagerSign: this.EditEmpManagerForm.Em_IsManagerSign,//经理签单 0为否1为是
          Em_ManSignCode: this.EditEmpManagerForm.Em_ManSignCode,//经理签单口令
          Em_Account: this.EditEmpManagerForm.Em_Account,
          Em_PassWord: this.EditEmpManagerForm.Em_PassWord,
          Em_PersonalStatement: this.EditEmpManagerForm.Em_PersonalStatement,
          Em_Desc: this.EditEmpManagerForm.Em_Desc,
        };
        this.$http.post(EditEmployeeList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        });
      },
      //提交表单
      submitEmpMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editEmpManagerMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetEmpForm(EditEmpManagerForm) {
        this.$refs[EditEmpManagerForm].resetFields();
      },
      //查询员工升迁列表
      queryEmpPromotionList() {
        this.$http.get(QueryEmpPromotionList + this.$route.params.Guid).then(resp => {
          this.EmpPromotionList = resp.data.data;
        });
      },
      onChangeNowValue(data) {
        this.AddEmpPromotionForm.Emp_IsNowExec = data;
      },
      //新增员工升迁
      addEmpPromotion() {
        let param = {
          Em_GUID: this.$route.params.Guid,
          Emp_Month: this.AddEmpPromotionForm.Emp_Month,
          Emp_OLevel: this.AddEmpPromotionForm.Emp_OLevel,
          Emp_NLevel: this.AddEmpPromotionForm.Emp_NLevel,
          Emp_IsNowExec: this.AddEmpPromotionForm.Emp_IsNowExec,
        };
        this.$http.post(AddEmpPromotionList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        });
      },
      //查询员工升迁
      queryEmpPromotion(empGuid) {
        this.$http.post(QueryEp + empGuid).then(resp => {
          if (resp.data.code === 0) {
            this.AddEmpPromotionForm.Emp_Month = resp.data.data.Emp_Month;
            this.AddEmpPromotionForm.Emp_OLevel = resp.data.data.Emp_OLevel;
            this.AddEmpPromotionForm.Emp_NLevel = resp.data.data.Emp_NLevel;
            this.AddEmpPromotionForm.Emp_IsNowExec = resp.data.data.Emp_IsNowExec + '';
          }
        })
      },
      //编辑员工升迁
      editEmpPromotion(row) {
        //直接修改上面数据
        this.Emp_GUID = row.Emp_GUID;
        this.queryEmpPromotion(row.Emp_GUID);
      },
      editEmpPro() {
        let param = {
          Emp_GUID: this.Emp_GUID,
          Emp_Month: this.AddEmpPromotionForm.Emp_Month,
          Emp_OLevel: this.AddEmpPromotionForm.Emp_OLevel,
          Emp_NLevel: this.AddEmpPromotionForm.Emp_NLevel,
          Emp_IsNowExec: this.AddEmpPromotionForm.Emp_IsNowExec,
          Em_GUID: this.$route.params.Guid,
        };
        this.$http.post(EditEP, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        });
      },
      //删除员工升迁
      deleteEmpPromotion(rows, index, data) {
        this.$store.state.deleteEmpPromotionIsShow = true; //设置对话框显示
        this.$refs.deleteEmpParam.currentRows = rows;
        this.$refs.deleteEmpParam.currentIndex = index;
        this.$refs.deleteEmpParam.EmpProData = data;
      },
      //提交表单
      submitEmpProMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.Emp_GUID === '') {
              this.addEmpPromotion();
            } else {
              this.editEmpPro();
            }
            this.queryEmpPromotionList();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetEmpProForm(AddEmpPromotionForm) {
        this.$refs[AddEmpPromotionForm].resetFields();
      },
      //查询员工培训列表
      queryEmpTrainList() {
        this.$http.post(QueryEmpTrainList + this.$route.params.Guid).then(resp => {
          let list = [];
          let EmtIsFinish = "";
          for (let i in resp.data.data) {
            if (resp.data.data[i].Emt_IsFinish === 0) {
              EmtIsFinish = "否";
            } else {
              EmtIsFinish = "是";
            }
            resp.data.data[i]["Emt_IsFinish"] = EmtIsFinish; //状态
            list.push(resp.data.data[i]);
          }
          this.EmpTrainList = list;
        });
      },
      //新增员工培训列表
      addEmpTrainList() {
        let param = {
          Em_GUID: this.$route.params.Guid,
          Emt_Code: '1',//写死
          Emt_Name: this.AddEmpTrainForm.Emt_Name,
          Emt_Teacher: this.AddEmpTrainForm.Emt_Teacher,
          Emt_StartDate: this.AddEmpTrainForm.Emt_StartDate,
          Emt_EndDate: this.AddEmpTrainForm.Emt_EndDate,
          Emt_Content: this.AddEmpTrainForm.Emt_Content,
          Emt_IsFinish: this.AddEmpTrainForm.Emt_IsFinish,
        };
        this.$http.post(AddEmpTrainList, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        });
      },
      //查询员工培训
      queryEmpTrain(emtGuid) {
        this.$http.post(QueryEt + emtGuid).then(resp => {
          if (resp.data.code === 0) {
            this.AddEmpTrainForm.Emt_Name = resp.data.data.Emt_Name;
            this.AddEmpTrainForm.Emt_Teacher = resp.data.data.Emt_Teacher;
            this.AddEmpTrainForm.Emt_StartDate = resp.data.data.Emt_StartDate;
            this.AddEmpTrainForm.Emt_EndDate = resp.data.data.Emt_EndDate;
            this.AddEmpTrainForm.Emt_Content = resp.data.data.Emt_Content;
            this.AddEmpTrainForm.Emt_IsFinish = resp.data.data.Emt_IsFinish + '';
          }
        })
      },
      //编辑培训列表
      editEmpTrain(row) {
        this.EmpTrainGUID=row.Emt_GUID;
        this.queryEmpTrain(row.Emt_GUID);
      },
      editEmpTrainTwo() {
        let param = {
          Emt_GUID: this.EmpTrainGUID,
          Emt_Name: this.AddEmpTrainForm.Emt_Name,
          Emt_Teacher: this.AddEmpTrainForm.Emt_Teacher,
          Emt_StartDate: this.AddEmpTrainForm.Emt_StartDate,
          Emt_EndDate: this.AddEmpTrainForm.Emt_EndDate,
          Emt_Content: this.AddEmpTrainForm.Emt_Content,
          Emt_IsFinish: this.AddEmpTrainForm.Emt_IsFinish,
          Emt_Code: "1",
          Em_GUID: this.$route.params.Guid,
        };
        this.$http.post(EditET, this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        });
      },
      onChangeFinishValue(data) {
        this.AddEmpTrainForm.Emt_IsFinish = data;
      },
      //删除员工培训列表
      deleteEmpTrain(rows, index, data) {
        this.$store.state.deleteEmpTrainIsShow = true; //设置对话框显示
        this.$refs.deleteEmpTrainParam.currentRows = rows;
        this.$refs.deleteEmpTrainParam.currentIndex = index;
        this.$refs.deleteEmpTrainParam.EmpTrainData = data;
      },
      //提交员工培训表单
      submitEmpTrainMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.EmpTrainGUID === '') {
            this.addEmpTrainList();
            } else {
              this.editEmpTrainTwo();
            }
            this.queryEmpTrainList();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetEmpTrainForm(AddEmpTrainForm) {
        this.$refs[AddEmpTrainForm].resetFields();
      },
      //员工调店 员工调店 员工调店 员工调店 员工调店 员工调店 员工调店
      //提交员工调店表单
      submitEmpChangeMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.EmpTrainGUID === '') {
            //   this.addEmpTrainList();
            // } else {
            //   this.editEmpTrainTwo();
            // }
            // this.queryEmpTrainList();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetEmpChangeForm(resetEmpChangeForm) {
        this.$refs[resetEmpChangeForm].resetFields();
      },
      //删除员工调店列表
      deleteEmpChange(rows, index, data) {
        // this.$store.state.deleteEmpTrainIsShow = true; //设置对话框显示
        // this.$refs.deleteEmpTrainParam.currentRows = rows;
        // this.$refs.deleteEmpTrainParam.currentIndex = index;
        // this.$refs.deleteEmpTrainParam.EmpTrainData = data;
      },
    },
    name: "EditEmpManager"
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

  .btnEmpProBox .el-button {
    height: 38px;
  }
</style>
<style scoped>
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

  .HintNameTwo {
    color: #606266;
    font-size: 14px;
    line-height: 25px;
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

  .btnBox {
    width: 98%;
    text-align: end;
    height: 0;
  }

  .btnEmpProBox {
    width: 98%;
    text-align: center;
    margin-bottom: 20px;
  }

</style>
