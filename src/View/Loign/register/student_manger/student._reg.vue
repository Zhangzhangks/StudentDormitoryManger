<template>
  <div class="zzz">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
      :inline="true"
      :rules="rules"
      :model="student_value"
    >
      <el-form-item prop="username">
        <el-input
          class="ipt"
          placeholder="请输入姓名"
          :prefix-icon="User"
          size="large"
          v-model="student_value.username"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="userId">
        <el-input
          class="ipt"
          placeholder="请输入学号"
          size="large"
          v-model.number="student_value.userId"
        >
          <template #prefix>
            <i class="iconfont icon-xuehaoguanli"></i> </template
        ></el-input>
      </el-form-item>

      <el-form-item prop="gender">
        <el-select
          v-model="student_value.gender"
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
          v-model.number="student_value.age"
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
          v-model.number="student_value.phone"
        />
      </el-form-item>

      <el-form-item prop="classname"
        ><el-input
          class="ipt"
          placeholder="请输入班级"
          size="large"
          v-model="student_value.classname"
          ><template #prefix> <i class="iconfont icon-banji"></i> </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="major">
        <el-input
          class="ipt"
          placeholder="请输入专业"
          size="large"
          v-model="student_value.major"
          >><template #prefix> <i class="iconfont icon-zhuanye"></i> </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="college">
        <el-input
          class="ipt"
          placeholder="请输入学院"
          size="large"
          v-model="student_value.college"
          >><template #prefix> <i class="iconfont icon-xueyuan"></i> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="birth">
        <el-date-picker
          style="width: 320px; height: 50px"
          v-model="student_value.birth"
          type="date"
          placeholder="请选择或输入出生日期"
          size="large"
          :editable="true"
          :shortcuts="shortcuts"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="address">
        <el-input
          class="ipt"
          placeholder="请选择地址"
          size="large"
          v-model="student_value.address"
          ><template #prefix> <i class="iconfont icon-dizhi"></i> </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          class="ipt"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          size="large"
          show-password
          v-model="student_value.password"
        />
      </el-form-item>

      <el-form-item prop="enterPwd">
        <el-input
          type="password"
          class="ipt"
          show-password
          placeholder="请确认密码"
          :prefix-icon="Lock"
          size="large"
          v-model="student_value.enterPwd"
      /></el-form-item>
    </el-form>

    <el-button type="primary" id="btn" @click="reg_enter">立即提交</el-button>
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from "vue";
import { reg_student } from "../../../../Api/userApi";

import {
  checkName,
  checkage,
  checkUserID,
  checkgender,
  checkphone,
  checkclass,
  checkmajor,
  checkpwd,
  checkbirth,
  checkaddress,
  checkcollege,
} from "./student_schema";
import Mock from "mockjs";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "WorkspaceJsonRegister",

  setup() {
    const checkagainpwd = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9.+-]{1,20}$/;
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (!reg.test(value)) {
        return callback(new Error("请输入1-20位密码,且不会含中文"));
      }
      if (value !== student_value.password) {
        callback(new Error("两次密码不匹配,请重新输入"));
      }
      callback();
    };
    const User = ref("User");
    const Iphone = ref("Iphone");
    const Lock = ref("Lock");
    const ruleFormRef = ref(null);
    // 上传函数

    const student_value = reactive({
      username: Mock.mock("@cname"),
      userId: "",
      gender: "",
      age: "20",
      phone: "13218919255",
      classname: "软件工程",
      major: "软件2班",
      password: "",
      enterPwd: "",
      college: "机械工程学院",
      birth: "1990-02-11",
      address: "江苏省徐州市邳州市",
    });
    const router = useRouter();

    //  提交按钮 函数
    const reg_enter = () => {
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
            username: student_value.username,
            userId: parseInt(student_value.userId),
            gender: student_value.gender,
            age: parseInt(student_value.age),
            phone: student_value.phone.toString(),
            classname: student_value.classname,
            major: student_value.major,
            password: student_value.password,
            enterPwd: student_value.enterPwd,
            college: student_value.college,
            birth: getTimeValue(student_value.birth),
            address: student_value.address,
          });
          copystudent_value.gender = student_value.gender === "男" ? 1 : 0;
          reg_student(copystudent_value).then((res) => {
            console.log(res);
            if (res.data.status !== 200) {
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
    const shortcuts = [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Yesterday",
        value: () => {
          const date = new Date();
          console.log(date.getTime());
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "A week ago",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
      {
        text: "tomorrow",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24);
          return date;
        },
      },
    ];
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
      classname: [
        {
          required: true,
          message: "请输入班级",
          trigger: "blur",
        },
        { validator: checkclass, trigger: "blur" },
      ],
      major: [
        {
          required: true,
          message: "请输入专业",
          trigger: "blur",
        },
        { validator: checkmajor, trigger: "blur" },
      ],
      college: [
        {
          required: true,
          message: "请输入学院",
          trigger: "blur",
        },
        { validator: checkcollege, trigger: "blur" },
      ],
      birth: [
        {
          required: true,
          message: "请输入出生日期",
          trigger: "blur",
        },
        { validator: checkbirth, trigger: "blur" },
      ],
      address: [
        {
          required: true,
          message: "请输入地址",
          trigger: "blur",
        },
        { validator: checkaddress, trigger: "blur" },
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
    return {
      ruleFormRef,
      User,
      Iphone,
      Lock,
      rules,
      shortcuts,
      student_value,
      reg_enter,
    };
  },
};
function getTimeValue() {
  var date = new Date();
  var y = isZero(date.getFullYear());
  var m = isZero(date.getMonth() + 1);
  var date = isZero(date.getDate());
  return y + "-" + m + "-" + date;
}

function isZero(num) {
  return (num = num > 10 ? num : "0" + num);
}
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
