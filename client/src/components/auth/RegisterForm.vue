<script>
import { mdbInput, mdbBtn, mdbRow, mdbCol, mdbContainer } from 'mdbvue';
import axios from 'axios'
const baseUrl = "http://localhost:5000/user/register"


export default {
    name: 'Register',
    components: {
      mdbInput,
      mdbBtn,
      mdbRow,
      mdbCol,
      mdbContainer
    },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    },

    methods: {
        register() {
            const newUser = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            
            axios.post(baseUrl, newUser)
                .then(res => {
                    console.log(res)
                    this.$router.push('/login')
                }, err => {
                    console.log(err.message)
                })
        }
    }

}


</script>

<template>
    <!-- <div>
        <input type="text" v-model="name">
        <input type="text" v-model="email">
        <input type="text" v-model='password'>
        <button @click="register">reg</button>
    </div> -->
    <mdb-container>
        <mdb-row class="justify-content-md-center">
            <mdb-col col='6'>
                <!-- <form> -->
                    <p class="h4 text-center mb-4">Register</p>
                    <div class="grey-text">
                    <mdb-input label="Your name" icon="user" type="text" v-model="name" />
                    <mdb-input label="Your email" icon="envelope" type="email" v-model="email" />
                    <mdb-input label="Your password" icon="lock" type="password" v-model="password" />
                    </div>
                    <div class="text-center">
                    <mdb-btn @click="register" color="primary">Register</mdb-btn>
                    </div>
                    <!-- </form> -->
            </mdb-col>
        </mdb-row>
    </mdb-container>

</template>