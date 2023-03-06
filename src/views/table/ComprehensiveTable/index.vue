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
        <el-button type="primary" size="small" icon="Edit" @click="edit(scope.row)">
          编辑
        </el-button>
        <el-button @click="del(scope.row)" type="danger" size="small" icon="Delete">
          删除
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
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age" />
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
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  const loading = ref(true)
  const appContainer = ref(null)
  import PropTable from '@/components/Table/PropTable/index.vue'
  const data = []
  const column = [
    { type: 'selection', width: 60, fixed: 'left' },
    { name: 'name', label: '姓名', inSearch: true, valueType: 'input', width: 80 },
    { name: 'age', label: '年龄', width: 80 },
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
    { name: 'braceletid', label: '手环号', inSearch: true, width: 80 },
    { name: 'state', label: '状态', inSearch: true, width: 80 },
    { name: 'physicaltime', label: '体测时间', inSearch: true, width: 160 },
  ]
  const list = ref(data)

  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    name: '',
    sex: null,
    age: null,
    stuid: '',
    braceletid: '',
    state: '',
    physicaltime: '',
  })

  const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
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

  const edit = (row) => {
    title.value = '编辑'
    rowObj.value = row
    dialogVisible.value = true
    ruleForm.name = row.name
    ruleForm.sex = row.sex
    ruleForm.age = row.age
    ruleForm.braceletid = row.braceletid
    ruleForm.stuid = row.stuid
  }

  const del = (row) => {
    console.log('row==', row)
    ElMessageBox.confirm('你确定要删除当前项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        list.value = list.value.filter((item) => item.id !== row.id)
        ElMessage.success('删除成功')
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 500)
      })
      .catch(() => {})
  }

  const reset = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
    ElMessage.success('触发重置方法')
  }

  const onSubmit = (val) => {
    console.log('val===', val)
    ElMessage.success('触发查询方法')
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  const getHeight = () => {}

  onMounted(() => {
    nextTick(() => {
      // let data = appContainer.value.
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
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
