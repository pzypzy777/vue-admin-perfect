/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const tableRouter = [
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: '/table',
        component: () => import('@/views/table/index.vue'),
        name: 'comprehensive',
        meta: { title: '学生表格', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
]

export default tableRouter
