<template>
    <div>
        <v-container grid-list-md text-xs-center>
            <div class="text-xs-center">
              <h2 class="headline">Cari Kos sesuai daerahmu</h2>
              <span class="subheading">
                Rekomendasi area kostan
                <div>
                
                </div>
              </span>
            </div>
            <!-- Content -->
            <v-container grid-list-md >     
                <v-layout row wrap>
                <v-flex v-for="i in hasilCari" :key="i.IDkos" xs12 sm12 md4 lg4>
                        <v-layout>
                            <v-flex xs12>
                                <v-hover>
                                <v-card slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`"
                                    @click="gotoKos(i.IDkos)"
                                    >
                                    <v-card flat height="250px">
                                    <img v-bind:src="i.linkfoto" style="height:250px;">
                                    </v-card>
                                    <v-card-title primary-title>
                                    <v-flex font-weight-light three-line text-xs-left>
                                        {{i.Namakos}}<br>
                                        {{i.Tipekos}}<br>
                                        Rp {{i.NominalHarga}}<br>
                                        {{i.Tipeharga}}<br>
                                        {{i.Alamat}}
                                    </v-flex>
                                    </v-card-title>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                                </v-hover>
                            </v-flex>
                        </v-layout>
                </v-flex>
                </v-layout>
            </v-container>
            <!--  -->
        </v-container>
        <v-container>
            <v-layout>
                <v-flex>
                   
                </v-flex>
            </v-layout>
        </v-container>
        
    </div>
</template>

<script>

export default {
    components:{
        
    },
    data(){
        return{
            show: true,
            
        }   
    },
    methods:{
        gotoKos(id)
        {
            this.$router.push({ path: '/kos', query: { idkost: id }});
        }
    },
    computed:{
        hasilCari(){
            return this.$store.state.allkos;
        }
    },
    mounted(){
        // this.$store.dispatch('cariKos',tempat)
        this.$store.dispatch('get_all')        
    },
    props:{
        
    },
}
</script>

<style>

</style>
