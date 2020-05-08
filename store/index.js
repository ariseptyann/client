// import axios from "~/plugins/axios";
import axios from 'axios'

const baseURL = 'https://my-json-server.typicode.com/ariseptyann/api/';

export const state = () => ({
  countries: []
})

export const mutations = {
  setData(state, items) {
    state.countries = items
  },

  addData(state, item) {
    state.countries.push(item)
  },

  removeData(state, id) {
    //menghapus di bagian javascript/tampilan
    const foundIndex = state.countries.findIndex(p => p.id === id)
    state.countries.splice(foundIndex, 1)
  },

  updateData(state, data) {
    const foundItem = state.countries.find(p => p.id === data.id)
    foundItem.name = data.name
  }
}

export const actions = {
  async nuxtServerInit({
    commit
  }) {
    const res = await axios({
      method: 'get',
      url: baseURL + 'negara'
    })
    commit('setData', res.data)
  },


  async submitData({
    commit
  }, name) {
    const res = await axios({
      method: 'post',
      url: baseURL + 'negara',
      data: {
        name: name
      }
    })
    commit('addData', res.data)
  },

  async removeData({
    commit
  }, id) {
    const res = await axios({
      method: 'delete',
      url: baseURL + 'negara/' + id
    })
    // const res = await axios.delete('negara/' + id)
    commit('removeData', id)
  },

  async getData({
    commit
  }, id) {
    const res = await axios({
      method: 'get',
      url: baseURL + 'negara/' + id
    })
    // const res = await axios.get('negara/' + id)
    return res.data
  },

  async updateData({
    commit
  }, data) {
    const res = await axios({
      method: 'put',
      url: baseURL + 'negara/' + data.id,
      data: {
        name: data.name
      }
    })
    // const res = await axios.put('negara/' + data.id, {
    //   name: data.name
    // })
    commit('updateData', data)
  }
}
