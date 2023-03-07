<template>
  <div class="collapse">
    <div class="demo-collapse">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="学校风景" name="1">
          <Carouseol></Carouseol>
        </el-collapse-item>
        <el-collapse-item title="楼栋的学生数目" name="2">
          <div v-if="sessionSaveBuild2">
            <echartStudent :datab="sessionSaveBuild2"></echartStudent>
          </div>
        </el-collapse-item>

        <el-collapse-item title="楼栋的男女数目" name="3">
          <div v-if="sessionSaveBuild3">
            <EchartsGender :datab="sessionSaveBuild3"></EchartsGender>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { ref, watch, watchEffect } from "vue";
import { getAllBuild } from "../../Api/buildApi";
import echartStudent from "../../components/Ehcarts-student.vue";
import EchartsGender from "../../components/Echarts-gender.vue";
import Carouseol from "../../components/Carouseol.vue";
export default {
  name: "WorkspaceJsonCollpase",
  components: { echartStudent, EchartsGender, Carouseol },
  props: {
    val: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const activeName = ref("1");
    let sessionSaveBuild2 = ref(false);
    let sessionSaveBuild3 = ref(false);
    watchEffect(() => {
      sessionSaveBuild2.value = props.val;
      sessionSaveBuild3.value = props.val;
    });

    watch(activeName, (next, pre) => {
      if (next == 2 && sessionSaveBuild2.value == null) {
        getAllBuild().then((res) => {
          sessionSaveBuild2.value = window.buildValue
            ? window.buildValue
            : res.alldata;
        });
      } else if (next == 3 && sessionSaveBuild3.value3 == null) {
        getAllBuild().then((res) => {
          sessionSaveBuild3.value = window.buildValue
            ? window.buildValue
            : res.alldata;
        });
      }
    });

    return { activeName, sessionSaveBuild2, sessionSaveBuild3 };
  },
};
</script>
<style lang="less">
.collapse {
  margin-top: 60px;
  width: 96%;
  margin-left: 40px;
  font-size: 20px !important;
}
.el-collapse-item__header {
  font-size: 20px;
  padding: 0px 0 0 30px;
}
</style>