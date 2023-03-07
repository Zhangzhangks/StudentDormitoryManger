<template>
  <div class="common-layout" v-loading.fullscreen.lock="true">
    <el-container>
      <el-header id="st_hd">
        <div class="search">
          <span>学生学号: </span>
          <input type="text" id="ipt" v-focus placeholder="请输入学号" />
          <span>学生用户名: </span>
          <input type="text" id="ipt" v-focus placeholder="请输入学生用户名" />
          <el-button type="primary" :icon="Search">查询不做</el-button>
        </div>
      </el-header>
      <el-main>
        <div id="st_main">
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
              prop="reBuild"
              label="楼栋"
              width="140"
            />
            <el-table-column
              align="center"
              prop="reDesc"
              label="报修类型"
              width="140"
            />

            <el-table-column
              align="center"
              label="报修时间"
              width="180"
              prop="reDate"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="stId"
              label="学生学号"
              width="140"
            />
            <el-table-column
              align="center"
              prop="stName"
              label="学生姓名"
              width="140"
            />
            <el-table-column
              align="center"
              prop="adName"
              label="宿管姓名"
              width="140"
            />
            <el-table-column
              align="center"
              prop="idea"
              label="学生意见"
              width="140"
            />
            <el-table-column
              align="center"
              prop="done"
              label="是否完成"
              width="140"
            >
              <template #default="{ row }">
                <el-switch
                  disabled
                  v-model="row.done"
                  style="margin-right: 10px"
                />
                {{ row.done ? "完成" : "未完成" }}
              </template></el-table-column
            >
            <el-table-column align="center" label="打分" width="140">
              <template #default="{ row }">
                <el-rate v-model="row.Starvalue" allow-half /> </template
            ></el-table-column>

            <el-table-column align="center" label="操作" width="300">
              <template #default="{ row }">
                <el-button type="primary" @click="updateDioalog(row)">
                  <el-icon><Tickets /></el-icon>修改</el-button
                >

                <el-dialog v-model="dialogVisible" title="Tips" width="50%">
                  <el-table
                    :data="copyTableData"
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
                      prop="reDesc"
                      label="报修类型"
                      width="140"
                    />

                    <el-table-column
                      align="center"
                      prop="stId"
                      label="学生学号"
                      width="160"
                    />
                    <el-table-column
                      align="center"
                      prop="stName"
                      label="学生姓名"
                      width="160"
                    />

                    <el-table-column
                      align="center"
                      prop="done"
                      label="审核状态"
                      width="140"
                    >
                      <template #default>
                        <el-switch
                          v-model="isDone"
                          style="margin-right: 10px"
                        />
                        {{ isDone ? "完成" : "未完成" }}
                      </template></el-table-column
                    >
                    <el-table-column
                      align="center"
                      prop="Starvalue"
                      label="打分"
                      width="200"
                    >
                      <template #default>
                        <el-rate v-model="isStart" allow-half /> </template
                    ></el-table-column>
                  </el-table>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false"
                        >Cancel</el-button
                      >
                      <el-button type="primary" @click="submit">
                        提交
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
                <el-button type="danger" @click="deleteValaue(row.st_userid)"
                  ><el-icon><DeleteFilled /></el-icon>删除{{
                }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { getAllAdminValue } from "../../Api/admin";
import { GetrepairValue, UpdaterepairValue } from "../../Api/repairApi";
export default {
  name: "Student",
  setup() {
    const tableData = ref([]);
    const Search = ref("Search");
    function getTimeValue() {
      var date = new Date();
      var y = isZero(date.getFullYear());
      var m = isZero(date.getMonth() + 1);
      var date = isZero(date.getDate());
      return y + "-" + m + "-" + date;
    }
    const dialogVisible = ref(false);
    function isZero(num) {
      return (num = num > 10 ? num : "0" + num);
    }
    async function getVal() {
      const admin = await getAllAdminValue();
      // console.log(admin, "admin");
      GetrepairValue().then((res) => {
        // console.log(res, "报修");
        res.alldata.forEach((ele) => {
          let index = admin.alldata.findIndex((item) => {
            return ele.re_build === item.ad_building;
          });
          tableData.value.push({
            reId: ele.re_id,
            reDesc: ele.re_desc,
            reDate: getTimeValue(ele.re_date),
            stId: ele.re_uid,
            stName: ele.re_uname,
            adName: admin.alldata[index].ad_username,
            done: ele.re_done === 1 ? true : false,
            reBuild: ele.re_build,
            idea: "",
            Starvalue: parseFloat(ele.re_star ? ele.re_star : 5),
          });
        });
      });
    }
    onMounted(() => {
      getVal();
    });
    // dialog的数据
    const copyTableData = ref([]);
    const isDone = ref(false);
    const isStart = ref(5);
    const row = ref("");
    const updateDioalog = function (rowval) {
      row.value = rowval;
      copyTableData.value = [rowval];
      dialogVisible.value = true;
    };
    const submit = function () {
      console.log(row.value, 55);
      dialogVisible.value = false;
      UpdaterepairValue({
        isDone: isDone.value,
        re_desc: row.value.reDesc,
        isStart: isStart.value,
        re_uid: row.value.stId,
      }).then((res) => {
        if (res.status !== 200) {
          ElNotification({
            title: "Error",
            message: "修改失败",
            type: "error",
            duration: 600,
          });
        } else {
          tableData.value = [];
          getVal();
          ElNotification({
            title: "Success",
            message: "修改成功",
            type: "success",
            duration: 600,
          });
        }
      });
    };
    return {
      row,
      isDone,
      submit,
      isStart,
      tableData,
      copyTableData,
      Search,
      dialogVisible,
      updateDioalog,
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