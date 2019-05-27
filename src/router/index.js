import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../containers/layout.vue';
import Login from '@/containers/login'

//12345转办工单
import Home from '@/containers/workorder/home'
import Upload from '@/containers/workorder/upload'

//养老助残卡上门服务工单列表
import Dispatch from '@/containers/dispatch/dispatch'
import DispatchDetails from '@/containers/dispatch/details'
import DispatchEditor from '@/containers/dispatch/editor'

//import Organization from '@/containers/organization'
//import Details from '@/containers/details'
//import Largescreen from "@/containers/largescreen"
//import Wokorder from '@/containers/wokorder'
//import IMorder from '@/containers/IMorder'
//import WokorderDetails from '@/containers/wokorderdetails'
//import More12345Order from '@/containers/more12345Order'
//import Details from '@/containers/details'

//import Calendar from '@/components/component/calendar'
//import CalendarDetails from '@/components/component/calendarDetails'
//import Organization from '@/containers/staff/organization'
//import Job from '@/containers/staff/job'
//import Member from '@/containers/staff/member'
//import Limit from '@/containers/staff/limit'
//
//import Form from '@/components/component/form'
//import Table from '@/components/component/table'

Vue.use(Router)

var router = new Router({
	routes: [
	{
		path: "/",
		name: "",
		component: Login
	},
	{
		path: "/",
		name: "",
		component: Layout,
		children: [
			//12345转办工单
			{
				path: "home",
				name: "工单",
				meta: { requireAuth: "workorderSys"},
				component: Home
			},{
				path: "upload",
				name: "上传工单",
				meta: { requireAuth: "workorderSys"},
				component: Upload
			},
			//线下服务派单系统
			{
				path: "dispatch",
				name: "线下APP派单表",
				meta: { requireAuth: "dispatchSys"},
				component: Dispatch
			},{
				path: "dispatchdetails",
				name: "派单详情",
				meta: { requireAuth: "dispatchSys"},
				component: DispatchDetails
			},{
				path: "dispatcheditor",
				name: "派单详情",
				meta: { requireAuth: "dispatchSys"},
				component: DispatchEditor
			},
			//大屏图表展示
//			{
//				path: "organization",
//				name: "统计图表",
//				meta: { requireAuth: "largescreenSys"},
//				component: Organization
//			},
//			{
//				path: "details",
//				name: "详情",
//				meta: { requireAuth: "largescreenSys"},
//				component: Details
//			},

//			{
//				path: "wokorder",
//				name: "12345工单管理",
//				component: Wokorder
//			},
//			{
//				path: "IMorder",
//				name: "12345工单管理",
//				component: IMorder
//			},
//			{
//				path: "largescreen",
//				name: "大数据展示平台",
//				meta: {
//				    requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
//				},
//				component: Largescreen
//			},
		]
	},
	{
		path: "/login",
		name: "登录",
		component: Login
	}]
});
export default router;
	
router.beforeEach((to, from, next) => {
	
	let username = localStorage.getItem("username")||""
	
    if (to.meta.requireAuth==="dispatchSys") {  // 判断该路由是否需要登录权限
    	//派单系统 kefu1可以登陆
        if (username==="kefu1") {  // 通过vuex state获取当前的token是否存在
            next();
        }else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }else if (to.meta.requireAuth==="workorderSys") {  // 判断该路由是否需要登录权限
    	//派单系统 kefu1可以登陆
        if (username==="jobAdmin") {  // 通过vuex state获取当前的token是否存在
            next();
        }else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})