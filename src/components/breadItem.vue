<template>
  <div class="bread">
    <div id="breadItem"><tab /></div>
  </div>
</template>
<script>
import { ArrowRight } from "@element-plus/icons-vue";
import { useStore, mapState } from "vuex";
import { ref } from "vue";
import tab from "./tabs.vue";
export default {
  name: "WorkspaceJsonBreadItem",
  setup() {
    const ArrowRight = ref("ArrowRight");
    const store = useStore();

    return { ArrowRight };
  },

  components: { tab },
};
</script>
<style lang="less" scoped>
#breadItem {
  width: 100%;
  height: 3vw;
  border: 2px solid #ccc;
  border-radius: 18px;
  font-size: 0.9vw !important;
  text-align: center;
  line-height: 3vw;
  padding-left: 25px;
}

:deep(.el-breadcrumb__inner) {
  a {
    &:hover {
      color: var(--el-color-success);
    }
  }
  &.is-link {
    color: var(--el-color-black);
    &:hover {
      color: var(--el-color-success);
    }
  }
}
</style>