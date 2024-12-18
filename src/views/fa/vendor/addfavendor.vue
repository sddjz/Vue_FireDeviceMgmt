<template>
  <div class="app-container">
  <!-- <div class="address-layout">-->
 
<el-form ref="form" :model="form" label-width="80px">
  <!--`vendor`.`name`, company    contact contactphone
    `vendor`.`desc`,
    `vendor`.`phone`,
    `vendor`.``,
    `vendor`.`address`,
    `vendor`.`email`,
    `vendor`.``,
    `vendor`.``-->
        <el-row>
          <el-col span="10">
            <el-form-item label="名称">
                <el-input v-model="form.social_id" size="medium"></el-input>
              </el-form-item>
            </el-col>
      
          <el-col span="10">
              <el-form-item label="公司">
                <el-input v-model="form.social_id" size="medium"></el-input>
              </el-form-item>  
          </el-col>
        </el-row>


        <el-row>
          <el-col span="10">
              <el-form-item label="地址">
                <el-input v-model="form.address" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
          
            <el-col span="10">
              <el-form-item label="联系人">
                <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
        </el-row>

          <el-row>
            <el-col span="10">

            <el-form-item label="联系电话">
              <el-col :span="11">
                <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="邮箱">
                <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>

          </el-row>
          <el-row>
            <el-col span="10">

            <el-form-item label="备注">
              <el-col :span="11">
                <el-input type="textarea" v-model="form.phone" placeholder="请输入内容"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col span="10">
            
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
export default {
  name: 'addfavendor',
  data() {
      return {
        form: {
          name: '',
          social_id:'',
          gendor:'1',
          phone:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
</style>


