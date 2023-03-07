<template>
  <div class="FirstHeader">
    <el-header id="header">
      <span id="headername"
        >学生宿舍管理系统
        {{ store.state.user.profileStudent.st_username }}</span
      >
      <div class="stytem_menu">
        <div class="adminName" v-if="headerName">
          {{
            headerName.startsWith("admin")
              ? `欢迎你 宿管员 ${headerName}`
              : `欢迎你 学生  ${headerName}`
          }}
        </div>

        <div class="zksavatar">
          <div class="avatar" :style="{ backgroundImage: 'url(' + src + ')' }">
            <label
              for="uploadFile"
              class="fileUploadLabel"
              @mouseenter="troggle(true)"
              @mouseleave="troggle(false)"
              :class="{ activeCursor: flag }"
            ></label
            ><input
              type="file"
              ref="filesRef"
              class="fileUpload"
              @input="ClickUpload"
              id="uploadFile"
              v-if="headerName"
            />
          </div>
        </div>
        <router-link to="/" class="layout" @click="logout"
          >退出登陆</router-link
        >
      </div>
    </el-header>
  </div>
</template>
  <script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { UploadUserPic, getStudentValue } from "../Api/userApi";
import { getAdminValue, UploadAdminPic } from "../Api/admin";
import { h } from "vue";

export default {
  name: "dormitoryHome",
  setup() {
    const store = useStore();
    const router = useRouter();
    const filesRef = ref(""); //input.file
    const src = ref("");
    const userId = ref("");
    const headerName = ref("");
    const route = useRoute();
    // console.log(store.state.user, "身份");
    watch(
      route,
      () => {
        if (store.state.user.loginIdenty === "student") {
          // console.log("student");
          // 获取用户信息
          getStudentValue().then((res) => {
            // console.log(res);
            if (!res) {
              return;
            }
            // console.log(res.data, "请求学生信息");
            src.value = res.data.st_pic
              ? res.data.st_pic
              : "../../src/assets/img/qq头像.jpg";
            userId.value = res.data.st_userid;
            if (store.state.user.loginIdenty === "student") {
              headerName.value = res.data.st_username;
            }

            if (src.value === "../../src/assets/img/qq头像.jpg") {
              return open();
            }
          });
        } else if (store.state.user.loginIdenty === "admin") {
          // 获取管理员信息;

          getAdminValue().then((res) => {
            // console.log("宿管员", res);
            if (!res) {
              return;
            }

            // 默认头像
            src.value = res.data.ad_pic
              ? res.data.ad_pic
              : "../../src/assets/img/admin1.webp";
            userId.value = res.data.ad_userid;
            if (store.state.user.loginIdenty === "admin") {
              headerName.value = res.data.ad_username;

              // console.log(headerName.value, "管理员名字");
            }
            // 如果已更改头像就不用弹出
            if (src.value === "../../src/assets/img/admin1.webp") {
              return open();
            }
          });
        }
        // console.log("路由改变");
      },
      { immediate: true }
    );

    // 点击上传头像
    const ClickUpload = function () {
      // console.log(userId.value, "userid");

      if (filesRef.value.files.length >= 1) {
        const temp = userId;

        ChangePic(store, filesRef, temp, src)();
      } else {
        return ElNotification({
          title: "Error",
          message: "请选择一个文件并且上传",
          type: "error",
          duration: 1600,
        });
      }
    };

    // 点击退出登录
    const logout = () => {
      // 缓存清空
      window.buildValue = "";
      window.studentValue = "";
      window.studentMount = "";
      if (store.state.user.loginIdenty === "student") {
        store.commit("user/assignStudentValue", {});
      } else {
        // store.state.user.profileAdmin = {};
        store.commit("user/assignAdminValue", {});
      }
      store.state.user.loginIdenty = "";
      router.push("/login");
    };
    // 控制上传图片的css样式按钮
    const flag = ref(false);
    const troggle = function (falg) {
      flag.value = falg;
    };
    return {
      logout,
      store,
      ClickUpload,
      headerName,
      troggle,
      filesRef,
      src,
      flag,
    };
  },
};
// 弹出消息
function open() {
  ElMessage({
    type: "success",
    duration: 1600,
    message: h("p", null, [
      h(
        "span",
        { style: "color:red", style: "font-Size:14px" },
        "你已成功登录"
      ),
      h(
        "i",
        { style: "color: teal", style: "font-Size:14px" },
        "   快去更改自己喜爱的头像吧"
      ),
    ]),
  });
}

// 更换头像
// 管理员更换头像
function ChangePic(store, filesRef, userId, src) {
  if (store.state.user.loginIdenty === "admin") {
    // 更换头像
    const uploadPicAdmin = function () {
      const formData = new FormData();
      formData.append("ad_pic", filesRef.value.files[0]);
      formData.append("userId", userId.value);

      UploadAdminPic(formData).then((res) => {
        // console.log(res, "头像管理员");
        if (res.data.status !== 200) {
          return ElNotification({
            title: "Error",
            message: "上传失败",
            type: "error",
            duration: 1600,
          });
        } else {
          src.value = res.data.url;
          return ElNotification({
            title: "Success",
            message: "上传成功",
            type: "success",
            duration: 1600,
          });
        }
      });
    };
    return uploadPicAdmin;
  }
  // 学生更换头像
  else {
    // 更换头像
    const uploadPicStudent = function () {
      const formData = new FormData();
      formData.append("st_pic", filesRef.value.files[0]);
      formData.append("userId", userId.value);
      UploadUserPic(formData).then((res) => {
        // console.log(res.data);
        if (res.data.status !== 200) {
          return ElNotification({
            title: "Error",
            message: "上传失败",
            type: "error",
            duration: 1600,
          });
        } else {
          src.value = res.data.url;
          return ElNotification({
            title: "Success",
            message: "上传成功",
            type: "success",
            duration: 1600,
          });
        }
      });
    };
    return uploadPicStudent;
  }
}
</script>

 <style lang="less">
.FirstHeader {
  width: 100%;
  height: 80px;
  .zksavatar {
    position: relative;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      margin: 0 30px 0 20px;
      border-radius: 50%;
      font-size: 30px;
      background-size: cover;
      background-position: center;
      .imgPic {
        width: 100%;
        height: auto;
      }
      .fileUpload {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        visibility: hidden;
        opacity: 0;
      }
      .fileUploadLabel {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        opacity: 0;
      }
    }
  }
}
.activeCursor {
  cursor: pointer;
}
</style>