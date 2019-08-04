<template>
<div>  
    <v-app>
    <!-- navbar -->
    <navbar></navbar>
    <v-container>
    <v-layout row wrap text-xs-left>
        <v-carousel>
            <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            ></v-carousel-item>
        </v-carousel>
        <v-flex xs12 sm12 lg8 xl8 md8>
            <v-card class="aturPadding">
                <h4 class="font-weight-light"><v-icon v-if="hasilCari.Tipekos == 'Putra'" large color="blue darken-2">fas fa-male </v-icon> Tipe-Kost: {{hasilCari.Tipekos}}</h4>
                <v-divider></v-divider>
                <h4 class="font-weight-light"><v-icon  color="orange darken-2">fas fa-pencil-alt </v-icon> Nama Kost: {{hasilCari.Namakos}}</h4>
                <v-divider></v-divider>
                <h4 class="font-weight-light"><v-icon  color="orange darken-2">fas fa-address-card </v-icon> Alamat :  {{hasilCari.Alamat}}</h4>
                <v-divider></v-divider>
                <h4 class="font-weight-light">Luas kamar : {{hasilCari.LuasKamar}}</h4>
                <v-divider></v-divider>
                <h4 class="font-weight-light">Deskripsi Fasilitas : {{hasilCari.Deskripsi}}</h4>
                <v-divider></v-divider>
                <h4 class="font-weight-light">Kamar mandi : {{hasilCari.TipeKmrMandi}}</h4>
            </v-card>
        </v-flex>
        <v-space></v-space>
        <v-flex xs12 sm12 lg4 xl4 md4>
            <v-card dark flat>
                <h4 class="font-weight-light">Informasi Kos</h4>
                <h5 class="font-weight-light">Rp {{hasilCari.NominalHarga | currency}} / {{hasilCari.Tipeharga}}</h5>
                <v-btn color="error" block @click="dialog = true">Booking</v-btn>
                <v-dialog v-model="dialog" max-width="400">
                    <v-card>
                        <v-card-title class="headline">Anda akan membooking kos ini?</v-card-title>
                        <v-card-text>
                            <br>{{hasilCari.Namakos}}
                            <br>{{hasilCari.Alamat}}
                            <br>Rp{{hasilCari.NominalHarga | currency}} / {{hasilCari.Tipeharga}}
                            <br>
                            Proses ? 
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="green darken-1" flat @click="dialog = false">Batal</v-btn>
                        <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="goBook(hasilCari.IDkos)">Ok</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <p>Data dapat berubah sewaktu waktu</p>
            </v-card>
        </v-flex>
    </v-layout>
    </v-container>


    <!-- Footer -->
    <kaki></kaki>
</v-app>
</div>  
</template>

<script>
import navbar from './Navbar.vue'
import kaki from './Footer.vue'
export default {
    components:{
        navbar,kaki
    },
    data(){
        return{
            show: true,
            text1:'',
            items: [
                {
                    src: this.$store.state.detailKosByID.linkfoto
                }
            ],
            hasilCari : this.$store.state.detailKosByID,
            dialog: false,
            dialog2: false
        }
    },
    methods:{
        goBook(id)
        {
            if(this.$store.state.user.IDuser == null)
            {
                alert('Anda harus login sebagai user terlebih dahulu')
            }
            else{
                this.$router.push({ path: '/book-payment', query: { idkost: id }});
            }
            
        }
    },
    mounted(){
        // this.$store.dispatch('cariKos',tempat)
        this.$store.dispatch('getkosByID',this.$route.query.idkost)
    },
    created(){
        this.$store.dispatch('getkosByID',this.$route.query.idkost)
    }
}
</script>

<style>
.aturPadding{
    padding: 20px;
}
</style>
