<template>
	<div class="top">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#438EB9" text-color="#fff" active-text-color="#ffd04b">
			<div class="logo">
				<div>工单系统</div>
			</div>
			<el-menu-item index="5" class="pull-right" @click="logout()" >
				<i class="el-icon-setting"></i> 退出
			</el-menu-item>
			<el-menu-item index="4" class="pull-right pointer-none">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
					    <img class="nav-user-photo" src="../../imgs/user.jpg" alt="Jason's Photo">
					    <span class="user-info">
							<small>欢迎,</small>
							 {{username}}
						</span>
 					</span>
  				</el-dropdown>
			</el-menu-item>
			
			 
		</el-menu>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				activeIndex: '1',
				index: '',
				username: localStorage.getItem("username")
			}
		},
		computed: {
			...mapState({
				
			})
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath)
			},
			logout(){
				localStorage.setItem("username","");
				this.$router.push({ path: 'login' });
			}
		}
	}
</script>
<style scoped="scoped">
	.top {
		position: relative;
		z-index: 1;
	}
	
	.top .logo div {
		float: left;
		color: #fff;
		line-height: 60px;
		font-size: 20px;
		margin-left: 10px;
		font-weight: 600;
		letter-spacing: 3px;
	}
	
	.top .el-dropdown {
		color: #fff !important;
	}
	
	.top .el-dropdown .el-icon-caret-bottom {
		color: #fff !important;
	}
	
	.top i {
		color: #fff !important;
	}
	
	.top .user-info{
		top: 15px;
	}
	.pointer-none{
		pointer-events: none;
	}

</style>