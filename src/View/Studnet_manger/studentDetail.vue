<template>
  <div class="detail">
    <el-form
      :inline="true"
      label-position="left"
      :model="student_value"
      class="demo-form-inline"
    >
      <el-form-item label="学生学号">
        <el-input v-model="student_value.userId" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input
          v-model="student_value.username"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="学生年龄">
        <el-input v-model="student_value.age" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生性别">
        <el-input
          v-model="student_value.gender"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="头像" style="margin-left: 260px">
        <template #default>
          <div style="width: 1600px">
            <el-image
              style="width: 100px; height: 100px"
              :src="student_value.pic"
              fit="fill"
            />
          </div>
        </template>
      </el-form-item>
      <el-form-item label="学手机号">
        <el-input
          v-model="student_value.phone"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="学院">
        <el-input
          v-model="student_value.college"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="出生日期">
        <el-input v-model="student_value.birth" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生班级">
        <el-input
          v-model="student_value.classname"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="学生专业">
        <el-input v-model="student_value.major" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生楼层">
        <el-input
          v-model="student_value.building"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="宿舍号">
        <el-input
          v-model="student_value.dorNumber"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="家庭地址">
        <el-input
          v-model="student_value.address"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="学生班级" style="visibility: hidden">
        <el-input v-model="student_value" class="ipt" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="back" class="btn"> 返回</el-button>
  </div>
</template>
  <script>
import { reactive } from "vue";
import { getDetailStudent } from "../../Api/userApi";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "StudnetApp",
  setup() {
    const formInline = reactive({});
    const route = useRoute();
    const router = useRouter();
    const student_value = reactive({
      username: "",
      userId: "",
      gender: "",
      age: "",
      phone: "",
      classname: "",
      major: "",
      password: "",
      pic: "",
      building: "",
      dorNumber: "",
      address: "",
      college: "",
      birth: "",
    });
    const routeParams = route.params.userid ? route.params.userid : "";
    getDetailStudent(routeParams).then((res) => {
      console.log(res, "学生详情");
      if (res.status === 200) {
        let {
          st_username,
          st_userid,
          st_gender,
          st_age,
          st_phone,
          st_class,
          st_major,
          st_password,
          st_pic,
          st_building,
          st_dorNumber,
          st_address,
          st_birth,
          st_college,
        } = res.data;

        student_value.username = st_username;
        student_value.userId = st_userid;
        student_value.gender = st_gender === 1 ? "男" : "女";
        student_value.age = st_age;
        student_value.phone = st_phone;
        student_value.classname = st_class;
        student_value.major = st_major;
        student_value.password = st_password;
        student_value.pic = st_pic;
        student_value.building = st_building;
        student_value.dorNumber = st_dorNumber;
        student_value.address = st_address;
        student_value.college = st_college;
        student_value.birth = getTimeValue(st_birth);
      }
      console.log(student_value);
    });
    const back = function () {
      router.go(-1);
    };
    return { formInline, student_value, back };
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
.demo-form-inline {
  margin: 40px 0 0 2px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .ipt {
    width: 500px;
  }
}
.el-form--inline {
  .el-form-item {
    margin-right: 38px !important;
    color: blueviolet !important;
  }
}
.btn {
  width: 120px;
  height: 40px;
  border-radius: 10px;
  line-height: 40px;
  margin-top: 20px;
  margin-left: 180px;
}
</style>