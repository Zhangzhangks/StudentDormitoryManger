<template>
  <div>
    <div id="mainColum" ref="zks"></div>
  </div>
</template>
    
    <script>
import { getAllStudentValue, getBuild } from "../Api/userApi";
import { getAllBuild } from "../Api/buildApi";
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

export default {
  name: "WEBTestEchart",
  props: {
    datab: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const zks = ref("");
    const instance = getCurrentInstance();
    const { proxy } = instance;
    const manarr = [];
    const nvarr = [];
    const buildNname = [];
    onMounted(() => {
      function getEcharts() {
        const option = {
          title: {
            text: "楼栋的男女数目 ",
            top: "0px",
            left: "140px",
            //文字设置
            textStyle: {
              color: "#29b0a4",
              fontSize: 25,
              textShadowColor: "rgba(227, 190, 28, 1)",
              textShadowBlur: 7,
              textShadowOffsetX: 8.5,
              textShadowOffsetY: 5,
            },
            textAlign: "center",
          },
          color: ["red", "#73c0de"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // Use axis to trigger tooltip
              type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            data: buildNname,
          },
          series: [
            {
              name: "男生数目",
              type: "bar",
              stack: "total",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              data: manarr,
            },
            {
              name: "女生数目",
              type: "bar",
              stack: "total",
              left: "5px",
              label: {
                show: true,
              },
              emphasis: {
                focus: "series",
              },
              data: nvarr,
            },
          ],
        };
        myChart.setOption(option);
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(zks.value);
      props.datab.forEach((ele) => {
        getBuild({ buildName: ele.build_name }).then((res) => {
          manarr.push(res.manMum);
          nvarr.push(res.nvmum);
          buildNname.push(ele.build_name);
          getEcharts();
        });

        // getBuild({ buildName: ele.build_name }).then((res) => {
        //   manarr.push(res.manMum);
        //   nvarr.push(res.nvmum);
        //   buildNname.push(ele.build_name);
        //   // 新的option
        //   // const option = {
        //   color: ["#29b0a4", "#ccc", "blue"],
        //   title: {
        //     text: "楼栋的男女数目 ",
        //     top: "0px",
        //     left: "140px",
        //     //文字设置
        //     textStyle: {
        //       color: "#29b0a4",
        //       fontSize: 25,
        //       textShadowColor: "rgba(227, 190, 28, 1)",
        //       textShadowBlur: 7,
        //       textShadowOffsetX: 8.5,
        //       textShadowOffsetY: 5,
        //     },
        //     textAlign: "center",
        //   },
        //   tooltip: {
        //     trigger: "axis",
        //     axisPointer: {
        //       type: "shadow",
        //     },
        //   },
        //   legend: {
        //     // 图例走向
        //     textStyle: { color: "black", fontSize: 18 },
        //   },
        //   grid: {
        //     left: "3%",
        //     right: "4%",
        //     bottom: "3%",
        //     containLabel: true,
        //   },
        //   xAxis: {
        //     type: "value",
        //     boundaryGap: [0, 0.01],
        //   },
        //   yAxis: {
        //     type: "category",
        //     data: buildNname,
        //   },
        //   series: [
        //     {
        //       name: "男生数目",
        //       type: "bar",
        //       data: manarr,
        //     },
        //     {
        //       name: "女生数目",
        //       type: "bar",
        //       data: nvarr,
        //     },
        //   ],
        // };
        // });
      });
    });

    return { zks };
  },
};
</script>
    
    <style lang="less" scoped>
#mainColum {
  width: 1200px;
  height: 400px;

  margin-left: 110px;
}
</style>
    
    
    