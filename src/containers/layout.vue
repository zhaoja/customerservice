<template>
	<div>
		<Top></Top>
		<!--<Left></Left>-->
		<el-col :span="24" class="pull-right maincontainer">
			<!--<el-col class="breadCrumb ace-save-state">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }"> <i class="el-icon-d-arrow-left"></i>返回</el-breadcrumb-item>
					<el-breadcrumb-item v-for="br in breadcrumb" :key="br">{{brDic[br]}}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>-->
			<router-view></router-view>
		</el-col>
	</div>
</template>
<script>
	import Top from '../components/layout/top'
	import Left from '../components/layout/left'
	import { mapState } from 'vuex'

	export default {
		components: {
			Top,
			Left
		},
		computed: {
			...mapState({
				breadcrumb: state => state.layout.left.breadcrumb,
				brDic: state => state.layout.left.brDic
			})
		}
	}
</script>
<style>
	body {
		background: #fff;
		font-family: "Microsoft YaHei"
	}
	
	.maincontainer:before {
		content: "";
		display: block;
		/*width: inherit;*/
		top: 0px;
		bottom: 0;
		z-index: -1;
		background-color: inherit;
		border-style: inherit;
		border-color: inherit;
		border-width: inherit;
		background: #fff;
	}
	
	.breadCrumb {
		position: relative;
		z-index: auto;
		border-bottom: 1px solid #E5E5E5;
		background-color: #F5F5F5;
		height: 30px;
		padding: 8px 10px;
	}
</style>