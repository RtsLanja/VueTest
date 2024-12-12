const routes = [

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children : [
      { path: '', component :() => import('pages/Login.vue')},
      { path: '/signup' , component :() => import('pages/Signup.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/event', component: () => import('pages/Event.vue')}
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
