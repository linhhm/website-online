<template>
  <div id="slideshow" class="min-h-screen bg-blue-50">
    <Slideshow />
  </div>
  <div id="danhMucSP" class="min-h-screen">
    <DanhMucSP />
  </div>
  <div id="phieuGiamGia" class="min-h-screen">
    <PhieuGiamGia />
  </div>
  <div id="dotGiamGia" class="min-h-screen">
    <DotGiamGia />
  </div>
  <div id="hoTro" class="min-h-screen">
    <HoTro />
  </div>
</template>

<script>
import Slideshow from "../components/Slideshow.vue";
import DanhMucSP from "../components/DanhMucSP.vue";
import PhieuGiamGia from "../components/PhieuGiamGia.vue";
import DotGiamGia from "../components/DotGiamGia.vue";
import HoTro from "../components/HoTro.vue";

export default {
  components: {
    Slideshow,
    DanhMucSP,
    PhieuGiamGia,
    DotGiamGia,
    HoTro
  }
};
</script>
