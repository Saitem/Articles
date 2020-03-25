<script>
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';
import replImage from '../../assets/userImage.png'

export default {
    name: "UserProfile",
    components: {
        // mdbInput,
        mdbContainer,
        mdbRow,
        mdbCol
    },

    data() {
        return {
            user: [],
            error: '',
            id: this.$route.params.id,
            replImage
        }
    },
    
    async created() {
        try {
            const response = await axios.get(`http://localhost:5000/user/user/${this.id}`)
            this.user = response.data
        } catch (err) {
            this.error = err
        }
    }

  }
</script>

<template>

  <mdb-container>
    <mdb-row  class="justify-content-center user_profile">
      <!-- <div class="text-center"> -->
      <mdb-col class='canv_info'>
        <mdb-row>
          <mdb-col class="head" col=12>
            <mdb-row>
                <mdb-col col="4">
                    <div class="text-left">
                    <img v-if="user.image === ''" :src="replImage" class="img-fluid user_image" alt="user_image" />
                    <img 
                        v-if='user.image !== ""' 
                        :src="`data:image/${'png' || 'jpeg' || 'jpg'};base64,${user.image}`" 
                        alt=""
                        class="user_image"
                    />
                    </div>
                </mdb-col>
                <mdb-col col="6">
                    <div class="text-center">
                        <mdb-row>
                            <mdb-col class="gen_name" col=12><h1>{{ user.name }}</h1></mdb-col>
                            <mdb-col col=12>{{ user.email }}</mdb-col>
                            <mdb-col col=12>{{ user.status }}</mdb-col>
                        </mdb-row>
                    </div>
                </mdb-col>
            </mdb-row>
          </mdb-col>

            <mdb-col class="info" col=12>
                <mdb-row>
                
                    <mdb-col col="12"><h2>Account</h2></mdb-col>
                    <hr>
                    <mdb-col col="6"><h5>Username</h5></mdb-col>
                    <mdb-col col="6">{{ user.name }}</mdb-col>
                    <mdb-col col="6"><h5>Email</h5></mdb-col>
                    <mdb-col col="6">{{ user.email }}</mdb-col>
                    <mdb-col col="6"><h5>Full name</h5></mdb-col>
                    <mdb-col col="6">{{ user.fullname }}</mdb-col>
                    <mdb-col col="6"><h5>User id</h5></mdb-col>
                    <mdb-col col="6">{{ user.fullname }}</mdb-col>
                </mdb-row>
            </mdb-col>
          </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>


<style lang="scss" scoped>
  .user_profile {
    padding-top: 30px;
  }

  .canv_info {
    background-color: #fff;
  }

  .info {
    padding-top: 20px;
  }

  .head {
    padding-top: 20px;
  }

  h5 {
    padding-top: 35px;
  }
  .user_image {
    width: 60%;
  }

</style>