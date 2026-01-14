<template>
    <v-container fluid class="py-10">
                <v-card >
                    <v-sheet color="" class="pa-4">
                        <h1 class="text-h5 font-weight-bold text-maroon">จัดการแบบประเมิน</h1>
                    </v-sheet>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">ชื่อ</th>
                                    <th class="text-center border">นามสกุล</th>
                                    <th class="text-center border">วันที่ออกแบบประเมิน</th>
                                    <!-- <th class="text-center border">รอบการประเมิน</th> -->
                                    <!-- <th class="text-center border">สถานะการประเมิน</th> -->
                                    <th class="text-center border">ตรวจสอบคะแนน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ items.first_name }}</td>
                                    <td class="text-center border">{{ items.last_name }}</td>
                                    <td class="text-center border">{{ items.day_eva }}</td>
                                    <!-- <td class="text-center border">รอบการประเมินที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td> -->
                                    <!-- <td class="text-center border">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการเมิน' : 'ประเมินเสร็จสิ้น' }}</td> -->
                                    <td class="text-center border">
                                        <v-btn class="text-white" size="small" color="blue" @click="go(items.id_eva)">ตรวจสอบคะแนน</v-btn>
                                    </td>
                                </tr>
                                <tr v-if="result.length === 0">
                                    <td class="text-center border opacity-60" colspan="10">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {api,commit} from '../../API/api'

const token = process.client ? localStorage.getItem('token') : null

const result = ref([])

const fetch = async () => {
    try{
        const res = await axios.get(`${commit}/show_eva/user`, {headers: { Authorization: `Bearer ${token}` }})
        result.value = res.data
    }catch(err){
        console.error("Error Fetching",err)
    }

}

const go = (id_eva:number) => {
    navigateTo({ path: `/Committee/Detail_eva${id_eva}` })
}

onMounted(fetch)
</script>

<style scoped>
.text-maroon{
    color: #7d0c14;
}
</style>