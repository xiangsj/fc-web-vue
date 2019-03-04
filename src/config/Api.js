const BaseUrl = "http://app.feicuisoft.com/";


export const UserLoginApi = `${BaseUrl}api/UserAPI/Login`;  //用户登录
export const UserListApi = `${BaseUrl}api/UserAPI/GetUserList`;  //用户列表
export const AddUserApi = `${BaseUrl}api/UserAPI/Add`;  //添加用户
export const EditUserApi = `${BaseUrl}api/UserAPI/Edit`;  //修改用户
export const DeleteUserApi = `${BaseUrl}api/UserAPI/Del/`;  //删除用户
export const UserDetailApi = `${BaseUrl}api/UserAPI/GetUser/`;  //查看用户详情

export const MenuTreeApi = `${BaseUrl}api/MenuAPI/MenuTree`;  //菜单树
export const MenuListApi = `${BaseUrl}api/MenuAPI/GetMenuList`;  //菜单列表

export const FenDianTreeApi = `${BaseUrl}api/FenDianAPI/FenDianTree`;  //分店树
export const QueryMenuList = `${BaseUrl}api/MenuAPI/GetMenuList`;  //模块功能列表


export const RoleListApi = `${BaseUrl}api/RoleAPI/GetRoleList`; //角色列表
export const GetRoleList = `${BaseUrl}api/RoleAPI/List`; //获取所有角色
export const AddRoleApi = `${BaseUrl}api/RoleAPI/Add`; //添加角色
export const EditRoleApi = `${BaseUrl}api/RoleAPI/Edit`; //修改角色
export const DeleteRoleApi = `${BaseUrl}api/RoleAPI/Del/`; //删除角色
export const DetailRoleApi = `${BaseUrl}api/RoleAPI/GetRole/`; //角色详情

export const PayMethodApi = `${BaseUrl}api/PaymentTypeAPI/GetPaymentTypeList`; //支付方式
export const DeletePayApi = `${BaseUrl}api/PaymentTypeAPI/Del/`; //删除支付方式
export const AddPayApi = `${BaseUrl}api/PaymentTypeAPI/Add`; //添加支付方式
export const EditPayApi = `${BaseUrl}api/PaymentTypeAPI/Edit`; //编辑支付方式
export const QueryPayApi = `${BaseUrl}api/PaymentTypeAPI/GetPaymentType/`; //查询某条支付方式


export const IndexProject = `${BaseUrl}api/ProductItemAPI/ProductItemList/`;//项目管理


export const QueryConfigTree = `${BaseUrl}api/CommonDictionaryAPI/CommonDictionaryTree`; //查询参数配置大类列表
export const QueryConfigTreeList = `${BaseUrl}api/CommonDictionaryAPI/CommonDictionaryList`; //查询参数配置大类列表点击子类item
export const AddConfigList = `${BaseUrl}api/CommonDictionaryAPI/Add`; //添加参数设置
export const DeleteConfigList = `${BaseUrl}api/CommonDictionaryAPI/Del/`; //删除参数设置
export const QueryConfigList = `${BaseUrl}api/CommonDictionaryAPI/Detail/`; //查询参数设置
export const UpdateConfigList = `${BaseUrl}api/CommonDictionaryAPI/Edit`; //修改参数设置

export const SelectTreeList = `${BaseUrl}api/FenDianAPI/SearchFenDianTree/`; //门店层级管理-input门店树

export const StoreTreeList = `${BaseUrl}api/FenDianAPI/FenDianTree`; //门店层级管理-模态框门店树
export const AddStoreTreeList = `${BaseUrl}api/FenDianAPI/Add`; //门店层级管理-添加门店信息
export const EditStoreTreeList = `${BaseUrl}api/FenDianAPI/Edit`; //门店层级管理-修改门店信息
export const QueryStoreTreeList = `${BaseUrl}api/FenDianAPI/Detail/`; //门店层级管理-查询门店信息
export const GetProvinceList = `${BaseUrl}api/RegionAPI/ProList`; //获取省份列表数据
export const GetCityList = `${BaseUrl}api/RegionAPI/CityList/`; //获取城市区域列表数据


export const supplierList = `${BaseUrl}api/ProviderAPI/GetProviderList`; //获取供应商列表数据
export const AddSupplierList = `${BaseUrl}api/ProviderAPI/Add`; //新增供应商数据
export const QuerySupplierList = `${BaseUrl}api/ProviderAPI/Detail/`; //查询供应商数据
export const EditSupplierList = `${BaseUrl}api/ProviderAPI/Edit`; //修改供应商数据
export const DeleteSupplierList = `${BaseUrl}api/ProviderAPI/Del/`; //删除供应商数据


export const RoomList = `${BaseUrl}api/RoomAPI/GetRoomList`; //获取房间列表数据
export const AddRoomList = `${BaseUrl}api/RoomAPI/Add`; //新增房间数据
export const EditRoomList = `${BaseUrl}api/RoomAPI/Edit`; //修改房间数据
export const DetailRoomList = `${BaseUrl}api/RoomAPI/Detail/`; //查询房间数据
export const DeleteRoomList = `${BaseUrl}api/RoomAPI/Del/`; //删除房间数据
export const queryStoreList = `${BaseUrl}api/FenDianAPI/FenDianDropList`; //查询门店数据

export const EmployeeList = `${BaseUrl}api/EmployeeAPI/EmployeeList`; //获取员工列表数据tablePayList
export const AddEmployeeList = `${BaseUrl}api/EmployeeAPI/AddEmployee`; //新增员工数据
export const DeleteEmployeeList = `${BaseUrl}api/EmployeeAPI/DelEmployee/`; //删除员工数据
export const DetailEmployeeList = `${BaseUrl}api/EmployeeAPI/GetEmployee/`; //查询员工数据
export const EditEmployeeList = `${BaseUrl}api/EmployeeAPI/EditEmployee`; //编辑员工数据
export const QueryEmpPromotionList = `${BaseUrl}api/EmployeeAPI/EmployeePromotionList/`; //查询员工升迁列表
export const AddEmpPromotionList = `${BaseUrl}api/EmployeeAPI/AddEP`; //新增员工升迁
export const QueryEp = `${BaseUrl}api/EmployeeAPI/GetEP/`; //查询员工升迁数据
export const EditEP = `${BaseUrl}api/EmployeeAPI/EditEP`; //修改员工升迁数据
export const DelEP = `${BaseUrl}api/EmployeeAPI/DelEP/`; //删除员工升迁数据
export const AddEmpTrainList = `${BaseUrl}api/EmployeeAPI/AddET`; //新增员工培训
export const QueryEmpTrainList = `${BaseUrl}api/EmployeeAPI/EmployeeTrainList/`; //查询员工培训列表
export const DelET = `${BaseUrl}api/EmployeeAPI/DelET/`; //删除员工培训数据
export const QueryEt = `${BaseUrl}api/EmployeeAPI/GetET/`; //查询员工培训数据
export const EditET = `${BaseUrl}api/EmployeeAPI/EditET`; //修改员工升迁数据

export const AddEmpChangeList = `${BaseUrl}api/EmployeeAPI/AddECF`; //新增员工调店
export const QueryEmpChangeList = `${BaseUrl}api/EmployeeAPI/ECFList/`; //查询员工调店列表
export const QueryECF = `${BaseUrl}api/EmployeeAPI/GetECF/`; //查询员工调店
export const DelECF = `${BaseUrl}api/EmployeeAPI/DelECF/`; //删除员工调店
export const EditECF = `${BaseUrl}api/EmployeeAPI/EditECF`; //修改员工升迁数据

export const AddEmpPerformList = `${BaseUrl}api/EmployeeAPI/AddEmployeePerformance`; //新增员工指标
export const QueryEmpPerformList = `${BaseUrl}api/EmployeeAPI/EmployeePerformanceList/`; //查询员工指标列表
export const DelEPIndex = `${BaseUrl}api/EmployeeAPI/DelEmployeePerformance/`; //删除员工指标列表
export const QueryEPIndex = `${BaseUrl}api/EmployeeAPI/GetEmployeePerformance/`; //查询员工指标数据
export const EditEPIndex = `${BaseUrl}api/EmployeeAPI/EditEmployeePerformance`; //修改员工指标数据


export const Project = `${BaseUrl}api/ProductItemAPI/ProductItemList`;  //获取产品列表
export const AddProductItem = `${BaseUrl}api/ProductItemAPI/AddProductItem`;//新增项目/产品
export const UpdateProject = `${BaseUrl}api/ProductItemAPI/ProductItemDetail/`; //根据id查询项目
export const EditProject = `${BaseUrl}api/ProductItemAPI/EditProductItem`; //修改项目
export const Delectproject = `${BaseUrl}api/ProductItemAPI/DelProductItem/`; //根据id删除项目


export const CardClassAPI = `${BaseUrl}api/CardClassAPI/cList`;//获取卡级
export const AddCard = `${BaseUrl}api/CardClassAPI/Add`; //新增卡级信息
export const OneCard = `${BaseUrl}api/CardClassAPI/GetCardClassInfo/`; //新增卡级信息
export const UpdateCard = `${BaseUrl}api/CardClassAPI/Edit`; //修改卡级基础信息
export const DeletCard = `${BaseUrl}api/CardClassAPI/Del/`; //删除卡级信息


export const CommonDictionaryTree = `${BaseUrl}api/CommonDictionaryAPI/CommonDictionaryTree/`;//获取所有的下拉框数据接口
export const QueryHairType = `${BaseUrl}api/ProductItemAPI/ProductItemDorpList?TypeId=`;//剪发项目/产品项目列表数据 1产品2项目
export const QueryEmpList = `${BaseUrl}api/EmployeeAPI/EmployeeDropList`;//介绍人
export const QueryFenDianList = `${BaseUrl}api/EmployeeAPI/EmployeeDropFenDianList/`;//获取员工下拉框列表按照门店不分页

export const CarFendian = `${BaseUrl}api/ProductItemAPI/AddProductItemFendian`;//项目管理中分店添加
export const GetCard = `${BaseUrl}api/CardClassAPI/GetFDCardClass?Fe_GUID=`; //获取卡级信息
export const GetCaed = `${BaseUrl}api/ProductItemAPI/ProductItemFenDianCardPriceList/`; //获取卡级信息
export const AddItemTime = `${BaseUrl}api/CardClassAPI/AddItemTime`; //上传套餐信息
export const CardFen = `${BaseUrl}api/CardClassAPI/CardFenDianPriceList/`; //查询卡对应门店价格表
export const CardFree = `${BaseUrl}api/CardClassAPI/CardFreeItemList/`; //查询赠送设置表
export const ItemTime = `${BaseUrl}api/CardClassAPI/ItemTimeList/`; //项目计次表

export const AddFenCard = `${BaseUrl}api/CardClassAPI/AddCardFenDianPrice`;//新增卡级分店
export const AddCardItem = `${BaseUrl}api/CardClassAPI/AddCardFreeItem`;//新增赠送额
export const ProFenItem = `${BaseUrl}api/ProductItemAPI/ProductItemFendianList/`;//查询产品项目对应的门店价格
export const GetProduct = `${BaseUrl}api/ProductItemAPI/GetProductItemByType`;//查询套餐树
export const AddProduct = `${BaseUrl}api/ProductItemAPI/AddProductItemFenDianCard`;//新增产品项目对应会员卡价格
/**
 * 会员信息
 */
export const QueryManagerList = `${BaseUrl}api/MemberAPI/cList`; //查询会员列表
export const AddManagerShip = `${BaseUrl}api/MemberAPI/Add`; //新增会员信息
export const ExplainCard = `${BaseUrl}api/MemberCardAPI/MemeberCardUpCard`; //会员卡补卡
export const QueryAllCard = `${BaseUrl}api/MemberAPI/GetMeCardList?Me_GUID=`; //查询要补的卡
export const DeletePatchCard = `${BaseUrl}api/MemberAPI/Del/`; //删除会员补卡
export const QueryPatchCard = `${BaseUrl}api/MemberAPI/GetCardClassInfo/`;//查询会员
export const EditPatchCard = `${BaseUrl}api/MemberAPI/Edit`; //修改会员
export const QueryStorageList = `${BaseUrl}api/MemberDepositHistory/MemberDepositHistoryList`; //查询寄存列表
export const AddStorage = `${BaseUrl}api/MemberDepositHistory/AddMemberDepositHistory`; //新增寄存
export const DeleteStorage = `${BaseUrl}api/MemberDepositHistory/DelMemberDepositHistory/`; //删除寄存
export const QueryStorage = `${BaseUrl}api/MemberDepositHistory/GetMemberDepositHistory/`; //查询寄存
export const EditStorage = `${BaseUrl}api/MemberDepositHistory/EditMemberDepositHistory`; //修改寄存
export const QueryProduct = `${BaseUrl}api/ProductItemAPI/ProductItemByType?Pro_Code=`; //根据产品类别查产品
export const GetCommuniceList = `${BaseUrl}api/MemberCommunication/MemberCommunicationList`; //获取沟通记录列表数据
export const AddCommuniceList = `${BaseUrl}api/MemberCommunication/AddMemberCommunication`; //新增会员沟通
export const DeleteCommuniceList = `${BaseUrl}api/MemberCommunication/DelMemberCommunication/`; //删除会员沟通
export const EditCommuniceList = `${BaseUrl}api/MemberCommunication/EditMemberCommunication`; //修改会员沟通
export const QueryCommuniceList = `${BaseUrl}api/MemberCommunication/GetMemberCommunication/`; //查询会员沟通
export const QueryCountItems = `${BaseUrl}api/MemberAPI/GetMemberTimeList`; //查询计次项目
export const AddSkinTags = `${BaseUrl}api/MemberAPI/AddMemberSkin`; //新增/修改会员皮肤标签
export const QuerySkinTags = `${BaseUrl}api/MemberAPI/MemberSkinList/`; //查询会员皮肤标签
export const AddDelay = `${BaseUrl}api/MemberAPI/MemberTimeDelay`; //疗程计次延期
/**
 *卖卡
 */
export const QueryCardsList = `${BaseUrl}api/OrdersAPI/GetOrdersByMCList`; //卖卡列表
export const QueryCardsInfo = `${BaseUrl}api/MemberAPI/GetMemberByKey?Keyword=`; //查询会员卡信息
export const SelectCardsInfo = `${BaseUrl}api/CardClassAPI/GetCardClassByKey`; //查询卡级信息
// export const  Query= `${BaseUrl}api/CardClassAPI/CardFreeItem/`; //查询赠送项目信息
export const QueryPayMethod = `${BaseUrl}api/PaymentTypeAPI/GetUsePaymentTypeList`; //获取可用支付方式根据购买项目
export const AllCourseCard = `${BaseUrl}api/MemberAPI/GetMeCardList?Me_GUID=`; //获取会员的所有会员卡(疗程卡)
export const OpenCards = `${BaseUrl}api/MemberCardAPI/AddMemberCard`; //开卡
