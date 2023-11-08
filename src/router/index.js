import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/admin-dashboard',
          name: 'home',
          component: () => import('../views/Home/Home.vue')
        },
        {
          path: '/project',
          name: 'project',
          component: () => import('../views/Project/Project.vue')
        },
        {
          path: '/technical_skills',
          name: 'technical_skills',
          component: () => import('../views/Technical_skills/Technical_skills.vue')
        },
        {
          path: '/employee',
          name: 'employee',
          component: () => import('../views/Employee/Employee.vue')
        },
        {
          path: '/service_price',
          name: 'service_price',
          component: () => import('../views/ServicePrice/ServicePrice.vue')
        },
        {
          path: '/finans',
          name: 'finans',
          component: () => import('../views/Finans/Finans.vue')
        }
      ],
      beforeEnter:((to, from, next) => {

        let token = localStorage.getItem('token')
      
        if (to.name !== "login" && !token) {
          next({ name: 'login' })
        } else {
          next()
        }
      
      })
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/Registration/Registration.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error/Error.vue')
    }
  ]
})



export default router
