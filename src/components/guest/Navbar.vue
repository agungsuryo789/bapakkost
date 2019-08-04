<template>
<div>
  <b-navbar toggleable="md" type="dark" class="navBrand">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#"><img src="https://cdn0.iconfinder.com/data/icons/avatars-icons/110/avatar_profile_face_father_husband_man_mustache-512.png" alt="avatar" width="50" height="50" class="align-center"></b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <a href="http://localhost:8080/" style="color: white; text-decoration: none;">BapakKos</a>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <div class="ml-auto" v-if="ownerState == null && userState == null">
        <b-navbar-nav class="ml-auto" >
          <b-dropdown id="ddown1" text="Login" class="ml-auto" style="margin-right: 25px;" size="lg" variant="warning">
            <b-dropdown-item @click="loginuser()">Login User</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="loginowner()">Login Pemilik</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>        
      </div>
      <div class="ml-auto" v-if="ownerState != null && userState == null">
        <b-navbar-nav class="ml-auto owner" >
          <b-dropdown id="ddown1" :text="this.$store.state.owner.NamaOwner" class="ml-auto" style="margin-right: 25px;" size="lg" variant="warning">
            <b-dropdown-item @click="halowner()">Halaman pemilik</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout_owner()">Logout</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </div>
      <div class="ml-auto" v-if="ownerState == null && userState != null">
        <b-navbar-nav class="ml-auto user" >
          <b-dropdown id="ddown1" :text="this.$store.state.user.NamaUsers" class="ml-auto" style="margin-right: 25px;" size="lg" variant="warning">
            <b-dropdown-item @click="logout_owner()">Logout</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </div>
      
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  methods:{
        loginowner()
        {
            this.$router.push({ path: '/login-owner'});
        },
        loginuser()
        {
            this.$router.push({ path: '/login-user'});
        },
        logout_owner(){
            this.$store.dispatch('logout_owner')
        },
        halowner(){
          this.$router.push({ path: '/ownerpage'});
        }
  },
  data(){
        return{
            show: true,
            ownerState:this.$store.state.owner.IDowner,
            userState:this.$store.state.user.IDuser
        }
    },
}
</script>

<style>
.navBrand{
  color: aliceblue;
  font-size: 20px;
  background-color: orange;
}

</style>
