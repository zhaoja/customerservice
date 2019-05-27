<!--
	作者：zhaojia
	时间：2019-2-25
	描述：北京通-养老助残卡投诉处理工单
-->
<template>
	<el-row>
		<el-col class="breadCrumb ace-save-state">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item><i class="el-icon-location"></i>北京通-养老助残卡上门服务工单</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="my-table">
			<div class="my-table-title">
				<i class="el-icon-tickets"></i>养老助残卡上门服务工单列表
			</div>
			<div class="my-table-content">
				<el-tabs v-model="activeName" @tab-click="handleClickTabPane">
					<el-tab-pane :label="t.label" :name="t.name" v-for="t in tabPane" :key="t.label"></el-tab-pane>
				</el-tabs>
				<div>
					<div class="table-seach">
						 <el-input v-model.trim="param.reflect" placeholder="请输入反映人姓名"></el-input>
						 <el-input v-model="param.reflectPhone" placeholder="请输入反映人联系电话" type="number"></el-input>
						 <el-select v-model.trim="param.district" placeholder="请选择区/县">
						    <el-option
						      v-for="item in options_area"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
						<el-select v-model="param.satisfaction" placeholder="请选择整体满意度" v-show="param.state=='3'">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="info"  @click="reset">重置</el-button>
					</div>

					<el-table :data="tableData">
						<el-table-column :prop="th.field" :label="th.title" v-for="th in tableHead" key="th.field" v-if="th.field!='visitPerson'|param.state!=0"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="detail(scope.row)" type="text" size="small">详情 </el-button>
								<el-button @click="editor(scope.row)" type="text" size="small" v-if="param.state==0">派单</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="page_size" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
					</el-pagination>
				</div>

			</div>
		</div>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				options: [
					{value: '0',label: '满意'},
			        {value: '1',label: '不满意'}
		        ],
		        options_area: [
					{value: '密云区 ',label: ' 密云区'},
					{value: '延庆区',label: ' 延庆区'},
					{value: '朝阳区',label: ' 朝阳区'},
					{value: '丰台区',label: ' 丰台区'},
					{value: '石景山区',label: '石景山区'},
					{value: '门头沟区',label: '门头沟区'},
					{value: '海淀区',label: '海淀区'}, 
					{value: '房山区',label: '房山区'},
					{value: '通州区',label: '通州区'},
					{value: '顺义区',label: '顺义区'},
					{value: '昌平区',label: '昌平区'},
					{value: '大兴区',label: '大兴区'},
					{value: '怀柔区',label: '怀柔区'},
					{value: '平谷区',label: '平谷区'},
					{value: '东城区',label: '东城区'},
					{value: '西城区',label: '西城区'}
		        ],
		        value: '',
				activeName: "0",
				title: '',
				page_size: [10, 15, 20, 50, 100],
 
				tableHead: [{
						field: 'reflect',
						title: '反映人姓名'
					},
					{
						field: 'reflectTime',
						title: '反映时间'
					},
					{
						field: 'reflectPhone',
						title: '反映人联系电话'
					},
					{
						field: 'reflectDistrict',
						title: '区/县'
					},
					{
						field: 'jobType',
						title: '工单类型'
					},{
						field: 'visitPerson',
						title: '上门人员'
					}
				],
				tableData: [],
				pagination: {
					currentPage: 1,
					pageSize: 10,
					total: 10
				},
				tabPane: [{
  						label: '未响应',
						name: '0'
					},
					{
						label: '待解决',
						name: '1'
					},
					{
						label: '解决中',
						name: '2'
					},
					{
						label: '已解决',
						name: '3'
					} 
				],
				param: {
				    "district": "",
				    "pageNo": 1,
				    "pageSize": 10,
				    "reflect": "",
				    "reflectPhone": "",
				    "satisfaction": "",
				    "state": 0,
				}
			}
		}, 
		created() {
			this.getTableData(this.activeName);
		},
		methods: {
			handleClickTabPane(tab, event) {
				this.param.state = tab.name;
				this.getTableData(this.param);
			},
			
			detail(row) {
				this.$router.push({path: 'dispatch\details',
					query: {
						id: row.id
					}
				})
			},
			editor(row) {
				this.$router.push({
					path: 'dispatch\editor',
					query: {
						id: row.id
					}
				})
			}, 
			search() {
				this.getTableData(this.param)
			},
			reset() {
				this.param.district = "";
				this.param.reflect = "";
				this.param.reflectPhone = "";
				this.param.satisfaction = "";
				 
				this.getTableData(this.param)
			},
			handleSizeChange(size) {
				this.param.pageSize = size;
				this.getTableData(this.param)
			},
			handleCurrentChange(p) {
				this.param.pageNo = p;
				this.getTableData(this.param)
			},
			//获取工单列表
			getTableData(filter_id) {
				var _this = this
				$.post({url: "http://39.104.161.46/web/serviceJob/getJobs",headers:{'Content-Type':'application/json'},data:JSON.stringify({param: this.param})}).then(item => {
	              	if (item.meta.code === 1) {	
						_this.tableData = item.data.list;
						_this.pagination.currentPage = item.data.pageData.pageNo;
						_this.pagination.pageSize = item.data.pageData.pageSize;
						_this.pagination.total = item.data.pageData.totalCount;
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