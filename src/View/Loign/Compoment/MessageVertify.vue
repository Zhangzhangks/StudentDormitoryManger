<template>
  <div>
    <Vcode
      :show="isShow"
      @success="onSuccess"
      @close="onClose"
      :sliderSize="30"
    />
    {{ flag }}
  </div>
</template>

<script >
import { ref, toRefs, toRef, watch } from "vue";
import Vcode from "vue3-puzzle-vcode";
export default {
  name: "MessageVertify",
  components: { Vcode },
  props: ["flag"],
  emits: ["VertifySuccess"],
  setup(props, ctx) {
    const { flag } = toRefs(props);
    const isShow = ref(flag.value);
    watch(props, () => {
      isShow.value = flag.value;
    });

    const onClose = () => {
      isShow.value = false;
    };

    const onSuccess = () => {
      console.log(isShow.value);
      onClose(); // 验证成功，需要手动关闭模态框
      ctx.emit("VertifySuccess", isShow.value);
    };
    return { isShow, onClose, onSuccess, flag };
  },
};
</script>