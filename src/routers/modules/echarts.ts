/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const echartsRouter = [
  {
    path: '/echarts',
    component: Layout,
    children: [
      {
        path: '/echarts/simple',
        component: () => import('@/views/echarts/simple/index.vue'),
        name: 'echarts-simple',
        meta: { title: '学生状态', roles: ['other'], icon: 'MenuIcon' },
      },
    ],
  },
]

export default echartsRouter
