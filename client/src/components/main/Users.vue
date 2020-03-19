<script>
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';
import replImage from '../../assets/userImage.png'

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
            users: [],
            error: '',
            replImage
        }
    },

    async created() {
        try {
            const response = await axios.get('http://localhost:5000/user/users')
            this.users = response.data
        }catch(err) {
            this.error = err
        }
    },

    methods: {
        userProfile(id) {
            this.$router.push({name: 'User', params: {id: id}})
        },
    },
}
</script>

<template>
    <mdb-container>
        <mdb-row  class="justify-content-md-center">
                <mdb-col
                    
                    col="4"
                >
                    <mdb-row>

                        <mdb-col
                          v-for="(user, index) in users"
                          :key="index" 
                          class="post" 
                          col='12'
                        >
                            <mdb-row>
                              <mdb-col col=4>
                                <div class="text-center">
                                  <img 
                                    v-if="user.image !== ''" 
                                    :src="`data:image/${'png' || 'jpeg' || 'jpg'};base64,${user.image}`"  
                                    alt=""
                                  />
                                  <img 
                                    v-else
                                    :src="replImage" 
                                    alt="user image"
                                  />
                                </div>
                              </mdb-col>
                              <mdb-col><h5 @click="userProfile(user._id)">{{ user.name }}</h5></mdb-col>
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
    
    img{
      width: 50%;
    }

</style>