<template>
<v-app>
    <h1>Masukan Data: </h1>
  <v-form style="margin: 30px"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="adduser.username"
      :counter="50"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="adduser.password"
      :counter="50"
      :type="show2 ? 'text' : 'password'"
      :rules="nameRules"
      label="Password"
      required
    ></v-text-field>
    <v-text-field
      v-model="adduser.namaUser"
      :counter="50"
      :rules="nameRules"
      label="Nama"
      required
    ></v-text-field>
    <v-text-field
      v-model="adduser.email"
      :counter="50"
      :rules="nameRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="adduser.telepon"
      :counter="50"
      :rules="nameRules"
      label="Telepon"
      required
    ></v-text-field>
    <v-text-field
      v-model="adduser.kotaAsal"
      :counter="50"
      :rules="nameRules"
      label="Kota Asal"
      required
    ></v-text-field>
    <v-text-field
      v-model="adduser.instansi"
      :counter="50"
      :rules="nameRules"
      label="Instansi"
      required
    ></v-text-field>
<v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Tanggal Lahir"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="adduser.ttl" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      




    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>

  </v-form>
   <kaki></kaki>
  </v-app>
</template>
<script>
import kaki from './Footer.vue'
export default {
      components:{
      kaki
  },
  data(){
      return{
          adduser:{
        username:'',
		password:'',
		namaUser:'',
		ttl:new Date().toISOString().substr(0, 10),
		email:'',
		telepon:'',
		kotaAsal:'',
		instansi:''
          },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,








        valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false

      }
  },
   methods: {
       validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        console.log(this.adduser)
        this.$store.dispatch('adduser',this.adduser)
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    }
}
</script>

<style>

</style>
