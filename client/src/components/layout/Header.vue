<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, /* mdbInput */} from 'mdbvue';
  export default {
    name: 'NavbarPage',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      // mdbInput
    },
  }
</script>

<template>
  <mdb-navbar color="indigo" dark>
    <mdb-navbar-brand href="https://mdbootstrap.com/">
      Articles
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item to="/" active>Home</mdb-nav-item>
        <mdb-nav-item href="#">Features</mdb-nav-item>
        <!-- <form>
            <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>
        </form> -->
        <mdb-nav-item to="/submit">Submit</mdb-nav-item>
        <mdb-nav-item to="/users">Users</mdb-nav-item>
       
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <mdb-nav-item to="/register">Register</mdb-nav-item>
        <mdb-nav-item to="/login">Log in</mdb-nav-item>
        <mdb-nav-item to="/user">Profile</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>