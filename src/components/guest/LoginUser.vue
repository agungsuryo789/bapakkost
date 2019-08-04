<template>
<v-app>
  <v-container grid-list-xl >
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg6 xl6 align-center>
        <a><h2 class="subheading font-weight-medium" @click="toHomepage()">Kembali ke Beranda</h2></a>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12  align-center class="loginUser">
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <h2 class="display-1 font-weight-light">Login</h2>
        <h2 class="title font-weight-light">User</h2>
        <v-text-field
            :rules="[rules.required]"
            label="Enter your username"
            v-model="auth.username"
          ></v-text-field>
        <v-text-field 
          label="Enter your password"
          :rules="[rules.required]"
          :type="show2 ? 'text' : 'password'"
          v-model="auth.password"
          @click:append="show2 = !show2"
          xs12 sm12 md12 lg12
          :append-icon="show2 ? 'visibility_off' : 'visibility'"
        ></v-text-field>
        <v-btn color="info" xs12 sm12 md12 lg12 large depressed block @click="LoginUser()">Login</v-btn>
        <h2 class="subheading font-weight-light text-xs-center" >Belum punya Akun?<a @click="registerUser()">Yuk daftar</a></h2>
      </v-flex>
      
    </v-layout>
  </v-container>
  <kaki></kaki>
  </v-app>
</template>

<script>
import kaki from './Footer.vue'

export default {
  components:{
      kaki
  },
  data() {
      drawer: null
      return {
            show1: false,
            show2: false,
            password: '',
            rules: {
            required: value => !!value || 'Required.',
            emailMatch: () => ('The email and password you entered don\'t match')
            },
            auth:{
            "username" : "test",
            "password" : "test"
            },
        }
    },
    props: {
      source: String
    },
  methods:{
    LoginUser(){
       if(this.auth.username && this.auth.password != null)
       {
         this.$store.dispatch('loginUser',this.auth)
       }
       else{
         alert("Username atau password salah")
       }
    },
    registerUser(){
      this.$router.push('/registeruser')
    },
    toHomepage()
        {
        this.$router.push('/')
        }
}
}
</script>

<style>
.loginOwner{
  margin-top: 1%;
}
.loginOwner h2{
  margin-top: 4%;
}
.loginUser{
  margin-top: 1%;
}
.loginUser h2{
  margin-top: 4%;
} 

</style>
