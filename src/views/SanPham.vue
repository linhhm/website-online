<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wide">Tất cả sản phẩm</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Sidebar lọc -->
      <aside class="bg-white p-6 rounded-2xl shadow-xl md:col-span-1 space-y-6 border border-gray-200">
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Phân loại</label>
          <multiselect v-model="filters.category" :options="categoryOptions" :allow-empty="true"
            placeholder="Chọn loại" class="w-full" label="label" track-by="value" />
        </div>

        <div>
          <label class="block font-semibold text-gray-700 mb-2">Hãng</label>
          <multiselect v-model="filters.brand" :options="brandOptions" :allow-empty="true"
            placeholder="Chọn hãng" class="w-full" label="label" track-by="value" />
        </div>

        <div>
          <label class="block font-semibold text-gray-700 mb-2">Khoảng giá (VND)</label>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <input type="range" v-model="filters.priceMin" min="0" max="60000000" step="1000000" class="flex-1 accent-blue-500" />
              <span class="text-sm text-gray-700 font-medium">≥ {{ formatPrice(filters.priceMin) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <input type="range" v-model="filters.priceMax" min="0" max="60000000" step="1000000" class="flex-1 accent-blue-500" />
              <span class="text-sm text-gray-700 font-medium">≤ {{ formatPrice(filters.priceMax) }}</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block font-semibold text-gray-700 mb-2">Tìm kiếm theo tên</label>
          <input v-model="filters.search" type="text" placeholder="Tìm sản phẩm" class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div class="pt-2">
          <button @click="resetFilters" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full flex items-center justify-center gap-2 text-sm font-semibold">
            <i class="fa-solid fa-trash"></i> Xóa bộ lọc
          </button>
        </div>
      </aside>

      <!-- Danh sách sản phẩm -->
      <section class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="sp in paginatedProducts" :key="sp.id"
          class="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100">
          <div>
            <router-link :to="`/chiTietSanPham/${sp.id}`">
            <img :src="sp.image" alt="" class="w-full h-40 object-contain mb-4 rounded-xl transition-transform hover:scale-105" /></router-link>
            <h2 class="text-lg font-bold text-gray-800 line-clamp-2">{{ sp.name }}</h2>
            <p class="text-gray-500 text-sm mb-1">{{ sp.brand }} - {{ sp.category }}</p>
            <p class="text-blue-600 font-bold text-lg mb-3">{{ formatPrice(sp.price) }}</p>
          </div>
          <div class="flex gap-2 mt-auto">
            <button @click="muaNgay(sp)" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">Mua ngay</button>
            <button @click="themVaoGio(sp)"
              class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-1">
              <i class="fa-solid fa-cart-shopping"></i> Giỏ
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Phân trang -->
    <div class="flex justify-center mt-12 gap-2">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium">←</button>
      <span class="px-4 py-2 font-bold text-black bg-white rounded-xl border border-gray-300">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium">→</button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: { Multiselect },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
      filters: { priceMin: 0, priceMax: 60000000, category: null, brand: null, search: "" },
      categoryOptions: [
        { label: "Laptop Gaming", value: "gaming" },
        { label: "Laptop Văn phòng", value: "office" },
        { label: "Macbook", value: "macbook" }
      ],
      brandOptions: [
        { label: "Asus", value: "asus" },
        { label: "Dell", value: "dell" },
        { label: "Apple", value: "mac" },
        { label: "MSI", value: "msi" }
      ],
      products: [
        { id: 1, name: "Asus ROG Strix G15", brand: "asus", category: "gaming", price: 32000000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
        { id: 2, name: "Dell XPS 15", brand: "dell", category: "office", price: 45000000, image: "https://cdn.tgdd.vn/Products/Images/44/321192/dell-inspiron-15-3520-i5-25p231-2-2-750x500.jpg" },
        { id: 3, name: "MacBook Pro M2 16 inch", brand: "mac", category: "macbook", price: 60000000, image: "https://cdn.tgdd.vn/Products/Images/44/326861/msi-gf63-thin-12ve-i5-460vn-1-750x500.jpg" },
        { id: 4, name: "MSI GF63 Thin", brand: "msi", category: "gaming", price: 25000000, image: "https://cdn.tgdd.vn/Products/Images/44/326861/msi-gf63-thin-12ve-i5-460vn-1-750x500.jpg" },
        { id: 5, name: "Asus ZenBook 14 OLED", brand: "asus", category: "office", price: 29000000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
        { id: 6, name: "Asus ROG Strix G15", brand: "asus", category: "gaming", price: 32000000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
        { id: 7, name: "Dell XPS 15", brand: "dell", category: "office", price: 45000000, image: "https://cdn.tgdd.vn/Products/Images/44/321192/dell-inspiron-15-3520-i5-25p231-2-2-750x500.jpg" },
        { id: 8, name: "MacBook Pro M2 16 inch", brand: "mac", category: "macbook", price: 60000000, image: "https://cdn.tgdd.vn/Products/Images/44/326861/msi-gf63-thin-12ve-i5-460vn-1-750x500.jpg" },
        { id: 9, name: "MSI GF63 Thin", brand: "msi", category: "gaming", price: 25000000, image: "https://cdn.tgdd.vn/Products/Images/44/326861/msi-gf63-thin-12ve-i5-460vn-1-750x500.jpg" },
        { id: 10, name: "Asus ZenBook 14 OLED", brand: "asus", category: "office", price: 29000000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
        { id: 11, name: "Asus ROG Strix G15", brand: "asus", category: "gaming", price: 32000000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
        { id: 12, name: "Dell XPS 15", brand: "dell", category: "office", price: 45000000, image: "https://cdn.tgdd.vn/Products/Images/44/321192/dell-inspiron-15-3520-i5-25p231-2-2-750x500.jpg" },
        { id: 13, name: "MacBook Pro M2 16 inch", brand: "mac", category: "macbook", price: 60000000, image: "https://cdn.tgdd.vn/Products/Images/44/326861/msi-gf63-thin-12ve-i5-460vn-1-750x500.jpg" },
        { id: 14, name: "MSI GF63 Thin", brand: "msi", category: "gaming", price: 25000000, image: "https://cdn.tgdd.vn/Products/Images/44/326861/msi-gf63-thin-12ve-i5-460vn-1-750x500.jpg" },
        { id: 15, name: "Asus ZenBook 14 OLED", brand: "asus", category: "office", price: 29000000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
      ]
    };
  },
  computed: {
  filteredProducts() {
    return this.products.filter(sp => {
      const matchCategory = !this.filters.category || sp.category === this.filters.category.value;
      const matchBrand = !this.filters.brand || sp.brand === this.filters.brand.value;
      const matchPrice = sp.price >= this.filters.priceMin && sp.price <= this.filters.priceMax;
      const matchSearch = sp.name.toLowerCase().includes(this.filters.search.toLowerCase());
      return matchCategory && matchBrand && matchPrice && matchSearch;
    });
  },
  paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  },
  totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1;
  }
},
methods: {
  formatPrice(value) {
    return value.toLocaleString('vi-VN') + ' ₫';
  },
  resetFilters() {
    this.filters = {
      priceMin: 0,
      priceMax: 60000000,
      category: null,
      brand: null,
      search: ""
    };
    this.currentPage = 1;
  },
  changePage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  },
  muaNgay(sp) {
    // Xử lý logic mua ngay ở đây
    alert(`Mua ngay: ${sp.name}`);
  },
  themVaoGio(sp) {
    // Xử lý logic thêm vào giỏ hàng ở đây
    alert(`Đã thêm ${sp.name} vào giỏ hàng`);
  }
}
}
</script>
