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
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">ประธาน</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">กรรมการ</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">เลขา</th>
                                    <th class="border text-black bg-grey pa-2" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-2 text-center">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-2 text-center">{{ scores[indicate.id_indicate]?.a ?? 'รอประธานประเมิน' }}</td>
                                    <td class="border pa-2 text-center">{{ scores[indicate.id_indicate]?.b ?? 'รอกรรมการประเมิน' }}</td>
                                    <td class="border pa-2 text-center">{{ scores[indicate.id_indicate]?.c ?? 'รอเลขาประเมิน' }}</td>
                                    <td class="border pa-2 text-center">
                                        {{ (((scores[indicate.id_indicate]?.a ?? 0)+(scores[indicate.id_indicate]?.b ?? 0)+(scores[indicate.id_indicate]?.c ?? 0))/3).toFixed(2) }}
                                    </td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <v-card class="pa-2 text-end mt-4" color="success">คะแนนรวม : {{ totalScore.toFixed(2) ||  0}} คะแนน&nbsp;&nbsp;</v-card>
                    <div class="mt-4">
                        <v-card class="pa-2">
                            <v-row v-for="(commit,index) in commits" :key="commit.id_commit">
                                <v-col cols="12">{{ index+1 }}.{{ commit.level_commit }} : {{ commit.detail_commit || 'รอการประเมิน' }}</v-col>
                            </v-row>
                        </v-card>
                    </div>
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

const scores = ref([])
const user = ref({})
const topics = ref([])
const token = process.client ? localStorage.getItem('token') : null
const totalScore = ref(0)
const commits = ref([])

const viwe = (filename:string) =>{
    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,'__blank')
}

const fetchUser = async () =>{
    try{
        const res = await axios.get(`${eva}/score_commit/user`,{headers:{Authorization: `Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error("Error GET User",err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`${eva}/score_commit/indicate`,{headers:{Authorization: `Bearer ${token}`}})
        topics.value = res.data
    }catch(err){
        console.error("Error GET Indicate",err)
    }
}

const fetchCommit = async () =>{
    try{
        const res = await axios.get(`${eva}/score_commit/commit`,{headers:{Authorization: `Bearer ${token}`}})
        commits.value = res.data
    }catch(err){
        console.error("Error GET Indicate",err)
    }
}

const fetchScore = async () =>{
    try{
        const res = await axios.get(`${eva}/score_commit/scores`,{headers:{Authorization: `Bearer ${token}`}})
        scores.value = res.data.scores
        totalScore.value = res.data.totalScore
    }catch(err){
        console.error("Error GET Indicate",err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser(),fetchCommit(),fetchScore()])
})

</script>

<style scoped>

</style>