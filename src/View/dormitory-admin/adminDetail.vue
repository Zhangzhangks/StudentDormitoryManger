<template>
  <div class="detail">
    <el-form
      :inline="true"
      label-position="left"
      :model="admin_value"
      class="demo-form-inline"
    >
      <el-form-item label="宿管姓名">
        <el-input v-model="admin_value.userId" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="宿管姓名">
        <el-input v-model="admin_value.username" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="宿管年龄">
        <el-input v-model="admin_value.age" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="宿管性别">
        <el-input
          v-model="admin_value.gender"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="头像" style="margin-left: 260px">
        <template #default>
          <div style="width: 1600px">
            <el-image
              style="width: 100px; height: 100px"
              :src="admin_value.pic"
              fit="fill"
            />
          </div>
        </template>
      </el-form-item>
      <el-form-item label="学手机号">
        <el-input v-model="admin_value.phone" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="宿管楼层">
        <el-input v-model="admin_value.building" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="宿管班级" style="visibility: hidden">
        <el-input v-model="admin_value" class="ipt" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="back" class="btn"> 返回</el-button>
  </div>
</template>
    <script>
import { reactive } from "vue";
import { getDetailAdmin } from "../../Api/admin";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "StudnetApp",
  setup() {
    const fits = ["fill", "contain", "cover", "none", "scale-down"];
    const formInline = reactive({});
    const route = useRoute();
    const router = useRouter();
    const admin_value = reactive({
      username: "",
      userId: "",
      gender: "",
      age: "",
      phone: "",
      building: "",

      password: "",
      pic: "",
    });
    // console.log(route.params);
    const routeParams = route.params.ad_userid ? route.params.ad_userid : "";
    getDetailAdmin(routeParams).then((res) => {
      if (res.status === 200) {
        let {
          ad_username,
          ad_userid,
          ad_gender,
          ad_age,
          ad_phone,
          ad_building,
          ad_password,
          ad_pic,
        } = res.data;

        admin_value.username = ad_username;
        admin_value.userId = ad_userid;
        admin_value.gender = ad_gender === 1 ? "男" : "女";
        admin_value.age = ad_age;
        admin_value.phone = ad_phone;
        admin_value.building = ad_building;

        admin_value.password = ad_password;
        admin_value.pic = ad_pic;
      }
      //   console.log(admin_value);
    });
    const back = function () {
      router.go(-1);
    };
    return { formInline, fits, admin_value, back };
  },
};
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