<template>
  <div id="home">
    <homeMain></homeMain>
    <Collpase :val="propValue"></Collpase>
  </div>
</template>
<script>
import homeMain from "./homeVal.vue";
import Collpase from "./Collpase.vue";
import { getAllBuild } from "../../Api/buildApi";
import { watchEffect, ref } from "vue";
export default {
  name: "WorkspaceJsonHome",
  components: { homeMain, Collpase },
  setup() {
    const propValue = ref(null);
    watchEffect(() => {
      if (window.buildValue) {
        propValue.value = window.buildValue;
      } else {
        getAllBuild().then((res) => {
          propValue.value = res.alldata;
        });
      }
    });
    return { propValue };
  },
};
</script>
<style lang="less" scoped>
#home {
  height: 100%;
  background-color: #e3e3e3;
}
</style>