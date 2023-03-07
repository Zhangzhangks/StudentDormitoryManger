<template>
  <div class="mylogin">
    <!-- 登陆的背景 -->
    <canvas id="canvas-club"></canvas>
    <el-card class="box-card" id="mycard">
      <template #header>
        <div class="card-header">
          <span class="header">学生宿舍管理系统</span>
        </div>
      </template>
      <!-- 登陆方式 -->
      <div class="login_method">
        <h1 class="active">账户登录</h1>
        <h1>扫码登录</h1>
      </div>

      <!-- 账户登陆方式-->
      <div
        class="login_accout_message"
        v-if="method == 'account_login'"
        @click="method = 'message_login'"
      >
        <div class="mes_account active">
          <span class="iconfont icon-username"></span>
          <span> 使用短信登陆 </span>
        </div>
      </div>
      <!-- 短信登陆方式-->
      <div
        class="login_accout_message"
        v-else
        @click="method = 'account_login'"
      >
        <div class="mes_account active">
          <span class="iconfont icon-duanxin" style="margin-right: 5px"></span>
          <span>使用账户登录</span>
        </div>
      </div>

      <!-- 账户登陆输入框 -->
      <div id="account_login" v-if="method == 'account_login'">
        <AccountLogin
          @enterLoginFn="enterLogin"
          @emitProfileData="InjectValue"
        />
      </div>

      <!-- 短信登陆 -->
      <div id="message_login" v-else>
        <MessageLogin @yzmLogin="messageLogin" />
      </div>

      <!-- 登陆角色的切换 -->
      <div class="role">
        <h2 class="mainrole">角色</h2>
        <el-radio-group v-model="identy">
          <el-radio label="admin" size="large" class="admin"
            >宿舍管理员</el-radio
          >
          <el-radio label="student" size="large" class="student">学生</el-radio>
        </el-radio-group>
      </div>
      <!-- 登陆按钮 -->
      <div id="btn">
        <el-button
          type="primary"
          size="large"
          id="btn_login"
          @click="user_login"
          >登录</el-button
        >

        <div id="qqlogin"></div>
        <div class="register">
          <router-link to="/reg" style="font-size: 16px; margin-right: 5px"
            >注册管理员</router-link
          >
          <router-link to="/reg" style="font-size: 16px; margin-right: 5px">
            注册学生</router-link
          >
        </div>
      </div>

      <!-- 验证码 -->
      <MessageVertify
        :flag="YzmFlag"
        @VertifySuccess="Onsuccess"
      ></MessageVertify>
    </el-card>
    <Loading v-if="!loadFlag"></Loading>
  </div>
</template>
  <script>
import { onMounted, onUnmounted, reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { login_student, loginPhone_student } from "../../Api/userApi";
import { login_admin } from "../../Api/admin";
import { useStore } from "vuex";
import MessageLogin from "./Compoment/MessageLogin.vue";
import AccountLogin from "./Compoment/AccoutLogin.vue";
import { getCurrentInstance } from "vue";
import MessageVertify from "./Compoment/MessageVertify.vue";
import Loading from "../../components/loading.vue";
export default {
  name: "WorkspaceJsonLogin",
  components: { MessageLogin, AccountLogin, MessageVertify, Loading },
  setup() {
    const instance = getCurrentInstance();
    const { proxy } = instance;
    const router = useRouter();
    const store = useStore();
    const ruleFormRef = ref("");
    const identy = ref("admin");
    const method = ref("account_login");
    const loadFlag = ref(true);
    const YzmFlag = ref(false);
    // 绑定数据
    const profile = reactive({
      userId: null,
      password: null,
    });
    // 手机号
    const phoneNum = ref("");
    const phoneId = ref(""); //手机号登录的学号
    let timer = null;
    let rain = function () {
      proxy.$rain();
    };
    onMounted(() => {
      rain();
    });
    onUnmounted(() => {
      rain = null;
    });
    watchEffect(() => {
      store.state.user.loginIdenty = identy.value;
      console.log(store.state.user.loginIdenty, "登录身份");
    });
    // 账户登录传递过来的数据
    const InjectValue = function (val) {
      if (val.profile) {
        profile.userId = val.profile.userId;
        profile.password = val.profile.password;
      }
      ruleFormRef.value = val.ref;
    };

    const Onsuccess = function (val) {
      // console.log(val, "子组件的flag");
      YzmFlag.value = val;
      if (ruleFormRef.value) {
        ruleFormRef.value.validate(async (results) => {
          //请求时上方的进度条  和加载文字显示
          if (loadFlag) {
            NProgress.start();
          }
          loadFlag.value = false;
          store.state.user.loginIdenty = identy.value;
          if (!results) {
            ElNotification({
              title: "Error",
              message: "登录失败,校验不通过",
              type: "error",
              duration: 600,
            });
            clearTimeout(timer);
            timer = setTimeout(() => {
              loadFlag.value = true;
              NProgress.done();
            }, 1000);
          } else {
            // 宿舍管理员的校验
            if (identy.value === "admin") {
              AdminLogin(profile, timer, router, store, loadFlag);
            } else if (identy.value === "student") {
              StudentLogin(profile, timer, router, store, loadFlag);
            } else {
              return;
            }
          }
        });
      }
    };
    // 点击登录按钮时进行整体校验然后发送请求
    const user_login = function () {
      if (method.value === "message_login" && phoneId) {
        if (phoneNum.value) {
          if (identy.value === "student") {
            MessageStudnetLogin(
              phoneNum.value,
              phoneId.value,
              router,
              store,
              loadFlag
            );
          } else {
            return ElMessage({
              showClose: true,
              message: "没做",
              type: "error",
            });
          }
        }
      } else {
        console.log(ruleFormRef.value, "信息");
        if (ruleFormRef.value) {
          ruleFormRef.value.validate(async (results) => {
            if (!results) {
              ElNotification({
                title: "Error",
                message: "登录失败,校验不通过",
                type: "error",
                duration: 600,
              });
            } else {
              YzmFlag.value = true;
            }
          });
        }
      }
    };
    //按enter进入
    const enterLogin = function () {
      user_login();
    };
    // 绑定子组件传递来的数据
    const messageLogin = function (obj) {
      phoneNum.value = obj.phone;
      phoneId.value = obj.messageId;
    };

    return {
      identy,
      method,
      profile,
      user_login,
      messageLogin,
      loadFlag,
      Onsuccess,
      enterLogin,
      InjectValue,
      YzmFlag,
    };
  },
};
// 短信登录
function MessageStudnetLogin(phoneNum, phoneId, router, store) {
  loginPhone_student({ phoneNum, phoneId }).then((res) => {
    // console.log(res, "手机号");
    if (res.status !== 200) {
      return ElMessage({
        showClose: true,
        message: "登录失败",
        type: "error",
      });
    } else if (res.status === 200) {
      const result = res.data.data;
      result.token = res.data.token;
      router.push("/main");
      store.commit("user/assignStudentValue", result);
    }
  });
}
function StudentLogin(profile, timer, router, store, loadFlag) {
  // 学生登录
  clearTimeout(timer);
  setTimeout(() => {
    loadFlag.value = true;
    NProgress.done();
  }, 1000);
  // 学生的登陆校验
  login_student(profile).then((res) => {
    if (res.data.status == 201) {
      ElNotification({
        title: "Error",
        message: "登录失败",
        type: "error",
        duration: 600,
      });
    } else {
      ElNotification({
        title: "Success",
        message: "登录成功",
        type: "success",
        duration: 600,
      });
      const result = res.data.data;
      result.token = res.data.token;
      router.push("/main");
      store.commit("user/assignStudentValue", result);
    }
  });
}
function AdminLogin(profile, timer, router, store, loadFlag) {
  login_admin(profile).then((res) => {
    // console.log(res, "管理员登录");
    if (res.data.status == 201) {
      ElNotification({
        title: "Error",
        message: "登录失败 学号或者密码不正确 ! ",
        type: "error",
        duration: 600,
      });
    } else {
      ElNotification({
        title: "Success",
        message: "登录成功",
        type: "success",
        duration: 600,
      });
      console.log(res, "管理员");
      const results = res.data.data;
      results.token = res.data.token;
      router.push("/main");
      store.commit("user/assignAdminValue", results);
    }
  });
  clearTimeout(timer);
  timer = setTimeout(() => {
    loadFlag.value = true;
    NProgress.done();
  }, 1000);
}
</script>
  <style lang="less" scoped>
#mycard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 430px;
  height: 500px;
  border-radius: 10px;
  text-align: center;

  .login_method {
    width: 100%;
    height: 30px;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 20px;
    }
  }
  .header {
    font-size: 25px;
    font-weight: 700;
  }
  .login_accout_message {
    width: 120px;
    transform: translateX(260px);
    .mes_account {
      height: 50px;
      line-height: 50px;
      text-align: right;
      padding: 0 5px;
      margin-bottom: 10px;
    }
  }
  .role {
    display: flex;
    padding-left: 20px;
    margin-bottom: 10px;
    justify-content: space-between;
    h2 {
      text-align: center;
      line-height: 40px;
    }
    .mainrole {
      font-size: 17px;
    }
  }
  #btn_login {
    width: 200px;
    height: 40px;
    margin-bottom: 15px;
  }
}
.el-radio-group {
  flex: 1;
  display: flex !important;
  padding-left: 50px;
  .admin {
    display: flex !important;
    justify-content: center;
    span {
      padding: 2px 20px;
      font-size: 16px;
    }
  }
  .student {
    display: flex !important;
    justify-content: center;
    padding-left: 54px;
    span {
      padding: 2px 5px;
      font-size: 16px;
    }
  }
}
#canvas-club {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
* {
  margin: 0;
  padding: 0;
}
.active {
  color: #27ba9b;
  cursor: pointer;
}

.el-card__body {
  padding: 0 !important;
}

.van-loading {
  display: block;
  position: absolute;
  top: 52%;
  left: 32%;
  z-index: 9;
}
</style>