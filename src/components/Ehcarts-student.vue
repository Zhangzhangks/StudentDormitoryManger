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
    datab: {},
    default: () => {},
  },
  setup(props) {
    const zks = ref("");
    let data = [];
    let winarr = ref(null);
    // 缓存;
    winarr.value = window.studentMount ? window.studentMount : null;
    onMounted(() => {
      function getCharts() {
        // 绘制图表
        const option = {
          title: {
            text: "楼栋的学生数量 ",
            top: "80px",
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
          tooltip: {
            trigger: "item",
          },
          // 图列
          legend: {
            // 图例走向
            type: "scroll",
            orient: "horizontal",
          },
          series: [
            {
              name: "学生数目 ",
              type: "pie",
              radius: "50%",
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(zks.value);
      props.datab.forEach((ele, index) => {
        if (winarr.value != null) {
          data = winarr.value;
          return getCharts();
        } else {
          getBuild({ buildName: ele.build_name }).then((res) => {
            if (data.length === props.datab.length - 1) {
              window.studentMount = data;
              return (winarr.value = window.studentMount);
            }
            if (res.status === 200) {
              data.push({
                value: res.data.length,
                name: ele.build_name,
              });
              getCharts();
            }
          });
        }
      });
    });

    return { zks };
  },
};
</script>
  
  <style lang="less" scoped>
#mainColum {
  width: 800px;
  height: 360px;

  margin-left: 510px;
}
</style>
  
  
  