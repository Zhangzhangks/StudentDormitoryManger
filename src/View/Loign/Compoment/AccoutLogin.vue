<template>
  <el-form
    ref="ruleFormRef"
    :model="profile"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item class="username_login" prop="userId">
      <el-input
        class="el-ipt"
        v-model.number="profile.userId"
        placeholder="请输入学号或者工号"
      >
        <template #prefix>
          <i class="iconfont icon-username"></i>
        </template> </el-input
    ></el-form-item>

    <el-form-item
      class="password_login"
      prop="password"
      style="margin-top: 25px"
    >
      <el-input
        type="password"
        class="el-ipt"
        placeholder="请输入密码"
        v-model="profile.password"
        @keyup.enter="enterLogin"
      >
        <template #prefix> <i class="iconfont icon-password"></i></template>
      </el-input>
    </el-form-item>
  </el-form>
</template>
  <script>
import { ref, reactive, watch, onMounted } from "vue";
export default {
  name: "WorkspaceJsonMessageLogin",
  emit: ["enterLoginFn", "emitProfileData"],
  setup(props, ctx) {
    const ruleFormRef = ref("");

    // 绑定数据
    const profile = reactive({
      userId: null,
      password: null,
    }); // 自定义验证规则
    const enterLogin = function () {
      ctx.emit("enterLoginFn");
    };
    const checkUserID = (rule, value, callback) => {
      const reg = /^\d{5}$/;
      if (!value) {
        return callback(new Error("请输入学号"));
      }
      if (!reg.test(value)) return callback(new Error("请输入五位整数"));
      callback();
    };
    const checkpwd = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9.+-]{1,20}$/;
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (!reg.test(value)) {
        return callback(new Error("请输入1-20位密码,且不会含中文"));
      }
      callback();
    };
    const rules = reactive({
      userId: [
        {
          required: true,
          message: "请输入学号e",
          trigger: "blur",
        },
        { validator: checkUserID, trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: checkpwd, trigger: "blur" },
      ],
    });

    watch(profile, () => {
      if (profile.userId && profile.password) {
        console.log("传递数据");
        ctx.emit("emitProfileData", {
          profile,
          ref: ruleFormRef.value,
        });
      }
    });
    onMounted(() => {
      ctx.emit("emitProfileData", {
        ref: ruleFormRef.value,
      });
    });
    return { ruleFormRef, profile, rules, enterLogin };
  },
};
</script>
 
 
 
 <style lang="less" scoped>
#account_login {
  height: 150px;
  display: flex;
  .username_login,
  .password_login {
    margin-left: 40px !important;
  }
  .el-btn {
    width: 100px;
    height: 100%;
    border: none;
    background-color: #f5f5f5;
    margin-right: -15px;
    font-size: 16px;
    line-height: 38px;
    font-weight: normal;
    &:hover {
      cursor: pointer;
    }
  }
  .el-ipt {
    width: 280px;
    height: 40px;

    font-size: 16px;
  }
  .password_login {
    justify-content: space-between;
    display: flex;
    #password {
      width: 40px;
      height: 40px;
      background-color: #cfcdcd;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
    }
    .ipt {
      padding-left: 1px;
      #yzm {
        width: 100px;
        height: 38px;
        margin-right: -15px;
        line-height: 38px;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>