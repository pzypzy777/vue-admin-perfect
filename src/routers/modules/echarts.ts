/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const echartsRouter = [
  {
    path: '/echarts/:id',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/echarts/index.vue'),
        name: 'echarts-simple',
        meta: { title: '学生状态', roles: ['other'], icon: 'MenuIcon' },
        props: (route) => ({ id: route.params.id }),
      },
    ],
  },
]

export default echartsRouter
