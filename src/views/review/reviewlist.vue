<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <el-row >
            <el-col span="3">
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
            </el-col>
        </el-row>
        </div>
  
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-row >
                    <el-form-item label="检查员"  >
                    <el-input classs="input-width" v-model="listQuery.reviewerName" placeholder="请输入内容"></el-input>
                    </el-form-item>

                  <el-form-item label="检查时间" class="label-css">
                      <el-date-picker
                        v-model="listQuery.stTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>&nbsp&nbsp&nbsp--
                      <el-date-picker
                        class="picker-css"
                        v-model="listQuery.endTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>
                </el-form-item>

               
                      <el-button  
                        type="primary"
                        @click="handleSearchList()"
                        size="small">
                      查询搜索
                      </el-button>
                      <!--margin-right: 15px-->
                    <el-button
                      @click="handleResetSearch()"
                      size="small">
                      重置
                    </el-button>
          </el-row>
   
          </el-form>
        </div>
      </el-card>

      <!----->
      <el-card class="operate-container" shadow="never">       
<el-row>
    <el-col span="3">
      <i class="el-icon-tickets"></i>
            <span>数据列表</span>
    </el-col>
<el-col></el-col>
</el-row>

 </el-card>


 <el-table
    :data="list"
    style="width: 100%">
    
          <el-table-column label="检查号" prop="serialNum">
        
          </el-table-column>

          <el-table-column label="检查主体" prop="reviewerName">
        
          </el-table-column>

          <el-table-column label="检查日期"  >
            <template slot-scope="scope">{{scope.row.reviewDate|formatCalendar}}</template>

          </el-table-column>
        
        
          <el-table-column label="检查结果" prop="status" :formatter="formatStatus"> 
           </el-table-column>

           <el-table-column label="整改记录" prop="status" :formatter="formatRectifyRecord">
            <template slot-scope="scope">
              <el-button v-show="scope.row.rectify.length>0"
                size="mini"
                @click="handleViewRectify(scope.$index, scope.row)"
              >查看信息</el-button>
              <el-link  v-show="scope.row.rectify.length<1">无</el-link>
             
            </template>
           </el-table-column>
          <el-table-column label="备注" prop="descp"> 
          </el-table-column>
        
  </el-table>
  <el-form-item label="无" >
              </el-form-item>
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
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  } 
  .label-css{
    margin-left:0px ;
  }
  
  .input-width {
    margin-left:0px ;
    width: 150px;
  }
  .picker-css {
    width: 150px;
    margin-left:10px;
  }
  .pagination-css{
    margin-bottom: 50px;
    float: right;

  }


</style>

<script>
import { listReview } from '@/api/review';
import {formatDate} from '@/utils/date'
  export default {
    name: "reviewlist",

   
    created(){
      this.getList();
      
    },
    filters:{
      formatCalendar(time) {
          let date = new Date(time);
        //let d =  /\d{4}\/\d{1,2}\/\d{1,2}/g.exec(date);
        return formatDate(date,"yyyy-MM-dd")
        }, 


    },

    data() {
      return {
        listQuery:{
          reviewerName:'',
          stTime:null,
          endTime:null,
          pageSize: 10,
          pageNum: 1,
        },
        name: "reviewlist",
        list: []
      } 
   
  },

  methods:{
      getList(){
        this.listLoading = true;

        listReview(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          
        });
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

      formatStatus(row){
        if(row.status==0){
          return "通过"
        }
        if(row.status==1){
          return "整改中"
        }
        return ''
      },
    
      formatRectifyRecord(row){
        if(row.rectify.length>0){
          return "有"
        }
        return "无"
      },
      handleViewRectify(index, row){
        //console.log('out the row id');
        //console.log(row)
        this.$router.push({path:'/review/rectify_item',query:{reviewId:row.id}})
      },
  }
}
</script>


<!--'
  

<el-table-column  type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.rectify">
          <el-table-column label="检查主体" >
            <template slot-scope="scope">{{scope.row.descp}}</template>
          </el-table-column>

        </el-table>
        <el-form label-position="left" inline class="demo-table-expand"  >
          <el-card class="filter-container" shadow="never"></el-card>

          

        </el-form>
      </template>
    </el-table-column>

<el-form-item label="  ID" >
            <span>{{ props.row.assetId }}</span>
          </el-form-item>

          <el-form-item label="  ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>

          <el-form-item label="  ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>

-->