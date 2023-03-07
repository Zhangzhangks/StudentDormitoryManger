<template>
  <div class="zks">
    <div class="common-layout">
      <el-container>
        <el-header id="reg_header">欢迎进入注册页面</el-header>

        <el-main id="reg_main">
          <div class="container">
            <div class="tab">
              <div
                class="admin_reg"
                :class="{ active: reg_name === 'admin_reg' }"
                @click="changeName('admin_reg')"
              >
                <span
                  class="iconfont icon-guanliyuan"
                  style="font-size: 20px; margin-right: 5px"
                ></span>
                <span>管理员注册</span>
              </div>

              <div
                class="student_reg"
                :class="{ active: reg_name === 'student_reg' }"
                @click="changeName('student_reg')"
              >
                <span
                  class="iconfont icon-xuesheng"
                  style="font-size: 20px; margin-right: 5px"
                ></span>
                <span>学生注册</span>
              </div>
            </div>

            <!-- 学生或者管理员注册界面的切换 -->
            <div class="body">
              <component :is="reg_name"></component>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import admin_reg from "./admin_manger/admin_reg.vue";

import student_reg from "./student_manger/student._reg.vue";
import { ref } from "vue";
export default {
  name: "WorkspaceJsonRegister",
  setup() {
    const reg_name = ref("admin_reg");
    const changeName = function (val) {
      reg_name.value = val;
    };
    return { reg_name, changeName };
  },
  components: { admin_reg, student_reg },
};
</script>
<style lang="less" >
.zks {
  background-color: #f5f5f5;

  #reg_header {
    width: 100%;
    height: 120px;
    background-color: #fff;
    font-size: 25px;
    text-align: center;
    line-height: 120px;
  }
  #reg_main {
    margin-top: 10px;
    height: 900px;
    .container {
      height: 900px;
      background-color: #fff;
      box-shadow: 0px 0px 5px 1px #ccc;

      .tab {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        .admin_reg,
        .student_reg {
          width: 235px;
          text-align: center;
          line-height: 40px;
          font-size: 20px;
          margin-right: 2px;
          border-bottom: 2px solid #ccc;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .active {
    border-bottom-color: #27ba9b !important;
    color: #27ba9b;
  }
}
</style>