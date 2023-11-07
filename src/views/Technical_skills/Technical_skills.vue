<template>
  
  <div class="p-3">
    <div class="flex justify-between items-center">
            
        <h2 class="uppercase dark:text-white text-gray-900 text-2xl font-bold">Заказы</h2>
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        </div>
    </div>

    <section class=" p-0 sm:p-5 md:p-0 md:py-4 mt-10">

    <!-- ------------------------table-------------------------------------------- -->
    <div class="w-full px-0 lg:p-0">
        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="text-md text-white font-bold uppercase bg-gray-500 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">Пользователи</th>
                            <th scope="col" class="px-6 py-3">Номер телефона / Электронная почта / Почтовый ящик / Адрес</th>
                            <th scope="col" class="px-6 py-3">Продукт</th>
                            <th scope="col" class="px-6 py-3">Удалить / Обновить</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr v-for="el in computedList" :key="el.id" class="border-b dark:border-gray-700">
                            <td class="px-4 py-3">{{el.firstName}} {{ el.lastName }}</td>
                            <td class="px-4 py-3">{{el.phone}}, <br> {{ el.email }}, <br> {{ el.postalCode }}, <br> {{ el.country }}, {{ el.city }}, {{ el.region }}, {{ el.address }}</td>
                            <td v-for="inn in el.products" :key="inn.id" class="text-center text-[11px]"><img :src="inn.mediaUrl" alt="" class="w-[100px] mx-auto"> <br>{{inn.type}}, <br> {{ inn.title }}, <br> {{ inn.price }}</td>
                            <td class="px-4 py-3 text-[20px]">
                                <div  class="bg-white  flex justify-center items-center">
                                    <button @click="showModal(el.id)" >
                                        <div class="w-6 h-6 py-1 rounded-md bg-red-500 mr-4 cursor-pointer">
                                            <i class="bx bx-trash text-white text-[16px] flex items-center justify-center"></i>
                                        </div>
                                    </button>
                                </div>
                            </td>
                        </tr>
                     </tbody>
                </table>
            </div>
            
        </div>
    </div>
    <!-- -------------------------end of table------------------------------------- -->
   
    <Modal v-if="isShowModal" @close="closeModal" >
        <template #header>
            <div class="  flex items-center text-lg text-red-600 font-extrabold ">
                Предупреждение!
            </div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed">
                Вы хотите удалить?
            </p>
            
        </template>
        <template #footer>
            <div class="flex justify-end gap-6">
                <button @click="removeContact" type="button" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Да
                </button>
                <button @click="closeModal" type="button" class="text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 ">
                    Нет
                </button>
            </div>
        </template>                       
    </Modal>
    </section>
  </div>


</template>

<script setup>
import {ref, reactive, computed, onMounted} from 'vue'
import { skillStore } from '../../stores/skillStore';
import { useSkill } from '../../service/skill';
import {useRouter} from 'vue-router'
import { Modal } from 'flowbite-vue'

const isShowModal = ref(false)
function closeModal() {
  isShowModal.value = false
  localStorage.removeItem('delete_id')
}

function showModal(delete_id) {
    localStorage.setItem('delete_id', delete_id)
    isShowModal.value = true
}

const router = useRouter();
const store = skillStore();
const modal = ref(false);
const isUpdate = ref(false);
let computedList = ref([])

const contactInfo = reactive({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    region: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    orderNote: ''
})

const updateList = () => {
    useSkill.list().then((res)=>{
        store.state.list = res.data    
    }).catch((error)=>{
        if(error.message == 'Request failed with status code 401' || error.message == 'token expired' || error.message == 'token not found'){
            router.push({name: 'login'})
        }
        else{
            console.log(error);

        }
        console.log(error.message);
    })
}



const removeContact=()=>{
    const id = localStorage.getItem('delete_id')
    useSkill.remove(id).then((res)=>{
        console.log(res.status);
        if(res.status == 200){
            updateList();
            closeModal()
        }
    }).catch((error)=>{
        console.log(error);
    })
}


computedList = computed(()=> {
    return store.state.list;
})

onMounted(()=>{
    updateList()
})
</script>

<style lang="scss" scoped></style>
