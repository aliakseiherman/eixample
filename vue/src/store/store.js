import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        tenant: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setTenant(state, tenant) {
            state.tenant = tenant
        }
    },
    getters: {
        user: state => state.user,
        tenant: state => state.tenant
    }
})