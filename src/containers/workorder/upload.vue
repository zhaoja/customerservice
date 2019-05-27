<template>
	<el-row class="center">
		 <el-col class="breadCrumb ace-save-state">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-location"></i>12345转办工单</el-breadcrumb-item>
                <el-breadcrumb-item>上传</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
		<el-col :span="24" class="inner upload">
			<el-upload
			  class="upload-demo"
			  ref="upload"
			  :action="fileURL"
			  accept=".xls,.xlsx"
			:on-success="onSuccess"
			:on-error="onError"
			  :file-list="fileList"
			  :auto-upload="false"
			  drag multiple>
			   <i class="el-icon-upload"></i>
			   <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
			  <div slot="tip" class="el-upload__tip">只能上传.xls/.xlsx文件，且不超过500kb</div>
			</el-upload>
		</el-col>
		<el-button style="margin-top: 20px;" size="small" type="success" @click="submitUpload">上传文件</el-button>

	</el-row>
</template>

<script type="text/javascript">
	
	export default {
		data() {
			return {
				fileURL: "http://39.104.161.46/web/job/addJobs",
			 	fileList: []
      
			}
		},
		created(){
//			this.getOrderTable();
		},
		methods: {
		 	submitUpload() {
		 		
		        this.$refs.upload.submit();
	      	},
//	      	handleRemove(file, fileList) {
//		        console.log(file, fileList);
//    		},
//	      	handlePreview(file) {
//		        console.log(file);
//	      	},
			onSuccess(response, file, fileList) {
				if(response.meta.code == 1){
					//文件上传成功时的钩子	
				 	this.$notify({
			          title: '上传成功',
	//		          message: '这是一条成功的提示消息',
			          type: 'success'
			        });
				}else{
					this.$notify.error({
			          title: '上传失败',
			          message: response.meta.desc,
			        });
				}
			 	
			 	console.log(response, file, fileList)
			},
			onError(err, file, fileList) {
				this.$notify.error({
		          title: '上传失败',
		          message: err,
		        });
				console.log(err, file, fileList)
			}, 
			 
		}
	}
</script>
<style type="text/css">
	.upload .el-upload__input{
		display: none !important;
	}
	.upload .upload-demo{text-align: center;}
	.upload .el-upload-dragger{
	    width: 480px;
	    margin-left: calc(50% - 240px);
    	margin-top: 50px;
	} 
</style>
 