<template>
  <div>
    <button @click="logout">logout</button>
    <h3>Name: {{ name }}</h3>
    <h3>Email: {{ email }}</h3>
  </div>
</template>
<script>

import axios from 'axios'

const baseUrl = 'http://localhost:5000/user/info'

export default {
  name: 'Landing',
  data() {
    return {
      name: '',
      email: '',
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
