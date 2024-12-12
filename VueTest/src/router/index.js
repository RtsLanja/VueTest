import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/authStore'
import { Notify } from 'quasar'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const { user, token, isAuthenticated } = authStore

    if (user && token && isAuthenticated && to.path === '/auth') {
      return next('/')
    }

    if (to.meta.requiresAuth && (!user || !token || !isAuthenticated)) {
      Notify.create({
        message: "Veuillez vous connecter",
        color: "red",
        position: "top",
      })
      return next("/auth")
    }

    next()
  })

  return Router
})
