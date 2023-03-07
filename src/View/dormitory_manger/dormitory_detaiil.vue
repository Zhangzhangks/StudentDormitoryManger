<template>
  <div class="detail">
    <el-form
      :inline="true"
      label-position="left"
      :model="buildOneValue"
      class="demo-form-inline"
    >
      <el-form-item label="楼栋编号">
        <el-input
          v-model="buildOneValue.buildId"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="楼栋名称">
        <el-input
          v-model="buildOneValue.buildName"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="楼栋层数">
        <el-input
          v-model="buildOneValue.buildFloor"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="楼栋宿舍数">
        <el-input
          v-model="buildOneValue.buildDornum"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="头像" style="margin-left: 260px">
        <template #default>
          <div style="width: 1600px">
            <el-image
              style="width: 100px; height: 100px"
              :src="buildOneValue.buildPic"
              fit="fill"
            />
          </div>
        </template>
      </el-form-item>
      <el-form-item label="楼栋地址">
        <el-input
          v-model="buildOneValue.buildAdress"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="宿管姓名">
        <el-input
          v-model="buildOneValue.buildAdmin"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="back" class="btn"> 返回</el-button>
  </div>
</template>
    <script>
import { reactive } from "vue";
import { getDetailBuild } from "../../Api/buildApi";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "StudnetApp",
  setup() {
    const formInline = reactive({});
    const route = useRoute();
    const router = useRouter();
    const buildOneValue = reactive({
      buildId: "",
      buildName: "",
      buildFloor: "",
      buildDornum: "",
      buildAdress: "",
      buildAdmin: "",
      buildPic: "",
    });
    const routeParams = route.params.build_identy
      ? route.params.build_identy
      : "";

    getDetailBuild(routeParams).then((res) => {
      console.log(res);
      if (res.status === 200) {
        let {
          build_identy,
          build_name,
          build_admin,
          build_dor,
          build_floor,
          build_pic,
          build_address,
        } = res.data;
        buildOneValue.buildId = build_identy;
        buildOneValue.buildName = build_name;
        buildOneValue.buildFloor = build_floor;
        buildOneValue.buildDornum = build_dor;
        buildOneValue.buildAdmin = build_admin;
        buildOneValue.buildAdress = build_address;
        buildOneValue.buildPic = build_pic;
      }
    });
    const back = function () {
      router.go(-1);
    };
    return { formInline, buildOneValue, back };
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