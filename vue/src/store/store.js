import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        flavor: '',
        user: null,
        tenant: null
    },
    mutations: {
        change(state, flavor) {
            state.flavor = flavor
        },
        setUser(state, user) {
            state.user = user
        },
        setTenant(state, tenant) {
            state.tenant = tenant
        }
    },
    getters: {
        flavor: state => state.flavor,
        user: state => state.user,
        tenant: state => state.tenant
    }
})