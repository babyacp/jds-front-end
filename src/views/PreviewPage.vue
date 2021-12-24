<template>
  <div style="margin-bottom: 50px">
    <div
      class="display-3 ma-15 black--text"
      style="text-align: center; font-family: 'Signika Negative', sans-serif"
      font-weight-bold
    >
      <v-text-field
        v-model="dataUser.nama"
        :disabled="true"
        label="Nama"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.nik"
        :disabled="true"
        label="NIK"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.kk"
        :disabled="true"
        label="Nomor Kartu Keluarga"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.umur"
        :disabled="true"
        label="Umur"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.jeniskelamin"
        :disabled="true"
        label="Jenis Kelamin"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.provinsi.nama"
        :disabled="true"
        label="Provinsi"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.kota.nama"
        :disabled="true"
        label="Kab/Kota"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.kecamatan.nama"
        :disabled="true"
        label="Kecamatan"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.kelurahan.nama"
        :disabled="true"
        label="Kelurahan"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.alamat"
        :disabled="true"
        label="Alamat"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.rt"
        :disabled="true"
        label="RT"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.rw"
        :disabled="true"
        label="RW"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.penghasilansebelum"
        :disabled="true"
        label="Penghasilan sebelum pandemi"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.penghasilansesudah"
        :disabled="true"
        label="Penghasilan setelah pandemi"
      ></v-text-field>
      <v-text-field
        v-model="dataUser.alasan.state"
        :disabled="true"
        label="Alasan membutuhkan bantuan"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PreviewPage",
  data() {
    return {
      nama: "gjjj",
    };
  },
  computed: {
    ...mapState(["dataUser"]),
  },
};
</script>

<style>
</style>