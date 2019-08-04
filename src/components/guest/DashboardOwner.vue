<template>
<div>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
        <v-list dense >
            <img src="https://cdn0.iconfinder.com/data/icons/avatars-icons/110/avatar_profile_face_father_husband_man_mustache-512.png" alt="avatar" width="50" height="50" class="align-center"><p>Hi {{this.$store.state.owner.NamaOwner}}...</p>
            <v-card color="" height="100px" flat>
                <v-btn block flat class="btnDashboard" style="height:100%;" href="http://localhost:8080/#/input-kos">Pasang Iklan Kos</v-btn>
            </v-card>
            <v-card color="" height="100px" flat>
                <v-btn block flat class="btnDashboard" style="height:100%;">Tampilkan Iklan Kos</v-btn>
            </v-card>
        </v-list>
        </v-navigation-drawer>
        <v-toolbar color="orange lighten-1" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title><a href="http://localhost:8080/" style="color: white; text-decoration: none;">BapakKos</a></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>Halaman Pemilik</v-toolbar-title>
        <v-btn @click="logoutOwner()">Logout</v-btn>
        </v-toolbar>
        <v-content>
            <GetKosDashboard></GetKosDashboard>
        </v-content>
        
    </v-app>
</div>
</template>

<script>
import navbar from './Navbar.vue'
import kaki from './Footer.vue'
import GetKosDashboard from './GetKosDashboard.vue'
export default {
    components:{
        navbar,kaki,GetKosDashboard
    },
    data: () => ({
        drawer: null,
        items: [
            {
            text: 'Home',
            disabled: false,
            href: 'http://localhost:8080/#/'
            },
            {
            text: 'ownerpage',
            disabled: true,
            href: ''
            }
        ]
    }),
    props: {
      source: String
    },
    methods:{
        logoutOwner(){
            this.$store.dispatch('logout_owner')
              window.sessionStorage.clear();
        },
    }
}
</script>

<style>

</style>
