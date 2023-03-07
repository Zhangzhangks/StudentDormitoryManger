<template>
  <div class="zzz">
    <!-- form表单 -->
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
      :inline="true"
      :rules="rules"
      :model="admin_value"
    >
      <el-form-item prop="username">
        <el-input
          class="ipt"
          placeholder="请输入姓名"
          :prefix-icon="User"
          size="large"
          v-model="admin_value.username"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="userId">
        <el-input
          class="ipt"
          placeholder="请输入工号"
          size="large"
          v-model.number="admin_value.userId"
        >
          <template #prefix>
            <i class="iconfont icon-xuehaoguanli"></i> </template
        ></el-input>
      </el-form-item>

      <el-form-item prop="gender">
        <el-select
          v-model="admin_value.gender"
          placeholder="请选择性别"
          style="width: 320px; height: 50px"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>

      <el-form-item prop="age">
        <el-input
          class="ipt"
          placeholder="请输入年龄"
          size="large"
          v-model.number="admin_value.age"
        >
          <template #prefix> <i class="iconfont icon-nianling"></i> </template
        ></el-input>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input
          class="ipt"
          placeholder="请输入手机号"
          :prefix-icon="Iphone"
          size="large"
          v-model.number="admin_value.phone"
        />
      </el-form-item>

      <el-form-item prop="building"
        ><el-input
          class="ipt"
          placeholder="请输入所属楼栋"
          size="large"
          v-model="admin_value.building"
          ><template #prefix>
            <i class="iconfont icon-loudongguanli"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          class="ipt"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          size="large"
          show-password
          type="password"
          v-model="admin_value.password"
        />
      </el-form-item>

      <el-form-item prop="enterPwd">
        <el-input
          class="ipt"
          placeholder="请确认密码"
          :prefix-icon="Lock"
          size="large"
          type="password"
          show-password
          v-model="admin_value.enterPwd"
      /></el-form-item>
    </el-form>
    <el-button type="primary" id="btn" @click="admin_reg">立即提交</el-button>
  </div>
</template>
<script>
import {
  Calendar,
  User,
  Iphone,
  Lock,
  Setting,
  Promotion,
} from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import {
  checkName,
  checkage,
  checkUserID,
  checkgender,
  checkphone,
  checkbuild,
  checkpwd,
} from "./admin_schema";
import { reg_admin } from "../../../../Api/admin";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "WorkspaceJsonRegister",

  setup() {
    const User = ref("User");
    const Iphone = ref("Iphone");
    const Lock = ref("Lock");
    const router = useRouter();
    const checkagainpwd = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9.+-]{1,20}$/;
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (!reg.test(value)) {
        return callback(new Error("请输入1-20位密码,且不会含中文"));
      }
      if (value !== admin_value.password) {
        callback(new Error("两次密码不匹配,请重新输入"));
      }
      callback();
    };
    // 管理员数据
    const admin_value = reactive({
      username: "admin",
      userId: "",
      gender: "",
      age: "26",
      building: "",
      phone: "13218919255",
      password: "",
      enterPwd: "",
    });
    const ruleFormRef = ref(null);

    // 登陆按钮的请求函数
    const admin_reg = () => {
      ruleFormRef.value.validate(async (result) => {
        if (!result) {
          return ElMessage({
            showClose: true,
            message: "校验不通过,请检查是否填写正确",
            type: "warning",
            duration: 3000,
          });
        } else {
          const copystudent_value = reactive({
            username: admin_value.username,
            userId: parseInt(admin_value.userId),
            gender: admin_value.gender,
            age: parseInt(admin_value.age),
            phone: admin_value.phone.toString(),
            building: admin_value.building,
            password: admin_value.password,
            enterPwd: admin_value.enterPwd,
          });

          // 把性别转换成0 1 存储到数据库
          copystudent_value.gender = admin_value.gender === "男" ? 1 : 0;
          reg_admin(copystudent_value).then((res) => {
            console.log(res.data, "管理员注册");
            if (res.data.status !== 200) {
              // console.log(res);
              return ElNotification({
                title: "Error",
                message: "注册失败",
                type: "error",
                duration: 3000,
              });
            } else {
              ElNotification({
                title: "Success",
                message: "注册成功",
                type: "success",
                duration: 3000,
              });
            }
            router.push("/login");
          });
        }
      });
    };
    const rules = reactive({
      username: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
        { validator: checkName, trigger: "blur" },
      ],
      userId: [
        {
          required: true,
          message: "请输入学号",
          trigger: "blur",
        },
        { validator: checkUserID, trigger: "blur" },
      ],
      gender: [
        {
          required: true,
          message: "请输入性别",
          trigger: "blur",
        },
        { validator: checkgender, trigger: "blur" },
      ],
      age: [
        {
          required: true,
          message: "请输入年龄",
          trigger: "blur",
        },
        { validator: checkage, trigger: "blur" },
      ],

      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
        { validator: checkphone, trigger: "blur" },
      ],
      building: [
        {
          required: true,
          message: "请输入楼栋啊",
          trigger: "blur",
        },
        { validator: checkbuild, trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: checkpwd, trigger: "blur" },
      ],
      enterPwd: [{ validator: checkagainpwd, trigger: "blur" }],
    });
    return { User, Iphone, Lock, rules, admin_reg, admin_value, ruleFormRef };
  },
};
</script>
<style lang="less" scoped>
.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding-left: 120px;
  justify-content: space-between;
}
.ipt {
  width: 320px;
  height: 50px;
  font-size: 18px;

  ::placeholder {
    font-size: 16px;
  }
}
#btn {
  position: relative;
  left: 50%;
  top: 20px;
  width: 320px;
  height: 50px;
  transform: translateX(-50%);
}
</style>
