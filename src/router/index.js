import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      component: name => require(["../components/Login"], name)
    },
    {
      path: '/',
      component: name => require(["../components/ModelBox"], name),
      name: 'ModeBox',
    },

    {
      path: '/navigation',
      component: name => require(["../components/Navigation"], name)
    },

    {
      path: '/manager/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'system-manager/user',
          component: name => require(["../components/Manager/SystemManager/User/Index"], name),
          name: 'systemManagerIndex',
        },
        {
          path: 'system-manager/add-user',
          component: name => require(["../components/Manager/SystemManager/User/Add"], name),
          name: 'systemManagerAddUser',
        },
        {
          path: 'system-manager/edit-user/:userId',
          component: name => require(["../components/Manager/SystemManager/User/Edit"], name),
          name: 'systemManagerEditUser',
        },

        {
          path: 'system-manager/detail-user/:userId',
          component: name => require(["../components/Manager/SystemManager/User/Detail"], name),
          name: 'systemManagerDetailUser',
        },

        {
          path: 'system-manager/role',
          component: name => require(["../components/Manager/SystemManager/Role/Index"], name),
          name: 'systemManagerRoleIndex',
        },
        {
          path: 'system-manager/add-role',
          component: name => require(["../components/Manager/SystemManager/Role/Add"], name),
          name: 'systemManagerAddRole',
        },
        {
          path: 'system-manager/edit-role/:roleId/:state',
          component: name => require(["../components/Manager/SystemManager/Role/Edit"], name),
          name: 'systemManagerEditRole',
        },

        {
          path: 'system-manager/detail-role/:roleId',
          component: name => require(["../components/Manager/SystemManager/Role/Detail"], name),
          name: 'systemManagerDetailRole',
        },
        {
          path: 'system-manager/list-menu/',
          component: name => require(["../components/Manager/SystemManager/ManagerMenu/ManagerMenuList"], name),
          name: 'managerMenuList',
        },
      ]
    },
    {
      path: '/report/home/',
      component: name => require(["../components/Report/Home"], name),
      children: [
        {
          path: 'report-test/user',
          component: name => require(["../components/Report/ReportTest/user"], name),
          name: 'ReportTestUser',
        },

      ]
    },
    {
      path: '/basicInfo/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'pay-method/pay',
          component: name => require(["../components/Manager/BasicInfo/PayMethod/Pay"], name),
          name: 'payMethodPay',
        }, {
          path: 'pay-method/add-pay',
          component: name => require(["../components/Manager/BasicInfo/PayMethod/AddPay"], name),
          name: 'payMethodAddPay',
        },
        {
          path: 'pay-method/edit-pay',
          component: name => require(["../components/Manager/BasicInfo/PayMethod/EditPay"], name),
          name: 'payMethodEditPay',
        },
        {
          path: 'pay-method/detail-pay',
          component: name => require(["../components/Manager/BasicInfo/PayMethod/DetailPay"], name),
          name: 'payMethodDetailPay',
        },

      ]
    },
    {
      path: '/paramConfig/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'param-config/index',
          component: name => require(["../components/Manager/ParamConfig/ParamConfigIndex"], name),
          name: 'paramConfigIndex',
        },
        {
          path: 'param-config/add-config',
          component: name => require(["../components/Manager/ParamConfig/AddConfig"], name),
          name: 'paramConfigAdd',
        },
        {
          path: 'param-config/edit-param-config',
          component: name => require(["../components/Manager/ParamConfig/EditParamConfig"], name),
          name: 'paramConfigEdit',
        },
        {
          path: 'param-config/detail-config',
          component: name => require(["../components/Manager/ParamConfig/DetailParamConfig"], name),
          name: 'paramConfigDetail',
        },
      ]
    },
    {
      path: '/storeManager/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'store-manager/index',
          component: name => require(["../components/Manager/StoreLevelManage/StoreLevelIndex"], name),
          name: 'storeManagerIndex',
        },
        {
          path: 'store-manager/add-manager',
          component: name => require(["../components/Manager/StoreLevelManage/AddStoreManager"], name),
          name: 'storeManagerAdd',
        },
      ]
    },
    {
      path: '/supplier/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'display-supplier/display',
          component: name => require(["../components/Manager/Supplier/DisplaySupplier"], name),
          name: 'displaySupplier',
        },
        {
          path: 'add-supplier/add',
          component: name => require(["../components/Manager/Supplier/AddSupplier"], name),
          name: 'addSupplier',
        },
        {
          path: 'edit-supplier/edit',
          component: name => require(["../components/Manager/Supplier/EditSupplier"], name),
          name: 'editSupplier',
        },
        {
          path: 'detail-supplier/detail',
          component: name => require(["../components/Manager/Supplier/DetailSupplier"], name),
          name: 'detailSupplier',
        },
      ]
    },
    {
      path: '/project/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'Project/index-project',
          component: name => require(["../components/Manager/Project/IndexProject"], name),
          name: 'indexProject',
        },
        {
          path: 'Project/detai-project',
          component: name => require(["../components/Manager/Project/DetaiProject"], name),
          name: 'detaiProject',
        },
        {
          path: 'Project/add-project',
          component: name => require(["../components/Manager/Project/AddProject"], name),
          name: 'addProject',
        },
        {
          path: 'Project/update-project',
          component: name => require(["../components/Manager/Project/UpdateProject"], name),
          name: 'updateProject',
        },
        {
          path: 'Project/select-tree',
          component: name => require(["../components/Manager/Project/SelectTree"], name),
          name: 'SelectTree',
        },
      ]
    },
    {
      path: '/Room/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'Room/indexRoom',
          component: name => require(["../components/Manager/Room/RoomListIndex"], name),
          name: 'indexRoom',
        },
        {
          path: 'Room/addRoom',
          component: name => require(["../components/Manager/Room/AddRoom"], name),
          name: 'addRoom',
        },
        {
          path: 'Room/editRoom',
          component: name => require(["../components/Manager/Room/EditRoom"], name),
          name: 'editRoom',
        },
        {
          path: 'Room/detailRoom',
          component: name => require(["../components/Manager/Room/DetailRoom"], name),
          name: 'detailRoom',
        },
      ]
    },
    {
      path: '/CardLevel/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'CardLevel/Card-Index',
          component: name => require(["../components/Manager/CardLevel/CardIndex"], name),
          name: 'CardIndex',
        },
        {
          path: 'CardLevel/add-card',
          component: name => require(["../components/Manager/CardLevel/AddCard"], name),
          name: 'AddCard',
        },
        {
          path: 'CardLevel/Update-card',
          component: name => require(["../components/Manager/CardLevel/UpdateCard"], name),
          name: 'UpdateCard',
        },
        {
          path: 'CardLevel/Detai-card',
          component: name => require(["../components/Manager/CardLevel/DetaiCard"], name),
          name: 'detaiCard',
        },
      ]
    },
    {
      path: '/EmployeeManager/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'EmployeeManager/indexEmployeeManager',
          component: name => require(["../components/Manager/EmployeeManager/EmployeListIndex"], name),
          name: 'indexEmployeeManager',
        },
        {
          path: 'EmployeeManager/addEmployeeManager',
          component: name => require(["../components/Manager/EmployeeManager/AddEmpManager"], name),
          name: 'addEmployeeManager',
        },
        {
          path: 'EmployeeManager/detailEmployeeManager',
          component: name => require(["../components/Manager/EmployeeManager/DetailEmpManager"], name),
          name: 'detailEmployeeManager',
        },
        {
          path: 'EmployeeManager/editEmployeeManager',
          component: name => require(["../components/Manager/EmployeeManager/EditEmpManager"], name),
          name: 'editEmployeeManager',
        },
      ]
    },
    {
      path: '/Product/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'Product/product-Index',
          component: name => require(["../components/Manager/Product/ProductIndex"], name),
          name: 'productIndex',
        },
        {
          path: 'Product/add-Product',
          component: name => require(["../components/Manager/Product/AddProduct"], name),
          name: 'addProduct',
        },
        {
          path: 'Product/upd-Product',
          component: name => require(["../components/Manager/Product/UpdProduct"], name),
          name: 'updProduct',
        },
        {
          path: 'Product/del-Product',
          component: name => require(["../components/Manager/Product/DelProduct"], name),
          name: 'delProduct',
        },
        {
          path: 'Product/detai-Product',
          component: name => require(["../components/Manager/Product/DetaiProduct"], name),
          name: 'detaiProduct',
        },
      ]
    },
    {
      path: '/MembershipManager/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'MembershipManager/list-manager',
          component: name => require(["../components/Manager/MembershipManager/MembershipList"], name),
          name: 'ManagershipList',
        },
        {
          path: 'AddMemberShip/add-memberShip',
          component: name => require(["../components/Manager/MembershipManager/AddMemberShip"], name),
          name: 'addMemberShipManager',
        },
        {
          path: 'AddMemberShip/edit-memberShip',
          component: name => require(["../components/Manager/MembershipManager/EditMemberShip"], name),
          name: 'editMemberShip',
        },
        {
          path: 'AddMemberShip/detail-memberShip',
          component: name => require(["../components/Manager/MembershipManager/DetailMemberShip"], name),
          name: 'detailMemberShip',
        },
      ]
    },
    /**
     * 卖卡 CardHomeList
     */
    {
      path: '/SellingCards/home/',
      component: name => require(["../components/Manager/Home"], name),
      children: [
        {
          path: 'SellingCards/card-list',
          component: name => require(["../components/Manager/SellingCards/CardHomeList"], name),
          name: 'CardsList',
        }, {
          path: 'AddSellCards/card-add',
          component: name => require(["../components/Manager/SellingCards/AddSellCards"], name),
          name: 'CardsAdd',
        },
      ]
    },
    /**
     * 前台收银
     */
    {
      path: '/cashier/cashierHome/',
      component: name => require(["../components/Cashier/CashierHome"], name),
      children: []
    },


  ]
})
