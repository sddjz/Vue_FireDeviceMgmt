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

        <el-col span=8>
            <el-form-item label="整改状态">
                <el-select v-model="listQuery.status" class="label-css" placeholder="全部" clearable>
                  <el-option v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-col>
              <el-col span=12>

                    <el-form-item label="整改时间" class="label-css">
                      <el-date-picker
                        class="input-width"
                        v-model="listQuery.stTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>-
                      <el-date-picker
                        class="input-width"
                        v-model="listQuery.endTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>
                    </el-form-item>
              </el-col>

              <el-button
              style="float:left margin-right:0px"
              type="primary" 
              @click="handleSearchList()"
              size="small">
              查询搜索
            </el-button>
            <el-button
              style="margin-left:5px"
              @click="handleResetSearch()"
              size="small">
              重置
            </el-button>
        
        </el-row></el-form>
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
   
    <el-table-column label="开始时间">
      <template slot-scope="scope">{{scope.row.startedTime|formatCalendar}}</template>
            
      </el-table-column>

 
      <el-table-column label="关联检查" prop="reviewerDate">
        <template slot-scope="scope" v-show="scope.row.reviewSerialNum!=null"> 

            <span class="font-small">检查代码： {{scope.row.reviewSerialNum}}</span><br>
            <span class="font-small">检查日期： {{scope.row.reviewDate|formatCalendar}}</span>
          </template>
          
      </el-table-column>


      <el-table-column label="发起人"  >
        <template slot-scope="scope">{{scope.row.startUser.name}}</template>
      </el-table-column>
    
      <el-table-column label="负责人"  >
        <template slot-scope="scope">{{scope.row.receiver.name}}</template>
      </el-table-column>
    
      <el-table-column label="整改状态" prop="status" :formatter="formatStatus"> 
       </el-table-column>

       <el-table-column label="详细信息" prop="status" :formatter="formatRectifyRecord">
        <template slot-scope="scope">
          <el-button  size="mini"
            @click="handleViewRectify(scope.$index, scope.row)"
          >查看信息</el-button>
  
          <el-button  size="mini"
            @click="handleViewRectify(scope.$index, scope.row)"
          >编辑信息</el-button>
         
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
    float:left;
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
import { listRectify } from '@/api/rectify';
import {formatDate} from '@/utils/date'
  export default {
    name: "rectify_list",
  
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
          
          stTime:null,
          endTime:null,
          status:null,
          pageSize: 10,
          pageNum: 1,
        },
        statusOptions:[
        {
          label:"完成",
          value:0,
        },
        {
          label:"整改中",
          value:1,

        }

        ],

        
        name: "reviewlist",
        list: [],
      } 
   
  },
  created(){
      this.getList();
      
    },
  methods:{
      getList(){
        this.listLoading = true;

        
        listRectify(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.list.forEach(element => {
            if(Array.isArray(element.rectifyfa)==false){
              var tmp = new Array();
              tmp.push(element.rectifyfa);
              element.rectifyfa = tmp;

          }
          if(Array.isArray(element.rectifysa)==false){
              var sa = new Array();
              sa.push(element.rectifysa);
              element.rectifysa = sa;
          }
          });
         
        
          console.log(this.list);
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
        this.$router.push({path:'/review/rectify_item',query:{rectifyItemId:row.id}})
      },
  }
}
</script>

 <!--
<el-col span=8>
                  <el-form-item label="资产类型">
                      <el-select v-model="listQuery.assetType" class="label-css" placeholder="全部" clearable>
                        <el-option v-for="item in statusOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                        </el-option>
                      </el-select>
              </el-form-item>
            </el-col>

              <el-col span=12>
                  <el-form-item label="资产名称" class="label-css">
                     <el-input v-model="listQuery.assetName"/>
              </el-form-item>
            </el-col>

/**
 *           reviewerName:'',
 assetType:null,
           assetName:null,
        */
 --> 

 <!--
 <el-table-column  type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.rectifyfa">
          <el-table-column label="检查主体" >
            <template slot-scope="scope">{{scope.row.descp}}</template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
         <el-table-column label="开始时间">
            {{scope.row.startedTime|formatCalendar}}
          </el-table-column>

          <el-table-column label="关联检查" prop="reviewerName">
        
          </el-table-column>

          <el-table-column label="发起人"  >
            <template slot-scope="scope"></template>
          </el-table-column>
        
        
          <el-table-column label="整改状态" prop="status" :formatter="formatStatus"> 
           </el-table-column>

           <el-table-column label="整改记录" prop="status" :formatter="formatRectifyRecord">
            <template slot-scope="scope">
              <el-button  size="mini"
                @click="handleViewRectify(scope.$index, scope.row)"
              >查看信息</el-button>
             
            </template>
           </el-table-column>
          <el-table-column label="备注" prop="descp"> 
          </el-table-column>



 -->