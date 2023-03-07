<template>
  <div style="position: relative">
    <div style="border: 1px solid #ccc; margin-top: 20px; height: 200px">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden; border: 1px solid #ccc"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>

    <button id="btn" @click="submit">提交</button>
  </div>
</template>
    <script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  watch,
  reactive,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { repair } from "../../Api/repairApi";
import { useStore } from "vuex";

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const store = useStore();
    // 内容 HTML
    const valueHtml = ref("");

    const repairDs = ref("");
    // 编辑器内容改变
    let timer = null;
    const handleChange = (editor) => {
      if (timer) return;
      else {
        timer = setInterval(() => {
          repairDs.value = editor.children[0].children[0].text;
          timer = null;
        }, 10);
      }
    };
    console.log(store.state);
    const submit = function () {
      repair({
        st_id: store.state.user.profileStudent.st_userid,
        uname: store.state.user.profileStudent.st_username,
        desc: repairDs.value,
        st_build: store.state.user.profileStudent.st_building,
      }).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          ElNotification({
            title: "Error",
            message: "提交失败",
            type: "error",
            duration: 600,
          });
        } else {
          valueHtml.value = "";
          ElNotification({
            title: "Success",
            message: "提交成功",
            type: "success",
            duration: 600,
          });
        }
      });
    };
    // 菜单栏
    const toolbarConfig = {
      toolbarKeys: [
        // 菜单 key
        "headerSelect",

        // 分割线
        "|",

        // 菜单 key
        "bold",
        "italic",
        "color",
        "fontSize",
        "fontFamily",
        "lineHeight",

        {
          key: "group-justify",
          menuKeys: [
            "justifyLeft",
            "justifyRight",
            "justifyCenter",
            "justifyJustify",
          ],
          title: "对齐",
        },

        {
          key: "group-more-style", // 必填，要以 group 开头
          title: "更多样式", // 必填
          iconSvg: "<svg>....</svg>", // 可选
          menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
        },
        "undo",

        "redo",
        "fullScreen",
      ],
    };

    const editorConfig = { placeholder: "请输入内容..." };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;

      if (editor == null) return;
      editor.destroy();
    });
    // 组件创立
    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      editorRef,
      valueHtml,
      mode: "simple", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      submit,
    };
  },
};
</script>    
    
    <style lang="less" scoped>
#btn {
  position: absolute;
  top: 200%;
  left: 40%;
  width: 220px;
  height: 40px;
  background-color: #409eff;
  border-radius: 5px;
  border: none;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
}
</style>