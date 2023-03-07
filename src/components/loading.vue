<template>
  <div class="loading">
    <!-- 加载图标 -->
    <div class="loadingImage" :style="{ backgroundImage: `url(${src})` }"></div>
  </div>
</template>
<script>
export default {
  name: "WorkspaceJsonLoading",
  setup() {
    const src = "../../src/assets/img/loading.gif";
    return { src };
  },
};
</script>
<style lang="less" scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(255, 255, 255, 1);
  .loadingImage {
    position: absolute;
    z-index: 100;
    width: 50%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: no-repeat center center;
  }
}
</style>