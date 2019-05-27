<template>
	<el-row>
		<el-col class="breadCrumb ace-save-state">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/dispatch' }"><i class="el-icon-location"></i>北京通-养老助残卡投诉处理工单</el-breadcrumb-item>
				<el-breadcrumb-item>派单 </el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>

		<div class="detail-inner">
			<div class="detail-container">
				<h1><i class="el-icon-tickets" style="margin-right: 10px;"></i>派单</h1>
				<el-form ref="form" :model="form" label-width="150px">
					<el-form-item label="派单部门">
						<el-input v-model="form.dispatchDept" placeholder="请输入派单部门"></el-input>
					</el-form-item>
					<el-form-item label="派单人员">
						<el-input v-model="form.dispatchPerson" placeholder="请输入派单人员"></el-input>
					</el-form-item>
					<el-form-item label="事件等级" >
						<el-select v-model="form.eventLevel" placeholder="请选择">
						    <el-option
						      v-for="item in eventLevelOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="线下上门人员">
						<el-autocomplete popper-class="my-autocomplete" v-model="value" :fetch-suggestions="querySearch" placeholder="请选择线下上门人员" @select="handleSelect">
							<template slot-scope="{ item }">
								<div class="name">{{ item.value }}&nbsp;&nbsp;&nbsp;<span class="addr">（{{ item.address }}）</span></div>
							</template>
						</el-autocomplete>
					</el-form-item>
					<el-form-item label="处理情况">
						<el-input type="textarea" v-model="form.processing"></el-input>
					</el-form-item>
					<el-form-item label=""><span class="mesage">{{mesage}}</span></el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="onSubmit(form)">派单</el-button>
					</el-form-item>
					
				</el-form>
			</div>
		</div>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					"dispatchDept": "",
				    "dispatchPerson": "",
				    "eventLevel": "",
				    "jobId": "", //工单id
				    "visitPerson": "",
				    "processing":""
				},
				restaurants: [],
				value: '',
				eventLevelOptions:[{
		          value: '1',
		          label: '一级(投诉类)'
		        }, {
		          value: '2',
		          label: '二级(政府类)'
		        }, {
		          value: '3',
		          label: '三级(投诉类)'
		        }],
		        mesage:""
			};
		},
		created(){
			this.loadAll()

		},
		methods: {
			onSubmit(form) {
				this.form.jobId = this.$route.query.id||""
			 
 				if (form.jobId=="") {
					return this.mesage = "*当前页面没有派单id"
				} else if (form.dispatchDept=="") {
					return this.mesage = "*请输入派单部门"
				} else if (form.dispatchPerson=="") {
					return this.mesage = "*请输入派单人员"
				} else if (form.eventLevel=="") {
					return this.mesage = "*请选择事件等级"
				} else if (form.visitPerson=="") {
					return this.mesage = "*请选择线下上门人员"
				} else if (form.processing=="") {
					return this.mesage = "*请输入处理情况"
				}
				let _this = this;
				$.post({ 
					url: "http://39.104.161.46/web/serviceJob/dispatch", headers:{'Content-Type':'application/json'},
					data:JSON.stringify({
						param: form
					})
				})
	            .then(item => {
	              	if (item.meta.code === 1) {	
	              		_this.$notify({
				          title: '派单成功',
				          message: '您已派单成功，即将返回工单列表',
				          type: 'success'
				        });
				        setTimeout(function(){
				        	_this.$router.push({path: 'dispatch'})
				        },3000)
	              	}else{
              			console.log(item.meta.code)
	              	}
	            }).catch(function (error) {
				    console.log(error);
		  		});	
			},
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return(restaurant) => {
					return(restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			//获取所有派单人员
			loadAll(){
				var _this = this
				$.post({url: "http://39.104.161.46/web/serviceJob/getUsersSelect"})
	            .then(item => {
	              	if (item.meta.code === 1) {	
						Object.keys(item.data).forEach(function(key,value){
							var obj = {
								"id": item.data[key].id.toString(),
								"value": item.data[key].name,
								"address": item.data[key].employeeNo
							};
							_this.restaurants.push(obj);
					})
	              	}else{
              			console.log(item.meta.code)
	              	}
	            }).catch(function (error) {
				    console.log(error);
		  		});	
			},
			handleSelect(item) { 
				this.form.visitPerson = item.id;
			},
			handleIconClick(ev) {
				console.log(ev);
			} 
		}
	}
</script>

<style scoped="scoped">
	ul,li {
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
		width: 100%;
	}
	
	.esaytable td {
		/*height: 50px;*/
		padding: 15px 30px;
	}
	
	.editor-select {
		margin: 30px;
	}
	.el-form{
		width: 800px;
	}
	.el-select,textarea{
		width: 100%;
	}
	textarea{
		height: 200px;
	}
	.el-select-dropdown__item {
    	padding: 0 20px !important;
    }
	.el-autocomplete {
	    margin: 0;
	    width: 100%;
	}
 	.my-autocomplete  li {
	    line-height: normal;
	    padding: 7px;
	}
	.my-autocomplete  li  .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
	.my-autocomplete li .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
	
	.my-autocomplete  li .highlighted .addr {
	    color: #ddd;
 	}
 	.mesage{
 		color: red;
 	}
</style>