const state = {
    isLogin: false
}

const getters = {
    isLogin: state => state.isLogin || sessionStorage.getItem('isLogin') == 'true'
}

const mutations = {
    setLogStatus(state, status) {
        if (status) {
            state.isLogin = status
            sessionStorage.setItem('isLogin', status)
        } else {
            state.isLogin = null
            sessionStorage.removeItem('isLogin')
        }
    }
}

const actions = {
    setCurrentLogStatus({ commit }, status) {
        commit('setLogStatus', status)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}