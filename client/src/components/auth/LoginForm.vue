<script>
import axios from 'axios'
const baseUrl = "http://localhost:5000/user/login"

import { mdbInput, mdbBtn, mdbRow, mdbCol, mdbContainer } from 'mdbvue';
  export default {
    name: 'Log',
    components: {
      mdbInput,
      mdbBtn,
      mdbRow,
      mdbCol,
      mdbContainer
    },

    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },

    methods: {
      login() {
        const user = {
          email: this.email,
          password: this.password
        }

        axios.post(baseUrl, user)
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data);
              this.$router.push('/user');
            }
          }, err => {
            console.log(err.response)
            this.error = err.response.data.error
          })
      }
    }
}

</script>

<template>
<mdb-container>
        <mdb-row class="justify-content-md-center">
            <mdb-col col='6'>
                    <p class="h4 text-center mb-4">Sign in</p>
                    <div class="grey-text">
                    <mdb-input label="Your email" icon="envelope" type="email" v-model="email" />
                    <mdb-input label="Your password" icon="lock" type="password" v-model="password" />
                    </div>
                    <div class="text-center">
                    <mdb-btn @click="login">Login</mdb-btn>
                    {{ error }}
                    </div>
            </mdb-col>
        </mdb-row>
</mdb-container>
</template>