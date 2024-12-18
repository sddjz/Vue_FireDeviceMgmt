<template>
<div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-row >
          <el-col span=3>
              <i class="el-icon-search"></i>
              <span>筛选搜索</span>
          </el-col>
              <el-button
              style="float:right"
              type="primary"
              @click="handleSearchList()"
              size="small">
              查询搜索
            </el-button>
            <el-button
              style="float:right;margin-right: 50px"
              @click="handleResetSearch()"
              size="small">
              重置
            </el-button>

      </el-row>
      </div>
      <div style="margin-top: 15px">
        
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
      
      <el-row >

        <el-col span=8>
            <el-form-item label="职位">
                <el-select v-model="listQuery.posId" class="label-css" placeholder="全部" clearable>
                  <el-option v-for="item in posTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-col>
              <el-col span=12>

                    <el-form-item label="任职时间" class="label-css">
                      <el-date-picker
                        class="input-width"
                        v-model="listQuery.pos_date"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>-
                      <el-date-picker
                        class="input-width"
                        v-model="listQuery.pos_date"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>
                    </el-form-item>
              </el-col>
            </el-row>
            
        <el-row >
              <el-col span=8>
                  <el-form-item label="员工状态">
                      <el-select v-model="listQuery.status" class="label-css" placeholder="全部" clearable>
                        <el-option v-for="item in statusOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                        </el-option>
                      </el-select>
              </el-form-item>
            </el-col>

              <el-col span=10>
                  <el-form-item label="员工姓名" class="label-css">
                     <el-input v-model="listQuery.name"/>
              </el-form-item>
        </el-col>
        </el-row></el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <el-row>
          <el-col span=3>
            <i class="el-icon-tickets"></i>
                  <span>数据列表</span>
          </el-col>
      <el-col></el-col>
      </el-row>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>

        <el-table-column label="员工编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.empNum}}</template>
        </el-table-column>
        <el-table-column label="姓名" width="180" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>

        <el-table-column label="身份证号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.socialId }}</template>
        </el-table-column>
        <el-table-column label="性别" width="120" align="center">
          <template slot-scope="scope">{{scope.row.gendor==0?'男':'女' }}</template>
        </el-table-column>
        <!--| formatCreateTime-->
        <el-table-column label="电话" width="180" align="center">
          <template slot-scope="scope">{{scope.row.phone }}</template>
        </el-table-column>
        <!--
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="地址" width="120" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        -->
    
        <el-table-column label="职位" width="120" align="center">
          <template slot-scope="scope">{{scope.row|formatPos}}</template>
        </el-table-column>
     
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewUser(scope.$index, scope.row)"
            >查看信息</el-button>
        
           <!--   <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status===1">编辑信息</el-button>-->
            <el-button
              size="mini"
              @click="handleUpdateUser(scope.$index, scope.row)"
              >编辑信息</el-button>
            <!--
              <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status===2||scope.row.status===3">订单跟踪</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status===4">删除订单</el-button>
            -->
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-css"  >
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    </div>
    
  </div>

   
</template>
<script>
  import {fetchList } from '@/api/user'
  import {fetchPosList} from '@/api/position'

  import {formatDate} from '@/utils/date';
  //import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  const defaultListQuery = {
    status: 1,
    posId: null,
    pos_date:null,
    pageNum: 1,
    pageSize: 10,
   
  };

  export default {
    name: "userlist",
    //components:{LogisticsDialog},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
        multipleSelection: [],
        closeOrder:{
          dialogVisible:false,
          content:null,
          orderIds:[]
        },
        statusOptions: [
          {
            label: '在职',
            value: 1
          },
          {
            label: '离职',
            value: 0
          },
           
        ],
        //fetch by controller;
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
        
       
        logisticsDialogVisible:false
      }
    },
    created() {
      this.getList();
      this.getPosList();
    },
    filters: {
      formatPos(row){
        let  rt = '';
        console.log(row);
        for(var item of row.userPosList){
          rt+= item.pos.showName;
        }
        return rt;
      },
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatPayType(value) {
        if (value === 1) {
          return '';
        } 
        return ''
      },
      formatSourceType(value) {
        if (value === 1) {
          return '';
        } 
        return ''
      },
      formatStatus(value) {
        if (value === 1) {
          return '';
        } 
        return ''
      },
     
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleViewUser(index, row){
        //console.log('out the row id');
        //console.log(row)
        this.$router.push({path:'/user/userdetail',query:{userId:row.id}})
      },
   
      handleUpdateUser(index, row){
        //let listItem = this.covertOrder(row);
        //this.$router.push({path:'/user/updateuser',query:{userId:row.id}})
        this.$router.push({name:"updateuser",params: { userId:row.id }});

        
      },
      handleViewLogistics(index, row){
        this.logisticsDialogVisible=true;
      },
 
      handleBatchOperate(){
        
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      

      getList() {
          this.listLoading = true;
          fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          console.log('--------------1');
          console.log(response.data);
          
          console.log('--------------2');
        });
         

        //response ={"code":200,"message":"操作成功","data":       {"pageNum":1,"pageSize":10,"totalPage":2,"total":15,"list":[{"id":12,"memberId":1,"couponId":2,"orderSn":"201809150101000001","createTime":"2018-09-15T04:24:27.000+00:00","memberUsername":"test","totalAmount":18732.00,"payAmount":16377.75,"freightAmount":20.00,"promotionAmount":2344.25,"integrationAmount":0.00,"couponAmount":10.00,"discountAmount":10.00,"payType":0,"sourceType":1,"status":4,"orderType":0,"deliveryCompany":"","deliverySn":"","autoConfirmDay":15,"integration":13284,"growth":13284,"promotionInfo":"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠","billType":null,"billHeader":null,"billContent":null,"billReceiverPhone":null,"billReceiverEmail":null,"receiverName":"大梨","receiverPhone":"18033441849","receiverPostCode":"518000","receiverProvince":"江苏省","receiverCity":"常州市","receiverRegion":"天宁区","receiverDetailAddress":"东晓街道","note":"111","confirmStatus":0,"deleteStatus":0,"useIntegration":null,"paymentTime":null,"deliveryTime":null,"receiveTime":null,"commentTime":null,"modifyTime":"2019-11-09T08:50:28.000+00:00"},{"id":13,"memberId":1,"couponId":2,"orderSn":"201809150102000002","createTime":"2018-09-15T06:24:29.000+00:00","memberUsername":"test","totalAmount":18732.00,"payAmount":16377.75,"freightAmount":0.00,"promotionAmount":2344.25,"integrationAmount":0.00,"couponAmount":10.00,"discountAmount":0.00,"payType":1,"sourceType":1,"status":1,"orderType":0,"deliveryCompany":"","deliverySn":"","autoConfirmDay":15,"integration":13284,"growth":13284,"promotionInfo":"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠","billType":null,"billHeader":null,"billContent":null,"billReceiverPhone":null,"billReceiverEmail":null,"receiverName":"大梨","receiverPhone":"18033441849","receiverPostCode":"518000","receiverProvince":"广东省","receiverCity":"深圳市","receiverRegion":"福田区","receiverDetailAddress":"东晓街道","note":null,"confirmStatus":0,"deleteStatus":0,"useIntegration":1000,"paymentTime":"2018-10-11T06:04:19.000+00:00","deliveryTime":null,"receiveTime":null,"commentTime":null,"modifyTime":null}]}} ;
        //this.listLoading = false;
        // this.list = response.data.list;
        // this.total = response.data.total;
      },
      getPosList(){
        this.listLoading = true;
        fetchPosList().then(response => {
          this.listLoading = false;
          this.posTypeOptions = response.data.list;
        });

      },
    
    }
  }
</script>
<style scoped>
  .input-width {
    width: 150px;
  }

  

  .label-css{
    margin-left:0px ;
    float: left;
  }
  .pagination-css{
    margin-bottom: 50px;
    float: right;

  }


</style>


 