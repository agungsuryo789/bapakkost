<template>
    <div>
        <v-app>
        <v-container>
            <v-layout row wrap justify-center>
                <v-flex xs12 style="max-width:50%;" justify-center>
                    <v-card>
                        <v-card-title class="headline">Pembayaran</v-card-title>
                    </v-card>
                    <v-card>
                        <v-card-title class="headline">Detail tagihan</v-card-title>
                        <v-card-text style="color:grey;">
                            <br>Book Kos "{{hasilCari.Namakos}}"      Rp      {{hasilCari.NominalHarga}}
                            <br>----------------------------------------------------------------------
                            <br>Tagihan: Rp {{hasilCari.NominalHarga}}
                            <br>Tanggal: {{ new Date().getDate() }}-{{ new Date().getMonth() + 1 }}-{{ new Date().getFullYear() }}
                            
                        </v-card-text>
                    </v-card>
                    <v-card>
                        <v-card-title class="headline">Metode Pembayaran Tersedia</v-card-title>
                        <v-card-text>
                            <br><img src="https://www.bca.co.id/~/media/Images/logo-bca.ashx" alt="" style="height:50px;width:50px;">BCA via Transfer<v-btn icon @click="show = !show"><v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon></v-btn>
                            <v-slide-y-transition>
                            <v-card-text v-show="show">
                                <br>a.n Bambang Bambang
                                <br>No. Rekening 123456789
                            </v-card-text>
                            </v-slide-y-transition>
                        </v-card-text>
                    </v-card>
                    <v-card>
                        <v-btn color="error" block @click="toBook()">Booking</v-btn>
                        <v-dialog v-model="dialog" max-width="400">
                            <v-card>
                                <v-card-text>
                                    <br>Data anda sudah tersimpan
                                    <br>Silahkan selesaikan proses transfer
                                    <br>Jika proses transfer sudah selesai , akan ada verifikasi dari admin 
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="green darken-1" flat @click="dialog = false">Ok</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        </v-app>
    </div>
</template>

<script>

export default {
    data(){
        return{
            show: false,
            dialog:false,
            hasilCari : this.$store.state.detailKosByID,
            sendBook:{
                BookingDate:"2019-1-1",
                IDusers:this.$store.state.user.IDusers,
                IDkos: this.$store.state.detailKosByID.IDkos
            }
        }
    },
    methods:{
        toBook(){
            this.$store.dispatch('sendBooking',this.sendBook)
            
        },
         formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
    },
    mounted(){
        // this.$store.dispatch('cariKos',tempat)
        this.$store.dispatch('getkosByID',this.$route.query.idkost)
    },
}
</script>

<style>

</style>
