<template>
  <div class="tab">
    <el-tag
      v-for="(item, index) in breaditem"
      @click="clickTab(item)"
      class="mx-1"
      @close="closeTab(item, index)"
      :closable="item.name !== 'home'"
      :key="item.id"
      :effect="item.name === $route.name ? 'dark' : 'plain'"
      @mouseenter="toggle(true)"
      @mouseleave="toggle(false)"
      :class="{ activeTab: flag }"
      >{{ item.label_name }}
      <!-- {{ item.name }} -->
    </el-tag>
  </div>
</template>
  
  <script>
import { ref, computed, getCurrentInstance, watchEffect } from "vue";
import { mapState, useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { bind } from "lodash";
export default {
  name: "WEBTestHeader",
  data() {
    return {
      active: true,
    };
  },

  setup() {
    const router = useRouter();
    const flag = ref(false);
    const store = useStore();
    const breaditem = ref(store.state.tablist.routerLists);
    const { proxy } = getCurrentInstance();
    const clickTab = (item) => {
      // console.log(route.name + "  ", item.name);
      router.push(item.path);
    };
    // console.log(breaditem.value);
    // 删除标签自动补齐前一个或者后一个
    const closeTab = (item, index) => {
      const taglength = proxy.breaditem.length - 1;
      store.commit("tablist/deleteRouter", item);

      if (index === taglength) {
        // 补齐前一个
        router.push(proxy.breaditem[index - 1].path);
      } else {
        // 补齐后一个
        router.push(proxy.breaditem[index].path);
      }
    };
    // 样式控制
    const toggle = function (val) {
      flag.value = val;
    };
    return { clickTab, closeTab, breaditem, toggle, flag };
  },
};
</script>
  
  <style lang="less" scoped>
.el-tag {
  width: 120px !important;
  height: 40px !important;
  margin: 7px 20px;
}
.tab {
  display: flex;
  align-items: center;

  justify-content: start;
}
.el-tag--large {
  cursor: pointer;
}
.activeTab {
  cursor: pointer;
}
</style>