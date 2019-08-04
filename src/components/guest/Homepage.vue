<template>
<div>
    <!-- Navbar -->
    <div>
        <navbar></navbar>
    </div>
    <!-- Poster homepage -->
    <div>
    <v-app>
      <v-parallax height="600" src="https://blog.modsy.com/wp-content/uploads/2017/12/Eclectic-Cozy.jpg" class="imgHome">
        <v-container fluid align-center style="margin:18%">
            <v-layout row wrap>
                <v-flex floating  xs12 sm12 md6 lg6 xl6>
                    <v-card dense flat color="orange lighten-1">
                                    <v-text-field 
                                        solo-inverted
                                        hide-details
                                        prepend-inner-icon="search"
                                        label="ketik alamat kos yang dicari"
                                        append-icon="place" 
                                        v-model="cari"
                                    >
                                    </v-text-field>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6 xl6>
                    <v-btn color="red accent-3" @click="cariKos()">Cari</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
      </v-parallax>
      </v-app>
    </div>
    <!-- Content -->
   <ContentHomepage></ContentHomepage>

    
    <!-- Footer -->
    <kaki></kaki>
</div>


</template>

<script>
import navbar from './Navbar.vue'
import kaki from './Footer.vue'
import ContentHomepage from './ContentHomepage.vue'

export default {
    components:{
        navbar,kaki,ContentHomepage,
    },
    data(){
        return{
            show: true,
            cari:'',
            ownerState:this.$store.state.owner.IDowner,
            userState:this.$store.state.user.IDuser
        }
    },
    props:{
            
    },
    methods:{
        cariKos()
        {
            this.$router.push({ path: '/cari' , query: { tempat: this.cari }});
        }
    },
}
</script>

<style>

</style>
