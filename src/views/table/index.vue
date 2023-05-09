<template>
  <div class="app-container" ref="appContainer">
    <PropTable
      :loading="loading"
      @selection-change="selectionChange"
      :columns="column"
      :data="list"
      @reset="reset"
      @onSubmit="onSubmit"
    >
      <template v-slot:btn>
        <div style="display: flex; justify-content: flex-end">
          <el-button type="primary" @click="add"
            ><el-icon><plus /></el-icon> 添加</el-button
          >
          <el-button type="danger" @click="batchDelete"
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <template v-slot:sex="scope">{{ scope.row.sex ? '男' : '女' }}</template>
      <template v-slot:operation="scope">
        <el-button type="primary" size="small" @click="checkinfo(scope.row.braceletid)">
          查看体测状态
        </el-button>
      </template>
    </PropTable>

    <el-dialog v-model="dialogVisible" :title="title" width="50%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="ruleForm.grade" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="ruleForm.stuid" />
        </el-form-item>
        <el-form-item label="手环号" prop="braceletid">
          <el-input v-model="ruleForm.braceletid" />
        </el-form-item>
        <el-form-item label="体测时间" prop="physicaltime">
          <el-input v-model="ruleForm.physicaltime" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleClose(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup name="comprehensive">
  import { ref, reactive, onMounted, nextTick, toRaw } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  const loading = ref(true)
  const appContainer = ref(null)
  import PropTable from '@/components/Table/PropTable/index.vue'
  import axios from 'axios'
  const data = reactive([])
  // 定义方法

  axios({
    url: 'http://localhost:8080/student/get',
    method: 'GET',
  }).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      let dateString = res.data[i].physical_time // 假设这是从后端接收到的日期字符串
      let date = new Date(dateString)
      let formattedDate = date
        .toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
        .replace(/\//g, '-')
        .replace(/[日上下午]/g, '')
      data.push({
        name: res.data[i].name,
        grade: '大四',
        sex: res.data[i].sex,
        classroom: '计算机1902',
        stuid: res.data[i].id,
        braceletid: res.data[i].bracelet_id,
        physicaltime: formattedDate,
      })
    }
  })

  const column = [
    { type: 'selection', width: 60, fixed: 'left' },
    { name: 'name', label: '姓名', inSearch: true, valueType: 'input', width: 80 },
    { name: 'grade', label: '年级', width: 80 },
    { name: 'classroom', label: '班级', width: 160 },
    {
      name: 'sex',
      label: '性别',
      slot: true,
      inSearch: true,
      width: 80,
      options: [
        {
          value: 1,
          label: '男',
        },
        {
          value: 0,
          label: '女',
        },
      ],
      valueType: 'select',
    },
    { name: 'stuid', label: '学号', inSearch: true, valueType: 'input', width: 100 },
    { name: 'braceletid', label: '手环号', width: 80 },
    { name: 'physicaltime', label: '体测时间', width: 180 },
    { name: 'operation', slot: true, fixed: 'right', width: 200, label: '操作' },
  ]
  const list = ref(data)
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    name: '',
    sex: null,
    grade: null,
    classroom: null,
    stuid: '',
    braceletid: '',
    physicaltime: '',
  })

  const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    grade: [{ required: true, message: '请输入年级', trigger: 'blur' }],
    sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change',
      },
    ],
    stuid: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  })

  const dialogVisible = ref(false)
  const title = ref('新增')
  const rowObj = ref({})
  const selectObj = ref([])
  const router = useRouter()
  const checkinfo = (val) => {
    router.push({
      name: 'echarts-simple',
      params: { id: val },
    })
  }
  const handleClose = async (done: () => void) => {
    await ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        //todo
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const add = () => {
    title.value = '新增'
    dialogVisible.value = true
  }

  const batchDelete = () => {
    if (!selectObj.value.length) {
      return ElMessage.error('未选中任何行')
    }
    ElMessageBox.confirm('你确定要删除选中项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        ElMessage.success('模拟删除成功') //todo 删除
        list.value = list.value.concat([])
      })
      .catch(() => {})
  }
  const selectionChange = (val) => {
    selectObj.value = val
  }

  const reset = () => {
    data.length = 0
    axios({
      url: 'http://localhost:8080/student/get',
      method: 'GET',
    }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        let dateString = res.data[i].physical_time // 假设这是从后端接收到的日期字符串
        let date = new Date(dateString)
        let formattedDate = date
          .toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
          .replace(/\//g, '-')
          .replace(/[日上下午]/g, '')
        data.push({
          name: res.data[i].name,
          grade: '大四',
          sex: res.data[i].sex,
          classroom: '计算机1902',
          stuid: res.data[i].id,
          braceletid: res.data[i].bracelet_id,
          physicaltime: formattedDate,
        })
      }
    })
  }

  const onSubmit = (val) => {
    let select = null
    let apiname = null
    if (val.name) {
      select = val.name
      apiname = 'name'
    } else if (val.sex != null) {
      select = val.sex
      apiname = 'sex'
    } else if (val.stuid) {
      select = val.stuid
      apiname = 'id'
    }
    if (select != null && apiname != null)
      axios({
        url: 'http://localhost:8080/student/getby' + apiname + '?' + apiname + '=' + select,
        method: 'GET',
      }).then((res) => {
        data.length = 0
        for (let i = 0; i < res.data.length; i++) {
          let dateString = res.data[i].physical_time // 假设这是从后端接收到的日期字符串
          let date = new Date(dateString)
          let formattedDate = date
            .toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
            .replace(/\//g, '-')
            .replace(/[日上下午]/g, '')
          data.push({
            name: res.data[i].name,
            grade: '大四',
            sex: res.data[i].sex,
            classroom: '计算机1902',
            stuid: res.data[i].id,
            braceletid: res.data[i].bracelet_id,
            physicaltime: formattedDate,
          })
        }
      })
    console.log(data)
  }
  onMounted(() => {
    nextTick(() => {
      // let data = appContainer.value.
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
    setInterval(() => {
      axios({
        url: 'http://localhost:8080/TestInfo/checkState',
        method: 'GET',
      }).then((res) => {
        if ((res.data == 1)) {
          ElNotification({
            title: 'Warning',
            message: '学生潘振宇跌倒',
            type: 'warning',
          })
        }
      })
    }, 1000) // 设置定时器的时间间隔，单位为毫秒，这里设置为1秒更新一次数据
  })
</script>

<style scoped>
  .app-container {
    flex: 1;
    display: flex;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
