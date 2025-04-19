<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Giỏ Hàng</h1>
  
      <!-- Kiểm tra nếu giỏ hàng trống -->
      <div v-if="cartItems.length === 0" class="text-center text-lg text-gray-500">
        <p>Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.</p>
      </div>
  
      <!-- Danh sách sản phẩm trong giỏ hàng -->
      <div v-else>
        <div class="bg-white p-4 rounded-lg shadow-lg mb-6">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div class="font-semibold text-indigo-600">
              <input 
                type="checkbox" 
                v-model="selectAll"
                @change="toggleSelectAll"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
              Chọn tất cả
            </div>
            <div class="font-semibold text-indigo-600">Sản phẩm</div>
            <div class="font-semibold text-indigo-600">Giá</div>
            <div class="font-semibold text-indigo-600">Số lượng</div>
            <div class="font-semibold text-indigo-600">Tổng</div>
            <div class="font-semibold text-indigo-600">Hành động</div>
          </div>
          <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-t pt-4">
            <!-- Checkbox chọn sản phẩm -->
            <div>
              <input
                type="checkbox"
                v-model="selectedItems"
                :value="item.id"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
            </div>
            <!-- Tên sản phẩm -->
            <div class="flex items-center gap-4">
              <img :src="item.image" alt="product image" class="w-16 h-16 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-110" />
              <span>{{ item.name }}</span>
            </div>
            <!-- Giá sản phẩm -->
            <div>{{ formatPrice(item.price) }}</div>
            <!-- Số lượng -->
            <div class="flex items-center gap-2">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                :disabled="item.quantity <= 1"
              >
                <span class="text-xl">-</span>
              </button>
              <span>{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
              >
                <span class="text-xl">+</span>
              </button>
            </div>
            <!-- Tổng tiền cho sản phẩm -->
            <div>{{ formatPrice(item.price * item.quantity) }}</div>
            <!-- Hành động xóa sản phẩm -->
            <div class="flex justify-center">
              <button
                @click="removeItem(item.id)"
                class="text-red-500 hover:text-red-700 transition"
              >
                <!-- Biểu tượng xóa -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Tổng tiền và thanh toán -->
        <div class="bg-indigo-100 p-4 rounded-lg shadow-lg">
          <div class="flex justify-between text-lg font-semibold text-indigo-700">
            <span>Tổng cộng:</span>
            <span>{{ formatPrice(totalAmount) }}</span>
          </div>
          <div class="flex justify-between mt-4">
            <button
              @click="clearCart"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Xóa Giỏ Hàng
            </button>
            <button
              @click="proceedToCheckout"
              class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          { id: 1, name: 'Sản phẩm A', price: 100000, quantity: 2, image: 'https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg' },
          { id: 2, name: 'Sản phẩm B', price: 150000, quantity: 1, image: 'https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg' },
          { id: 3, name: 'Sản phẩm C', price: 150000, quantity: 1, image: 'https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg' },
        ],
        selectedItems: [],
        selectAll: false,
      };
    },
    computed: {
      totalAmount() {
        if (this.selectedItems.length === 0) {
          return 0;
        }
        return this.cartItems
          .filter(item => this.selectedItems.includes(item.id))
          .reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    },
    methods: {
      updateQuantity(productId, newQuantity) {
        const product = this.cartItems.find(item => item.id === productId);
        if (product) {
          product.quantity = Math.max(1, newQuantity);
        }
      },
      removeItem(productId) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.selectedItems = this.selectedItems.filter(id => id !== productId);
      },
      formatPrice(price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      },
      clearCart() {
        this.cartItems = [];
        this.selectedItems = [];
      },
      proceedToCheckout() {
        alert('Đang chuyển đến trang thanh toán...');
      },
      toggleSelectAll() {
        if (this.selectAll) {
          this.selectedItems = this.cartItems.map(item => item.id);
        } else {
          this.selectedItems = [];
        }
      },
    },
  };
  </script>
  