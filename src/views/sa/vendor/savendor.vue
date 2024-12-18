<template>
  <div class="app-container">
      <el-card class="filter-container" shadow="never">
        <div>
      

        <el-row >
      
         
          <el-col span=3>
              <i class="el-icon-search"></i>
              <span>筛选搜索</span>


          </el-col>
          
      </el-row>
      </div>
      <div style="margin-top: 15px">
        
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        

          <el-row >
            <el-col span=10>
              <el-form-item label="供应商名称" style="float:center"  >
                  <el-input v-model="listQuery.name" ></el-input>
              </el-form-item>
              <el-button
              
              type="primary"
              @click="handleSearchList()"
              size="small">
              查询搜索
            </el-button>
            <el-button
             
              @click="handleResetSearch()"
              size="small">
              重置
            </el-button>

          </el-col>
<!--style="float:right"
 style="float:right;margin-right: 15px"
-->
            

       
        </el-row>
 
       
        </el-form>
      </div>
      </el-card>

      
      <el-card class="operate-container" shadow="never">
            <el-row>
            <el-col span="3">
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
          <el-table-column label="名称" width="80" align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="公司名称" width="180" align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="地址" width="180" align="center">
            <template slot-scope="scope">{{scope.row.company | formatCreateTime}}</template>
          </el-table-column>
          <el-table-column label="产品简介" width="120" align="center">
            <template slot-scope="scope">{{scope.row.address | formatPayType}}</template>
          </el-table-column>
          <el-table-column label="联系方式" align="center">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="联系人" width="120" align="center">
            <template slot-scope="scope">￥{{scope.row.contact}}</template>
          </el-table-column>
          <el-table-column label="联系人电话" width="120" align="center">
            <template slot-scope="scope">￥{{scope.row.contactphone}}</template>
          </el-table-column>email
          <el-table-column label="联系人电话" width="120" align="center">
            <template slot-scope="scope">￥{{scope.row.email}}</template>
          </el-table-column>
          <el-table-column label="备注" width="120" align="center">
            <template slot-scope="scope">{{scope.row.descp | formatSourceType}}</template>
          </el-table-column>
         
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleViewOrder(scope.$index, scope.row)"
              >查看信息</el-button>
        <!--v-show="scope.row.status===1"-->
              <el-button
                size="mini"
                @click="handleDeliveryOrder(scope.$index, scope.row)"
                >编辑信息</el-button>
           
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="batch-operate-container">
        <el-select
          size="small"
          v-model="operateType" placeholder="批量操作">
          <el-option
            v-for="item in operateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button
          style="margin-left: 20px"
          class="search-button"
          @click="handleBatchOperate()"
          type="primary"
          size="small">
          确定
        </el-button>
      </div>
      <div class="pagination-container">
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
      
    <!--<logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>-->
    </div>
  </template>
  <script>
    import {listVendor} from '@/api/vendor'
    import {formatDate} from '@/utils/date';
    //import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
    const defaultListQuery = {
      pageNum: 1,
      pageSize: 10,
      name:'',
    };
    export default {
      name: "savendor",
      //components:{LogisticsDialog},
      data() {
        return {
          
          listQuery: Object.assign({}, defaultListQuery),
          listLoading: true,
          list: null,
          total: null,
          operateType: null,
          multipleSelection: [],
         
          operateOptions:[]
        
         //logisticsDialogVisible:false
        }
      },
      created() {
        this.getList();
      },
      mounted(){
        this.listLoading = false;
      },
      filters: {
        formatCreateTime(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        },
        formatPayType(value) {
            return '';
        },
        formatSourceType(value) {
          
        
            return '';
        
        },
        formatStatus(value) {
        
            return '';
         
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
        handleViewOrder(index, row){
          //this.$router.push({path:'/oms/orderDetail',query:{id:row.id}})
        },
        handleCloseOrder(index, row){
          //this.closeOrder.dialogVisible=true;
          //this.closeOrder.orderIds=[row.id];
        },
        handleDeliveryOrder(index, row){
          let listItem = this.covertOrder(row);
          this.$router.push({path:'/oms/deliverOrderList',query:{list:[listItem]}})
        },
        handleViewLogistics(index, row){
          //this.logisticsDialogVisible=true;
        },
        handleDeleteOrder(index, row){
          let ids=[];
          ids.push(row.id);
          this.deleteOrder(ids);
        },
        handleBatchOperate(){
          if(this.multipleSelection==null||this.multipleSelection.length<1){
            this.$message({
              message: '请选择要操作的订单',
              type: 'warning',
              duration: 1000
            });
            return;
          }
          if(this.operateType===1){
            //批量发货
            let list=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              if(this.multipleSelection[i].status===1){
                list.push(this.covertOrder(this.multipleSelection[i]));
              }
            }
            if(list.length===0){
              this.$message({
                message: '选中订单中没有可以发货的订单',
                type: 'warning',
                duration: 1000
              });
              return;
            }
            this.$router.push({path:'/oms/deliverOrderList',query:{list:list}})
          }else if(this.operateType===2){
            //关闭订单
            this.closeOrder.orderIds=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              this.closeOrder.orderIds.push(this.multipleSelection[i].id);
            }
            //this.closeOrder.dialogVisible=true;
          }else if(this.operateType===3){
            //删除订单
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            this.deleteOrder(ids);
          }
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
        handleCloseOrderConfirm() {
          if (this.closeOrder.content == null || this.closeOrder.content === '') {
            this.$message({
              message: '操作备注不能为空',
              type: 'warning',
              duration: 1000
            });
            return;
          }
          let params = new URLSearchParams();
          params.append('ids', this.closeOrder.orderIds);
          params.append('note', this.closeOrder.content);
          closeOrder(params).then(response=>{
            this.closeOrder.orderIds=[];
            //this.closeOrder.dialogVisible=false;
            this.getList();
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
          });
        },
  
        getList() {
          this.listLoading = true;
          listVendor(this.listQuery).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
          }); 
          //response ={"code":200,"message":"操作成功","data":       {"pageNum":1,"pageSize":10,"totalPage":2,"total":15,"list":[{"id":12,"memberId":1,"couponId":2,"orderSn":"201809150101000001","createTime":"2018-09-15T04:24:27.000+00:00","memberUsername":"test","totalAmount":18732.00,"payAmount":16377.75,"freightAmount":20.00,"promotionAmount":2344.25,"integrationAmount":0.00,"couponAmount":10.00,"discountAmount":10.00,"payType":0,"sourceType":1,"status":4,"orderType":0,"deliveryCompany":"","deliverySn":"","autoConfirmDay":15,"integration":13284,"growth":13284,"promotionInfo":"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠","billType":null,"billHeader":null,"billContent":null,"billReceiverPhone":null,"billReceiverEmail":null,"receiverName":"大梨","receiverPhone":"18033441849","receiverPostCode":"518000","receiverProvince":"江苏省","receiverCity":"常州市","receiverRegion":"天宁区","receiverDetailAddress":"东晓街道","note":"111","confirmStatus":0,"deleteStatus":0,"useIntegration":null,"paymentTime":null,"deliveryTime":null,"receiveTime":null,"commentTime":null,"modifyTime":"2019-11-09T08:50:28.000+00:00"},{"id":13,"memberId":1,"couponId":2,"orderSn":"201809150102000002","createTime":"2018-09-15T06:24:29.000+00:00","memberUsername":"test","totalAmount":18732.00,"payAmount":16377.75,"freightAmount":0.00,"promotionAmount":2344.25,"integrationAmount":0.00,"couponAmount":10.00,"discountAmount":0.00,"payType":1,"sourceType":1,"status":1,"orderType":0,"deliveryCompany":"","deliverySn":"","autoConfirmDay":15,"integration":13284,"growth":13284,"promotionInfo":"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠","billType":null,"billHeader":null,"billContent":null,"billReceiverPhone":null,"billReceiverEmail":null,"receiverName":"大梨","receiverPhone":"18033441849","receiverPostCode":"518000","receiverProvince":"广东省","receiverCity":"深圳市","receiverRegion":"福田区","receiverDetailAddress":"东晓街道","note":null,"confirmStatus":0,"deleteStatus":0,"useIntegration":1000,"paymentTime":"2018-10-11T06:04:19.000+00:00","deliveryTime":null,"receiveTime":null,"commentTime":null,"modifyTime":null}]}} ;
        },
        deleteOrder(ids){
          this.$confirm('是否要进行该删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = new URLSearchParams();
            params.append("ids",ids);
            deleteOrder(params).then(response=>{
              this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
              });
              this.getList();
            });
          })
        },
        covertOrder(order){
          let address=order.receiverProvince+order.receiverCity+order.receiverRegion+order.receiverDetailAddress;
          let listItem={
          
          };
          return listItem;
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  



