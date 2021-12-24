<template>
  <div style="margin-bottom: 50px">
    <div
      class="display-3 ma-15 black--text"
      style="text-align: center; font-family: 'Signika Negative', sans-serif"
      font-weight-bold
    >
      Form
      <form>
        <v-text-field
          v-model="nama"
          :error-messages="namaErrors"
          :counter="30"
          label="Nama"
          required
          @input="$v.nama.$touch()"
          @blur="$v.nama.$touch()"
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="nik"
          :error-messages="nikErrors"
          label="NIK"
          :counter="16"
          required
          @input="$v.nik.$touch()"
          @blur="$v.nik.$touch()"
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="kk"
          :counter="16"
          :error-messages="kkErrors"
          label="Nomor Kartu Keluarga"
          required
          @input="$v.kk.$touch()"
          @blur="$v.kk.$touch()"
        ></v-text-field>

        <v-file-input
          v-model="ktp"
          :rules="rules"
          accept="image/png, image/jpeg, image/jpg, image/bmp"
          placeholder="Pilih file"
          prepend-icon="mdi-file"
          label="Foto KTP"
        ></v-file-input>

        <v-file-input
          v-model="fotokk"
          :rules="rules"
          accept="image/png, image/jpeg, image/jpg, image/bmp"
          placeholder="Pilih file"
          prepend-icon="mdi-file"
          label="Foto Kartu Keluarga"
        ></v-file-input>

        <v-text-field
          type="number"
          v-model="umur"
          :error-messages="umurErrors"
          label="Umur"
          required
          @input="$v.umur.$touch()"
          @blur="$v.umur.$touch()"
        ></v-text-field>

        <v-select
          v-model="selectedJenis"
          :items="items"
          label="Jenis Kelamin"
        ></v-select>

        <v-select
          v-model="selectedProvinsi"
          :items="provinsi"
          item-text="nama"
          item-value="id"
          persistent-hint
          single-line
          return-object
          label="Provinsi"
          @change="selectKota()"
        ></v-select>

        <v-select
          :items="kota"
          label="Kab/Kota"
          v-model="selectedKota"
          item-text="nama"
          item-value="id"
          persistent-hint
          single-line
          return-object
          @change="selectKecamatan()"
        ></v-select>

        <v-select
          :items="kecamatan"
          label="Kecamatan"
          v-model="selectedKecamatan"
          item-text="nama"
          item-value="id"
          persistent-hint
          single-line
          return-object
          @change="selectKelurahan()"
        ></v-select>

        <v-select
          :items="kelurahan"
          label="Kelurahan/Desa"
          v-model="selectedKelurahan"
          item-text="nama"
          item-value="id"
          persistent-hint
          single-line
          return-object
        ></v-select>

        <v-text-field
          v-model="alamat"
          :error-messages="alamatErrors"
          :counter="255"
          label="Alamat"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-container>
          <v-row>
            <v-col cols="6" md="4">
              <v-text-field
                v-model="rt"
                :error-messages="rtErrors"
                label="RT"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="4">
              <v-text-field
                v-model="rw"
                :error-messages="rtErrors"
                label="RW"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-text-field
          type="number"
          v-model="penghasilansebelum"
          :error-messages="penghasilanErrors"
          label="Penghasilan Sebelum Pandemi"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="penghasilansesudah"
          :error-messages="penghasilansdhErrors"
          label="Penghasilan Sesudah Pandemi"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-select
          v-model="alasan"
          :items="alasanitems"
          item-text="state"
          item-value="id"
          label="Alasan membutuhkan bantuan"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-text-field
          v-if="alasan.id == 4"
          v-model="lainnya"
          :error-messages="lainnyaErrors"
          label="Alasan lain..."
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  between,
  minLength,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Form",
  mixins: [validationMixin],

  validations: {
    nama: { required, maxLength: maxLength(30) },
    nik: { required, maxLength: maxLength(16) },
    kk: { required, maxLength: maxLength(16) },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
    umur: { required, between: between(20, 30) },
  },

  data: () => ({
    nama: "",
    nik: "",
    rules: [
      (value) =>
        !value || value.size < 2000000 || "Ukuran foto harus kurang dari 2 MB!",
    ],
    select: null,
    items: ["Laki-Laki", "Perempuan"],
    ktp: "",
    fotokk: "",
    selectedJenis: null,
    selectedProvinsi: null,
    selectedKota: null,
    selectedKecamatan: null,
    selectedKelurahan: null,
    alasanitems: [
      { state: "Kehilangan pekerjaan", id: "1" },
      { state: "Kepala keluarga terdampak atau korban Covid-19", id: "2" },
      { state: "Tergolong fakir/miskin semenjak sebelum Covid-19", id: "3" },
      { state: "Lainnya", id: "4" },
    ],
    alasan: { state: "", id: "0" },
    lainnya: "",
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    namaErrors() {
      const errors = [];
      if (!this.$v.nama.$dirty) return errors;
      !this.$v.nama.maxLength &&
        errors.push("Nama maksimal terdiri dari 30 karakter");
      !this.$v.nama.required && errors.push("Nama tidak boleh kosong");
      return errors;
    },
    nikErrors() {
      const errors = [];
      if (!this.$v.nik.$dirty) return errors;
      !this.$v.nik.maxLength &&
        errors.push("NIK maksimal terdiri dari 16 karakter");
      !this.$v.nik.required && errors.push("NIK tidak boleh kosong");
      return errors;
    },
    kkErrors() {
      const errors = [];
      if (!this.$v.kk.$dirty) return errors;
      !this.$v.kk.maxLength &&
        errors.push("Nomor Kartu Keluarga maksimal terdiri dari 16 karakter");
      !this.$v.kk.required &&
        errors.push("Nomor Kartu Keluarga tidak boleh kosong");
      return errors;
    },
    umurErrors() {
      const errors = [];
      if (!this.$v.umur.$dirty) return errors;
      // !this.$v.umur.minLength &&
      //   errors.push("Nomor Kartu Keluarga maksimal terdiri dari 16 karakter");
      !this.$v.umur.required && errors.push("Umur tidak boleh kosong!");
      return errors;
    },
    ...mapState(["provinsi"]),
    ...mapState(["kota"]),
    ...mapState(["kecamatan"]),
    ...mapState(["kelurahan"]),
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.umur < 25) {
        Swal.fire("Mohon maaf!", "Umur harus lebih dari 24 tahun!", "error");
      } else {
        Swal.showLoading();
        setTimeout(() => {
          let data = {};
          data["nama"] = this.nama;
          data["nik"] = this.nik;
          data["kk"] = this.kk;
          data["ktp"] = this.ktp;
          data["fotokk"] = this.fotokk;
          data["umur"] = this.umur;
          data["jeniskelamin"] = this.selectedJenis;
          data["provinsi"] = this.selectedProvinsi;
          data["kota"] = this.selectedKota;
          data["kecamatan"] = this.selectedKecamatan;
          data["kelurahan"] = this.selectedKelurahan;
          data["alamat"] = this.alamat;
          data["rt"] = this.rt;
          data["rw"] = this.rw;
          data["penghasilansebelum"] = this.penghasilansebelum;
          data["penghasilansesudah"] = this.penghasilansesudah;
          data["alasan"] = this.alasan;
          this.$store.dispatch("dataUser", data);
          Swal.close();
          this.$router.push("/preview");
        }, 1500);
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
    selectKota() {
      this.$store.dispatch("kota", this.selectedProvinsi);
    },
    selectKecamatan() {
      this.$store.dispatch("kecamatan", this.selectedKota);
    },
    selectKelurahan() {
      this.$store.dispatch("kelurahan", this.selectedKecamatan);
    },
  },

  beforeCreate: function () {
    this.$store.dispatch("provinsi");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Festive&family=Raleway:wght@600&family=Signika+Negative&family=Yanone+Kaffeesatz&display=swap");
</style>