<script>
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';
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
            model: [],
            error: '',
            id: this.$route.params.id
        }
    },

    async created() {
        try {
            const response = await axios.get(`http://localhost:5000/models/${this.id}`)
            this.model = response.data
        }catch(err) {
            this.error = err
        }
    },

    methods: {
         async deleteModel(id){
            await axios.delete(`http://localhost:5000/models/${id}`)
        }
    }

  }
</script>

<template>
    <mdb-container>
            <mdb-row  class="justify-content-md-center">
                <mdb-col col="6">
                    <mdb-row>
                    <mdb-col
                        class="post" 
                        col='12'
                    >
                        <mdb-row>
                            <mdb-col class="creation">
                                <img class='img_creator' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="">
                                <b>Creation</b> 
                                    time
                            </mdb-col>
                            <div class="w-100"></div>
                            <mdb-col><h5 class="title">{{ model.title }}</h5></mdb-col>
                            <div class="w-100"></div>
                            <mdb-col><p>{{ model.description }}</p></mdb-col>
                            <mdb-col col='1'><button @click="deleteModel(model._id)">x</button></mdb-col>
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

</style>