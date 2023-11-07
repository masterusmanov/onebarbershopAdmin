<template>
    <div class="w-full flex flex-col  gap-10 lg:flex lg:flex-row items-center justify-start">
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-500 w-full lg:w-[50%] cursor-pointer">
        <div class="p-4 flex items-center">
          <div class="w-12 h-12 p-3 rounded-full bg-orange-500 mr-4">
            <i class="bx bx-group text-white text-[25px] flex items-center justify-center"></i>
          </div>
          <div>
            <p class="mb-2 text-lg font-medium text-white">Все заказы</p>
            <p class="text-2xl font-bold text-white">{{ userLength }}</p>
          </div>
        </div>
      </div>
  
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-500 w-full lg:w-[50%] cursor-pointer">
        <div class="p-4 flex items-center">
          <div
            class="w-12 h-12 p-3 rounded-full bg-green-500 mr-4"
          >
            <i
              class="bx bx-box text-white text-[23px] flex items-center justify-center"
            ></i>
          </div>
          <div>
            <p class="mb-2 text-lg font-medium text-white">
              Все продукты
            </p>
            <p class="text-2xl font-bold text-white">{{ product }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { onMounted, ref } from "vue";
    import axios from 'axios';

    const userLength = ref(0);
    const product = ref(0);

    onMounted(async () => {
      const token = localStorage.getItem('token')

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.get("http://114.29.237.91:8081/api/v1/order/get-all", config);
          userLength.value = response.data.length;
          console.log(userLength.value);
          const products = await axios.get("http://114.29.237.91:8081/api/v1/product/all", config);
          product.value = products.data.length;
          console.log(product);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    });
  </script>
  
  <style lang="scss" scoped>
</style>
  