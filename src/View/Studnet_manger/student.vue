<template>
  <div class="common-layout" v-loading.fullscreen.lock="true">
    <el-container>
      <el-header id="st_hd">
        <div class="search">
          <span>学生学号: </span>

          <input
            type="text"
            id="ipt"
            v-model.number="FilterValue.userId"
            v-focus
            placeholder="请输入学号"
            @keyup.delete="KeyDownSearch"
          />
          <span>学生用户名: </span>
          <input
            type="text"
            id="ipt"
            v-model.trim="FilterValue.username"
            v-focus
            placeholder="请输入学生用户名"
            @keyup.delete="KeyDownSearch"
          />
          <el-button type="primary" :icon="Search" @click="search"
            >查询</el-button
          >
        </div>
      </el-header>
      <el-main>
        <div id="st_main" v-if="reloadFlag">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              align="center"
              type="index"
              label="索引"
              width="120"
            />
            <el-table-column
              align="center"
              prop="st_userid"
              label="学生学号"
              width="140"
            />
            <el-table-column
              align="center"
              prop="st_username"
              label="学生用户名"
              width="140"
            />
            <el-table-column align="center" label="性别" width="140">
              <template #default="{ row }">
                <span>{{ row.st_gender === 1 ? "男" : "女" }}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="学生头像"
              width="180"
              prop="st_pic"
            >
              <template #default="scope">
                <!-- {{ scope.row }} -->
                <div style="display: flex; align-items: center">
                  <el-image
                    fit="cover"
                    class="imgaeRead"
                    :src="scope.row.st_pic"
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
              prop="st_age"
              label="年龄"
              width="140"
            />
            <el-table-column
              align="center"
              prop="st_phone"
              label="电话号码"
              width="140"
            />
            <el-table-column
              align="center"
              prop="st_class"
              label="班级"
              width="140"
            />
            <el-table-column
              align="center"
              prop="st_major"
              label="专业"
              width="140"
            />
            <el-table-column
              align="center"
              prop="st_building"
              label="楼层"
              width="140"
            />
            <el-table-column align="center" label="操作" width="300">
              <template #default="{ row }">
                <el-button type="primary">
                  <router-link :to="`/main/student/${row.st_userid}`"
                    ><el-icon><Tickets /></el-icon>详情
                  </router-link></el-button
                >

                <el-button type="danger" @click="deleteValaue(row.st_userid)"
                  ><el-icon><DeleteFilled /></el-icon>删除{{
                }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div id="Pagination">
            <i>总条数:{{ total }}</i>

            <XtxPagination
              v-if="total"
              @current-change="currentChange"
              :total="total"
              :page-size="reqParams.pageSize"
              :currentPage="reqParams.page"
              :btnCounts="5"
            />
            <i
              >Go to
              <input
                type="text"
                v-model.number="ToPage"
                v-focus
                id="pagaIpt"
                @change="chaneIpt"
            /></i>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  getAllStudentValue,
  getFilterValue,
  deleteStudent,
} from "../../Api/userApi";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import store from "../../Store/store";
import { getCurrentInstance } from "vue";
export default {
  name: "Student",
  setup() {
    const Plus = ref("Plus");
    const Delete = ref("Delete");
    const Search = ref("Search");
    const FilterValue = reactive({ userId: "", username: "" }); //筛选条件数据
    const router = useRouter();
    const tableData = ref([]); //表格主数据
    const reloadFlag = ref(true); //局部刷新变量
    // 筛选数据
    const reqParams = reactive({
      page: 1,
      pageSize: 3, //每页条数
    });

    const total = ref(""); // 数据总条数
    const ToPage = ref(); //输入框跳转页码
    const instance = getCurrentInstance(); //this实例
    let { proxy } = instance;
    // 拿取数据
    function getVal() {
      watch(
        reqParams,
        () => {
          console.log("我变化了", reqParams.page);
          getAllStudentValue(reqParams).then((res) => {
            console.log(res, "学生数据");
            ToPage.value = reqParams.page;
            total.value = res.totalLength;
            if (res.status === 0) {
              tableData.value = res.data.dataList;
              // console.log(tableData.value);
            }
          });
        },
        { immediate: true }
      );
    }
    onMounted(() => {
      getVal();
    });
    // 查询数据
    const search = function () {
      if (FilterValue.userId === "" || FilterValue.username === "") {
        return ElNotification({
          title: "Warning",
          message: "请输入学号和姓名",
          type: "warning",
          duration: 600,
        });
      }

      // 单个筛洗查询
      getFilterValue(FilterValue).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return ElNotification({
            title: "Warning",
            message: "查询失败",
            type: "warning",
            duration: 600,
          });
        } else {
          tableData.value = [res.data];
          return ElNotification({
            title: "Success",
            message: "查询成功",
            type: "success",
            duration: 600,
          });
        }
      });
    };
    const KeyDownSearch = function (e) {
      if (FilterValue.username === "" || (FilterValue.userId === "" && e)) {
        getVal();
        console.log("我被清空了");
      }
    };
    // 删除数据
    const deleteValaue = function (id) {
      if (store.state.user.loginIdenty === "student") {
        return ElMessage({
          type: "warning",
          message: "你当前处于学生账号，不能删除他人",
        });
      }
      ElMessageBox.confirm(
        "您确定删除该用户吗，该操作可能造成无法找回的后果?",
        "Warning",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteStudent(id).then((res) => {
            // console.log(res);
            if (res.status !== 200) {
              return ElMessage({
                type: "error",
                message: "删除失败",
              });
            } else {
              getVal();

              ElMessage({
                type: "success",
                message: "删除成功",
              });
              reloadFlag.value = false;
              proxy.$nextTick(() => {
                reloadFlag.value = true;
              });
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消",
          });
        });
    };
    //子组件传递过来的新页数
    const currentChange = (newpage) => {
      console.log(newpage, "新页数");
      return (reqParams.page = newpage); //接收子组件传递过来的页数 即 点击哪个页码改变当前也
    }; // 点击输入框以外，触发当前页码的改变

    const chaneIpt = function (e) {
      ToPage.value = parseInt(e.target.value);
      // 如果输入框的额数值小于0直接赋值1;
      if (ToPage.value < 0) {
        console.log(ToPage.value);
        return (reqParams.page = 1);
      }
      // 如果输入的数值大于总页数直接赋值总页数
      const maxPage = Math.ceil(total / reqParams.pageSize);
      if (ToPage.value > maxPage) {
        return (reqParams.page = maxPage);
      }
      // 正常输入
      reqParams.page = ToPage.value;
    };
    return {
      Plus,
      chaneIpt,
      tableData,
      search,
      Delete,
      Search,
      deleteValaue,
      FilterValue,
      total,
      reqParams,
      currentChange,
      ToPage,
      KeyDownSearch,
      reloadFlag,
    };
  },
};
</script>
<style lang="less" scoped>
.common-layout {
  width: 110%;
  height: 800px;

  #st_hd {
    width: 100%;
    height: 120px;
    border: 1px solid #fff;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      #ipt {
        margin: 0 20px;
        width: 180px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        border: 1px solid #fff;
        &::placeholder {
          font-size: 15px;
          padding-left: 2px;
        }
      }
    }
  }
  #st_main {
    position: relative;
    height: 780px;
    background-color: #fff;
    box-shadow: 0 0 12px #fff;
  }
}
#Pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20%;
  left: 20%;
  font-size: 20px;
  i {
    font-style: normal;
  }
  #pagaIpt {
    width: 66px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    margin: 0 20px;
    padding-left: 18px;
    font-size: 16px;
  }
}
</style>