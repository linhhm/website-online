<template>
  <div class="relative w-full h-[300px] overflow-hidden bg-blue-50 rounded-2xl shadow-lg">
    <!-- Slideshow -->
    <div 
      v-for="(slide, index) in slides" 
      :key="index" 
      class="absolute inset-0 transition-opacity duration-1000 flex justify-center items-center"
      :class="{'opacity-100': index === currentSlide, 'opacity-0': index !== currentSlide}"
    >
      <img :src="slide.image" alt="Slide Image" class="w-auto max-h-[240px] object-contain rounded-xl shadow-md">
    </div>

    <!-- Overlay & Text -->
    <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-gradient-to-r from-black/50 via-black/30 to-transparent p-6 rounded-2xl">
      <h1 class="text-4xl font-extrabold mb-3 text-blue-400 drop-shadow-lg">
        Chào mừng tới <span class="text-white">LapXpert</span>
      </h1>
      <p class="text-lg font-medium">Chúng tôi mang đến những trải nghiệm tuyệt vời nhất.</p>
    </div>

    <!-- Điều hướng slide -->
    <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-100 transition">
      <i class="fa-solid fa-chevron-left text-blue-500 text-xl"></i>
    </button>
    <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-100 transition">
      <i class="fa-solid fa-chevron-right text-blue-500 text-xl"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        { image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/334689/gigabyte-g5-mf5-rc555-i5-9rc55mf5feiaa1vn0c0-2-638766105805495419-750x500.jpg" },
        { image: "https://cdn.tgdd.vn/Products/Images/44/323920/hp-15-fd0234tu-i5-9q969pa-1-1-750x500.jpg" },
        { image: "https://cdn.tgdd.vn/Products/Images/44/313333/lenovo-ideapad-slim-3-15iah8-i5-83er00evn-glr-2-750x500.jpg" }
      ],
      currentSlide: 0
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    }
  },
  mounted() {
    setInterval(this.nextSlide, 2000);
  }
};
</script>

<style scoped>
.transition-opacity {
  transition: opacity 1s ease-in-out;
}
</style>
