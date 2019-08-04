<template>
<v-app>
  <v-container grid-list-xl >
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg6 xl6 align-center>
        <a><h2 class="subheading font-weight-medium" @click="toHomepage()">Kembali ke Beranda</h2></a>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 align-center class="loginOwner">
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <h2 class="display-1 font-weight-light">Login</h2>
        <h2 class="title font-weight-light">Pemilik Kos</h2>
        <v-text-field
            :rules="[rules.required]"
            label="Enter your username"
            v-model="authOwner.UserOwner"
          ></v-text-field>
        <v-text-field
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Enter your password"
            v-model="authOwner.PwOwner"
            @click:append="show1 = !show1"
            xs12 sm12 md12 lg12
          ></v-text-field>
          <v-btn color="info" xs12 sm12 md12 lg12 large depressed block @click="LoginOwner()">Login</v-btn>
          <h2 class="subheading font-weight-light text-xs-center" >Belum punya Akun? Yuk daftar</h2>
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
        authOwner:{
          "UserOwner":"",
	        "PwOwner":""
        }
      }
    },
    props: {
      source: String
    },
  methods:{
    LoginOwner(){
        if(this.authOwner.UserOwner && this.authOwner.PwOwner != null)
        {
          this.$store.dispatch('loginOwner',this.authOwner)
        }
        else{
          alert("Username atau password salah")
        }
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
