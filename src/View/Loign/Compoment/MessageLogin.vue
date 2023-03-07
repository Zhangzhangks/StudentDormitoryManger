<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="profile"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item class="username_login" prop="messageId">
        <el-input
          class="el-ipt"
          v-model.number="profile.messageId"
          placeholder="请输入学号或者工号"
        >
          <template #prefix>
            <i class="iconfont icon-username"></i>
          </template> </el-input
      ></el-form-item>

      <el-form-item class="username_login" prop="phones">
        <el-input
          class="el-ipt"
          placeholder="请输入手机号"
          v-model="profile.phones"
        >
          <template #prefix>
            <i class="iconfont icon-shoujihao"></i>
          </template> </el-input
      ></el-form-item>

      <el-form-item class="password_login" style="margin-top: 25px">
        <el-input
          class="el-ipt"
          placeholder="请输入验证码"
          v-model="IptVal"
          @change="compareFn"
        >
          <template #prefix> <i class="iconfont icon-duanxin"></i></template>
          <template #suffix>
            <button class="el-btn" @click="send" v-if="YzmFlag">
              {{ time === -1 ? "发送验证码" : `${time}s后在发送` }}
            </button>
            <ValidateCode style="width: 110px" @change="emitVal" v-else />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref, reactive, onUnmounted } from "vue";
import { useIntervalFn } from "@vueuse/core";
import ValidateCode from "../../../components/ValidateCode.vue";
export default {
  name: "WorkspaceJsonMessageLogin",
  emit: ["yzmLogin"],
  components: { ValidateCode },
  setup(props, ctx) {
    const checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|7|8|5]\d{9}$/;
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (!reg.test(value)) return callback(new Error("请输入正确的手机号"));
      callback();
    };
    const checkphoneID = (rule, value, callback) => {
      const reg = /^\d{5}$/;
      if (!value) {
        return callback(new Error("请输入学号"));
      }
      if (!reg.test(value)) return callback(new Error("请输入五位整数"));
      callback();
    };
    const rules = reactive({
      messageId: [
        {
          required: true,
          message: "请输入学号",
          trigger: "blur",
        },
        { validator: checkphoneID, trigger: "blur" },
      ],
      phones: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
        { validator: checkPhone, trigger: "blur" },
      ],
    });

    const ruleFormRef = ref(""); // 自定义验证规则
    const profile = reactive({
      phones: "13218919255",
      yzm: "",
      messageId: "",
    });
    const IptVal = ref("");
    const YzmFlag = ref(true);
    // 接收子组件验证传递的字符
    const emitVal = function (val) {
      profile.yzm = val;
    };
    const time = ref(-1);
    //回调函数,时间,立即开启
    const { pause, resume } = useIntervalFn(
      () => {
        /* your function */
        if (time.value <= -1) {
          return pause();
        }
        time.value--;
      },
      1000,
      false
    );
    onUnmounted(() => {
      pause();
    }); // 组件销毁清楚定时器

    const send = function () {
      if (ruleFormRef.value) {
        // 验证;
        ruleFormRef.value.validate(async (result) => {
          if (result) {
            // console.log("验证通过");
            if (time.value <= -1) {
              time.value = 10;
              YzmFlag.value = false;
              resume();
            }
          }
        });
      }
    };
    const compareFn = function () {
      if (IptVal.value.toUpperCase() === profile.yzm) {
        return ctx.emit("yzmLogin", {
          phone: profile.phones,
          messageId: profile.messageId,
        });
      } else {
        return ElMessage({
          showClose: true,
          message: "验证失败",
          type: "error",
        });
      }
    };
    return {
      ruleFormRef,
      compareFn,
      emitVal,
      IptVal,
      rules,
      send,
      profile,
      time,
      YzmFlag,
    };
  },
};
</script>
<style lang="less" scoped>
#message_login {
  height: 150px;
  display: flex;
  .username_login,
  .password_login {
    margin-left: 40px !important;
  }
  .el-btn {
    width: 100px;
    height: 100%;
    border: none;
    background-color: #f5f5f5;
    margin-right: -15px;
    font-size: 16px;
    line-height: 38px;
    font-weight: normal;
    &:hover {
      cursor: pointer;
    }
  }
  .el-ipt {
    width: 280px;
    height: 40px;

    font-size: 16px;
  }
  .password_login {
    justify-content: space-between;
    display: flex;
    #password {
      width: 40px;
      height: 40px;
      background-color: #cfcdcd;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
    }
    .ipt {
      padding-left: 1px;
      #yzm {
        width: 100px;
        height: 38px;
        margin-right: -15px;
        line-height: 38px;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>