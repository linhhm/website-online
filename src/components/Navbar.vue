<template>
  <nav class="bg-white shadow-lg px-8 py-4 rounded-b-2xl flex justify-between items-center">
    <!-- Logo -->
    <div class="text-3xl font-extrabold text-blue-500 tracking-wide">
      <a href="#">LapXpert</a>
    </div>

    <!-- Menu -->
    <ul class="flex gap-8 text-gray-700 font-medium text-lg">
      <li><router-link to="#/" class="hover:text-blue-500 transition">Trang chủ</router-link></li>
      <li><router-link to="#/danhMucSP" class="hover:text-blue-500 transition">Sản phẩm</router-link></li>
      <li><router-link to="#/dotGiamGia" class="hover:text-blue-500 transition">Sự kiện</router-link></li>
      <li><router-link to="#/phieuGiamGia" class="hover:text-blue-500 transition">Voucher</router-link></li>
      <li><router-link to="#/hoTro" class="hover:text-blue-500 transition">Hỗ trợ</router-link></li>
    </ul>
    <!-- Buttons -->
    <div class="flex items-center gap-4">
      <button class="bg-blue-500 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-600 transition font-semibold">
        Đăng nhập
      </button>
      <button
        class="border border-blue-500 text-blue-500 px-5 py-2 rounded-xl hover:bg-blue-50 transition font-semibold">
        Đăng ký
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
