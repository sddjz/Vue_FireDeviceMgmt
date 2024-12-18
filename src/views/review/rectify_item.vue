<template> 
    <div class="detail-container">
      <div>
     
      </div>
     
     
        <div style="margin-top: 20px">
          <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
          <span class="label-css"  >基本信息</span>
        </div>
        <div class="table-layout">
          <el-row>
            <el-col :span="4" class="table-cell-title">发起人</el-col>
            <el-col :span="4" class="table-cell-title">开始时间</el-col>
            <el-col :span="4" class="table-cell-title">关联评审</el-col>
            <el-col :span="4" class="table-cell-title">单位</el-col>
            <el-col :span="4" class="table-cell-title">状态</el-col>

            <!--:null,
                    reviewerName:null,
                    receiver:null,
                    deadline:null,
                    descp:null,
                    finishedDate:null,
                    fee:null,
                    budget:null,
            -->

          </el-row>
            <el-row>
            <el-col :span="4" class="table-cell">{{rectify.startUser.name}}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.startedTime}}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.reviewSerialNum}}</el-col>
            <el-col :span="4" class="table-cell">{{ }}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.status | formatStatus}}</el-col>
          </el-row>
         
          <el-row>
            <el-col :span="4" class="table-cell-title">负责人</el-col>

            <el-col :span="4" class="table-cell-title">备注</el-col>
            <el-col :span="4" class="table-cell-title">完成时间</el-col>
            <el-col :span="4" class="table-cell-title">截止时间</el-col>

          </el-row>


          <el-row>
            <el-col :span="4" class="table-cell">{{rectify.receiver.name}}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.descp}}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.finishedDate}}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.deadline }}</el-col>
            <el-col :span="4" class="table-cell">{{rectify.email | formatSourceType}}</el-col>
          </el-row>           

        </div>
  <!--整改对象列表---------------------------------------------->
<template>
  <div>
    <span></span>
    <el-divider></el-divider>
    <span></span>
  </div>
</template>
<div style="margin-top: 20px">
          <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
          <span class="label-css"  >整改对象</span>
</div>

        <el-form ref="form"  >
        <el-row>

          <el-col >

          <el-table ref="orderTable"
                :data="showList"
                style="width: 100%;"
                border>
           <!--   
              <el-table-column label="资产类型" width="80" align="center">
                <template slot-scope="scope">{{scope.row.emp_num}}</template>
              </el-table-column>

              -->
              <el-table-column label="资产名称" width="80" align="center">
                <template slot-scope="scope">{{scope.row.assetName!=undefined? scope.row.assetName:"无"}}</template>
              </el-table-column>
              <el-table-column label="资产序列号" width="180" align="center">
                <template slot-scope="scope">{{scope.row.serialNum!=undefined? scope.row.serialNum:"无"}}</template>
              </el-table-column>

              <el-table-column label="负责人" width="120" align="center">
                <template slot-scope="scope">{{scope.row.rectifyUser.name }}</template>
              </el-table-column>
              
              <el-table-column label="截止日期" width="120" align="center">
                <template slot-scope="scope">{{scope.row.deadline }}</template>
              </el-table-column>

              <el-table-column label="整改状态" width="120" align="center">
                <template slot-scope="scope">{{scope.row.status }}</template>
              </el-table-column>
            
              <el-table-column label="费用" width="120" align="center">
                <template slot-scope="scope">{{scope.row.fee }}</template>
              </el-table-column>

              <el-table-column label="预算" width="120" align="center">
                <template slot-scope="scope">{{scope.row.budget }}</template>
              </el-table-column>

              <el-table-column label="备注" width="120" align="cen
              ter">
                <template slot-scope="scope">{{scope.row.descp }}</template>
              </el-table-column>
            
             
              </el-table>
            </el-col>

        </el-row>


        <el-row>
          <el-col span=10>
              <el-form-item v-show="false" >
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
          </el-col>
        </el-row>
  </el-form>





    </div>
    <!--  <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>-->
  </template>
  <script>
    //import {getOrderDetail,updateReceiverInfo,updateMoneyInfo,closeOrder,updateOrderNote,deleteOrder} from '@/api/order';

    import {getItem} from '@/api/rectify'
    import {formatDate} from '@/utils/date';

    //import VDistpicker from 'v-distpicker';
    /**
     * result.setReviewDate(review.getReviewDate());
			result.setReviewSerialNum(review.getSerialNum());
			result.setReviewerName(review.getReviewerName());
            startedUser;
            receiver.name
     * status deadline descp finishedDate startedTime fee budget 
     */
    export default {
      name: 'rectify_item',
      components: {    },
      data() {
            return{
                id:'',
                rectify:{
                    reviewSerialNum:null,
                    reviewerName:null,
                    startUser:null,
                    receiver:null,
                    status:0,//finished;
                    deadline:null,
                    descp:null,
                    finishedDate:null,
                    startTime:null,
                    fee:null,
                    budget:null,
                },
                showList:[],
            }
      },
      created() {
        this.id = this.list = this.$route.query.rectifyItemId;
        this.id = this.id.toString().replace('\'','');
        console.log('out[u the id]');
        //console.log(this.id);
        this.FetchData();
       
      },
      filters: {
        formatNull(value) {
          if(value===undefined||value===null||value===''){
            return '暂无';
          }else{
            return value;
          }
        },
       
        
        formatStatus(value) {
          if(value==0){return '完成';}
          return '整改中'
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

            //fetch rectify item information including reviewid and date; and subject;
            //fetch rectify_sa,rectify_fa,rectify_other item; including asset id, asset name; deadline
          /**getUserDetail({userId:this.id}).then(response => {
          this.user = response.data;
          console.log(this.user);
          
        });*/

        getItem({itemId:this.id}).then(response => {
          this.rectify = response.data;
          this.showList = this.rectify.rectifyfa.concat(this.rectify.rectifysa).concat(this.rectify.rectifyother);
        });
        console.log('*****************************************');
        console.log(this.showList);
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


  </style>
  <!--
formatAddress(order) {
          let str = order.receiverProvince;
          if (order.receiverCity != null) {
            str += "  " + order.receiverCity;
          }
          str += "  " + order.receiverRegion;
          str += "  " + order.receiverDetailAddress;
          return str;
        },

  -->