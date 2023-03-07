<template>
  <div id="pwdform">
    <el-form
      ref="ruleFormRef"
      :model="uservalue"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
      label-position="right"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model.trim="uservalue.username"
          style="width: 280px"
          autofocus
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
      >修改</el-button
    >
  </div>
</template>
<script>
import { updateusername, getStudentValue } from "../../Api/userApi";
import { updateAdminusername, getAdminValue } from "../../Api/admin";
import { onUpdated, reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "ChangePassword",
  setup() {
    const router = useRouter();
    const store = useStore();
    // 校验规则
    const checkname = (rule, value, callback) => {
      const reg = /^[\S]{1,5}$/;
      const adminReg = /^admin[\S]{1,5}$/;
      if (!value) {
        return callback(new Error("请输入姓名"));
      }
      if (store.state.user.loginIdenty === "admin") {
        if (!adminReg.test(value)) {
          return callback(
            new Error("请以admin开头并输入1-5位姓名，且不区分大小写")
          );
        }
      } else {
        if (!reg.test(value)) {
          return callback(new Error("请输入1-5位姓名"));
        }
      }
      callback();
    };

    const ruleFormRef = ref("");
    const uservalue = reactive({
      username: "",
    });

    // 获取姓名数据，填充到输入框
    if (store.state.user.loginIdenty === "student") {
      getStudentValue().then((res) => {
        uservalue.username = res.data.st_username ? res.data.st_username : "";
      });
    } else {
      getAdminValue().then((res) => {
        if (!res) return;
        uservalue.username = res.data.ad_username ? res.data.ad_username : "";
      });
    }

    const enterPwd = function () {
      console.log(uservalue.username);
      ruleFormRef.value.validate((result) => {
        if (!result) {
          return ElNotification({
            title: "Error",
            message: "校验失败",
            type: "error",
          });
        } else {
          if (store.state.user.loginIdenty === "admin") {
            updateAdminusername({ username: uservalue.username }).then(
              (res) => {
                // console.log(res);
                if (res.status !== 200) {
                  ElNotification({
                    title: "Error",
                    message: res.message,
                    type: "error",
                    duration: 600,
                  });
                  return;
                } else {
                  ElNotification({
                    title: "Success",
                    message: res.message,
                    type: "success",
                    duration: 600,
                  });

                  router.push({ name: "home" });
                  return;
                }
              }
            );
          } else {
            updateusername({ username: uservalue.username }).then((res) => {
              // console.log(res);
              if (res.status !== 200) {
                ElNotification({
                  title: "Error",
                  message: res.message,
                  type: "error",
                  duration: 600,
                });
                return;
              } else {
                ElNotification({
                  title: "Success",
                  message: res.message,
                  type: "success",
                  duration: 600,
                });

                router.push({ name: "home" });
                return;
              }
            });
          }
        }
      });
    };
    const rules = reactive({
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        { validator: checkname, trigger: "blur" },
      ],
    });
    return { uservalue, rules, enterPwd, ruleFormRef };
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