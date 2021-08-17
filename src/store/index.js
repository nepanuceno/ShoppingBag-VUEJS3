import { createStore } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products){
      state.products = products
    },

    loadBag(state, products) {
      state.productsInBag = products
    },

    addToBag (state, product) {
      state.productsInBag.push(product)
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },

    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => item.id != productId )
      state.productsInBag = updatedBag
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    }
  },
  actions: {
    loadProducts ({ commit }) {
      axios
      .get('https://fakestoreapi.com/products')
      .then((result) => {
        commit('loadProducts', result.data)
      }).catch((err) => {
        console.log('Error: ', err)
      });
    },

    loadBag ({commit}) {

      if(localStorage.getItem('productsInBag')) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")))
      }
    },

    addToBag ({ commit }, product) {
      console.log('Clicou lá no component')
      commit('addToBag', product)
    },

    removeFromBag({ commit }, productId) {
      Swal.fire({
        title: 'Deseja remover o ítem do carrinho?',
        text: "Caso se arrependa, você poderá adiciona-lo novamente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!'
      }).then((result) => {
        if (result.isConfirmed) {
          commit('removeFromBag', productId)
          Swal.fire(
            'Removido!',
            'O item foi removido do carrinho',
            'success'
          )
        }
      })
    }
  },
  modules: {
  }
})
