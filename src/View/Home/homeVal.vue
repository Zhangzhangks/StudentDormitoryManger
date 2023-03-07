<template>
  <div>
    <div class="build">
      <h2 id="title"><i id="shuxian">|</i> 管理概览</h2>
      <div class="buildSelect">
        <el-select v-model="buildSomeValue.Buildvalue" placeholder="1号组团">
          <el-option
            v-for="item in build"
            :key="item.value"
            :label="item.build_name"
            :value="item.build_name"
          />
        </el-select>
      </div>
    </div>
    <div class="cardCss">
      <el-card class="box-card" id="build-card" style="padding: 0"
        ><div class="el-card__main">
          <i class="iconfont icon-loudongguanli"></i>
          <div class="desc">
            <span>宿舍楼栋名称</span>
            <h3>{{ buildSomeValue.Buildvalue }}</h3>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="el-card__main">
          <i class="iconfont icon-louceng"></i>
          <div class="desc">
            <span>宿舍楼层</span>
            <h3>{{ buildSomeValue.buildFloor }}</h3>
          </div>
        </div></el-card
      >
      <el-card class="box-card"
        ><div class="el-card__main">
          <i class="iconfont icon-fangjian"></i>
          <div class="desc">
            <span>宿舍房间总数目</span>
            <h3>{{ buildSomeValue.buildDoom }}</h3>
          </div>
        </div>
      </el-card>
      <el-card class="box-card"
        ><div class="el-card__main">
          <i class="iconfont icon-xuesheng"></i>
          <div class="desc">
            <span>学生人数</span>
            <h3>{{ buildSomeValue.studentNUm }}</h3>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted, reactive, ref, watch, watchEffect } from "vue";
import { getAllBuild } from "../../Api/buildApi";
import { getAllStudentValue } from "../../Api/userApi";
export default {
  name: "WorkspaceJsonHomeVal",

  setup() {
    const buildArr = ref([]);
    const build = ref([]);
    const buildSomeValue = reactive({
      Buildvalue: "", //选取的楼栋数据
      buildFloor: "",
      buildDoom: "",
      studentNUm: "",
    });
    // 支持缓存
    let sessionSaveBuild = window.buildValue ? window.buildValue : "";
    let sessionSaveStudent = window.studentValue ? window.studentValue : "";
    onMounted(() => {
      // console.log(sessionSaveStudent, sessionSaveBuild, "学生");
      // 如果又缓存就不用发信息了
      if (sessionSaveBuild && sessionSaveStudent) {
        return (build.value = sessionSaveBuild);
      } else {
        getAllBuild().then((res) => {
          window.buildValue = res.alldata;
          build.value = res.alldata;
          // console.log(window.buildValue, "缓存楼栋");
          getAllStudentValue().then((res) => {
            sessionSaveStudent = res.alldata;
          });
        });
      }
    });

    watch(buildSomeValue, () => {
      if (buildSomeValue.Buildvalue !== null) {
        build.value.forEach((ele) => {
          if (ele.build_name == buildSomeValue.Buildvalue) {
            buildSomeValue.buildFloor = ele.build_floor;
            buildSomeValue.buildDoom = ele.build_dor * ele.build_floor;
          }
        });
        // 拿取学生人数;
        let sum = ref(0);
        if (sessionSaveStudent !== null) {
          sessionSaveStudent.forEach((ele) => {
            if (ele.st_building == buildSomeValue.Buildvalue) {
              sum.value += 1;
            }
          });
          buildSomeValue.studentNUm = sum.value;
        }
      }
    });

    return { buildArr, buildSomeValue, build };
  },
};
</script>
<style lang="less" scoped>
.build {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 2px 100px 0 20px;

  .buildSelect {
    margin-left: 20px;
    margin-top: 16px;
  }
  #title {
    font-size: 26px;
    padding-top: 5px;
    #shuxian {
      font-size: 35px;
    }
  }
}
.cardCss {
  position: relative;
  display: flex;
  justify-content: space-between;

  height: 80px;
  .el-card {
    flex: 1;
    margin: 16px 30px;
    height: 100%;
    &:nth-child(1) {
      .iconfont {
        color: #29b0a4;
      }
    }
    &:nth-child(2) {
      .iconfont {
        color: #29b0a4;
      }
    }
    &:nth-child(3) {
      .iconfont {
        color: #ff616a;
      }
    }
    &:nth-child(4) {
      .iconfont {
        color: #29b0a4;
      }
    }
    .iconfont {
      font-size: 60px;
      margin: 0px 0;
      font-weight: 400;
    }
    .desc {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      font-size: 18px;
      h3 {
        font-weight: 600;
      }
    }
  }
  .el-card__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 20px 0px !important;
  }
}
.el-card {
  --el-card-padding: 0px;
}
</style>