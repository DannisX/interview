import Vue from 'vue'
import Crypto from 'crypto'

const encrypt = data => {
    data = JSON.stringify(data);
    const pubkey = localStorage.getItem('pubkey')

    return Crypto.publicEncrypt(pubkey, Buffer.from(data))
}

const decrypt = data => {
    const pubkey = localStorage.getItem('pubkey')
    return Crypto.publicDecrypt(pubkey, data);
}


export default {
    install(Vue, opts) {
        Vue.prototype.$encrypt = encrypt;
        Vue.prototype.$decrypt = decrypt;
    }
}