<template>
  <div class="asidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo first_li"
          :collapse="false"
          router
        >
          <el-menu-item
            index="/main"
            @click="
              ChangeTabList({
                name: 'home',
                path: '/main/home',
                label_name: '首页',
                id: 1,
              })
            "
          >
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-sub-menu index="/main/user">
            <template #title>
              <el-icon><User /></el-icon>
              <span>个人中心</span>
            </template>

            <el-menu-item-group>
              <el-menu-item
                index="/main/user/changepwd"
                @click="
                  ChangeTabList({
                    name: 'user_parent',
                    path: '/main/user/changepwd',
                    label_name: '修改密码',
                    id: 2,
                  })
                "
                >修改密码</el-menu-item
              >
              <el-menu-item
                index="/main/user/userAcount"
                @click="
                  ({
                    name: 'user',
                    path: '/main/user/userAcount',
                    label_name: '个人信息',
                    id: 3,
                  })
                "
                >个人信息</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            index="/main/student"
            @click="
              ChangeTabList({
                name: 'student',
                path: '/main/student/studentManger',
                label_name: '学生管理',
                id: 4,
              })
            "
          >
            <template #title>
              <el-icon><Operation /></el-icon>
              <span>学生管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/student/studentManger"
                >学生</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            v-if="store.state.user.loginIdenty === 'admin'"
            index="/main/doradmin"
            @click="
              ChangeTabList({
                name: 'dormitory_admin',
                path: '/main/doradmin/doradmin_manger',
                label_name: '宿管管理',
                id: 5,
              })
            "
          >
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>宿管管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/doradmin/doradmin_manger"
                >宿舍管理员</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            v-if="store.state.user.loginIdenty === 'admin'"
            index="/main/dormitory"
            @click="
              ChangeTabList({
                name: 'dormitory',
                path: '/main/dormitory/dormitory_manger',
                label_name: '宿舍楼栋管理',
                id: 6,
              })
            "
          >
            <template #title>
              <el-icon><OfficeBuilding /></el-icon>
              <span>宿舍楼栋管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/dormitory/dormitory_manger"
                >宿舍楼栋</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            v-if="store.state.user.loginIdenty === 'admin'"
            index="/main/dormitoryassign"
            @click="
              ChangeTabList({
                name: 'dor_assign',
                path: '/main/dormitoryassign/dormitory_assign',
                label_name: '宿舍分配',
                id: 7,
              })
            "
          >
            <template #title>
              <el-icon><House /></el-icon>
              <span>宿舍分配管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/dormitoryassign/dormitory_assign"
                >宿舍分配</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            index="/main/repair"
            @click="
              ChangeTabList({
                name: 'repair',
                path: '/main/repair/repair_message',
                label_name: '报修信息管理',
                id: 8,
              })
            "
          >
            <template #title>
              <el-icon
                ><template #default>
                  <i class="iconfont icon-baoxiu"></i> </template
              ></el-icon>
              <span>报修信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/repair/repair_message"
                >报修信息管理</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            v-if="false"
            index="/main/water_rechage"
            @click="
              ChangeTabList({
                name: 'water_rechage',
                path: '/main/water/water_recharge',
                label_name: '水电缴费管理',
                id: 9,
              })
            "
          >
            <template #title>
              <el-icon
                ><template #default>
                  <i class="iconfont icon-shuidianjiaofei"></i> </template
              ></el-icon>
              <span>水电缴费管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/water/water_recharge"
                >水电缴费管理</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            index="/main/enter"
            @click="
              ChangeTabList({
                name: 'enter_mager',
                path: '/main/enter/enter_mager',
                label_name: '入住信息管理',
                id: 10,
              })
            "
          >
            <template #title>
              <el-icon
                ><template #default>
                  <i class="iconfont icon-ruzhu"></i> </template
              ></el-icon>
              <span>入住信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/enter/enter_mager">
                入住信息</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
            index="/main/system"
            @click="
              ChangeTabList({
                name: 'system',
                path: '/main/system/stystem_manger',
                label_name: '系统管理',
                id: 11,
              })
            "
          >
            <template #title>
              <el-icon
                ><template #default>
                  <i class="iconfont icon-xitong"></i> </template
              ></el-icon>

              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/system/stystem_manger"
                >系统管理</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "asideBar",
  setup() {
    const isCollapse = ref(false);
    const store = useStore();
    const route = useRoute();
    const ChangeTabList = (val) => {
      store.commit("tablist/changeRouter", val);
    };
    return { isCollapse, route, ChangeTabList, store };
  },
};
</script>
<style lang="less" scoped>
.asidebar {
  width: auto;
  height: 100%;

  .tac {
    height: 100%;

    .el-col-24 {
      width: auto;
      background-color: #28333e;
    }
    .el-menu {
      width: auto;
      background-color: #28333e;
    }
  }
}
.el-menu-item {
  &:first-child {
    span {
      color: #fff;
    }
  }
}
.el-sub-menu__title * {
  color: #fff;
}
.el-sub-menu__title {
  &:hover {
    background-color: red !important;
  }
}
.el-menu-item [class^="el-icon"] {
  color: #fff;
}
</style>