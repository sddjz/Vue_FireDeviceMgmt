<template>
  <div>
    <el-row>
      <el-col span="12">
          <div id="app" class="levelGraph">
            <TreeChart :model="tree" @on-add="add" @on-update="update" @on-remove="remove"/>
          </div>
        </el-col>
        <el-col span="12">
          <div>
            <span>test</span>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 使用方式
 * <TreeChart :model="data" >
 * data 参数格式为树形结构
 * 
 * {
 *  resName: "xxx",
 *  extend": true, 是否展开
 *  children: [{
 *    resName: "xxx",
 *    children: []
 *  }]
 * }
*/
import TreeChart from './TreeChart'
const dataTree= {
    "resId":"root",
    "name":'',
    "posName":'',
    "deptName":'',
    "resName":"支行行长",
    "extend": true,
    "children": [{
        "resId":"07fe2e8c976047e186bb6bcb8f4d6574",
        "resName":"客户经理",
        "extend": true,
        "children": []
    },{
        "resId":"07fe2e8c976047e186bb6bcb8f4d6575",
        "resName":"大堂经理",
        "extend": true,
        "children": [
          {"resId":"07fe2e8c976047e186bb6bcb8f4d6575",
        "resName":"柜员",
        "extend": true,
        "children": []}
      ]
    },{
        "resId":"07fe2e8c976047e186bb6bcb8f4d6576",
        "resName":"安全员",
        "extend": true,
        "children": []
    },
  
  ]
}
import {listUserPos} from '@/api/user'
export default {
  name:'home',

  data() {
    return {
      srcData:[],
      tree: dataTree
    }
  },
  components: {
    TreeChart
  },

  created() {
      this.getUserPosList();
    },

  methods:{
    getUserPosList:function(){
      listUserPos().then(response => {
          this.srcData = response.data;
          this.constructTreeFromSrc();

        });
       
    },

    constructTreeFromSrc:function(){
// Create a Map

        const itemMap = new Map();
        for(let item of this.srcData){
          item.children = [];
          item.pos=[]
          for(let userPos of item.userPosList){
              itemMap.set(userPos.id, item);
              item.pos.push(userPos.pos.showName);
              item.extend = true;
          }
        }
    
      for (let item of this.srcData) {
            for(let userPos of item.userPosList){
                let parentId = userPos.parentId;
                if(parentId==0){
                  this.tree = item;
                }else{
                  let parentItem = itemMap.get(parentId);
                  parentItem.children.push(item);
                }
          }
      }
      console.log(this.tree);
   
    },


    // 添加
    add: function(node){
      const newNode = {
        resName: '222',
        resId: new Date().getTime(),
        message: '',
        extend: true,
        children: []
      }
      node.children.push(newNode)
    },
    // 修改
    update: function(node){
      node.resName = new Date().getTime()
    },
    // 删除
    remove: function(node){
      if (node.resId == 'root'){
        alert('跟节点不能删除')
        return console.log('跟节点不能删除')
      }
      const deepSearch = (tree) => {
        for (let i = tree.length - 1; i >= 0; i--) {
          if (tree[i].resId == node.resId){
            console.log(tree[i])
            tree.splice(i, 1)
          } else if(tree[i].children){
            deepSearch(tree[i].children)
          }
        }
      }
      deepSearch(this.tree.children)
    }
  },
}
</script>

<style lang="scss">
.levelGraph{
  padding: 0;
  margin: 0;
  #app{
    height: 100vh;
    width: 50vw;
  }
}
</style>
