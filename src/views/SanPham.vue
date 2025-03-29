<template>
    <div class="p-8 bg-gray-100 min-h-screen">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Tất cả sản phẩm</h1>

        <!-- Bộ lọc -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
                <label class="block font-medium mb-2">Phân loại</label>
                <select v-model="filters.category" class="w-full border border-gray-300 rounded px-4 py-2">
                    <option value="">Tất cả</option>
                    <option value="gaming">Laptop Gaming</option>
                    <option value="office">Laptop Văn phòng</option>
                    <option value="macbook">Macbook</option>
                </select>
            </div>
            <div>
                <label class="block font-medium mb-2">Hãng</label>
                <select v-model="filters.brand" class="w-full border border-gray-300 rounded px-4 py-2">
                    <option value="">Tất cả</option>
                    <option value="asus">Asus</option>
                    <option value="dell">Dell</option>
                    <option value="mac">Apple</option>
                    <option value="msi">MSI</option>
                </select>
            </div>
            <div>
                <label class="block font-medium mb-2">Khoảng giá (VND)</label>
                <div class="flex gap-2 items-center">
                    <input type="range" v-model="filters.priceMin" min="0" max="60000000" step="1000000" class="flex-1">
                    <span class="text-gray-700">≥ {{ formatPrice(filters.priceMin) }}</span>
                </div>
                <div class="flex gap-2 items-center mt-2">
                    <input type="range" v-model="filters.priceMax" min="0" max="60000000" step="1000000" class="flex-1">
                    <span class="text-gray-700">≤ {{ formatPrice(filters.priceMax) }}</span>
                </div>
            </div>
            <div>
                <button @click="resetFilters" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 flex items-center justify-center text-sm gap-2">
                    <i class="fa-solid fa-trash"></i> Xóa lọc
                </button>
            </div>
        </div>

        <!-- Danh sách sản phẩm -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="sp in paginatedProducts" :key="sp.id"
                class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
                <div>
                    <img :src="sp.image" alt="" class="w-full h-40 object-contain mb-4 rounded-lg transition-transform hover:scale-105" />
                    <h2 class="text-lg font-semibold">{{ sp.name }}</h2>
                    <p class="text-gray-600">{{ sp.brand }} - {{ sp.category }}</p>
                    <p class="text-blue-500 font-bold mb-3">{{ formatPrice(sp.price) }}</p>
                </div>
                <div class="flex gap-2 mt-auto">
                    <button @click="muaNgay(sp)"
                        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm">
                        Mua ngay
                    </button>
                    <button @click="themVaoGio(sp)"
                        class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-1">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Giỏ
                    </button>
                </div>
            </div>
        </div>

        <!-- Phân trang -->
        <div class="flex justify-center mt-8 gap-2">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">←</button>
            <span class="px-4 py-2 font-bold text-black bg-white rounded">{{ currentPage }} / {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">→</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 8,
            filters: { priceMin: 0, priceMax: 60000000, category: "", brand: "" },
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
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.products.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        }
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        formatPrice(price) {
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
        },
        resetFilters() {
            this.filters = { category: "", brand: "", priceMin: 0, priceMax: 60000000 };
            this.currentPage = 1;
        },
        muaNgay(sp) { alert(`Mua ngay: ${sp.name}`); },
        themVaoGio(sp) { alert(`Đã thêm vào giỏ: ${sp.name}`); }
    }
};
</script>
