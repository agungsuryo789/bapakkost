import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);
import VuexPersist from 'vuex-persistedstate';
import router from '../router'

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

// import swal from 'sweetalert2/dist/sweetalert2.min.js'
// import 'sweetalert2/dist/sweetalert2.min.css'
export const axs = axios.create({
    baseURL: 'http://localhost'
});
axs.interceptors.request.use(
    (config) => {
        let token = window.sessionStorage.getItem("token")
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axs.interceptors.response.use(
    (config) => {
        let token = window.sessionStorage.getItem("token")
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
const vuexSession = new VuexPersist({
    key: 'pReSikfjdsksj',
    storage: window.sessionStorage,
    reducer: state => ({
       user: state.user,
       owner: state.owner,
       allkos: state.allkos,
       idkos: state.idkos,
       detailKosByID: state.detailKosByID,
       detailKosByOwner: state.detailKosByOwner,
       bookingdata: state.bookingdata,
       bookingAll: state.bookingAll,
       isBooked: state.isBooked,
       cancelBookData:state.cancelBookData,
       detailKos:state.detailKos,
       new_user: state.new_user
    })
})
export const store= new Vuex.Store({
    plugins: [vuexSession],
    state: {
        user: {},
        owner:{},
        allkos: [],
        detailKosByID:{},
        detailKos:{},
        idkos:'',
        detailKosByOwner:[],
        bookingdata:{},
        bookingAll:[],
        isBooked:{},
        cancelBookData:{},
        new_user:{}
    },
    mutations: {   
        //2
        login_mutation: (state, response) => {
            state.user = response
            sessionStorage.setItem("tokenUser", response.token)
            router.push('/')
        },
        logout_mutation: (state) => {
            state.user = {}
            router.push('/')
            state.$destroy
        },
        cari_mutation: (state, response) => {
            state.allkos = response
        },
        get_all_kos: (state, response) => {
            state.allkos = response
        },
        loginOwner_mutation: (state, response) => {
            state.owner = response
            sessionStorage.setItem("tokenOwner", response.token)
            router.push('/ownerpage')
        },
        addkos_mutation: (state, response) => {
            state.allkos = response
            router.push('/ownerpage')
            alert('Input berhasil')
        },
        getKosByID_mutation: (state, response) => {
            state.detailKosByID = response
        },
        getKosByOwner_mutation: (state, response) => {
            state.detailKosByOwner = response
            console.log(response)
        },
        booking_mutation: (state, response) => {
            state.bookingdata = response
            console.log(response)
            router.push('/')
            alert('Data anda sudah tersimpan , Silahkan selesaikan proses transfer , Jika proses transfer sudah selesai , akan ada verifikasi dari admin')
        },
        getBookingAll_mutation: (state, response) => {
            state.bookingAll = response
        },
        approveBook_mutation: (state, response) => {
            state.isBooked = response
            alert('Update berhasil')
        },
        cancelbook_mutation: (state, response) => {
            state.cancelBookData = response
            alert('Booking canceled')
        },
        updateKos_mutation: (state, response) => {
            state.allkos = response
            alert('iklan terupdate')
            router.push('/ownerpage')
        },
        hapusKos_mutation: (state, response) => {
            state.detailKosByID = response
            alert('iklan terhapus')
        },
        adduser_mutation: (state, response) => {
            state.detailKosByID = response
            alert('iklan terhapus')
        },
    },

    actions: {
        //1
        loginUser: ({commit, state}, auth) => {
            //LOADING HERE
            // commit('showSwallLoad');
            axs.post('/loginuser', auth)
                .then(response => {
                    commit('login_mutation', response.data)
                })    
        },
        logout:({commit, state}, auth) => {
                    commit('logout_mutation')
        },
        cariKos: ({commit, state},cari) => {
            axs.get('/api/users/datakostByAddress/'+cari)
                .then(response => {
                    commit('cari_mutation',response.data.results);
                })    
        },
        get_all:({commit,state}) =>{
            axs.get('/api/users/datakost')
                .then(response => {
                commit('get_all_kos',response.data.results);
            })
        },
        loginOwner: ({commit, state}, authOwner) => {
            axs.post('/loginowner', authOwner)
                .then(response => {
                    commit('loginOwner_mutation', response.data)
                    //console.log(response.data)
                    // store.dispatch('getAll')
                })    
        },
        addkos: ({commit, state}, inputKos) => {
            console.log(inputKos)
            axs.post('/api/owner/addkost', inputKos)
                .then(response => {
                    commit('addkos_mutation', response.data)
                })                    
        },
        uploadfoto: ({commit, state}, formdata) => {
            console.log(state.allkos.idkost)
            axs.post('/uploadfoto/'+state.allkos.idkost, formdata)
                .then(response => {
                    console.log("sucess")
                })                    
        },
        insertfoto: ({commit, state}, inputKos) => {
            axs.post('/api/owner/addkost', inputKos)
                .then(response => {
                    commit('addkos_mutation', response.data)
                    
                })    
                
        },
        getkosByID: ({commit, state},idkos) => {
            axs.get('/api/users/datakostById/'+idkos)
                .then(response => {
                    commit('getKosByID_mutation',response.data);
                })    
        },
        getkosByIDOwner: ({commit, state},idowner) => {
            axs.get('/api/owner/datakostByIdOwner/'+idowner)
                .then(response => {
                    commit('getKosByOwner_mutation',response.data.results);
                })
        },
        sendBooking: ({commit, state}, sendBook) => {
            axs.post('/api/owner/booking', sendBook)
                .then(response => {
                    commit('booking_mutation', response.data)
                    console.log(response.data)
                })    
        },
        getBookingAll: ({commit, state}) => {
            axs.get('/api/admin/booking')
                .then(response => {
                    commit('getBookingAll_mutation',response.data.results)
                    console.log(response.data.results)
                })    
        },
        approvedBooking: ({commit, state},idbooking) => {
            axs.post('/api/admin/approvedBooking/'+idbooking)
                .then(response => {
                    commit('approveBook_mutation', response.data)
                    console.log(response.data)
                })    
        },
        logout_owner: ({commit, state}) => {
            window.sessionStorage.clear()
            router.push('/')
        },
        cancelBooking: ({commit, state},idbook) => {
            axs.post('/api/admin/cancelbooking',idbook)
                .then(response => {
                    commit('cancelbook_mutation', response.data)
                })    
        },
        hapusKos: ({commit, state},idkoshapus) => {
            axs.post('/api/owner/updateStatus',idkoshapus)
                .then(response => {
                    commit('hapusKos_mutation', response.data)
                })    
        },
        updateKos: ({commit, state},idkoss) => {
            axs.post('/api/owner/updatekost',idkoss)
                .then(response => {
                    commit('updateKos_mutation', response.data)
                })    
        },
        adduser: ({commit, state},new_user)=> {
            axs.post('/api/users/add',new_user)
                .then(response => {
                    if(response.data.status == "success"){
                        alert('data berhasil disimpan')
                    }
                })    
        },

    }
})
