<template>
  <div class="common-layout">
    <el-container>
      <el-header id="header">
        <div class="searchbd">
          <div id="id">
            <span>楼栋编号学号: </span>
            <input type="text" v-focus placeholder="请输入楼栋编号" />
          </div>
          <div id="uname">
            <span>楼栋名称: </span>
            <input type="text" v-focus placeholder="请输入楼栋名称" />
          </div>
          <el-button type="primary" :icon="Search">查询不做</el-button>
        </div>
        <div class="addBd">
          <el-button
            type="primary"
            :icon="Plus"
            id="btn"
            @click="closeDialog(true)"
            >添加</el-button
          >
        </div>
        <el-dialog
          v-model="dialogVisible"
          title="添加宿舍楼栋信息"
          width="40%"
          style="height: 400px"
        >
          <el-form
            :inline="true"
            :model="RegbuidValue"
            class="demo-form-inline"
            label-position="left"
            :rules="rules"
            status-icon
          >
            <el-form-item label="楼栋编号" prop="buildId">
              <el-input
                v-model="RegbuidValue.buildId"
                placeholder="请输入楼栋编号"
              />
            </el-form-item>
            <el-form-item label="楼栋名称" prop="buildName">
              <el-input
                v-model="RegbuidValue.buildName"
                placeholder="请输入楼栋名称"
              />
            </el-form-item>
            <el-form-item label="楼栋层数" prop="buildFloor">
              <el-input
                v-model.number="RegbuidValue.buildFloor"
                placeholder="请输入楼栋层数"
              />
            </el-form-item>
            <el-form-item label="宿舍数目" prop="buildDornum">
              <el-input
                v-model.number="RegbuidValue.buildDornum"
                placeholder="请输入楼栋宿舍数目"
              />
            </el-form-item>

            <el-form-item label="楼栋位置" prop="buildAdress">
              <el-input
                v-model="RegbuidValue.buildAdress"
                placeholder="请输入楼栋位置"
              />
            </el-form-item>

            <el-form-item label="宿管姓名">
              <el-select v-model="RegbuidValue.buildAdmin" v-if="allAdminname">
                <el-option
                  :label="item.ad_username"
                  :value="item.ad_username"
                  v-for="item in allAdminname"
                  :key="item.ad_userid"
                />
              </el-select>
            </el-form-item>
          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="closeDialog(false)">Cancel</el-button>
              <el-button type="primary" @click="submitDialog">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </el-header>
      <el-main>
        <div id="st_main" v-if="reloadflag">
          <el-table
            :data="getAllbuildValue"
            border
            style="width: 100%; height: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              align="center"
              type="index"
              label="索引"
              width="62"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="build_identy"
              label="楼栋编号"
              width="150"
            />
            <el-table-column
              align="center"
              prop="build_name"
              label="楼栋名称"
              width="200"
            />
            <el-table-column
              align="center"
              prop="build_floor"
              label="楼栋层数"
              width="160"
            />
            <el-table-column
              align="center"
              prop="build_dor"
              label="楼层宿舍数"
              width="160"
            />
            <el-table-column
              align="center"
              label="楼栋头像"
              width="200"
              prop="build_pic"
            >
              <template #default="scope">
                <!-- {{ scope.row }} -->
                <div style="display: flex; align-items: center">
                  <el-image
                    fit="cover"
                    class="imgaeRead"
                    :src="scope.row.build_pic"
                  >
                    <template #error>
                      <div class="image-slot">
                        <el-icon><Picture /></el-icon>
                      </div> </template
                  ></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="build_address"
              label="楼栋地址"
              width="200"
            />
            <el-table-column
              align="center"
              prop="build_admin"
              label="楼栋管理员姓名"
              width="195"
            />
            <el-table-column align="center" label="操作" width="300">
              <template #default="{ row }">
                <el-button type="primary">
                  <router-link :to="`/main/dormitory/${row.build_identy}`"
                    ><el-icon><Tickets /></el-icon>详情
                  </router-link></el-button
                >

                <el-button type="danger" @click="deleteValaue(row.build_identy)"
                  ><el-icon><DeleteFilled /></el-icon>删除{{
                }}</el-button>
              </template>
            </el-table-column>
          </el-table></div
      ></el-main>
      <div id="Pagination">
        <i>总条数:{{ total }}</i>
        <XtxPagination
          v-if="total"
          @current-change="currentChange"
          :total="total"
          :page-size="reqParams.pageSize"
          :currentPage="reqParams.page"
          :btnCounts="6"
        />
      </div>
    </el-container>
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
import { getCurrentInstance } from "vue";

import { getAllAdminValue } from "../../Api/admin";
import { addNewBuild, getAllBuild, deleteAdminUser } from "../../Api/buildApi";
import {
  checkBdName,
  checkBdId,
  checkBdFloor,
  checkBdDornum,
  checkBdAddress,
  checkBdDorName,
} from "./schema";
export default {
  name: "WorkspaceJsonDormitoryManger",
  setup() {
    const Search = ref("Search");
    const Plus = ref("Plus");
    const dialogVisible = ref(false);
    const reloadflag = ref(true); //页面刷新
    const instance = getCurrentInstance();
    const AllBuildName = ref([]);
    let { proxy } = instance; //拿取this
    // 关闭对话框
    const closeDialog = function (bool) {
      dialogVisible.value = bool;
    };
    // 筛选数据
    const reqParams = reactive({
      page: 1,
      pageSize: 3,
    });

    const total = ref(""); // 数据总条数
    const ToPage = ref(1); //输入框跳转页码
    // 楼栋数据注册
    const RegbuidValue = reactive({
      buildId: "",
      buildName: "",
      buildFloor: "6",
      buildDornum: "10",
      buildAdress: "",
      buildAdmin: "",
    });

    const allAdminname = ref([]);
    // 拿到所有楼栋信息
    function getVal() {
      watch(
        reqParams,
        () => {
          getAllBuild(reqParams).then((res) => {
            console.log(res, "楼栋信息");
            getAllbuildValue.value = res.data.dataList;
            total.value = res.totalLength;
            ToPage.value = reqParams.page;
          });
          getAllAdminValue().then((res) => {
            console.log(res);
            allAdminname.value = res.alldata;
          });
        },
        { immediate: true }
      );
    }
    getVal();
    const getAllbuildValue = ref([]);
    // 关闭dialog对话框并且发送请求
    const submitDialog = function () {
      dialogVisible.value = false;
      addNewBuild(RegbuidValue).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return ElNotification({
            title: "Error",
            message: "插入失败",
            type: "error",
            duration: 600,
          });
        } else {
          ElNotification({
            title: "Success",
            message: "插入成功",
            type: "success",
            duration: 600,
          });
          getVal();
        }
      });
    };

    const deleteValaue = function (id) {
      reloadflag.value = false;
      deleteAdminUser(id).then((res) => {
        if (res.status !== 200) {
          proxy.$nextTick(() => {
            reloadflag.value = true;
            getVal();
          });
          return ElNotification({
            title: "Error",
            message: "删除失败",
            type: "error",
          });
        } else {
          proxy.$nextTick(() => {
            getVal();
            reloadflag.value = true;
          });
          ElNotification({
            title: "Success",
            message: "删除成功",
            type: "success",
          });
        }
      });
    };
    const rules = reactive({
      buildId: [
        {
          required: true,
          message: "请输入楼栋编号",
          trigger: "blur",
        },
        { validator: checkBdId, trigger: "blur" },
      ],
      buildName: [
        {
          required: true,
          message: "请输入楼栋名称",
          trigger: "blur",
        },
        { validator: checkBdName, trigger: "blur" },
      ],
      buildFloor: [
        {
          required: true,
          message: "请输入楼栋层数",
          trigger: "blur",
        },
        { validator: checkBdFloor, trigger: "blur" },
      ],
      buildDornum: [
        {
          required: true,
          message: "请输入楼栋宿舍数目",
          trigger: "blur",
        },
        { validator: checkBdDornum, trigger: "blur" },
      ],
      buildAdress: [
        {
          required: true,
          message: "请输入楼栋地址",
          trigger: "blur",
        },
        { validator: checkBdAddress, trigger: "blur" },
      ],
      buildAdmin: [
        {
          required: true,
          message: "请输入楼栋管理员姓名",
          trigger: "blur",
        },
        { validator: checkBdDorName, trigger: "blur" },
      ],
    });
    //子组件传递过来的新页数
    const currentChange = (newpage) => {
      console.log(newpage, "新页数");
      return (reqParams.page = newpage); //接收子组件传递过来的页数 即 点击哪个页码改变当前也
    };

    return {
      Search,
      currentChange,
      submitDialog,
      deleteValaue,
      Plus,
      dialogVisible,
      RegbuidValue,

      getAllbuildValue,
      closeDialog,
      rules,
      reloadflag,

      total,
      reqParams,
      AllBuildName,

      allAdminname,
    };
  },
};
</script>

<style lang="less" scoped>
#header {
  padding: 0 !important;
  padding-left: 40px !important;
  height: 80px !important;
  line-height: 0 !important;
  border: 1px solid #ccc;
  background-color: #f5f5f5 !important;
  border-radius: 8px;
  margin-top: 10px;
  .searchbd {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
      height: 30px;
      background-color: #fff;
      margin: 0 20px;
      border-radius: 5px;
      &::placeholder {
        font-size: 14px;
        padding-left: 5px;
      }
    }
  }
  .addBd {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 220px;
    height: 100%;
    #btn {
      width: 80px;
      height: 42px;
    }
  }
}
#Pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  i {
    font-style: normal;
  }
}
.zks {
  height: 100%;
  border: 1px solid #000;
}
</style>