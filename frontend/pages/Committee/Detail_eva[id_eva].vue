<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">คะแนนประเมินตนเอง</h1>
                    <v-card class="mt-2 pa-2">
                        <p>ชื่อ - นามสกุล : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">ไฟล์ที่แนบ</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">คำอธิบาย</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-2 text-center">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-2 text-center"><v-btn v-if="indicate.file_eva" @click="viwe(indicate.file_eva)" color="blue">ดูไฟล์</v-btn><span v-else>-</span></td>
                                    <td class="border pa-2 text-center">{{ indicate.detail_eva || '-' }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.score_member*indicate.point_indicate }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <v-card class="pa-2 text-end mt-4" color="success">คะแนนรวม : {{ totalScore }} คะแนน&nbsp;&nbsp;</v-card>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="info">คุณไม่ได้กรอกแบบประเมิน</v-alert>
                <v-alert v-else type="warning">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {eva} from '../API/api'

const user = ref({})
const topics = ref([])
const token = process.client ? localStorage.getItem('token') : null
const totalScore = ref(0)
const id_eva = useRoute().params.id_eva

const viwe = (filename:string) =>{
    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,'__blank')
}

const fetchUser = async () =>{
    try{
        const res = await axios.get(`${eva}/score_member/user/${id_eva}`,{headers:{Authorization: `Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error("Error GET User",err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`${eva}/score_member/indicate/${id_eva}`,{headers:{Authorization: `Bearer ${token}`}})
        topics.value = res.data
        res.data.forEach(score => score.indicates.forEach((i) => totalScore.value += (i.score_member*i.point_indicate)))
    }catch(err){
        console.error("Error GET Indicate",err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})

</script>

<style scoped>

</style>