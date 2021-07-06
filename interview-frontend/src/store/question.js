import axios from "axios"
import CONFIG from "../config"
const state = {
    questions: [],
    total: 0,
    currentQsIndex: 0,
    currentQuestion: {}
}


const getters = {
    questions: state => state.questions,
    total: state => state.total,
    currentQsIndex: state => state.currentQsIndex,
    currentQuestion: state => state.currentQuestion
}

const mutations = {
    setQuestions(state, questions) {
        state.questions = questions;
    },
    setTotal(state, total) {
        state.total = total;
    },
    setCurrentIndex(state, currentIndex) {
        state.currentQsIndex = currentIndex
    },
    setCurrentQuestion(state, currentQuestion) {
        state.currentQuestion = currentQuestion
    }
}


const actions = {
    async setCurrentQuestions({ commit }) {
        // const data = await axios.get(`http://192.168.3.232:3000/api/questions/all`);
        const data = await axios.get(`${CONFIG.HOST}:${CONFIG.PORT}/api/questions/all`);
        commit('setQuestions', data.data.questions);
        commit('setTotal', data.data.total)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}