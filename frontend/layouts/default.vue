<template>
    <v-app>
        <v-app-bar color="#7d0c14" class="py-2">
            <v-app-bar-nav-icon @click="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
            <v-toolbar-title>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</v-toolbar-title>
            <p>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} <br> {{ user.role }}</p>&nbsp;&nbsp;
            <v-btn @click="logout" class="bg-white">ออกจากระบบ</v-btn>&nbsp;&nbsp;
        </v-app-bar>
        <v-navigation-drawer color="#404040" v-model="drawer" app :temporary="isMobile" :permanent="!isMobile">
            <v-list>
                <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container fluid>
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useDisplay } from 'vuetify';
import {api} from '../API/api'

const token = process.client ? localStorage.getItem('token') : null

const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref({})

const roles = [
    //staff
    {title:'หน้าหลัก',to:'/Staff/',role:'ฝ่ายบุคลากร'},
    {title:'จัดการผู้รับการประเมิน',to:'/Staff/ManageEva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการกรรมการประเมิน',to:'/Staff/ManageCommit',role:'ฝ่ายบุคลากร'},
    {title:'จัดการหัวข้อการประเมิน',to:'/Staff/Topic',role:'ฝ่ายบุคลากร'},
    
    //commit
    {title:'รายชื่อผู้รับการประเมิน',to:'/Committee/',role:'กรรมการประเมิน'},
    
    //eva
    {title:'หน้าหลัก',to:'/Evaluatee/',role:'ผู้รับการประเมินผล'},
]
const navitem = computed(() =>
    roles.filter((item) => item.role.includes(user.value.role))
)
const logout = async () =>{
    if(!confirm('ต้องการออกจากระบบใช่หรือไม่'))return
    localStorage.removeItem('token')
    navigateTo('/')
}

const fetchUser = async () =>{
    if(!token){
        return await navigateTo('/',{replace: true})
    }
    try{
        const res = await axios.get(`${api}/profile`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
        console.log("user Value",user.value)
    }catch(err){
        console.error('Error GET User!!',err)
        localStorage.removeItem('token')
        await navigateTo('/',{replace: true})
    }
}
onMounted(fetchUser)
</script>

<style scoped>

</style>