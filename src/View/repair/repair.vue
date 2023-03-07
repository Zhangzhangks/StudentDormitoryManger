<template>
  <div>
    <KeepAlive>
      <repairDesc v-if="identy === 'student'"></repairDesc>
      <repairAdmin v-else></repairAdmin>
    </KeepAlive>
  </div>
</template>

<script>
import repairDesc from "./repairDesc.vue";
import repairAdmin from "./repairAdmin.vue";
import { useStore } from "vuex";
export default {
  name: "WorkspaceJsonRepair",
  components: { repairDesc, repairAdmin },
  setup() {
    const store = useStore();
    const identy = store.state.user.loginIdenty;

    return { identy };
  },
};
</script>