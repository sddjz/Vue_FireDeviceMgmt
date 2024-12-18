<template>
  <div class="app-container">
  <!-- <div class="address-layout">
  style="width: 600px"  
  label-width="120px" 
  -->
 
<el-form ref="form" :model="user"  float="center"   style="width: 600px"  label-width="120px"  :rules="rules"  size="small">
    
    
                <el-form-item label="姓名"   >
                  <el-input v-model="user.name" size="medium" width="20" ></el-input>
                </el-form-item>
            
      
         
              <el-form-item label="身份证号">
                <el-input v-model="user.socialId" size="medium"></el-input>
              </el-form-item>  
         
        
              <el-form-item label="住址">
                <el-input v-model="user.address" placeholder="请输入内容"></el-input>
              </el-form-item>
           
              <el-form-item label="电话">
                <el-input v-model="user.phone" placeholder="请输入内容"></el-input>
              </el-form-item>
          
          

            <el-form-item label="性别">
              <el-col :span="11">
                      <el-radio-group v-model="user.gendor">
                          <el-radio  :label="0">男</el-radio>
                          <el-radio   :label="1">女</el-radio>
                    </el-radio-group>

              </el-col>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="user.email" placeholder="请输入内容"></el-input>
              </el-form-item>
                    <el-form-item label="职位">
                      <el-table ref="curPos"
                      :data="userPosList"
                      style="width: 100%;"
                     border>
                        <el-table-column label="部门" align="center">
                          <template slot-scope="scope">{{scope.row.dept|formatDept}}</template>
                        </el-table-column>
                        <el-table-column label="职位"  align="center">
                          <template slot-scope="scope">{{scope.row.pos.showName}}</template>
                        </el-table-column>
                        <el-table-column label="领导" align="center">
                          <template slot-scope="scope">{{scope.row.parentPosUserName}}</template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button size="mini" @click="handleDeletePos(scope.$index)">删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <!--
                      <template v-for="pos in userPosList">
                        <li >
                          {{  formatPos(pos)}}
                        </li>
                      </template>
                      -->
                      <el-link type="primary" @click="showPosAddCard" style="float:left">添加职位</el-link>

                    </el-form-item>
                  <el-form-item   >

                  </el-form-item>
                    

                  
<el-card v-show="showPosCard" v-model="userPos">
        <el-row>
          <el-col span=15>

            <el-form-item label="部门选择">
                    <el-select v-model="userPos.deptId" class="label-css" placeholder="全部" clearable @change="deptChanged($event)" >
                        <el-option v-for="item in deptList"
                                  :key="item.id"
                                  :label="item.showName"
                                  :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
            
                <el-form-item label="职位选择">
                    <el-select v-model="userPos.posId" class="label-css" placeholder="全部" clearable @change="posChanged($event)" >
                        <el-option v-for="item in posList"
                                  :key="item.id"
                                  :label="item.showName"
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
            
            <el-form-item label="上级职务">
                    <el-select v-model="userPos.parentId" class="label-css" placeholder="全部" clearable  @change="parentUser($event)">
                        <el-option v-for="item in posList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="上级">
                    <el-select v-model="userPos.parentId" class="label-css" placeholder="全部" clearable  @change="parentUser($event)">
                        <el-option v-for="item in staffList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
            </el-col></el-row>
              <el-button type="success" @click="addPos">确定</el-button>        
              <el-button type="success" @click="resetPosAdd">清空</el-button>
              <el-button type="success" @click="hidePosAddCard">关闭</el-button>


   </el-card>   
              
            <el-form-item label="头像">
                          <el-image 
                            style="width: 200px; height: 200px; margin-left: 0px; float:left"
                            :src="imageUrl"
                            :fit="fit"></el-image>
                            <el-link type="primary" @click="showUploadImg" style="float:left">编辑</el-link>
                    
                            <el-upload  v-show="changeImage"
                              action=""
                              class="upload-icon"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <i  class="el-icon-plus avatar-uploader-icon " ></i>
                          </el-upload> 
                          <el-link type="primary"  v-show="changeImage" style="margin-left:20px;" @click="hideUploadImage">取消</el-link>
                        
                    
                          </el-form-item>
                 

        <!--            <el-form-item label="" v-show="changeImage" >
                          <el-upload
                              action=""
                              class="upload-icon"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <i  class="el-icon-plus avatar-uploader-icon " ></i>
                          </el-upload> 
                          <el-link type="primary" style="float:left;margin-left:20px;" @click="hideUploadImage">取消</el-link>
                        </el-form-item>

       <img v-if="imageUrl" :src="imageUrl" class="avatar"></img>

-->
         
         <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button type="info"  @click="onCancel">取消</el-button>
        </el-form-item>


</el-form>

</div>
</template>

<script>

import {getUserDetail,getUserInBank} from '@/api/user';
import {listDept} from '@/api/dept'
import {fetchPosList} from '@/api/position'
import {formatDate} from '@/utils/date';
export default {
  name: 'updateuser',

  created() {
        this.id = this.list = this.$route.params.userId;
        this.id = this.id.toString().replace('\'','');
        this.FetchData();
       
      },
    data() {
      return {
        showPosCard:false,
        changeImage:false,
        imageUrl: '',
        listQuery:{
          orderType:0,
        },
        baseUrl: process.env.BASE_API,
        rules: {
          name: [
            {required: true, message: 'x', trigger: 'blur'},
            {min: 2, max: 140, message: 'x', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: 'x', trigger: 'blur'}],
          productCategoryId: [{required: true, message: 'x', trigger: 'blur'}],
          brandId: [{required: true, message: 'x', trigger: 'blur'}],
          description: [{required: true, message: 'x', trigger: 'blur'}],
          requiredProp: [{required: true, message: 'x', trigger: 'blur'}]
        },
        
        user: {
          name: '',
          socialId:'',
          gendor:'1',
          phone:'',
          imageUrl:null,          
        },
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
        deptList:[],
        posList:[],
        staffList:[],
        posTypeOptions: [
          {
            label: '支行行长',
            value: 0
          },
          {
            label: '安全员',
            value: 1
          }
        ],
      }
    },

    filters:{
      formatDept(value){
          if(value==undefined||value==null){return '无';}
          return dept.showName;
        },

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },

      onCancel(){},
    
      FetchData(){
          getUserDetail({userId:this.id}).then(response => {
          this.user = response.data;
          this.userPosList = this.user.userPosList;
          this.initData();
          this.getDepts();
          this.getPosList();
          this.getColleagues();
        });
        },

        initData(){
          this.imageUrl = this.baseUrl+'/images/'+this.user.headImage;
        },

        getDepts(){
          listDept().then(response => {
              this.deptList = response.data;
            });

        },
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

      showUploadImg(){
        this.changeImage= true;
        },
      
        hideUploadImage(){
          this.changeImage= false;

        },

        showPosAddCard(){
          this.showPosCard = true;
        },
        hidePosAddCard(){
          this.showPosCard = false;
        },
        resetPosAdd(){
            
        },
       addPos(){
        if(this.userPos.stTime==undefined ||this.userPos.posId==undefined){return;}
        var copy = Object. assign({},this.userPos);
        this.userPosList.push(copy);
        this.userPos={};
       },
      formatPos(posItem){
        //pos='';
        /**
        if(pos.dept==0||pos.dept==null){
          pos.dept
        } */
        return posItem.pos.showName;

      },

      handleDeletePos(index){
        this.userPosList.splice(index);
      },
      deptChanged:function(param){
            let obj = {};
            obj = this.deptList.find((item) => {
              return item.id === param;
            });
            this.userPos.dept={};

            if (obj !== undefined) {
              this.userPos.dept.id = param;
              this.userPos.dept.showName = JSON.parse(JSON.stringify(obj)).showName;
            } else {
              this.userPos.dept.showName  = "";
            }

      },

      posChanged:function(param){
        //param is id;< key or value???>
            let obj = {};
            obj = this.posList.find((item) => {
              return item.id === param;
            });
            this.userPos.pos={};
            if (obj !== undefined) {
              this.userPos.pos.id = param;
              this.userPos.pos.showName = JSON.parse(JSON.stringify(obj)).showName;
            } else {
              this.userPos.pos.showName  = "";
            }
        
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
    margin-left: 20px;
    float:left;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 100px;
    line-height: 100px;
     float:left;
    margin-left:20px;
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

  
  .upload-icon{
    margin-left:0px ;
    }


</style>
