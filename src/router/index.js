import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: "/asset",
        name: "Asset",
        component: () => import("@/views/Asset.vue")
    },
    {
        path: "/provider",
        name: "Provider",
        component: () => import("@/views/Provider.vue")
    },
    {
        path: "/network",
        name: "Network",
        component: () => import("@/views/Network.vue")
    },
    {
        path: "/message",
        name: "Message",
        component: () => import("@/views/Message.vue")
    },
    {
        path: "/oep4",
        name: "Oep4",
        component: () => import("@/views/Oep4.vue")
    },
    {
        path: "/smartContract",
        name: "smartContract",
        component: () => import("@/views/smartContract.vue")
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
})

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => error);
}

export default router;
