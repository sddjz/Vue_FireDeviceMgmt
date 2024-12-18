<template>
  <div class="app-container">
  <!-- <div class="address-layout">-->
 
<el-form ref="form" :model="rectify" label-width="80px">
  
  <el-row>
          <el-col span="10">
            <el-form-item label="负责人" class='label-css' >
              <el-select v-model="rectify.receiverId" class="item-css" placeholder="全部" clearable
              >
                  <el-option v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                  </el-option>
                </el-select>
              </el-form-item>  
         </el-col>

          <el-col span="10">
            <el-form-item label="开始时间" class='label-css' >
                <el-date-picker
                class='item-css'
                  v-model="rectify.startedTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择时间">
                </el-date-picker>
          </el-form-item>
          
              
          </el-col>
        </el-row>


        <el-row>
         
           <el-col span="10"  >
              <el-form-item label="关联检查(可选)" class='label-css'>
                <el-input v-model="rectify.reviewSerialNum" class='item-css' size="medium" ></el-input>
              </el-form-item>  

          </el-col>
          <el-col span=10 >
            <el-form-item label="截止日期"    class='label-css'>
                <el-date-picker
                class='item-css'
                  v-model="rectify.deadline"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择时间">
            </el-date-picker> </el-form-item>
          </el-col>
        </el-row>

        <el-row>
         <el-col span="10"  >
          <el-form-item label="备注"    class='label-css'>
              <el-input type="textarea"  v-model="rectify.descp"  class='item-css' placeholder="请输入内容" clearable></el-input>
            </el-form-item>
        </el-col>
        <el-col span=10 >
          
        </el-col>
      </el-row>
        <el-row>


          <el-col span=10>
              <el-form-item label="添加整改对象"  class='label-css'>
                <el-button type="primary" plain   @click="handleShowSa">安防资产</el-button>
                <el-button type="primary" plain @click="handleShowFa" >消防资产</el-button>
                <el-button type="primary" plain  @click="handleShowOther">其它</el-button>
              </el-form-item>  
          </el-col>
        </el-row>
      </el-form>

<!--------------------------------------------------------------------sa---->
<el-form ref="form" :model="sa" label-width="80px" v-show="showsa">

<el-row>
  <el-col span=5 >
        <el-form-item   class="form-title"  >
           <li>添加安防资产</li>
        </el-form-item>
  </el-col>
  <el-col></el-col>
</el-row>
<el-row>
  <el-col span=10>
    <el-form-item label="资产类型" class='label-css' >
      <el-select  class="item-css" v-model="selectedSaType" placeholder="全部" clearable
      @change="handleSaTypeChanged($event)"
      >
          <el-option v-for="item in saTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
          </el-option>
        </el-select>              
      </el-form-item>  
    
      </el-col>

      <el-col span=10>

      <el-form-item label="资产名称" class='label-css' >
      <el-select v-model="sa.assetId" class="item-css" placeholder="全部" clearable ref="saSelect">
          <el-option v-for="item in saAssetShowList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>  
    

   </el-col>
  </el-row>
<el-row>

    <el-col  span=10>

    <el-form-item label="负责人" class='label-css' >
      <el-select v-model="sa.receiverId" class="item-css" placeholder="全部" clearable>
          <el-option v-for="item in staffList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>  

      </el-col>

      <el-col span=10>
          <el-form-item label="截止日期" class='label-css' >
          <el-date-picker
          class='item-css'
            v-model="sa.deadline"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>  
    </el-col>
    </el-row>
    <el-row>

    <el-col  span=10>
      <el-form-item label="费用预算" class='label-css' >
        <el-input v-model="sa.budget" class='item-css' size="medium" ></el-input>
      </el-form-item> 
    </el-col> 
    <el-col  span=10>
      <el-form-item label="备注" class='label-css' >
        <el-input v-model="sa.descp" class='item-css' size="medium" ></el-input>
      </el-form-item>  
    </el-col> 
  </el-row>
 


   <el-row>
        <el-col  span=10>
          <el-button type="success" @click="handleAddSa">确定</el-button>
          <el-button type="info" @click="handleClearSa">取消</el-button>
        </el-col> 
    </el-row> 
</el-form>


        <!--------------------------------------------------------------------fa---->
        <el-form ref="form" :model="fa" label-width="80px" v-show="showfa">
        
        <el-row>
          <el-col span=5 >
                <el-form-item   class="form-title"  >
                   <li>添加消防资产</li>
                </el-form-item>
          </el-col>
          <el-col></el-col>
        </el-row>
        <el-row>
          <el-col span=10>
            <el-form-item label="资产类型" class='label-css' >
              <el-select class="item-css" placeholder="全部" v-model="selectedFaType" clearable
              @change="handleFaTypeChanged($event)"
              >
                  <el-option v-for="item in faTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                  </el-option>
                </el-select>   
              </el-form-item>  

              </el-col>

              <el-col span=10>

              <el-form-item label="资产名称" class='label-css' >
              <el-select v-model="fa.assetId" class="item-css" placeholder="全部" clearable ref="faSelect">
                  <el-option v-for="item in faAssetShowList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>  
            

           </el-col>
          </el-row>
        <el-row>

            <el-col  span=10>

            <el-form-item label="负责人" class='label-css' >
              <el-select v-model="fa.receiverId" class="item-css" placeholder="全部" clearable>
                  <el-option v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>  

              </el-col>

              <el-col span=10>
                  <el-form-item label="截止日期" class='label-css' >
                  <el-date-picker
                  class='item-css'
                    v-model="fa.deadline"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择时间">
                  </el-date-picker>
                </el-form-item>  
            </el-col>
            </el-row>
            <el-row>

            <el-col  span=10>
              <el-form-item label="费用预算" class='label-css' >
                <el-input v-model="fa.budget" class='item-css' size="medium" ></el-input>
              </el-form-item> 
            </el-col> 
            <el-col  span=10>
              <el-form-item label="备注" class='label-css' >
                <el-input v-model="fa.descp" class='item-css' size="medium" ></el-input>
              </el-form-item>  
            </el-col> 
          </el-row>
         
       

           <el-row>
                <el-col  span=10>
                  <el-button type="success" @click="handleAddFa">确定</el-button>
                  <el-button type="info" @click="handleClearFa">取消</el-button>
                </el-col> 
            </el-row> 
       </el-form>

                <!--------------------------------------------------------------------other---->
                <el-form ref="form" :model="other" label-width="80px" v-show="showother">
       
                  <el-row>
                    <el-col span=5 >
                          <el-form-item   class="form-title"  >
                            <li>添加其它整改</li>
                          </el-form-item>
                    </el-col>
                    <el-col></el-col>
                  </el-row>
              <el-row>
                <el-col span=10>
                  <el-form-item label="负责人" class='label-css' >
                    <el-select v-model="other.receiverId" class="item-css" placeholder="全部" clearable>
                        <el-option v-for="item in staffList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col span=10>

                      <el-form-item label="截止日期" class='label-css' >
                      <el-date-picker
                      class='item-css'
                        v-model="other.deadline"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="请选择时间">
                      </el-date-picker>
                    </el-form-item>  
                  </el-col>
                </el-row>
       <el-row>
            <el-col span=10>

              <el-form-item label="费用预算" class='label-css' >
                <el-input v-model="other.budget" class='item-css' size="medium" ></el-input>
              </el-form-item>  
            </el-col>
            <el-col span=10>

              <el-form-item label="备注" class='label-css' >
                <el-input v-model="other.descp" class='item-css' size="medium" ></el-input>
              </el-form-item>  
            </el-col>
         </el-row>
         <el-row>
              <el-col span=10>

                  <el-button type="success" @click="handleAddOther">确定</el-button>
                  <el-button type="info" @click="handleClearOther">取消</el-button>
              </el-col>
        </el-row>
      </el-form>


        <el-row>
          <el-col span=10>
            
          </el-col>
        </el-row>
<!--整改对象列表---------------------------------------------->
<template>
  <div>
    <span></span>
    <el-divider></el-divider>
    <span></span>
  </div>
</template>
<el-form ref="form"  >
        <el-row>

          <el-col span=15>

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
                <template slot-scope="scope">{{scope.row.userName }}</template>
              </el-table-column>
              
              <el-table-column label="截止日期" width="120" align="center">
                <template slot-scope="scope">{{scope.row.deadline }}</template>
              </el-table-column>
              
              <el-table-column label="备注" width="120" align="center">
                <template slot-scope="scope">{{scope.row.descp }}</template>
              </el-table-column>
            
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleRemoveItem(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
              </el-table>
            </el-col>

        </el-row>


        <el-row>
          <el-col span=10>
              <el-form-item  >
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
          </el-col>
        </el-row>
  </el-form>
</div>
</template>

<script>
import {getTypeList as getFaTypeList }from '@/api/fatype' 
import {getTypeList as getSaTypeList}from '@/api/satype' 
import {getUserInBank} from '@/api/user' 
import {fetchAllList as fetchSaList} from '@/api/sa' 
import {fetchAllList as fetchFaList} from '@/api/fa' 
import {addRectify} from '@/api/rectify'

export default {
  name: 'add_rectify',
  data() {
      return {

        staffList:[],

        rectify: {
          receiverId:null,
          startedTime:null,
          descp:null,
          deadline:null,
          reviewSerialNum:null
        },

        selectedSaType:null,
        selectedFaType:null,
        sa:{
          rectifyId:null,
          receiverId:null,
          assetId:null,
          deadline:null,
          budget:null,
          descp:null
        },
        fa: {
          rectifyId:null,
          receiverId:null,
          assetId:null,
          deadline:null,
          budget:null,
          descp:null
        },
        other:{
          rectifyId:null,
          receiverId:null,
          deadline:null,
          budget:null,
          descp:null
        }        ,

        showsa:false,
        showfa:false,
        showother:false,
        
        saTypeOptions:[],
        saAssetList:[],
        saAssetShowList:[],
        rectifySaList:[],

        faTypeOptions:[],
        faAssetList:[],
        faAssetShowList:[],
        rectifyFaList:[],
        
        rectifyOtherList:[],
        showList:[],
       
      }
    },

    created() {
      this.getColleagues();
      
      
      this.getFaType();
      this.getSaType();
      this.getFaAsset();
      this.getSaAsset();

    },
    methods: {
        onSubmit() {
         
            console.log('submit!');
       /**  if(this.staffList.length>0){
            this.fa.bankId =this.staffList[0].bankId;
          }*/

          this.rectify.rectifyfa = this.rectifyFaList;
          this.rectify.rectifysa = this.rectifySaList;
          this.rectify.rectifyother = this.rectifyOtherList;
          new Promise((resolve, reject) => {
              addRectify(this.rectify).then(response => {
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

      getFaType(){
        getFaTypeList().then(response => {
          this.faTypeOptions = response.data;
        });
      },
      getSaType(){
        getSaTypeList().then(response => {
          this.saTypeOptions = response.data;
        });
      },
      getFaAsset(){
        fetchFaList().then(response => {
          this.faAssetList = response.data;
        });
      },
      getSaAsset(){
        fetchSaList().then(response => {
          this.saAssetList = response.data;
        });
      },
      fillFaCopyData(copy){
        if(copy.assetId!=undefined){  
          for (let i = 0; i < this.faAssetShowList.length; i++) {
               if(copy.assetId==this.faAssetShowList[i].id){
                  copy.assetName= this.faAssetShowList[i].name;
                  copy.serialNum = this.faAssetShowList[i].serialNum;
                  break;
                }
            } 
          }
         this.fillUserName(copy);
      },

      fillSaCopyData(copy){
        if(copy.assetId!=undefined){  
          for (let i = 0; i < this.saAssetShowList.length; i++) {
               if(copy.assetId==this.saAssetShowList[i].id){
                  copy.assetName= this.saAssetShowList[i].name;
                  copy.serialNum = this.saAssetShowList[i].serialNum;
                  break;
                }
            } 
          }
         this.fillUserName(copy);
      },

      fillUserName(copy){
        if(copy.receiverId!=undefined){
            for (let i = 0; i < this.staffList.length; i++) {
               if(copy.receiverId==this.staffList[i].id){
                  copy.userName= this.staffList[i].name;
                  break;
                }
            } 
          }
      },

      onCancel: function(){
        this.sa={};
      },
      handleShowSa:function(){
          this.showsa = true;
      },

      handleShowFa:function(){
        this.showfa = true;
      },
      handleShowOther:function(){
        this.showother = true;

      },

      handleAddSa:function(){
        var copy = Object. assign({},this.sa);
        this.rectifySaList.push(copy);
        this.fillSaCopyData(copy);

        this.showList.push(copy);
      }
      ,
      handleClearSa:function(){
        this.sa={};
        this.showsa  = false;
      }
      ,

      handleAddFa:function(){
        var copy = Object. assign({},this.fa);
        this.rectifyFaList.push(copy);
        this.fillFaCopyData(copy);
        this.showList.push(copy);
      }
      ,
      handleClearFa:function(){
        this.fa={};
          this.showfa = false;
      }
      ,
      handleAddOther:function(){
        var copy = Object. assign({},this.other);
        this.rectifyOtherList.push(copy);
        this.fillUserName(copy);
        this.showList.push(copy);
      }
      ,

      handleClearOther:function(){
        this.other={};
          this.showother = false;
      },
      handleFaTypeChanged:function(param){
          this.fa.assetId=null;
          this.faAssetShowList = this.faAssetList.filter(function(item){return item.fireType==param;})
       },
      handleSaTypeChanged:function(param){
          this.sa.assetId=null;
          this.saAssetShowList = this.saAssetList.filter(function(item){return item.saType==param;})
       },
       
       handleRemoveItem:function(index,row){
          this.showList.splice(index,1);
          const indexFa = this.rectifyFaList.indexOf(row);
          if (indexFa > -1) { // only splice array when item is found
            this.rectifyFaList.splice(indexFa, 1); // 2nd parameter means remove one item only
            console.log(this.rectifyFaList);
          console.log(this.rectifySalist); return;
          }
          const indexSa = this.rectifySaList.indexOf(row);
          if (indexSa > -1) { // only splice array when item is found
            this.rectifySaList.splice(indexSa, 1); // 2nd parameter means remove one item only
            console.log(this.rectifyFaList);
          console.log(this.rectifySalist);return;
          }
          
          const indexOther = this.rectifyOtherList.indexOf(row);
          if (indexOther > -1) { // only splice array when item is found
            this.rectifyOtherList.splice(indexOther, 1); // 2nd parameter means remove one item only
            console.log(this.rectifyFaList);
          console.log(this.rectifySalist);
            return;
          } 
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
  .form-title{
    float:left;
    margin-left:10px ;
    color: red;
  }
</style>
