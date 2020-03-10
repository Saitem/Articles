<script>
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';
import { formatDate } from '../../utils/formatDate'

export default {
    name: "Home",
    components: {
        // mdbInput,
        mdbContainer,
        mdbRow,
        mdbCol,
        // mdbBtn
    },

    data() {
        return {
            models: [],
            error: ''
        }
    },

    async created() {
        try {
            const response = await axios.get('http://localhost:5000/models')
            this.models = response.data
        }catch(err) {
            this.error = err
        }
    },

    methods: {
        details(id) {
            this.$router.push({name: 'Details', params: {id: id}})
        },
        
        formatDate(that) {
            return formatDate(new Date(that - 1))
        },

        async deleteModel(id){
            await axios.delete(`http://localhost:5000/models/${id}`)
        },
    },

        computed: { 
            filtering()  {
                return this.models.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        }
}
</script>

<template>
    <mdb-container>
            <mdb-row  class="justify-content-md-center">
                <mdb-col
                    
                    col="6"
                >
                    <mdb-row>

                        <mdb-col
                            v-for="(model, index) in filtering"
                            :key="index" 
                            class="post" 
                            col='12'
                        >
                            <mdb-row>
                                <mdb-col class="creation">
                                    <img class='img_creator' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="">
                                    <b>Creation</b> 
                                        {{ formatDate(new Date(model.createdAt)) }}
                                </mdb-col>
                                <div class="w-100"></div>
                                <mdb-col>
                                    <img 
                                        v-if='model.image != ""' 
                                        :src="`data:image/${'png' || 'jpeg' || 'jpg'};base64,${model.image}`" 
                                        alt=""
                                    >
                                </mdb-col>
                                <div class="w-100"></div>
                                <mdb-col><h5 class="title" @click="details(model._id)">{{ model.title }}</h5></mdb-col>
                                <div class="w-100"></div>
                                <mdb-col><p>{{ model.description }}</p></mdb-col>
                                <!-- <button @click="deleteModel(model._id)">s</button> -->
                            </mdb-row>
                            
                        </mdb-col>
                    </mdb-row>
                </mdb-col>
            </mdb-row>
    </mdb-container>
</template>


<style lang="scss" scoped>
    .post{
        background-color: white;
        border-radius: 1.5px;
        border: 1px solid rgb(207, 207, 207);
        margin-top: 20px;
    }    
    .creation {
        font-size: 13px;
    }
    b{
        font-weight: 500;
    }
    .title{
        font-weight: 600;
    }
    .img_creator{
        width: 14px;
        border-radius: 20px;
        padding-bottom: 5px;
        padding-right: 2px;
    }
        img{
            width: 100%;
        }

</style>