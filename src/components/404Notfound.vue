<template>
  <div>
    <h1>404NotFound</h1>
    <h1>{{ time }}秒后即将跳转到登陆页面</h1>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "WorkspaceJson404Notfound",
  setup() {
    const router = useRouter();
    let timer = null;
    let time = ref(5);
    timer = setInterval(() => {
      time.value--;
      if (time.value == 0) {
        router.push("/login");
        clearInterval(timer);
      }
    }, 1000);
    return { time };
  },
};
</script>