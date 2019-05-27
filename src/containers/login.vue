<!--
	作者：zhaojia
	时间：2019-1-1
	描述：登陆
-->
<template>
	<div class="login-bg">
		<div class="loginPage">
			<h1>{{loginName}}</h1>
			<el-form>
		  
				<el-form-item v-for="fn in formName" v-bind:label="fn.cname" :key="fn.cname">
					<el-input :type="fn.cname=='密码'?'password':'text'" id="user"  v-bind:placeholder="fn.cname" v-model="fn.value" @input="inputBlur(fn.name,fn.value)"></el-input>
					<p>{{fn.error}}</p>
				</el-form-item>
					
				<el-button type="primary" @click="submitForm(formName)" v-bind:disabled="beDisabled">提交</el-button>
				<el-button @click="resetForm">重置</el-button>

			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'	
	const URL = "http://39.104.161.46"
	
	export default {
		name: '',
		data() {
			return {
				beDisabled: true,
				fnvalue:""
			}
		},
		computed: {
			...mapState({
				formName: state => state.login.loginData.formName,
				loginName: state => state.login.loginData.loginName
			}),
		},
		created() {
			this.$store.dispatch('getLogin', 1);
		}, 
		methods: {
			urlRoot:function() {
			} ,
			gotoPage: function(a){
				this.$store.dispatch('getLogin', a);
			},
			resetForm: function() {
				for(var i = 0; i < this.formName.length; i++) {
					this.formName[i].value = '';
					this.formName[i].error = '';
				}
			},
			submitForm: function(formName) {
				
				var _this = this;
				var param ={
			  		"username": formName[0].value,
			  		"password": formName[1].value
				}
				localStorage.setItem("username",param.username)
 				$.post({ 
					url: URL + '/web/login', 
                    headers:{'Content-Type':'application/json'},
					data:JSON.stringify({
						param: param
					})
				})
	            .then(data => {
	            	
	            	var item = data;
	              	if (item.meta.code == '1') {	
	              		//缓存
						localStorage.setItem("username",param.username)
						if(param.username=="kefu1"){
							_this.$router.push('/dispatch')
						}else if(param.username=="jobAdmin"){
							_this.$router.push('/home')
						}
	              	}else{
	              		_this.$notify.error({
				          title: '登录失败',
				          message: item.meta.desc,
				        });
	              	}
	            	
	            }).catch(function (error) {
	            	_this.$notify({
			          	title: '网络错误',
			           	type: 'warning'
			        });
	            	
				    console.log(error);
		  		});	
			},
			inputBlur: function(errorItem, inputContent) {
				console.log(11111)

				for(var i = 0; i < this.formName.length; i++) {
					if(inputContent === '' && this.formName[i].name == errorItem) {
						this.formName[i].error = this.formName[i].cname + "不能为空"
					} else {
						this.formName[i].error = '';
					}
					//对于按钮的状态进行修改
					if(this.formName[i].value == '') {

						this.beDisabled = true;

					} else {
						this.beDisabled = false;
					}
				}
			}
		} 
	}
 
</script>

<style>
	.login-bg{
		background-image: url(../imgs/bg2017.jpg);
		background-size:100% 100%;
	    width: 100%;
    	height: 100vh;
	    height: 100%;
    	position: absolute;
	}
	.dialog {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .8);
	}
	
	.loginPage {
		position: absolute;
		top: 30%;
		left: 50%;
		margin-top: -150px;
		margin-left: -175px;
		width: 350px;
		min-height: 300px;
		padding: 30px 20px 20px;
		border-radius: 8px;
		box-sizing: border-box;
		background-color: rgba(255, 255, 255, 0.42);
		border: 1px solid #dfe4ed;
		/*opacity: 0.8;*/
	}
	
	.loginPage p {
		color: red;
		text-align: left;
	}
</style>