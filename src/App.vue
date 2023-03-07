<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Dormitory",
  mounted() {
    console.log("我是mockjs");
    // axios.get("/zkss").then((res) => {
    //   console.log(res);
    // });
  },
};
</script>