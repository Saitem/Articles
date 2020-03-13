<script>
import Header from '@/components/layout/Header'

export default {
  components: { Header }
}
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

body{
    background-color: rgba(222, 231, 235, 0.733);
    font-family: 'Roboto', sans-serif;

}

</style>
