<template>
<div>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <img src="https://cdn0.iconfinder.com/data/icons/avatars-icons/110/avatar_profile_face_father_husband_man_mustache-512.png" alt="avatar" width="50" height="50" class="align-center"><p>Hi Super Admin...</p>
            <v-card color="" height="100px" flat>
                <v-btn block flat class="btnDashboard" style="height:100%;">Tampilkan Data Booking</v-btn>
            </v-card>
        </v-list>
        </v-navigation-drawer>
        <v-toolbar color="orange lighten-1" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title><a href="http://localhost:8080/" style="color: white; text-decoration: none;">BapakKos</a></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>Halaman Admin</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container grid-list-md >    
                <v-flex>
                    <h1 class="font-weight-light">Data Booking</h1>
                </v-flex> 
                <v-layout row wrap>
                <v-flex v-for="i in hasilBooking" :key="i.BookingID" xs12 sm12 md4 lg4>
                        <v-layout>
                            <v-flex xs12>
                                <v-hover>
                                <v-card slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`"
                                    height="300px"
                                    >
                                    <v-card-title primary-title>
                                    <v-flex  three-line text-xs-left style="height:150px;">
                                        ID Booking: {{i.BookingID}}<br>
                                        Tanggal Booking: {{i.BookingDate}}<br>
                                        Status Booking: {{i.isBooked}}<br>
                                        ID User: {{i.IDusers}}<br>
                                        Nama User: {{i.NamaUsers}}<br>
                                        No Hp: {{i.Telepon}}<br>
                                        ID Kos: {{i.IDkos}}<br>
                                        Nama Kos: {{i.Namakos}}<br>
                                    </v-flex>
                                    </v-card-title>
                                    <v-card-actions>
                                    <v-flex>
                                        <v-btn color="warning" @click="goApprove(i.BookingID)" v-if="i.isBooked == '0' || i.isBooked == null">Approve</v-btn>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn color="warning" disabled v-if="i.isBooked == '1'">Approved</v-btn>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex>
                                        <v-btn color="red" @click="goCancel(i.BookingID)">Batalkan</v-btn>
                                    </v-flex>
                                    </v-card-actions>
                                </v-card>
                                </v-hover>
                            </v-flex>
                        </v-layout>
                </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        
    </v-app>
</div>
</template>

<script>
export default {
    components:{

    },
    data: () => ({
        drawer: null,
    }),
    methods:{
        goApprove(idbooking){
            this.$store.dispatch('approvedBooking',idbooking)
        },
        goCancel(idbook){
            var x ={
                Canceldate:"2019-1-10",
                Deskripsi:"Canceled by admin",
                BookingID: idbook
            }
            this.$store.dispatch('cancelBooking',x)
        }
    },
    mounted(){
        this.$store.dispatch('getBookingAll')   
    },
    computed:{
        hasilBooking(){
            return this.$store.state.bookingAll;
        }
    },
}
</script>

<style>

</style>
