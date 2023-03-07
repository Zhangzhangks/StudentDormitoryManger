<template>
  <div></div>
</template>
<script>
import axios from "axios";

export default {
  name: "WorkspaceJson01Test",
  setup() {
    axios({
      method: "get",
      url: "/apii/f2/setconfig.json",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>