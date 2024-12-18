<template>
  <div class="app-container">
  <!-- <div class="address-layout">-->
 
<el-form ref="form" :model="vendor" label-width="80px">
  <!--`name: null,
phone: null,

company: null,

address: null,

email: null,
descp: null,

contact: null,
contactphone`-->
        <el-row>
          <el-col span="10">
            <el-form-item label="名称">
                <el-input v-model="vendor.name" class='input-css' size="medium"></el-input>
              </el-form-item>
            </el-col>
      
          <el-col span="10">
              <el-form-item label="公司">
                <el-input v-model="vendor.company" class='input-css' size="medium"></el-input>
              </el-form-item>  
          </el-col>
        </el-row>


        <el-row>
          <el-col span="10">
              <el-form-item label="地址">
                <el-input v-model="vendor.address" class='input-css' placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
          
            <el-col span="10"> 
              <el-form-item label="联系电话">
                <el-input v-model="vendor.phone" class='input-css' placeholder="请输入内容"></el-input>
            </el-form-item>
            
          </el-col>
        </el-row>

          <el-row>
            <el-col span="10">

              <el-form-item label="联系人">
                <el-input v-model="vendor.contact" class='input-css'  placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="联系人电话">
                <el-input v-model="vendor.contactphone" class='input-css' placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>

          </el-row>
          <el-row>
            <el-col span="10">
              <el-form-item label="邮箱">
                <el-input  v-model="vendor.email" class='input-css'  placeholder="请输入内容"></el-input>
            </el-form-item>
           
          </el-col>
          <el-col span="10">
            <el-form-item label="备注">
                <el-input type="textarea" v-model="vendor.descp"  class='input-css' placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          </el-row>
       

  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="onCancel" >取消</el-button>
  </el-form-item>

 


</el-form>
</div>
</template>

<script>
import {addVendor} from '@/api/vendor'
export default {
  name: 'addsavendor',
  data() {
      return {
        vendor: {
        name: null,
        phone: null,
        company: null,
        address: null,
        email: null,
        descp: null,
        contact: null,
        contactphone:null,
        }
      }
    },

    created() {
      
    },
    methods: {
      onSubmit() {
        console.log('submit!');
         //console.log('submit!');
        
        new Promise((resolve, reject) => {
          addVendor(this.vendor).then(response => {
          this.result = response;
          resolve();
        }).catch(error => {
          reject(error)
        })
      })

      },
      onCancel(){

        this.vendor={};
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

  .input-css{
    margin-right: 30px;
    
  }
</style>


