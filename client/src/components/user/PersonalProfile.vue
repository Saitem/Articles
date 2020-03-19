<script>
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn } from 'mdbvue';
import replImage from '../../assets/userImage.png'

const baseUrl = 'http://localhost:5000/user/info'

export default {
  name: 'User',

  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
    // mdbFileInput
  },

  data() {
    return {
      name: '',
      email: '',
      replImage,
      userImage: '',
      fullname: '',
      nickname: '',
      status: ''
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
        this.fullname = res.data.user.fullname
        this.userImage = res.data.user.image
        console.log(res.data.user.fullname)
      })
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },

    selectFile() {
      this.userImage = this.$refs.file.files[0]
    },

    edit() {
      const fd = new FormData()

      fd.append('image', this.userImage)
      fd.append('name', this.name)
      fd.append('fullname', this.fullname)

      axios.put(baseUrl, fd,{ headers: { 'access_token': localStorage.getItem('token')}})
      
    }
  },

  computed: {

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
                  <img v-if="userImage === ''" :src="replImage" class="img-fluid user_image" alt="user_image" />
                  <img 
                    v-if='userImage !== ""' 
                    :src="`data:image/${'png' || 'jpeg' || 'jpg'};base64,${userImage}`" 
                    alt=""
                    class="user_image"
                  />
                  <input type="file" ref="file" @change="selectFile" class="image_uploader" />
                </div>
              </mdb-col>
              <mdb-row>
                <mdb-col class="gen_name" col=12><h1>{{ name }}</h1></mdb-col>
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
              <mdb-col col="6"><mdb-input v-model="fullname"></mdb-input></mdb-col>
            </mdb-row>
            <mdb-btn @click='edit'>Save</mdb-btn>
            <mdb-btn @clicl="logout">Log out</mdb-btn>
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