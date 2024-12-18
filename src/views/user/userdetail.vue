<template> 
    <div class="detail-container"> 
            <div style="margin-top: 20px;margin-bottom: 50px;">
              <svg-icon icon-class="marker"  class='label-css'></svg-icon>
              <span  class="label-txt-css" >基本信息</span>
            </div>
     
            <div class="table-layout">
              <el-row>
                <el-col :span="4" class="table-cell-title">姓名</el-col>
                <el-col :span="4" class="table-cell-title">员工号</el-col>
                <el-col :span="4" class="table-cell-title">单位</el-col>
                <el-col :span="4" class="table-cell-title">在职状态</el-col>
                <el-col :span="4" class="table-cell-title">身份证号</el-col>
          


              </el-row>
              <el-row>
                <el-col :span="4" class="table-cell">{{user.name}}</el-col>
                <el-col :span="4" class="table-cell">{{user.empNum}}</el-col>
                <el-col :span="4" class="table-cell">{{user.bank.name}}</el-col>
                <el-col :span="4" class="table-cell">{{user.status|formatUserStatus}}</el-col>
                <el-col :span="4" class="table-cell">{{user.socialId}}</el-col>
              </el-row>

              <el-row>
              
                <el-col :span="4" class="table-cell-title">性别</el-col>
                <el-col :span="4" class="table-cell-title">住址</el-col>
                <el-col :span="4" class="table-cell-title">电话</el-col>
                <el-col :span="4" class="table-cell-title">邮箱</el-col>
              
              </el-row>
              <el-row>
              
                <el-col :span="4" class="table-cell">{{user.gendor|formatGendor}}</el-col>
                <el-col :span="4" class="table-cell">{{user.address}}</el-col>
                <el-col :span="4" class="table-cell">{{user.phone }}</el-col>
                <el-col :span="4" class="table-cell">{{user.email | formatSourceType}}</el-col>

              </el-row>
            
            </div>
              <div style="margin-top: 20px;margin-bottom: 50px;">
                <svg-icon icon-class="marker" class='label-css'></svg-icon>
                <span class="label-txt-css"   >当前职位</span>
              </div>

              <div style="width:80%">
                <el-table ref="curPos"
                      :data="curPosList"
                      style="width: 100%;"
                     border>

            
                <el-table-column label="部门" align="center">
                  <template slot-scope="scope">{{scope.row.dept|formatDept}}</template>
                </el-table-column>

                <el-table-column label="职位"  align="center">
                  <template slot-scope="scope">{{scope.row.pos.showName}}</template>
                </el-table-column>

                <el-table-column label="起始时间" align="center">
                  <template slot-scope="scope">{{scope.row.stTime}}</template>
                </el-table-column>

                <el-table-column label="领导" align="center">
                  <template slot-scope="scope">{{scope.row|formatLead}}</template>
                </el-table-column>

              </el-table>

              </div>

            <div style="margin-top: 20px;margin-bottom: 50px;">
              <svg-icon icon-class="marker" class='label-css' ></svg-icon>
              <span class="label-txt-css"   >历史职位</span>
            </div>

            <!-- history position list-->
         <div style="width:80%">

            <el-table ref="histPos"
                      :data="histPosList"
                      style="width: 100%;"
                       border>

                <el-table-column label="部门" align="center">
                  <template slot-scope="scope">{{(scope.row.dept|formatDept)}}</template>
                </el-table-column>

                <el-table-column label="职位"  align="center">
                  <template slot-scope="scope">{{scope.row.pos.showName}}</template>
                </el-table-column>

                <el-table-column label="起始时间"  align="center">
                  <template slot-scope="scope">{{scope.row.stTime}}</template>
                </el-table-column>

                <el-table-column label="结束时间"  align="center">
                  <template slot-scope="scope">{{scope.row.endTime}}</template>
                </el-table-column>

                <el-table-column label="领导"  align="center">
                  <template slot-scope="scope">{{scope.row|formatLead}}</template>
                </el-table-column>

              </el-table>       
              

            </div>

      </div>
      
    <!--   <div class="detail-container"> </div><logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>-->
  </template>
  <script>
    //import {getOrderDetail,updateReceiverInfo,updateMoneyInfo,closeOrder,updateOrderNote,deleteOrder} from '@/api/order';
    import {getUserDetail} from '@/api/user';

    import {formatDate} from '@/utils/date';
    //import VDistpicker from 'v-distpicker';
    
    export default {
      name: 'userdetail',
      components: {    },
      data() {
            return{
                id:'',
                user:null,
                curPosList:[],
                histPosList:[],
            }
      },
      created() {
        //console.log(')))))))))))))))');
        //console.log(this.$route.query.userId.toString());
        this.id = this.list = this.$route.query.userId.toString();
        this.id = this.id.toString().replace('\'','');
        this.FetchData();
       
      },
      filters: {
        formatLead(row){
          //.parentPosName+": "+scope.row.parentPosUserName
          if(row==null||row.parentPosName==null){return '无';}
            return  row.parentPosName+": "+ row.parentPosUserName;
        },
        formatDept(value){
          if(value==undefined||value==null){return '无';}
          return dept.showName;
        },
        formatGendor(value){
          if(value==1){
            return '女';
          }
          return '男';
        },

        formatUserStatus(value){
          if(value==1){
            return '在职';
          }
          return '离职';
        },

        formatNull(value) {
          if(value===undefined||value===null||value===''){
            return '暂无';
          }else{
            return value;
          }
        },


       
        formatAddress(order) {
          let str = order.receiverProvince;
          if (order.receiverCity != null) {
            str += "  " + order.receiverCity;
          }
          str += "  " + order.receiverRegion;
          str += "  " + order.receiverDetailAddress;
          return str;
        },
        formatStatus(value) {
          
        },
        formatPayStatus(value) {
          
        },
        formatDeliverStatus(value) {
         
        },
        formatProductAttr(value){
         
        }
      },
      methods: {
        FetchData(){
          getUserDetail({userId:this.id}).then(response => {
          this.user = response.data;
          //console.log(this.user);
          this.curPosList= this.user.userPosList.filter(item=>{return item.enabled==1});
          this.histPosList= this.user.userPosList.filter(item=>{return item.enabled!=1});
          //console.log('*************')
          //console.log(this.curPosList);

        });

        },
      
        formatTime(time) {
          if (time == null || time === '') {
            return '';
          }
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        },
        formatStepStatus(value) {
          
        },
       
      }
    }
  </script>
  <style scoped>
    .detail-container {
      width: 80%;
      padding: 20px 20px 20px 20px;
      margin: 20px auto;
    }
  
    .operate-container {
      background: #F2F6FC;
      height: 80px;
      margin: -20px -20px 0;
      line-height: 80px;
    }
  
    .operate-button-container {
      float: right;
      margin-right: 20px
    }
  
    .table-layout {
      margin-top: 20px;
      border-left: 1px solid #DCDFE6;
      border-top: 1px solid #DCDFE6;
    }
  
    .table-cell {
      height: 60px;
      line-height: 40px;
      border-right: 1px solid #DCDFE6;
      border-bottom: 1px solid #DCDFE6;
      padding: 10px;
      font-size: 14px;
      color: #606266;
      text-align: center;
      overflow: hidden;
    }
  
    .table-cell-title {
      border-right: 1px solid #DCDFE6;
      border-bottom: 1px solid #DCDFE6;
      padding: 10px;
      background: #F2F6FC;
      text-align: center;
      font-size: 14px;
      color: #303133;
    }

    .label-css{
    margin-left:0px ;
    float: left;
  }
  .label-txt-css{
    margin-left:20px ;
    float: left;

  }

  </style>
  
  