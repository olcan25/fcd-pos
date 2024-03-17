const HomeView = () => import('@/views/home/HomeView.vue');

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
        requiresAuth: true
        }
    }
    ];

export default routes;