import Vue from 'vue'
import VueRouter from 'vue-router'
import SubmitForm from '../components/form/SubmitForm'
import Home from '../components/main/Home'
import Detail from '../components/form/DetailsForm'
import Login from '../components/auth/LoginForm'
import Register from '../components/auth/RegisterForm'
import PersonalProfile from '../components/user/PersonalProfile'
import Users from '../components/main/Users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/submit',
    name: 'Submit',
    component: SubmitForm
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Detail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/personal_profile',
    name: 'PersonalProfile',
    component: PersonalProfile
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
