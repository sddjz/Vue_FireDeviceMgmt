<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    routes () {
      // return this.$router.options.routes
      /**
      console.log('output the json route from sidebar route');
      console.log(JSON.stringify(routes));
      */

      //console.log('sidebar_index.vue----------------------');
      //console.log(JSON.stringify(this.routers));
      return this.routers;
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
