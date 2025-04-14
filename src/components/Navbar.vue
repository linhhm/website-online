<template>
  <nav class="bg-white shadow-lg px-6 md:px-12 py-4 rounded-b-2xl flex items-center justify-between sticky top-0 z-50">
    <!-- Logo -->
    <div class="text-3xl font-extrabold text-indigo-600 tracking-wide select-none">
      <a href="/" class="hover:text-indigo-700 transition">LapXpert</a>
    </div>

    <!-- Menu -->
    <ul class="hidden md:flex gap-8 text-slate-700 font-medium text-base">
      <li><a href="/" class="hover:text-indigo-600 transition">Trang chủ</a></li>
      <li><a href="/SanPham" class="hover:text-indigo-600 transition">Sản phẩm</a></li>
      <li><a href="#" class="hover:text-indigo-600 transition">Sự kiện</a></li>
      <li><a href="#" class="hover:text-indigo-600 transition">Voucher</a></li>
      <li><a href="#" class="hover:text-indigo-600 transition">Hỗ trợ</a></li>
    </ul>

    <!-- Buttons -->
    <div class="flex items-center gap-3">
      <button
        class="hidden md:inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-600 transition text-sm font-semibold"
      >
        <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
      </button>
      <button
        class="hidden md:inline-flex items-center gap-2 border border-indigo-500 text-indigo-500 px-4 py-2 rounded-xl hover:bg-indigo-50 transition text-sm font-semibold"
      >
        <i class="fa-regular fa-user"></i> Đăng ký
      </button>

      <!-- Mobile menu icon -->
      <button class="md:hidden text-indigo-600 text-2xl focus:outline-none">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
