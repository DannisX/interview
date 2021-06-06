import "../axios"

const state = {
    records: [],

}

const getters = {
    records: state => state.records,
}

const mutations = {
    setRecords(state, records) {
        state.records = records
    },

}

const actions = {
    async setCurrentRecords({ commit }) {
        const recordsAll = await axios.get('/records');
        const { records } = recordsAll.data;
        commit('setRecords', records)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}