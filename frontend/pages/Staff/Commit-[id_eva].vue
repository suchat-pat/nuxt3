<template>
    <v-container fluid class="py-10">
                <v-card >
                    <v-sheet color="" class="pa-4 text-center">
                        <h1 class="text-h5 font-weight-bold text-maroon">เพิ่มกรรมการ</h1>
                        <p class="text-center">ชื่อผู้รับการประเมิน : {{ header.first_name }} {{ header.first_name }}</p>
                        <p class="text-center">รอบการประเมิน : รอบการประเมิน {{ header.round_eva }} ปี {{ header.year_sys }}</p>
                    </v-sheet>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <template v-for="(c,index) in List" :key="index">
                                    <v-col cols="12" md="6">
                                        <v-select v-model="c.id_member" :label="`กรรมการคนที่ ${index+1}`" :items="MEMBER(index).map(m => ({title:m.fullname_commit,value:m.id_member}))"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="c.role" :label="`ตำแหน่งกรรมการที่ ${index+1}`" :items="ROLE(index)"></v-select>
                                    </v-col>
                                </template>
                                <v-btn type="submit" block color="#7d0c14">บันทึก</v-btn>
                            </v-row>
                        </v-form>

                        <br>

                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">กรรมการ</th>
                                    <th class="text-center border">ตำแหน่ง</th>
                                    <th class="text-center border">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in List" :key="items.id_commit">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ nameOf(items.id_member) }}</td>
                                    <td class="text-center border">{{ items.role }}</td>
                                    <td class="text-center border">
                                        <!-- <v-btn class="text-white" size="small" color="warning" @click="Edit(items)">แก้ไข</v-btn>&nbsp; -->
                                        <v-btn class="text-white" size="small" color="error" @click="del(items.id_commit)">ลบ</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {api,staff} from '../../API/api'

const id_eva = useRoute().params.id_eva
const token = process.client ? localStorage.getItem('token') : null

const header = ref([])
const people = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
])

const nameMap = computed( () => Object.fromEntries(people.value.map( p => [p.id_member,p.fullname_commit] )) )
const nameOf = (id:any) => nameMap[id]

const MEMBER = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null) )
    return people.value.filter( (r) => !picked.includesr(r) )
}

const ROLE = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.role : null) )
    return role.filter( (r) => !picked.includes(r) )
}

const fetch = async () => {
    try{
        // const r = await axios.get(`${staff}/topic`, {headers: { Authorization: `Bearer ${token}` }})
        // topic.value = r.data
        const h = await axios.get(`${staff}/commit/header/${id_eva}`, {headers: { Authorization: `Bearer ${token}` }})
        header.value = h.data[0]
    }catch(err){
        console.error("Error Fetching",err)
    }

}

const saveMember = async () =>{
    try{
        // form.value.id_eva
        // ? await axios.put(`${staff}/eva/${form.value.id_eva}`,form.value,{headers : {Authorization : `Bearer ${token}`}})
        // : await axios.post(`${staff}/eva`,form.value,{headers : {Authorization: `Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
        // await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_eva:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/eva/${id_eva}`,{headers: {Authorization : `Bearer ${token}`}})
        await fetch()
        await reset()
    }catch(err){
        console.error('Error Delete',err)
    }
}

const go = (id_eva:number) => {
    navigateTo({path:`Eva_commit-${id_eva}`})
}

onMounted(fetch)
</script>

<style scoped>
.text-maroon{
    color: #7d0c14;
}
</style>