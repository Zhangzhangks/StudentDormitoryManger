<template>
  <div style="background-color: '#e0e0e0'">
    <div class="header-title">
      <i>|</i>
      <h2>选择学生</h2>
    </div>
    <el-card class="box-card" id="main-card">
      <el-tabs type="border-card" id="border-card">
        <el-tab-pane label="级联选择" id="tab">
          <div class="buildTitle">
            <span>宿舍楼栋名称</span>
            <el-select
              v-model="buildSomeValue.Buildvalue"
              placeholder="1号组团"
            >
              <el-option
                v-for="item in build"
                :key="item.value"
                :label="item.build_name"
                :value="item.build_name"
              />
            </el-select>
          </div>
          <div class="buildTitle">
            <span>楼层</span>

            <el-select v-model.number="buildFloorTemp" placeholder="请选择">
              <el-option
                v-for="item in buildSomeValue.buildFloor"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="buildTitle">
            <span>房间号</span>
            <el-select
              v-model.number="buildSomeValue.bedRoomNum"
              placeholder="请选择"
            >
              <el-option
                v-for="item in buildSomeValue.buildDoom"
                :key="item.st_bedNum"
                :label="item.st_bedNum"
                :value="item.st_bedNum"
              />
            </el-select>
          </div>
          <div class="buildTitle">
            <span>学生姓名</span>
            <el-select
              v-model="buildSomeValue.studentName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in buildSomeValue.studentobj"
                :key="item.st_id"
                :label="item.st_username"
                :value="item.st_username"
              />
            </el-select>
          </div>
          <div class="buildTitle">
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学号搜索不做">学号搜索不做</el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="header-title">
      <i>|</i>
      <h2>详细信息</h2>
    </div>
    <div class="notification" v-if="flag">请选择用户</div>
    <div id="studentData" v-else>
      <div class="left">
        <el-card class="box-card">
          <el-descriptions title="用户信息" direction="horizontal" :column="2">
            <template #title>
              <div>
                <div class="hd-title">
                  <i>|</i>
                  <h2>用户信息</h2>
                </div>
              </div>
            </template>
            <el-descriptions-item label="姓名" :span="2" width="120px">{{
              StudentAllValue.st_name
            }}</el-descriptions-item>
            <el-descriptions-item label="学号" :span="2">{{
              StudentAllValue.st_userid
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号" :span="2">{{
              StudentAllValue.st_phone
            }}</el-descriptions-item>
            <el-descriptions-item label="注册日期">{{
              StudentAllValue.st_regDate
            }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      <div class="right">
        <div class="box">
          <i class="iconfont icon-fangjian1"></i>
          <div class="message">
            <i>房间号</i> <span>{{ StudentAllValue.st_dor_num }}</span>
          </div>
        </div>
        <div class="box">
          <i class="iconfont icon-weizhi"></i>
          <div class="message">
            <i>所在楼层</i> <span>{{ StudentAllValue.st_floor }}</span>
          </div>
        </div>
        <div class="box">
          <i class="iconfont icon-loudongguanli"></i>
          <div class="message">
            <i>宿舍楼</i> <span>{{ StudentAllValue.st_building }}</span>
          </div>
        </div>
        <div class="box">
          <i class="iconfont icon-username"></i>
          <div class="message">
            <i>入住时间</i> <span>{{ StudentAllValue.st_regDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { reactive, ref, watch, watchEffect } from "vue";
import { getAllBuild, getDetailNameBuild } from "../../Api/buildApi";
import {
  getBuildFloor,
  getBuildBedRoom,
  getBuildBedRoomStudent,
} from "../../Api/userApi";
export default {
  name: "WorkspaceJsonHomeVal",

  setup() {
    const flag = ref(true);
    const build = ref([]);
    const buildFloorTemp = ref("请选择"); //楼层临时数据
    const buildSomeValue = reactive({
      Buildvalue: "请选择",
      buildFloor: "",
      buildDoom: "",
      studentName: "",
      studentobj: "",
      bedRoomNum: "请选择",
    });
    const StudentAllValue = reactive({
      st_name: "",
      st_userid: "",
      st_phone: "",
      st_regDate: "",
      st_dor_num: "",
      st_floor: "",
      st_building: "",
    });
    // 监听所有楼栋名称
    watch(
      () => buildSomeValue.Buildvalue,
      () => {
        getAllBuild().then((res) => {
          console.log(res.alldata, "楼栋");
          build.value = res.alldata;
        });
        getDetailNameBuild(buildSomeValue.Buildvalue).then((res) => {
          if (res.status !== 200) {
            return;
          }
          buildSomeValue.buildFloor = res.data.build_floor;
        });
      },
      { immediate: true, deep: true }
    );
    // 监听到;楼层变化
    watch(
      buildFloorTemp,
      () => {
        getBuildFloor({
          buildFloor: buildFloorTemp.value,
          buildName: buildSomeValue.Buildvalue,
        }).then((res) => {
          console.log(res, "楼层");
          buildSomeValue.buildDoom = res.data;
          console.log(buildSomeValue, "楼层变化");
        });
      },
      { deep: true }
    );
    // 监听房间号名字变化;
    watch(
      [() => buildSomeValue.bedRoomNum, () => buildSomeValue.studentName],
      () => {
        getBuildBedRoom({
          buildFloor: buildFloorTemp.value,
          buildName: buildSomeValue.Buildvalue,
          bedNum: buildSomeValue.bedRoomNum,
        }).then((res) => {
          console.log(res);
          buildSomeValue.studentobj = res.data;
          console.log(buildSomeValue, "房间变化");
        });
      },
      { deep: true }
    );
    // 搜索学生数据
    const search = function () {
      console.log(22);

      getBuildBedRoomStudent({
        buildFloor: buildFloorTemp.value,
        buildName: buildSomeValue.Buildvalue,
        bedNum: buildSomeValue.bedRoomNum,
        stName: buildSomeValue.studentName,
      }).then((res) => {
        if (res.status !== 200) {
          ElMessage({
            message: res.message,
            type: "warning",
          });
        } else {
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
          let {
            st_username,
            st_userid,
            st_phone,
            st_building,
            st_date,
            st_floor,
            st_bedNum,
          } = res.data[0];
          console.log(st_username);
          StudentAllValue.st_name = st_username;
          StudentAllValue.st_userid = st_userid;
          StudentAllValue.st_phone = st_phone;
          StudentAllValue.st_regDate = getTimeValue(st_date);
          StudentAllValue.st_floor = st_floor;
          StudentAllValue.st_building = st_building;
          StudentAllValue.st_dor_num = st_bedNum;
        }
        flag.value = false;
        console.log(StudentAllValue);
      });
    };
    return {
      buildSomeValue,
      build,
      buildFloorTemp,
      search,
      flag,
      StudentAllValue,
    };
  },
};
</script>
  <style lang="less" scoped>
#main-card {
  height: 160px;
  margin: 15px 10px;

  #border-card {
    height: 160px;
  }

  #tab {
    display: flex;
    justify-content: space-between;
    .buildTitle {
      position: relative;
      margin: 20px 0px 0 5px;
      span {
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
}
.el-card {
  --el-card-padding: 0px;
  height: 100%;
}
.el-select {
  width: 160px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  line-height: 32px;
}

#studentData {
  display: flex;
  width: 100%;
  height: 312px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  // border: 1px solid #000;
  .left {
    width: 50%;
    height: 100%;
    margin-right: 30px;
    border-radius: 5px;
    margin-left: 10px;
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    width: 50%;
    height: 100%;
    margin-right: 10px;
    border-radius: 7px;
    background-color: #ffffff;
    .box {
      flex: 40%;
      height: 93px;
      margin: 21px 40px 12px 30px;
      border: 3px solid #ddd;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      &:nth-child(1) {
        .iconfont {
          color: #2ec5b5;
          font-size: 60px;
        }
      }
      &:nth-child(2) {
        .iconfont {
          color: #2e99f8;
          font-size: 60px;
        }
      }
      &:nth-child(3) {
        .iconfont {
          color: #e85e75;
          font-size: 60px;
        }
      }
      &:nth-child(4) {
        .iconfont {
          color: #2ec5b5;
          font-size: 60px;
        }
      }
      .message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: ce;
        font-size: 20px;
      }
    }
  }

  .hd-title {
    display: flex;
    justify-content: start;
    align-items: center;
    color: #337dd5;
    margin: 20px 20px 0px 10px;
    width: 100%;
    border-bottom: 2px solid #dddddd;
    i {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    h2 {
      font-size: 25px;
      font-weight: 900;
    }
  }
}

.header-title {
  display: flex;
  justify-content: start;
  align-items: center;
  color: #2a2a2c;
  margin: 20px 20px 0px 10px;

  i {
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 30px;
    font-weight: 900;
  }
}
.notification {
  width: 99%;
  height: 60px;
  background-color: #ffffff;
  margin-left: 12px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: #ccc;
}
</style>