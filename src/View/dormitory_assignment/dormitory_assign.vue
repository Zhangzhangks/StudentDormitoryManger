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
          <el-button type="primary" :border="true" :icon="Search"
            >查询不做</el-button
          >
        </div>
      </el-header>
      <el-main
        ><el-table
          :data="tableData"
          height="600px"
          stripe
          style="width: 100%"
          border
        >
          <el-table-column label="索引" type="index" width="180" />
          <el-table-column prop="buildName" label="楼栋名称" width="180" />
          <el-table-column prop="buildFloor" label="宿舍号" />
          <el-table-column prop="bedNum" label="床号" />
          <el-table-column prop="stNumber" label="学生学号" />
          <el-table-column prop="stName" label="学生姓名" />
          <el-table-column prop="stClass" label="学生班级" />
          <el-table-column prop="stMajor" label="学生专业" />
          <el-table-column prop="adNumber" label="宿管工号" />
          <el-table-column prop="adName" label="宿管姓名" /> </el-table
      ></el-main>
    </el-container>
  </div>
</template>
<script>
import { getAllAdminValue } from "../../Api/admin";
import { getAllStudentValue } from "../../Api/userApi";
import { onMounted, ref, watchEffect } from "vue";
export default {
  name: "WorkspaceJsonDormitoryManger",
  setup() {
    const tableData = ref([]);
    const Search = ref("Search");
    const House = ref("House");
    const studentFn = ref(null);
    const adminFn = ref(null);
    let st = ref(false);
    let ad = ref(false);

    watchEffect(() => {
      st.value = window.allStudent;
      ad.value = window.allAdmin;
    });
    onMounted(async () => {
      if (st.value && ad.value) {
        return render(st.value, ad.value, tableData);
      } else {
        studentFn.value = await getAllStudentValue();
        adminFn.value = await getAllAdminValue();
        window.allStudent = studentFn.value;
        window.allAdmin = adminFn.value;
        if (studentFn.value && adminFn.value) {
          render(studentFn.value, adminFn.value, tableData);
        }
      }
    });

    return { Search, tableData, House };
  },
}; // 渲染
function render(student, admin, tableData) {
  // console.log(student, admin);
  student.alldata.forEach((ele) => {
    let index = admin.alldata.findIndex((item) => {
      return item.ad_building === ele.st_building;
    });

    tableData.value.push({
      buildName: ele.st_building,
      buildFloor: ele.st_dorNumber.substr(0, 3),
      bedNum: ele.st_dorNumber.substr(4),
      stNumber: ele.st_userid,
      stName: ele.st_username,
      stClass: ele.st_class,
      stMajor: ele.st_major,
      adNumber: admin.alldata[index].ad_userid,
      adName: admin.alldata[index].ad_username,
    });
  });
}
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
}
</style>