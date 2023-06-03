import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import TestView from "../views/TestView.vue";
import ChooseDoctorView from "../views/ChooseDoctorView.vue";
import PatientsInfoView from "../views/PatientsInfo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
      props: true,
    },
    {
      path: "/choosedoctor",
      name: "choosedoctor",
      component: ChooseDoctorView,
      props: true,
    },
    {
      path: "/patientsinfo",
      name: "patientsInfo",
      component: PatientsInfoView,
      props: true,
    },
  ],
});

export default router;
