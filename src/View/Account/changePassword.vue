<template>
  <div id="pwdform">
    <el-form
      ref="ruleFormRef"
      :model="accountPwd"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
      label-position="right"
    >
      <el-form-item label="原密码" prop="oldPwd">
        <el-input
          v-model.trim="accountPwd.oldPwd"
          style="width: 280px"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          v-model.trim="accountPwd.newPwd"
          style="width: 280px"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="newpwdEnter">
        <el-input
          type="password"
          v-model.trim="accountPwd.newpwdEnter"
          style="width: 280px"
          show-password
        />
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      @click="enterPwd"
      style="
        margin-left: 120px;
        width: 140px;
        height: 40px;
        border-radius: 10px;
      "
      >确认</el-button
    >
  </div>
</template>
<script>
import { updatePwd } from "../../Api/userApi";
import { updateAdminPwd } from "../../Api/admin";
import { reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "ChangePassword",

  setup() {
    const store = useStore();
    const router = useRouter();
    // 校验规则
    const checkpwd = (rule, value, callback) => {
      const RegExp = /[A-Za-z0-9_.]{1,14}/;
      if (!value) {
        return callback(new Error("请输入密码"));
      } else if (!RegExp.test(value)) {
        return callback(new Error("请输入1-14位密码"));
      } else {
        callback();
      }
    };
    // 校验规则
    const checkagainpwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (value !== accountPwd.newPwd) {
        return callback(new Error("两次密码不一致"));
      }
      callback();
    };
    const ruleFormRef = ref("");
    const accountPwd = reactive({
      oldPwd: "",
      newPwd: "",
      newpwdEnter: "",
    });
    // 提交密码
    const enterPwd = function () {
      ruleFormRef.value.validate((result) => {
        if (!result) {
          return ElNotification({
            title: "Error",
            message: "校验失败",
            type: "error",
          });
        } else {
          const { oldPwd, newPwd } = accountPwd;
          if (store.state.user.loginIdenty === "student") {
            updatePwd({ oldPwd, newPwd }).then((res) => {
              console.log(res);
              if (res.status !== 200) {
                return ElNotification({
                  title: "Error",
                  message: "更新失败",
                  type: "error",
                });
              } else {
                ElNotification({
                  title: "Success",
                  message: "更新成功",
                  type: "success",
                });
                router.push({ name: "login" });
              }
            });
          } else {
            updateAdminPwd({ oldPwd, newPwd }).then((res) => {
              console.log(res, "admin");
              if (res.status !== 200) {
                return ElNotification({
                  title: "Error",
                  message: "更新失败",
                  type: "error",
                });
              } else {
                ElNotification({
                  title: "Success",
                  message: "更新成功",
                  type: "success",
                });
              }
              router.push({ name: "login" });
            });
          }
        }
      });
    };
    const rules = reactive({
      oldPwd: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: checkpwd, trigger: "blur" },
      ],
      newPwd: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: checkpwd, trigger: "blur" },
      ],
      newpwdEnter: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: checkagainpwd, trigger: "blur" },
      ],
    });
    return { accountPwd, rules, enterPwd, ruleFormRef };
  },
};
</script>  

  <style lang="less" scoped>
#pwdform {
  width: 100%;
  height: 300px;
  padding: 25px;
  margin-top: 10px;
}
</style>