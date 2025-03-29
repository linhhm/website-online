<template>
  <section class="py-12 px-6 bg-gradient-to-b from-blue-100 to-white">
    <!-- Danh mục sản phẩm -->
    <h2 class="text-3xl font-bold text-center text-blue-900 mb-8">Danh mục Laptop</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <router-link v-for="category in categories" :key="category.name" :to="`/category/${category.slug}`"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
        <img :src="category.image" :alt="category.name" class="w-32 object-cover mb-3" />
        <h3 class="text-blue-900 font-semibold text-lg">{{ category.name }}</h3>
      </router-link>
    </div>

    <!-- Sản phẩm bán chạy -->
    <h2 class="text-3xl font-bold text-center text-blue-900 mt-16 mb-6">Sản phẩm bán chạy</h2>
    <SanPhamBanChay :products="bestSellers" />

    <!-- Xem tất cả sản phẩm -->
    <div class="mt-8 text-center">
      <router-link to="/SanPham"
        class="text-blue-600 font-semibold text-lg hover:underline hover:text-blue-800 transition"
      >
        Xem tất cả sản phẩm &rarr;
      </router-link>
    </div>
  </section>
</template>
<script>
import SanPhamBanChay from "./SanPhamBanChay.vue";

export default {
  components: { SanPhamBanChay },
  data() {
    return {
      categories: [
        { name: "Laptop Gaming", slug: "laptop-gaming", image: "https://th.bing.com/th/id/OIP.ohfdjbVpMu0vd-M0HXudGgHaFa?rs=1&pid=ImgDetMain"},
        { name: "Laptop Văn phòng", slug: "laptop-van-phong", image: "https://th.bing.com/th/id/OIP.ohfdjbVpMu0vd-M0HXudGgHaFa?rs=1&pid=ImgDetMain"},
        { name: "Laptop Đồ họa", slug: "laptop-do-hoa", image: "https://th.bing.com/th/id/OIP.ohfdjbVpMu0vd-M0HXudGgHaFa?rs=1&pid=ImgDetMain"},
        { name: "Laptop Học tập", slug: "laptop-hoc-tap", image: "https://th.bing.com/th/id/OIP.ohfdjbVpMu0vd-M0HXudGgHaFa?rs=1&pid=ImgDetMain"}
      ],
      bestSellers: [
        { name: "Asus ROG Strix G15", slug: "asus-rog-strix-g15", originalPrice: 30000000, price: 29990000, image: "https://cdn.mos.cms.futurecdn.net/81689a6fd9fe3d4e20a253aaa33664b3.jpg"},
        { name: "MacBook Air M2", slug: "macbook-air-m2", originalPrice: 30000000, price: 26490000, image: "https://cdn.mos.cms.futurecdn.net/81689a6fd9fe3d4e20a253aaa33664b3.jpg"},
        { name: "Dell XPS 15", slug: "dell-xps-15", originalPrice: 30000000, price: 35990000, image: "https://cdn.mos.cms.futurecdn.net/81689a6fd9fe3d4e20a253aaa33664b3.jpg"},
        { name: "HP Spectre x360", slug: "hp-spectre-x360", originalPrice: 30000000, price: 27990000, image: "https://cdn.mos.cms.futurecdn.net/81689a6fd9fe3d4e20a253aaa33664b3.jpg"},
        { name: "Lenovo ThinkPad X1", slug: "lenovo-thinkpad-x1", originalPrice: 30000000, price: 31490000, image: "https://cdn.mos.cms.futurecdn.net/81689a6fd9fe3d4e20a253aaa33664b3.jpg"},
        { name: "Acer Predator Helios", slug: "acer-predator-helios", originalPrice: 30000000, price: 29990000, image: "https://cdn.mos.cms.futurecdn.net/81689a6fd9fe3d4e20a253aaa33664b3.jpg"}
      ]
    };
  }
};
</script>
