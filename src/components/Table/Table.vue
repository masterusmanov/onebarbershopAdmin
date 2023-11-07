<template>
    
<div class="tables relative overflow-x-auto">
    <table class="w-full text-sm text-left text-black dark:text-gray-400">
        <thead class="text-md font-bold uppercase text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Пользователи
                </th>
                <th scope="col" class="px-6 py-3">
                    Номер телефона
                </th>
                <th scope="col" class="px-6 py-3">
                    Электронная почта
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(el, index) in orderData" :key="el.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                   {{ ++index }} 
                </th>
                <td class="px-6 py-4">
                    {{el.firstName}} {{el.lastName}}
                </td>
                <td class="px-6 py-4">
                    {{ el.phone }}
                </td>
                <td class="px-6 py-4">
                    {{ el.email }}
                </td>
                <td class="px-6 py-4">
                    {{ el.country }}, {{ el.city }}, {{ el.region }}, {{ el.address }}
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>
  
<script setup>
    import { onMounted, ref } from "vue";
    import axios from 'axios';
    
    const orderData = ref('')

    onMounted(async () => {
        const token = localStorage.getItem('token')

        const config = {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get("http://114.29.237.91:8081/api/v1/order/get-all", config);
            orderData.value = response.data
            console.log(orderData.value);
        } catch (error) {
                console.error('Error fetching user data:', error);
        }
    });
</script>
  
  <style lang="scss" scoped>
    @media (max-width: 767px) {
        .tables{
            display: none;
        }    
    }
</style>
  