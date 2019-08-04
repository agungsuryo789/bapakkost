<template>
        <v-container grid-list-md >    
                <v-flex>
                    <h1 class="font-weight-light">Iklan Kos milik saya</h1>
                </v-flex> 
                <v-layout row wrap>
                <v-flex v-for="i in kosOwner" :key="i.IDkos" xs12 sm12 md4 lg4>
                        <v-layout>
                            <v-flex xs12>
                                <v-hover>
                                <v-card slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`"
                                    height="450px"
                                    >
                                    <v-img
                                    src="https://d174uhwbl0ucqn.cloudfront.net/app/uploads/2018/04/Half-Page-Size-Laurel-Room.jpg"
                                    height="200px"
                                    >
                                    </v-img>
                                    <v-card-title primary-title>
                                    <v-flex font-weight-thin three-line text-xs-left style="height:150px;">
                                        {{i.Namakos}}<br>
                                        {{i.Tipekos}}<br>
                                        Rp {{i.NominalHarga.toLocaleString()}}<br>
                                        {{i.Tipeharga}}<br>
                                        {{i.Alamat}}
                                    </v-flex>
                                    </v-card-title>
                                    <v-card-actions>
                                    <v-flex>
                                        <v-btn color="info" @click="gotoKos(i.IDkos)">Info</v-btn>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex>
                                        <v-btn color="warning" @click="goUbah(i.IDkos)">Ubah</v-btn>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex>
                                        <v-btn color="red" @click="hapusIklan(i.IDkos)">Hapus iklan</v-btn>
                                    </v-flex>
                                    </v-card-actions>
                                </v-card>
                                </v-hover>
                            </v-flex>
                        </v-layout>
                </v-flex>
                </v-layout>
        </v-container>
</template>

<script>
export default {
components:{
        
    },
    data(){
        return{
            show: true,
            iOwner: this.$store.state.owner.IDowner
        }   
    },
    methods:{
        gotoKos(id)
        {
            this.$router.push({ path: '/kos', query: { idkost: id }});
        },
        goUbah(id)
        {
            this.$router.push({ path: '/ubah-kos', query: { idkost: id } });
        },
        hapusIklan(idkoshapus)
        {
            var x ={
                IDkos: idkoshapus
            }
            this.$store.dispatch('hapusKos',x)
        }
    },
    computed:{
        kosOwner(){
            return this.$store.state.detailKosByOwner;
        }
    },
    mounted(){
        this.$store.dispatch('getkosByIDOwner',this.iOwner)   
    },
    props:{
        
    },
}
</script>

<style>

</style>
