/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout/index.vue";

const componentsRouter = {
    path: '/components',
    component: Layout,
    redirect: 'noRedirect',
    name: 'components',
    meta: {
        title: '组件',
        icon: 'chart'
    },
    children: [
        {
            path: 'editor',
            component: () => import('@/views/components-demo/editor.vue'),
            name: 'editor',
            meta: { title: '富文本编辑器', noCache: true }
        },
        {
            path: 'mark-down',
            component: () => import('@/views/components-demo/mark-down.vue'),
            name: 'mark-down',
            meta: { title: 'markDown', noCache: true }
        },
    ]
}

export default componentsRouter