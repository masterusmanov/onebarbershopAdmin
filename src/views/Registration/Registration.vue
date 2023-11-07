<template>
    <section class="">
      <div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-gray-600 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Регистрация
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div class="flex justify-between items-center">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-white"
                    >Имя</label>
                  <input
                    v-model="input.name"
                    type="text"
                    name="name"
                    id="name"
                    class="border sm:text-sm rounded-lg outline-none block w-full p-2.5 border-white placeholder-gray-400"
                    placeholder="Пожалуйста, введите полное имя"
                    required=""/>
                </div>
                <div>                
                  <label for="phone" class="block mb-2 text-sm font-medium text-white">Номер телефона</label>
                  <input
                    v-model="input.phone"
                    type="text"
                    name="phone"
                    id="phone"
                    class="border sm:text-sm rounded-lg outline-none block w-full p-2.5 border-white placeholder-gray-400"
                    placeholder="Пожалуйста, введите свой номер телефона"
                    required=""/>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-white"
                    >Пароль</label
                  >
                  <input
                    v-model="input.password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="border outline-none sm:text-sm rounded-lg block w-full p-2.5 border-white placeholder-gray-400 "
                    required=""/>
                </div>               
              </div>
              <div class="flex items-center justify-end">
                <a href="/login" class="text-sm font-bold text-[#FF8C00] mr-5 hover:underline"
                  >авторизоваться</a>
              </div>
              <button  @click="addContact($event)" type="submit" class="w-full bg-white border border-white hover:bg-blue-600 hover:text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center">
                отправлять
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
    import {reactive} from 'vue'
    import { useRegistration } from '../../service/registration';
    import {useRouter} from 'vue-router';

    const router = useRouter();

    const input = reactive({
      name: "",
      phone: "",
      password: ""
    })

      const addContact=(event)=>{
        event.preventDefault();
        const contact = {
          name: input.name,
          phone: input.phone,
          password: input.password,
        }

        useRegistration.create(contact).then((res)=>{
          console.log(res);  
          if(res.status == 201){
              input.name = ''
              input.phone = ''
              input.password = ''
            }
            router.push({name: 'login'})
        }).catch((error)=>{
            if(error.message == 'Request failed with status code 401' || error.message == 'token expired' || error.message == 'token not found'){
                router.push({name: 'registration'})
            }
        })
    }
  </script>
  
  <style lang="scss" scoped></style>
  