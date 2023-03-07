<template>
  <div>
    <div class="layui-carousel" id="test1">
      <div carousel-item>
        <img :src="item" v-for="item in src" :key="item" />
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { getCurrentInstance } from "vue";
export default {
  name: "WorkspaceJsonCarouseol",
  setup() {
    const instance = getCurrentInstance();
    const { proxy } = instance;
    const src = [
      "../src/assets/img/01.webp",
      "../src/assets/img/02.webp",
      "../src/assets/img/03.webp",
      "../src/assets/img/04.webp",
      "../src/assets/img/05.webp",
    ];
    onMounted(() => {
      proxy.$nextTick(() => {
        const layui = window.layui;
        layui.use("carousel", function () {
          var carousel = layui.carousel;
          //建造实例
          carousel.render({
            elem: "#test1",
            width: "80%", //设置容器宽度
            height: "400px",
            arrow: "always", //始终显示箭头,
            autoplay: true,
            interval: 2500,
          });
        });
      });
    });
    return { src };
  },
};
</script>
<style lang="less" scoped>
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
#test1 {
  margin-left: 220px;
}
</style>


 

