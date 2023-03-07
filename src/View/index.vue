<template>
  <div class="">
    <div class="domitory_home">
      <div class="common-layout">
        <el-container id="home-layout">
          <!-- 头部组件 -->
          <Header></Header>

          <el-container id="asideEl">
            <!-- 侧边栏组件 -->
            <el-aside id="asidebar" width="auto">
              <asideBar />
            </el-aside>

            <!-- 内容区 -->
            <el-main id="mainContent">
              <!-- 面包屑 -->
              <breadItem />
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script>
import login from "./Loign/login.vue";
import breadItem from "../components/breadItem.vue";
import Header from "../components/header.vue";
import asideBar from "../components/AsideBar.vue";
export default {
  name: "WorkspaceJsonIndex",
  components: {
    login,
    Header,
    asideBar,
    breadItem,
  },
};
</script> <style lang="less" >
.domitory_home {
  width: 100%;
  #mainContent {
    background-color: #e0e0e0;
  }
  #home-layout {
    width: 100%;
    height: 937px;
    display: flex;
    flex-wrap: wrap;
    #header {
      display: flex;
      padding-left: 40%;
      justify-content: space-between;
      background-color: #515fbe;
      line-height: 80px;
      height: 100%;
      #headername {
        text-align: center;
        font-size: 25px;
        color: #fff;
      }
      .stytem_menu {
        flex: 1;
        display: flex;
        justify-content: end;
        padding: 0px 5%;
        .adminName {
          font-size: 16px;
          color: #fff;
          padding: 0px 20px;
        }
        .layout {
          font-size: 16px;
          color: #fff;
        }
      }
    }
    #asideEl {
      width: 100% !important;
      height: 92%;
      #asidebar {
        width: auto;
        height: 100%;
      }
    }
  }
}
</style>