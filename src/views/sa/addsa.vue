<template>
  <div class="app-container">
  <!-- <div class="address-layout">-->
 
<el-form ref="form" :model="sa" label-width="80px">
  
  <el-row>
          <el-col span="10">
                <el-form-item label="名称" class='label-css' >
                  <el-input v-model="sa.name" class='item-css' size="medium" ></el-input>
              </el-form-item>
         </el-col>

          <el-col span="10"> <el-form-item label="设备类型"  class='label-css' >
                <el-select  v-model="sa.saType"  class='item-css' placeholder="全部" clearable>
                  <el-option v-for="item in saTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                  </el-option>
                </el-select>
              </el-form-item>
              
          </el-col>
        </el-row>


        <el-row>
          <el-col span="10">
            <el-form-item label="序列号" class='label-css' >
                <el-input v-model="sa.serialNum" class='item-css' size="medium" ></el-input>
              </el-form-item>  
         </el-col>

          <el-col span="10" class='label-css' >
              <el-form-item label="价格">
                <el-input v-model="sa.price" class='item-css' size="medium" ></el-input>
              </el-form-item>  
          </el-col>
        </el-row>


        <el-row>
          <el-col span=10>
              <el-form-item label="供应商" class='label-css' >
                <el-select  v-model="sa.vendorId"  class='item-css' placeholder="全部" clearable>
                  <el-option v-for="item in vendorList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                  </el-option>
                </el-select>
              </el-form-item>
          </el-col>
          
            <el-col span=10>
              <el-form-item label="购买日期" class='label-css' >
                <el-date-picker
                class='item-css'
                  v-model="sa.buyDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择时间">
                </el-date-picker>
          </el-form-item>
          </el-col>
        </el-row>

          <el-row>
            <el-col span="10">

              <el-form-item label="签收人" class='label-css' >
                <el-select  v-model="sa.signerId"  class='item-css' placeholder="全部" clearable>
                  <el-option v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="负责人" class='label-css' >
              <el-select  v-model="sa.reposId"  class='item-css' placeholder="全部" clearable>
                  <el-option v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                  </el-option>
                </el-select>
              </el-form-item>
          </el-col>

          </el-row>
          <el-row>
            <el-col span="10">
              
              <el-form-item label="入库时间" class='label-css' >
                <el-date-picker
                class='item-css'
                  v-model="sa.gmtInStore"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择时间">
                </el-date-picker>
          </el-form-item>
          </el-col>   
           <el-col span="10">
            <el-form-item label="状态" class='label-css'  >
              <el-col :span="11">
                <el-select  v-model="sa.status"   class='item-css' placeholder="全部" clearable>
                  <el-option v-for="item in statusOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>

        </el-row>
          

  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { listAll} from '@/api/vendor';
import {getTypeList }from '@/api/satype' 
import {getUserInBank} from '@/api/user' 

import {addSa} from '@/api/sa' 

export default {
  name: 'addsa',
  data() {
      return {
        userList:[ ],
        vendorList:[],
        saTypeOptions:[] ,
        staffList:[{id:0,name:'test'},{id:1,name:'2test'}],
        sa: {
          name:null,
          saType:null,
          serialNum:null,
          price:null,
          vendorId:null,
          buyDate:null,
          reposId:null,
          signerId:null,
          saType:null,
          status:null,
          bankId:null,
        },
        
        statusOptions:[
      {
          id:1,
          name:"正常",
      },
      {
        id:2,
          name:"维修",
      },
      {
        id:3,
          name:"报废",
      },
        ],

        
      }
    },

    created() {
      this.getVendorList();
      this.getColleagues();
      this.getSaType();

    },
    methods: {
      

      onSubmit() {
         //console.log('submit!');
         if(this.staffList.length>0){
            this.sa.bankId =this.staffList[0].bankId;
          }
        new Promise((resolve, reject) => {
          addSa(this.sa).then(response => {
            console.log(response);
            this.result = response;
            resolve();
        }).catch(error => {
          reject(error)
        })
      })
      },

      getColleagues(){
        console.log('try to get colleagues...........');
        getUserInBank().then(response => {
          this.staffList = response.data;
          console.log('output the staff');
          this.staffList.filter(function(item){item.id=item.id.toString();});

          console.log(this.staffList);
        });
      },
      getVendorList(){
        listAll().then(response => {
          this.vendorList = response.data;
        });
      },

      getSaType(){
        getTypeList().then(response => {
          this.saTypeOptions = response.data;
        });
      },
      onCancel: function(){
        this.sa={};
      },
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
  .input-width {
    padding-left: 50px;

     width: 180px;
  }

  
  .item-css{
    margin-left:10px ;
    float: left;
    width: 300px;
  }


  .label-css{
    margin-left:10px ;
    float: left;
    width: 400px;

  }
</style>


