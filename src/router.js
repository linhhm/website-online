import { createRouter, createWebHistory } from 'vue-router';
import home from './views/Home.vue';
import SanPham from './views/SanPham.vue';
import Slideshow from "../src/components/Slideshow.vue";
import DanhMucSP from "../src/components/DanhMucSP.vue";
import PhieuGiamGia from "../src/components/PhieuGiamGia.vue";
import DotGiamGia from "../src/components/DotGiamGia.vue";
import HoTro from "../src/components/HoTro.vue";

const routes = [
  { path: '/', component: home },
  { path: '/slideshow', component: Slideshow },
  { path: '/danhMucSP', component: DanhMucSP },
  { path: '/phieuGiamGia', component: PhieuGiamGia },
  { path: '/dotGiamGia', component: DotGiamGia },
  { path: '/hoTro', component: HoTro },
  { path: '/sanPham', component: SanPham },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
