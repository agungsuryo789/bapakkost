<template>
<div>
    <!-- Navbar -->
    <navbar></navbar>
    
    <v-app>
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" editable >Input Data Lokasi</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" editable>Input Data Kos</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" editable>Name of step 3</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
            <v-stepper-content step="1">
                        <h6>Alamat lengkap kos *wajib diisi</h6>
                        <v-text-field
                            label="alamat lengkap"
                            outline
                            clearable
                            :rules="[rules.required]"
                            v-model="inputKos.Alamat"
                        ></v-text-field>

                        <h6>Peta lokasi kos *wajib diisi</h6>
                        <v-text-field
                            label="cari di peta"
                            outline
                            clearable
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-card
                        class="mb-5"
                        color="grey lighten-1"
                        height="200px"
                        ></v-card>

                        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <h7>Nama kos *wajib diisi</h7>
                <v-text-field
                    label="tulis nama kos"
                    outline
                    clearable
                    :rules="[rules.required]"
                    v-model="inputKos.Namakos"
                ></v-text-field>

                <h7>Tipe Kos *wajib diisi</h7>
                <v-radio-group v-model="inputKos.Tipekos" :mandatory="false">
                    <v-radio label="Putra" value="Putra"></v-radio>
                    <v-radio label="Putri" value="Putri"></v-radio>
                    <v-radio label="Campur" value="Campur"></v-radio>
                </v-radio-group>

                <h7>Luas Kos *wajib diisi</h7>
                <v-text-field
                    placeholder="ex 3x3 / 3x4 / 4x4 dst"
                    outline
                    clearable
                    :rules="[rules.required]"
                    v-model="inputKos.LuasKamar"
                ></v-text-field>

                <h7>Harga kamar (isi sesuai aturan kos) *wajib diisi</h7>
                <v-radio-group v-model="inputKos.Tipeharga" :mandatory="false">
                    <v-radio label="Perbulan" value="Perbulan"></v-radio>
                    <v-radio label="Perhari" value="Perhari"></v-radio>
                    <v-radio label="Pertahun" value="Pertahun"></v-radio>
                </v-radio-group>
                <v-text-field
                    label="Nominal harga (input nominal saja)"
                    outline
                    clearable
                    :rules="[rules.required]"
                    v-model="inputKos.NominalHarga"
                ></v-text-field>

                <h7>Tipe Kamar mandi *wajib diisi</h7>
                <v-radio-group v-model="inputKos.TipeKmrMandi" :mandatory="false">
                    <v-radio label="Luar" value="Luar"></v-radio>
                    <v-radio label="Dalam" value="Dalam"></v-radio>
                </v-radio-group>

                <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

                <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <h7>Deskripsi tambahan *wajib diisi</h7>
                <v-textarea
                    solo
                    name="input-7-4"
                    label="Deskripsi"
                    placeholder="Contoh fasilitas tambahan , Parkir dalam , Wi-fi , AC , dll"
                    v-model="inputKos.Deskripsi"
                ></v-textarea>


                <v-btn color="primary" @click="addKos()">Continue</v-btn>

                <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-app>
</div>
</template>

<script>
import navbar from './Navbar.vue'

export default {
    components:{
            navbar
        },
    data(){
        return{
                show: true,
                cari:'',
                e1: 0,
                rules: {
                    required: value => !!value || 'Required.',
                    
                },
                inputKos:{
                    Namakos:this.$store.state.detailKosByID.Namakos,
                    Alamat:this.$store.state.detailKosByID.Alamat,
                    Deskripsi:this.$store.state.detailKosByID.Deskripsi,
                    LuasKamar:this.$store.state.detailKosByID.LuasKamar,
                    Tipekos:"",
                    Tipeharga:"",
                    NominalHarga:this.$store.state.detailKosByID.NominalHarga,
                    TipeKmrMandi:"",
                    IDowner: this.$store.state.owner.IDowner,
                    latitude:"100.0",
                    longitude:"100.00",
                    IDkos:this.$store.state.detailKosByID.IDkos
                }
            }
        },
    methods:{
        addKos(){
            if(this.inputKos.Alamat && this.inputKos.Namakos && this.inputKos.Deskripsi && this.inputKos.LuasKamar && this.inputKos.Tipekos && this.inputKos.Tipeharga && this.inputKos.TipeKmrMandi != null)
            {
                
                this.$store.dispatch('updateKos',this.inputKos)
            }
            else{
                alert("Data tidak boleh ada yang kosong")
            }
        },
        
    },
    mounted(){
        this.$store.dispatch('getkosByID',this.$route.query.idkost)
    },
    
}
</script>

<style>

</style>
