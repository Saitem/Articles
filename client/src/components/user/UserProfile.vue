<script>
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn } from 'mdbvue';
import userImage from '../../assets/user.svg'

const baseUrl = 'http://localhost:5000/user/info'

export default {
  name: 'User',

  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn
  },

  data() {
    return {
      name: '',
      email: '',
      userImage: userImage
    }
  },    
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
    axios.get(baseUrl, { headers: { 'access_token': localStorage.getItem('token')}})
      .then(res => {
        this.name = res.data.user.name
        this.email = res.data.user.email
      })
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },

    edit() {
      const user = {
        name: this.name,
        email: this.email
      }

      axios.put(baseUrl, user,{ headers: { 'access_token': localStorage.getItem('token')}})
      
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
                  <img :src="userImage" class="img-fluid user_image" alt="user_image">
                </div>
              </mdb-col>
              <mdb-row>
                <mdb-col class="gen_name" col=12><h1>{{ name }} {{ lastname }}</h1></mdb-col>
                <mdb-col col=12>{{ email }}</mdb-col>
                <mdb-col col=12>{{ status }}</mdb-col>
              </mdb-row>
            </mdb-row>
          </mdb-col>

          <mdb-col class="info" col=12>
            <mdb-row>
              
              <mdb-col col="12"><h2>Account</h2></mdb-col>
              <hr>
              <mdb-col col="6"><h5>Username</h5></mdb-col>
              <mdb-col col="6"><mdb-input v-model="name"></mdb-input></mdb-col>
              <mdb-col col="6"><h5>Email</h5></mdb-col>
              <mdb-col col="6"><mdb-input v-model="email"></mdb-input></mdb-col>
              <mdb-col col="6"><h5>Full name</h5></mdb-col>
              <mdb-col col="6"><mdb-input></mdb-input></mdb-col>
            </mdb-row>
            <mdb-btn @click='edit'></mdb-btn>
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

  .user_image{
    width: 55%;
    text-align: center;
    border-radius: 100%;
    border: 3px solid grey;
  }
</style>