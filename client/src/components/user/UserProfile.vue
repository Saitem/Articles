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
    }
  }
}
</script>


<template>

  <mdb-container>
    <mdb-row  class="justify-content-md-center">
      <div class="text-center">
        <mdb-col col="12">
            <img :src="userImage" class="img-fluid user_image" alt="user_image">
        </mdb-col>
        <mdb-col>
          <mdb-input v-model="name">{{ name }}</mdb-input>
          <mdb-input v-model="email">{{ email }}</mdb-input>
        </mdb-col>  
        <mdb-btn @click="logout">Log out</mdb-btn>
      </div>
    </mdb-row>
  </mdb-container>
  <!-- <div>
    <button @click="logout">logout</button>
    <h3>Name: {{ name }}</h3>
    <h3>Email: {{ email }}</h3>
  </div> -->
</template>

<style lang="scss" scoped>
  .user_image{
    width: 45%;
    text-align: center;
    border-radius: 100%;
    border: 3px solid grey;
  }
</style>