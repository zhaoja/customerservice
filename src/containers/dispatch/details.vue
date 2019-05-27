<!--
	作者: zhaojia
	时间: 2019-2-25
	描述: 详情
-->
<template>
	<el-row>
		<el-col class="breadCrumb ace-save-state">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/dispatch' }"><i class="el-icon-location"></i>北京通-养老助残卡投诉处理工单</el-breadcrumb-item>
				<el-breadcrumb-item>工单详情</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>

		<div class="detail-inner">
			<div class="detail-container">
				<h1><i class="el-icon-tickets" style="margin-right: 10px;"></i>工单详情</h1>
				<table class="esaytable" border="" cellspacing="" cellpadding="">
					<tr>
						<td>反映人姓名：</td>
						<td>{{detail.reflect}}</td>
						<td>反映时间：</td>
						<td>{{detail.reflectTime}}</td>
					</tr>
					<tr>
						<td>客户属性：</td>
						<td>{{detail.reflectType}}</td>
						<td>联系电话：</td>
						<td>{{detail.reflectPhone}}</td>
					</tr>
					<tr>
						<td>详细地址：</td>
						<td colspan="3">{{detail.reflectDistrict}}.{{detail.reflectTown}}.{{detail.reflectAddress}}</td>
					</tr>
					<tr>
						<td>工单类型：</td>
						<td colspan="3">{{detail.jobType}}</td>
					</tr>
					<tr>
						<td colspan="4">
							需求描述：
							<p>{{detail.description}}</p>
						</td>
					</tr>
					<tr>
						<td>派单部门：</td>
						<td>{{detail.dispatchDept}}</td>
						<td>派单人员：</td>
						<td>{{detail.dispatchPerson}}</td>
					</tr>
					<tr>
						<td>事件等级：</td>
						<td colspan="3">{{detail.eventLevel}}</td>
					</tr>
					<tr>
						<td>线下上门人员：</td>
						<td>{{detail.visitPerson}}</td>
						<td>联系用户时间：</td>
						<td>{{detail.contactTime}}</td>
					</tr>
					<tr>
						<td>上门时间：</td>
						<td>{{detail.visitTime}}</td>
						<td>离开时间：</td>
						<td>{{detail.leaveTime}}</td>
					</tr>
					<tr>
						<td colspan="4">
							处理情况：
							<p>{{detail.processing}}</p>
						</td>
					</tr>
					<tr>
						<td rowspan="4">意见反馈</td>
						<td>服务态度：</td>
						<td colspan="2">
							<el-radio v-model="detail.serviceAttitude.toString()" label="0">良好</el-radio>
  							<el-radio v-model="detail.serviceAttitude.toString()" label="1">一般</el-radio>
  							<el-radio v-model="detail.serviceAttitude.toString()" label="2">较差</el-radio>
						</td>
					</tr>
					<tr>
						<td>处理结果：</td>
						<td colspan="2">
							<el-radio v-model="detail.processingResult.toString()" label="0">问题已解决</el-radio>
  							<el-radio v-model="detail.processingResult.toString()" label="1">问题未解决</el-radio>
						</td>
					</tr>
					<tr>
						<td>整体满意度：</td>
						<td colspan="2">
							<el-radio v-model="detail.satisfaction.toString()" label="0">满意</el-radio>
  							<el-radio v-model="detail.satisfaction.toString()" label="1">不满意</el-radio>
						</td>
					</tr>
					<tr>
						<td colspan="3">
							意见及建议：{{detail.opinions}}  <br />
							<span style="float: right;">用户签字：{{detail.signature}} &nbsp;&nbsp;&nbsp;日期：{{detail.signTime}}</span>
						</td>
					</tr>
					<tr>
						<td>工单审核：</td>
						<td>{{detail.review}}</td>
						<td>备注：</td>
						<td>{{detail.remarks}}</td>
					</tr>
				</table>
			</div>
		</div>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
//				 radio: 1,
				detail: {
					contactTime: ""               ,
					createTime: ""                ,
					description: ""               ,
					dispatchDept: ""              ,
					dispatchPerson: ""            ,
					dispatchTime: ""              ,
					eventLevel: ""                ,
					jobNo: "",
					jobType: ""                   ,
					leaveTime: ""                 ,
					opinions: ""                  ,
					processing: ""                ,
					processingResult: ""          ,
					reflect: ""                   ,
					reflectAddress: ""            ,
					reflectDistrict: ""      	  ,
					reflectPhone: ""              ,
					reflectTime: ""               ,
					reflectTown: ""               ,
					reflectType: ""               ,
					remarks: ""                   ,
					review: ""                    ,
					satisfaction: ""              ,
					serviceAttitude: ""           ,
					signTime: ""                  ,
					signature: ""                 ,
					state: ""                     ,
					visitPerson: ""               ,
					visitTime: ""                 ,
				}
			}
		},
		created() {
			this.getTableDtails(this.$route.query.id);
		},
		 
		methods: {

			//获取工单详情
			getTableDtails(id) {
				let _this = this
				$.post({url: "http://39.104.161.46/web/serviceJob/getJobDetail",headers:{'Content-Type':'application/json'},data:JSON.stringify({param:{id:id}})}).then(item => {
	              	if (item.meta.code === 1) {	
						_this.detail = item.data;
						 
	              	}else{
            			console.log(item.meta.code)
	              	}
				}).catch(function(error) {
					console.log(error);
				});
			} 
		}
	}
</script>

<style>
	ul,
	li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.detail-container {
		background: #fff;
		padding: 0 15px 30px 15px;
		border-radius: 2px;
		box-shadow: 0px 2px 2px rgba(14, 14, 14, 0.1);
		border: 1px solid #f5f5f5;
	}
	
	.esaytable {
		width: calc(100% - 60px);
		margin: 30px 0px 50px 30px;
	}
	
	.esaytable td {
		/*height: 50px;*/
		padding: 15px 30px;
	}
	.esaytable tr{
		border: 1px solid #dfe4ed;
	}
</style>