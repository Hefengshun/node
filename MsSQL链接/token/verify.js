const jwt = require('jsonwebtoken'); //使用jwt 来生成或者解密 token
const setting = require('./setting');


const verify = {
    //设置token
    setToken(name, pwd) {
        return new Promise((resolve, reject) => {
            let token = jwt.sign(
                //存储数据，自定义
                { name, pwd },
                //密钥
                setting.token.signKey,
                //过期时间
                { expiresIn: setting.token.signTime }
            )
            resolve(token)
        })
    },
    getToken(token) {
        return new Promise((resolve, reject) => {
            //判断token是否存在
            if (!token) {
                console.log('token不存在');
                reject({ error: 'The token value is empty' })
            } else {
                //jwt.verify 里面传入三个参数第一个 token, 第二个 signKey 就是生成token的密匙 第三个 方法 判断； 是否解密成功
                jwt.verify(token, setting.token.signKey, (err, data) => {
                    if (err) {
                        resolve({
                            state: false,
                            info: 'token 验证失败'
                        });
                    } else {
                        resolve({
                            state: true,
                            info: 'token 验证成功'
                        })
                    }
                })
            }
        })
    }
}
module.exports = verify