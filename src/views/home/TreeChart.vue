<template>
  <table>
    <tr>
      <td
        :colspan="hasChild ? model.children.length * 2 : 1"
        :class="{ extend: hasChild && model.extend }"
      >
        <div class="card">
          <div class="title">{{ model.name }}</div>
          <!-- 
          <div class="footer">
            <div @click="$emit('on-add', model)">添加</div>
            <div @click="$emit('on-update', model)">修改</div>
            <div @click="$emit('on-remove', model)">删除</div>
          </div>-->
      
        </div>
      <!--
        <div class="extend_handle" v-if="hasChild" @click="toggleExtend()">{{ model.extend ? '展开' : '隐藏' }}</div>
      -->
      </td>
    </tr>
    <tr v-if="hasChild && model.extend">
      <td
        v-for="(item, index) in model.children"
        :key="index"
        colspan="2"
        class="child"
      >
        <!--跨层级监听事件 v-on="$listeners"（.native原生事件无效） -->
        <TreeChart :model="item" v-on="$listeners"/>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TreeChart',
  props: ['model'],
  computed: {
    hasChild () {
      console.log(this.model.children.length);
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggleExtend () {
      this.model.extend = !this.model.extend
    }
  }
}
</script>

<style lang="scss">
.card {
  background: rgb(227, 236, 247);
  border: 2px solid #ffffff;
  border-radius: 5px;
  margin: 0 auto;
  width: 200px;
  .title {
    padding: 10px 0;
    font-size: 12px;
  }

  .body {
    height: 100px;
    background: #ffffff;
    width: auto;
    margin: 0 15px;
  }

  .footer {
    display: flex;
    margin: 5px 15px;
    justify-content: space-between;
    div {
      font-size: 12px;
      color: rgb(20, 126, 192);
      cursor: pointer;
    }
  }
}
.extend_handle {
  cursor: pointer;
}
table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
  td {
    position: relative;
    vertical-align: top;
    padding: 0 0 50px 0;
    text-align: center;
    &.extend {
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 18px;
        height: 30px;
        border-left: 2px dashed rgb(159, 186, 202);
        transform: translate3d(-1px, 0, 0);
      }
    }
    &.child {
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 100%;
        height: 15px;
        border-left: 2px dashed rgb(159, 186, 202);
        transform: translate3d(-1px, 0, 0);
      }
      // 横线
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: -15px;
        border-top: 2px dashed rgb(159, 186, 202);
      }
      &:first-child:before,
      &:last-child:before {
        display: none;
      }
      &:first-child:after {
        left: 50%;
        height: 15px;
        border: 2px dashed;
        border-color: rgb(159, 186, 202) transparent transparent
          rgb(159, 186, 202);
        border-radius: 6px 0 0 0;
        transform: translate3d(1px, 0, 0);
      }
      &:last-child:after {
        right: 50%;
        height: 15px;
        border: 2px dashed;
        border-color: rgb(159, 186, 202) rgb(159, 186, 202) transparent
          transparent;
        border-radius: 0 6px 0 0;
        transform: translate3d(-1px, 0, 0);
      }
      &:first-child.child:last-child::after {
        left: auto;
        border-radius: 0;
        border-color: transparent rgb(159, 186, 202) transparent transparent;
        transform: translate3d(1px, 0, 0);
      }
    }
  }
}
</style>
