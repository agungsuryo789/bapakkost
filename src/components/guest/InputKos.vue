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

            <v-stepper-step step="3" editable>Input Kos</v-stepper-step>
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

                        <h6>Peta lokasi kos , arahkan panah dalam map sesuai lokasi *wajib diisi</h6>
                        <v-container fluid>
                            <v-layout row wrap >
                                <v-flex xs12 sm12 lg3 xl3 md3>
                                    <v-text-field
                                        label="masukkan koordinat latitude"
                                        outline
                                        clearable
                                        :rules="[rules.required]"
                                        v-model="lat"
                                        style="max-width:300px;"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 lg3 xl3 md3>
                                    <v-text-field
                                        label="masukkan koordinat longtitude"
                                        outline
                                        clearable
                                        :rules="[rules.required]"
                                        v-model="long"
                                        style="max-width:300px;"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        
                        <v-text-field
                            clearable
                            :rules="[rules.required]"
                            v-model="markerLatLng"
                        ></v-text-field>
                        <v-card height="500px">
                            <l-map style="height: 500px;" :zoom="zoom" :center="center">
                            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                            <l-geo-json :geojson="bicycleAndCampus.geojson" :options="bicycleAndCampus.options"></l-geo-json>
                            <l-marker
                            :lat-lng.sync="markerLatLng"
                            :icon="icon" 
                            :draggable="true"> </l-marker>
                            </l-map>
                        </v-card>

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
                <label>FotoKost
                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                </label>
                <br/>
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
import axios from 'axios'
import Vue from 'vue';
import { LMap, LTileLayer, LGeoJson,LCircle,LMarker,LIcon } from 'vue2-leaflet';
import PopupContent from './MapPopup';
function onEachFeature(feature, layer) {
    let popupContent = Vue.extend(PopupContent);
    let popup = new popupContent({ propsData: { type: feature.geometry.type, text: feature.properties.popupContent }});
    layer.bindPopup(popup.$mount().$el);

    //this methods kanggo hover open pop up
    layer.on('mouseover', function(event){
    layer.openPopup();
    })
}

export default {
    name: 'example',
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        LCircle,
        LMarker,
        LIcon,
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
                    Namakos:"",
                    Alamat:"",
                    Deskripsi:"",
                    LuasKamar:"",
                    Tipekos:"",
                    Tipeharga:"",
                    NominalHarga:"",
                    TipeKmrMandi:"",
                    IDowner: this.$store.state.owner.IDowner,
                    latitude:"",
                    longitude:""
                },
                file: '',
                zoom: 13,
                markerLatLng: [-7.8078382,110.3602943],
                center: [-7.8078382,110.3602943],
                icon: L.icon({
                    iconUrl: 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/67-512.png',
                    iconSize: [50, 50],
                    iconAnchor: [16, 37]
                }),
                url:'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w',
                attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                bicycleAndCampus: {
                    geojson: {
                        "type": "FeatureCollection",
                        "features": [
                    
                        ]
                    },
                    options: {
                    style: function (feature) {
                        return feature.properties && feature.properties.style;
                    },
                    onEachFeature: onEachFeature,
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                        });
                    }
                    }
                },

            }
        },
    mounted(){
        
    },
    computed:{
        lat(){  
            this.inputKos.latitude = String(this.markerLatLng).substring(7,16);
            return this.inputKos.latitude;
        },
        long(){
            this.inputKos.longitude = String(this.markerLatLng).substring(18,28);
            return this.inputKos.longitude;
        }
    },
    methods:{
        addKos(){
            if(this.inputKos.Alamat && this.inputKos.Namakos && this.inputKos.Deskripsi && this.inputKos.LuasKamar && this.inputKos.Tipekos && this.inputKos.Tipeharga && this.inputKos.TipeKmrMandi != null)
            {  
                this.$store.dispatch('addkos',this.inputKos).then(() => {
  // ...        
                var id = this.$store.state.allkos.idkost
                let formData = new FormData();
                formData.append('foto', this.file);
                this.$store.dispatch('uploadfoto',formData)

                })
            
            }
            else{
                alert("Data tidak boleh ada yang kosong")
            }
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
      }
    }
}
</script>

<style>

</style>
