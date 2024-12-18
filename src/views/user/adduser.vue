<template>
  <div class="app-container">
  <!-- <div class="address-layout">-->
 
<el-form ref="form" :model="user" label-width="80px" enctype="multipart/form-data">
<el-card>

        <el-row>
            <el-col span="10">
                <el-form-item label="姓名"   >
                  <el-input v-model="user.name" size="medium" width="20" ></el-input>
                </el-form-item>
            </el-col>
      
          <el-col span="10">
              <el-form-item label="身份证号">
                <el-input v-model="user.socialId" size="medium"></el-input>
              </el-form-item>  
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
              <el-form-item label="员工号">
                <el-input v-model="user.empNum" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
          <el-col span="10">
              <el-form-item label="住址">
                <el-input v-model="user.address" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">

          <el-form-item label="性别">
            <el-col :span="11">
              <el-radio v-model="user.gendor" label="0">男</el-radio>
              <el-radio v-model="user.gendor" label="1">女</el-radio>
            </el-col>
          </el-form-item>
          </el-col>
          
            <el-col span="10">
              <el-form-item label="电话">
                <el-input v-model="user.phone" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
        </el-row>

          <el-row>
           
          <el-col span="10">
            <el-form-item label="邮箱">
                <el-input v-model="user.email" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>

          </el-row>
          <el-row>
            <el-col span="5">
              <el-form-item label="头像">
              <div class="upload">
                  <el-upload
                      name="fileUpload"
                      :multiple="false"
                      action="#"
                      class="avatar-uploader"
                      :auto-upload="false"
                      :on-change="fileChange"
                      :show-file-list="fileList"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
            </div>
        </el-form-item>

      </el-col>
          </el-row>

          </el-card>
<el-card>
        <el-row>
          <el-col span=15>

            <el-form-item label="部门选择">
                    <el-select v-model="userPos.deptId" class="label-css" placeholder="全部" clearable >
                        <el-option v-for="item in deptOptions"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
            
                <el-form-item label="职位选择">
                    <el-select v-model="userPos.posId" class="label-css" placeholder="全部" clearable @change="posChanged($event)" >
                        <el-option v-for="item in posList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span=15>
            <el-form-item label="任职时间" class="label-css">
                      <el-date-picker
                        class="input-width"
                        v-model="userPos.stTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col span=15>
              <el-form-item label="上级">
                    <el-select v-model="userPos.parentId" class="label-css" placeholder="全部" clearable >
                        <el-option v-for="item in staffList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-button class="label-css" @click="clearAllPos">全部清空</el-button>

              <el-button type="success" @click="addPos">确定</el-button>
              <el-button type="info" @click="clearCurPos">取消</el-button>
          </el-col>
        </el-row>
             

<el-row>
<el-col span=10>

  <el-button type="text">{{posText}}</el-button>

</el-col>

</el-row>
      
      </el-card>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="onCancel">取消</el-button>
  </el-form-item>
  
  
    <el-card>
  
        <el-form-item v-model:label="result"></el-form-item>
    </el-card>


</el-form>
</div>
</template>

<script>
import {addUser,getUserInBank,upload} from '@/api/user'
import {fetchPosList} from '@/api/position'

export default {
  name: 'adduser',
  data() {
      return {
        dataObj:null,
        fileList:[],
        imageUrl: '',
        userPosList:[],
        userPos:{
          parentId:null,
          userId:null,
          posId:null,
          deptId:null,
          stTime:null,
          endTime:null,
          enabled:1
        },
        posText:'',
        selectPosText:'',
        user: {
          name: '',
          email:'',
          address:'',
          socialId:'',
          phone:'',
          empNum:'',
          gendor:'0',
		      bankId:'2',
          status:1,
          userPosList:[]
        },
        file:null,
		
        staffList:[],
        deptOptions:[],
        posList: [],
        result:'',
        showresult:false
      }
    },
    created() {
      this.getPosList();
      this.getColleagues();
    },
    methods: {
      getColleagues(){
        getUserInBank().then(response => {
          this.staffList = response.data;
          this.staffList.filter(function(item){item.id=item.id.toString();});
        });
      },
      getPosList(){
        fetchPosList().then(response => {
          this.posList = response.data;
        });
      },

      onSubmit() {
        console.log('submit!');

        this.user.userPosList = this.userPosList;
        console.log(this.user);

        var formData = new FormData()
        //formData.append('user',this.user);//,{type: "application/json"})

        formData.append('fileUpload',this.file.raw);
        formData.append('user',new Blob([JSON.stringify(this.user)],{type: "application/json"}));
        
        console.log('_++++++++++++++++++++++');
        console.log(formData);
        console.log(this.file.raw);

         addUser(formData).then(response => {
              console.log(response);
              this.result = response;
              resolve();
            }).catch(error => {
          reject(error)
        }) 
      },
      onCancel: function(){
        this.selectPosText='';
        this.posText='';
        this.userPosList=[];
        this.userPos={};
        this.user={};

      },
      addPos : function(){
        var copy = Object.assign({},this.userPos);
        copy.enabled=1;
        this.userPosList.push(copy);
        console.log('---------------addPos');
        console.log(this.userPosList);
        this.posText = this.posText +' '+ this.selectPosText;
      },
      clearCurPos : function(){
        this.userPos={};
        this.selectPosText='';
      },
      clearAllPos:function(){
        this.selectPosText='';
        this.posText='';
        this.userPosList=[];
        this.userPos={};
      },
      posChanged:function(param){
        //param is id;< key or value???>
            let obj = {};
            obj = this.posList.find((item) => {
              return item.id === param;
            });
            if (obj !== undefined) {
              this.selectPosText = JSON.parse(JSON.stringify(obj)).name;
            } else {
              this.selectPosText = "";
            }
        
      },

          // 文件状态改变时的钩子
    fileChange(file, fileList) {
      //console.log('change')
      //console.log(file)
        this.file = file
        console.log('-------+++++++++++---------------------------------');
        console.log(file);
      //console.log(this.user.file)
      //console.log(fileList)
    },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        console.log('----------------------------------------');
        console.log(file);
        return isJPG && isLt2M;
      }
    }
    }
 
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .label-css{
    margin-left:0px ;
    float: left;
  }


</style>
