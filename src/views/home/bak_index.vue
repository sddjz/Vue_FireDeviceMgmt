
<template>
<div class="app-container" style="height:560px;width:100%;position:relative;margin-left:20%;">
  <TreeChart :json="dataList"   @click-node="clickNode" />
</div>
</template>
<script>
import {TreeChart} from './vart';
export default {
  name:'home',
  components: {TreeChart},
  data() {
    return {
      dataList: {
        name: '何xx',
        n:'xxxx',
        image_url: "https://static.refined-x.com/static/avatar.jpg",
        class: ["rootNode"],
        children: [
         {
            name: '张xxx',
            n:'xxxx',
            image_url: "https://static.refined-x.com/static/avatar.jpg",
            children:[
              {
                name: '代x',
                n:'xxx',
                image_url: "https://static.refined-x.com/static/avatar.jpg",
                 children: [
                  {
                    name: '李x', n:'xxx',
                    image_url: "https://static.refined-x.com/static/avatar.jpg"
                  },
                  {
                    name: '李x', n:'xxx',
                    image_url: "https://static.refined-x.com/static/avatar.jpg"
                  },
                  {
                    name: '赵x', n:'xxxx',
                    image_url: "https://static.refined-x.com/static/avatar.jpg"
                  }
                ]
              },
            ]
          },
        ]
      },
    }
  },
  methods: {
    clickNode: function(node){
      console.log(node)
    },
  }
}
</script>
<style lang="scss" scoped>

.app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .avat{
  border-radius: 2em;
  border-width:2px;
}
#app .name{
  font-weight:700;
}
#app .rootNode .name{
  color: red;
}

</style>
