import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    provinsi: [],
    kota: [],
    kecamatan: [],
    kelurahan: [],
    dataUser: {}
  },
  mutations: {
    SET_PROVINSI(state, payload) {
      state.provinsi = payload
    },
    SET_KOTA(state, payload) {
      state.kota = payload
    },
    SET_KECAMATAN(state, payload) {
      state.kecamatan = payload
    },
    SET_KELURAHAN(state, payload) {
      state.kelurahan = payload
    },
    SET_DATAUSER(state, payload) {
      state.dataUser = payload
    }
  },
  actions: {
    provinsi(context, payload) {
      axios({
        url: 'https://dev.farizdotid.com/api/daerahindonesia/provinsi',
        method: 'GET'
      })
        .then(response => {
          context.commit('SET_PROVINSI', response.data.provinsi)
        })
        .catch(error => {
          console.log(error)
        })
    },

    kota(context, payload) {
      axios({
        url: `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${payload.id}`,
        method: 'GET'
      })
        .then(response => {
          context.commit('SET_KOTA', response.data.kota_kabupaten)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    kecamatan(context, payload) {
      axios({
        url: `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${payload.id}`,
        method: 'GET'
      })
        .then(response => {
          context.commit('SET_KECAMATAN', response.data.kecamatan)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    kelurahan(context, payload) {
      axios({
        url: `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${payload.id}`,
        method: 'GET'
      })
        .then(response => {
          context.commit('SET_KELURAHAN', response.data.kelurahan)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    dataUser(context, payload) {
      context.commit('SET_DATAUSER', payload)
    }


  },
  modules: {
  }
})
