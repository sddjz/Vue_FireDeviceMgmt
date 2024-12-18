import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'
/**
 * import HelloWorld from '@/components/HelloWorld'
 */

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userlist',
    name: 'user',
    meta: {title: '员工管理', icon: 'sms'},
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/user/userlist'),
        meta: {title: '员工列表', }
      },
      {
        path: 'updateuser',
        name: 'updateuser',
        component: () => import('@/views/user/updateuser'),
        meta: {title: '更新员工信息', },
        hidden: true
      },

      {
        path: 'adduser',
        name: 'adduser',
        component: () => import('@/views/user/adduser'),
        meta: {title: '添加员工', },
        hidden: true
      },
      {
        path: 'userdetail',
        name: 'userdetail',
        component: () => import('@/views/user/userdetail'),
        meta: {title: '用户信息', },
        hidden: true
      }

    ]
  },
  {
    path: '/sa',
    component: Layout,
    redirect: '/sa/salist',
    name: 'sa',
    meta: {title: '安防资产', icon: 'ums'},
    hidden: false,
    children: [
      {
        path: 'salist',
        name: 'salist',
        component: () => import('@/views/sa/salist'),
        meta: {title: '安防资产列表', },
        hidden: false
      },
      {
        path: 'addsa',
        name: 'addsa',
        component: () => import('@/views/sa/addsa'),
        meta: {title: '添加安防资产', },
        hidden: false,
       },

      {
        path: 'samrecord',
        name: 'samrecord',
        component: () => import('@/views/sa/samrecord'),
        meta: {title: '维修记录'},
        hidden: false,

      },
      {
        path: 'savendor',
        name: 'savendor',
        component: () => import('@/views/sa/vendor/savendor'),
        meta: {title: '供应商管理'}
      },

      {
        path: 'addsavendor',
        name: 'addsavendor',
        component: () => import('@/views/sa/vendor/addsavendor'),
        meta: {title: '添加供应商'},
        hidden: true
      },
      {
        path: 'updatesavendor',
        name: 'updatesavendor',
        component: () => import('@/views/sa/vendor/updatesavendor'),
        meta: {title: '更新sa供应商'},
        hidden: true
      }

    ]
  },
  {
    path: '/fa',
    component: Layout,
    redirect: '/fa/list',
    name: 'fa',
    meta: {title: '消防资产', icon: 'product'},
    children: [
      {
        path: 'falist',
        name: 'falist',
        component: () => import('@/views/fa/falist'),
        meta: {title: '消防资产列表', }
      },
      {
        path: 'addfa',
        name: 'addfa',
        component: () => import('@/views/fa/addfa'),
        meta: {title: '添加消防资产',},
        hidden: true
      },
      {
        path: 'famrecord',
        name: 'famrecord',
        component: () => import('@/views/fa/famrecord'),
        meta: {title: '维修记录'}
      },
      {
        path: 'favendor',
        name: 'favendor',
        component: () => import('@/views/fa/vendor/favendor'),
        meta: {title: '供应商管理'}
      },
      {
        path: 'addfavendor',
        name: 'addfavendor',
        component: () => import('@/views/fa/vendor/addfavendor'),
        meta: {title: '添加消防供应商'},
        hidden: true
      },
      
       {
        path: 'updatefavendor',
        name: 'updatefavendor',
        component: () => import('@/views/fa/vendor/updatefavendor'),
        meta: {title: '更新fa供应商'},
        hidden: true
      }
    ]
  },
  {
    path: '/review',
    component: Layout,
    redirect: '/review/reviewlist',
    name: 'review',
    meta: {title: '检查', icon: 'order'},
    children: [
      {
        path: 'reviewlist',
        name: 'reviewlist',
        component: () => import('@/views/review/reviewlist'),
        meta: {title: '检查记录', }
      },
      {
        path: 'rectify_list',
        name: 'rectify_list',
        component: () => import('@/views/review/rectify_list'),
        meta: {title: '整改记录', }
      },
      {
        path: 'add_rectify',
        name: 'add_rectify',
        component: () => import('@/views/review/add_rectify'),
        meta: {title: '发起整改'},
        hidden: true
      },

      {
        path: 'rectify_item',
        name: 'rectify_item',
        component: () => import('@/views/review/rectify_item'),
        meta: {title: '整改项目'},
        hidden: true
      },
    ]
  },

  {
    path: '/ac',
    component: Layout,
    redirect: '/ac/aclist',
    name: 'ac',
    meta: {title: '账户管理', icon: 'ums'},
    hidden: false,
    children: [
      {
        path: 'aclist',
        name: 'aclist',
        component: () => import('@/views/ac/aclist'),
        meta: {title: '账户列表', },
        hidden: false
      },
      {
        path: 'addac',
        name: 'addac',
        component: () => import('@/views/ac/addac'),
        meta: {title: '添加账户', },
        hidden: false
      },
    ]
  },

  {
    path: '/ns',
    component: Layout,
    redirect: '/ns/nslist',
    name: 'ns',
    meta: {title: '新闻管理', icon: 'ums'},
    hidden: false,
    children: [
      {
        path: 'nslist',
        name: 'nslist',
        component: () => import('@/views/ns/nslist'),
        meta: {title: '新闻列表', },
        hidden: false
      },
      {
        path: 'addns',
        name: 'addns',
        component: () => import('@/views/ns/addns'),
        meta: {title: '新闻列表', },
        hidden: false
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
