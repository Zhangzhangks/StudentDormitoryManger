<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { getStudentValue } from "../../Api/userApi";
export default {
  name: "User",
  setup() {
    getStudentValue().then((res) => {
      // console.log(res.data);
    });
  },
};
</script>