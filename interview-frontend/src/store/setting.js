const state = {
    recite: false,
    queryOpts: {
        page: 1,
        limit: 8,
        type: "",
        sortby: "_id",
        order: -1,
        title: ""
    }
}

const getters = {
    recite: state => state.recite,
    queryOpts: state => state.queryOpts,
    queryPage: state => state.queryOpts.page,
    queryLimit: state => state.queryOpts.limit,
    queryType: state => state.queryOpts.type,
    querySortby: state => state.queryOpts.sortby,
    queryOrder: state => state.queryOpts.order,
    queryTitle: state => state.queryOpts.title
}

const mutations = {
    setRecite(state, recite) {
        state.recite = recite
    },
    setQueryOpts(state, queryOpts) {
        state.queryOpts = queryOpts
    },
    setQueryPage(state, queryPage) {
        state.queryOpts.page = queryPage
    },
    setQueryLimit(state, queryLimit) {
        state.queryOpts.limit = queryLimit
    },
    setQueryType(state, queryType) {
        state.queryOpts.type = queryType
    },
    setQuerySortby(state, querySortby) {
        state.queryOpts.sortby = querySortby
    },
    setQueryOrder(state, queryOrder) {
        state.queryOpts.order = queryOrder
    },
    setQueryTitle(state, queryTitle) {
        state.queryOpts.title = queryTitle
    },

}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}