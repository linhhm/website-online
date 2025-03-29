<template>
  <nav class="bg-white shadow-lg px-8 py-4 rounded-b-2xl flex justify-between items-center">
    <!-- Logo -->
    <div class="text-3xl font-extrabold text-blue-500 tracking-wide">
      <a href="#">LapXpert</a>
    </div>

    <!-- Menu -->
    <ul class="flex gap-8 text-gray-700 font-medium text-lg">
      <li><a href="/" class="hover:text-blue-500 transition">Trang chủ</a></li>
      <li><a href="#danhMucSP" class="hover:text-blue-500 transition">Sản phẩm</a></li>
      <li><a href="#dotGiamGia" class="hover:text-blue-500 transition">Sự kiện</a></li>
      <li><a href="#phieuGiamGia" class="hover:text-blue-500 transition">Voucher</a></li>
      <li><a href="#hoTro" class="hover:text-blue-500 transition">Hỗ trợ</a></li>
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
