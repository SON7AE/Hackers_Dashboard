import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@pages/index.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@pages/about.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
