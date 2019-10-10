const util = require('ethereumjs-util')

/**
 * 
 * @param {*} txHash  待签名hash
 * @param {*} priKey 私钥
 */
const signTxData = (txHash, priKey) => {
    let secret = Buffer.from(priKey, 'hex')
    let msgb = Buffer.from(txHash, 'hex')
    const rsv = util.ecsign(msgb, secret)
    let { r, s, v } = rsv

    //this is what we should do to grasp data from sign and send it to SDK
    let pkbuf = util.ecrecover(msgb, v, r, s)

    let tx = 'EC:01,' + pkbuf.toString('hex') + ',' + r.toString('hex') + s.toString('hex') + ':'
    //EC:01,D0DE0AAEAEFAD02B8BDC8A01A1B8B11C696BD3D66A2C5F10780D95B7DF42645CD85228A6FB29940E858E7E55842AE2BD115D1ED7CC0E82D934E929C97648CB0A,B9A10C29CB6686B4EA46196E9FEB8A6D249BFA925E5E925618EE2F320F55DFC2CA4590B2D5EB39B8802E139B9643ADA4D137BE3F80ABC75B12A7687EA8A4A664:
    console.log(tx)
    return tx
}

// 私钥
const prikey = '0C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D'

// 公钥格式：椭圆曲线 X（hex） + Y （hex）
const puk = 'D0DE0AAEAEFAD02B8BDC8A01A1B8B11C696BD3D66A2C5F10780D95B7DF42645CD85228A6FB29940E858E7E55842AE2BD115D1ED7CC0E82D934E929C97648CB0A'

// 待签名hash
const hash = 'E2F09185E95F6C3801EAAC37082CC8A67940941DB46940D5875E2FD1790D54A9'

signTxData(hash, priKey)
