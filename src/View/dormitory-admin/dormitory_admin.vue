<template>
  <div class="common-layout" v-loading.fullscreen.lock="true">
    <el-container>
      <el-header id="ad_hd">
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
          <el-button type="primary" :icon="Search" @click="searchValue"
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
              prop="ad_userid"
              label="宿管学号"
              width="140"
            />
            <el-table-column
              align="center"
              prop="ad_username"
              label="宿管姓名"
              width="200"
            />
            <el-table-column align="center" label="性别" width="140">
              <template #default="{ row }">
                <span>{{ row.ad_gender === 1 ? "男" : "女" }}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="宿管头像"
              width="200"
              prop="ad_pic"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-image
                    fit="cover"
                    class="imgaeRead"
                    :src="scope.row.ad_pic"
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
              prop="ad_age"
              label="年龄"
              width="160"
            />
            <el-table-column
              align="center"
              prop="ad_phone"
              label="电话号码"
              width="200"
            />

            <el-table-column
              align="center"
              prop="ad_building"
              label="宿管楼层"
              width="138"
            />
            <el-table-column align="center" label="操作" width="300">
              <template #default="{ row }">
                <el-button type="primary">
                  <router-link :to="`/main/doradmin/${row.ad_userid}`"
                    ><el-icon><Tickets /></el-icon>详情
                  </router-link></el-button
                >

                <el-button type="danger" @click="deleteAdmin(row.ad_userid)"
                  ><el-icon><DeleteFilled /></el-icon>删除{{
                }}</el-button> </template
            ></el-table-column>
          </el-table>
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
  getAllAdminValue,
  getFilterValueAdmin,
  deleteAdminUser,
} from "../../Api/admin";
import { reactive, ref, watch, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
export default {
  name: "Student",
  setup() {
    const Plus = ref("Plus");
    const Delete = ref("Delete");
    const Search = ref("Search");
    const FilterValue = reactive({ userId: "", username: "" }); //筛选条件数据
    const router = useRouter();
    const store = useStore();
    const tableData = ref([]); //表格主数据
    const reloadFlag = ref(true); //局部刷新变量
    const instance = getCurrentInstance(); //this实例
    let { proxy } = instance;
    // 筛选数据
    const reqParams = reactive({
      page: 1,
      pageSize: 3,
    });
    const total = ref(""); // 数据总条数
    const ToPage = ref(1); //输入框跳转页码
    // 拿取数据
    function getVal() {
      watch(
        reqParams,
        () => {
          // console.log("我变化了", reqParams.page);
          getAllAdminValue(reqParams).then((res) => {
            // console.log(res, "宿管数据");
            total.value = res.totalLength;
            ToPage.value = reqParams.page;
            if (res.status === 0) {
              return (tableData.value = res.data.dataList);
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
    const searchValue = function () {
      if (FilterValue.userId === "" || FilterValue.username === "") {
        return ElNotification({
          title: "Warning",
          message: "请输入学号和姓名",
          type: "warning",
        });
      }
      // 单个筛洗查询
      getFilterValueAdmin(FilterValue).then((res) => {
        console.log(res, "查询");
        if (res.status !== 200) {
          return ElNotification({
            title: "Warning",
            message: "查询失败",
            type: "warning",
          });
        } else {
          tableData.value = [res.data];
          return ElNotification({
            title: "Success",
            message: "查询成功",
            type: "success",
          });
        }
      });
    };

    const KeyDownSearch = function (e) {
      if (FilterValue.username === "" || (FilterValue.userId === "" && e)) {
        getVal();
        // console.log("我被清空了");
      }
    };
    //子组件传递过来的新页数
    const currentChange = (newpage) => {
      console.log(newpage, "新页数");
      return (reqParams.page = newpage); //接收子组件传递过来的页数 即 点击哪个页码改变当前也
    };
    // 点击输入框以外，触发当前页码的改变
    const chaneIpt = function (e) {
      const newPageVal = parseInt(e.target.value);
      // 如果输入框的额数值小于0直接赋值1;
      if (newPageVal < 0) {
        ToPage.value = 1;
        reloadFlag.value = false;
        proxy.$nextTick(() => {
          getVal();
          reloadFlag.value = true;
        });
        return (reqParams.page = 1);
      }
      // 如果输入的数值大于总页数直接赋值总页数
      const maxPage = Math.ceil(total.value / reqParams.pageSize);
      if (newPageVal > maxPage) {
        ToPage.value = maxPage;
        proxy.$nextTick(() => {
          getVal();
          reloadFlag.value = true;
        });
        return (reqParams.page = maxPage);
      }
      // 正常输入
      ToPage.value = newPageVal;
      reqParams.page = newPageVal;
      proxy.$nextTick(() => {
        getVal();
        reloadFlag.value = true;
      });
    };
    // 删除数据
    const deleteAdmin = function (id) {
      if (store.state.user.profileAdmin.ad_userid == id) {
        return ElMessage({
          type: "warning",
          message: "您当前处于登陆状态，不能执行此操作!",
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
          deleteAdminUser(id).then((res) => {
            // console.log(res);
            if (res.status !== 200) {
              return ElMessage({
                type: "error",
                message: "删除失败",
              });
            } else {
              ElMessage({
                type: "success",
                message: "删除成功",
              });
              reloadFlag.value = false;
              proxy.$nextTick(() => {
                getVal();
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
    return {
      Plus,
      chaneIpt,
      tableData,
      searchValue,
      Delete,
      Search,
      reloadFlag,
      FilterValue,
      store,
      total,
      reqParams,
      currentChange,
      ToPage,
      KeyDownSearch,
      deleteAdmin,
    };
  },
};
</script>
<style lang="less" scoped>
.common-layout {
  padding: 20px 15px 0;
  height: 800px;

  #ad_hd {
    width: 100%;
    height: 120px;
    border: 1px solid #e4e5e9;
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

        border: 1px solid #e7e5e5;
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
  bottom: 2%;
  left: 30%;
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