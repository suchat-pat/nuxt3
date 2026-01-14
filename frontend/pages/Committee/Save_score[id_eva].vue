<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_commit === 'n'" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="mt-2 pa-2">
                        <p>ชื่อ - นามสกุล : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-card class="pa-2">
                                <v-row v-for="(indicate,index2) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        <p>
                                            {{ index1+1 }}.{{ index2+1 }} {{ indicate.name_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*4 }} รายละเอียด : {{ indicate.detail_indicate }}
                                        </p>
                                        <p v-if="indicate.detail_eva">คำอธบายเพิ่มเติม : {{ indicate.detail_eva }}</p>
                                        <v-btn v-if="indicate.file_eva" color="success" @click="viweFile(indicate.file_eva)" class="small">ดูไฟล์</v-btn>
                                        <v-select v-model="indicate.score" label="ใส่คะแนนประเมิน 1-4" :items="[1,2,3,4]"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="mt-4">
                        <label for="">ข้อเสนอแนะ</label>
                        <v-textarea v-model="detail_commit" label="..." rows="2" ></v-textarea>
                    </div>
                    <div class="mt-6 text-center">
                        <v-btn type="submit" color="blue">บันทึกคะแนน</v-btn><br><br>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_commit === 'y'" type="success">คุณกรอกแบบประเมินแล้ว</v-alert>
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
const detail_commit = ref('')
const id_eva = useRoute().params.id_eva

const viweFile = (filename:string) =>{
    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,"__blank")
} 

const fetchUser = async () =>{
    try{
        const res = await axios.get(`${eva}/save_score/user/${id_eva}`,{headers:{Authorization: `Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error("Error GET User",err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`${eva}/save_score/indicate/${id_eva}`,{headers:{Authorization: `Bearer ${token}`}})
        topics.value = res.data
    }catch(err){
        console.error("Error GET Indicate",err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})

const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i:any) =>{
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
            }
        })
    )
    if(allScore.some((s) => !s.score)){
        alert('กรุณากรอกคะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    formData.append('detail_commit',detail_commit.value)
    try{
        await axios.post(`${eva}/save_score/savescore/${id_eva}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('ประเมินสำเร็จ')
        await Promise.all([fetchTopic(),fetchUser()])
    }catch(err){
        console.error("Error POST Score",err)
    }
}
</script>

<style scoped>

</style>