//login.js
const express = require('express');
const db = require('../sql/mssql.js');
const moment = require('moment');
const router = express.Router();
const verigy = require('../token/verify');
const setting = require('../token/setting.js');



// get 请求
router.get('/api', (req, res) => {
    console.log('token时间没过');
    res.send({ code: 200 })
    return;
});

/* GET log page. */
router.get('/login', (req, res, next) => {
    // console.log(req.query);
    // let isExist = false
    // db.selectAll('admin', function (err, result) {//查询所有userInfo表的数据
    //     result.recordset.forEach(element => {
    //         console.log(element);
    //         if (element.username == req.query.username) {
    //             isExist = true
    //         }
    //     });
    //     isExist && res.send({ data: result.recordset, code: '用户已存在' })
    //     //放里面是应为异步要走完执行
    //     !isExist && db.addUser(req.query, 'admin', function (err, result) {
    //         res.send({ data: result.recordset, code: '添加成功' })
    //     })
    //     // console.log(err, result);
    //     // res.send(result.recordset)
    //     // res.render('userInfo', { results: result.recordset, moment: moment });
    // });
    console.log(req, res,);
    verigy.getToken(req.query.token).then(data => {
        // 有些请求是需要登录状态的 所以验证token
        // 验证 data.state >>> true Or false
        console.log(data.state);
        data.state ?
            (res.send({
                status: 0,
                msg: '可以访问'
            })) :
            (res.send({
                status: -1,
                msg: '请登录'
            }));
    })

});
router.post('/login', function (req, res, next) {
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })
    req.on('end', function () {
        data = JSON.parse(data);
        req.params = data
    })
    db.selectAll('admin', function (err, result) {//查询所有userInfo表的数据
        console.log(req.params);
        console.log(req.body, '设置token');
        let isExist = false
        result.recordset.forEach(element => {
            // console.log(element);
            if (element.username == req.params.username && element.password == req.params.password) {
                isExist = true
            }
        });
        if (isExist) {
            verigy.setToken(req.params.username, req.params.password).then(async (token) => {
                return res.send({
                    status: 0,
                    msg: 'success',
                    token,
                    signTime: setting.token.signTime,
                    code: 200
                })
            })
            // res.send({ data: result.recordset, code: '登陆成功' })
        } else {
            res.send({ data: result.recordset, code: '用户存在||请先组测||密码不正确' })
        }
        // isExist == true ? res.send({ data: result.recordset, code: '200' }) : res.send({ data: result.recordset, code: '用户存在||请先组测||密码不正确' })
        // res.render('userInfo', { results: result.recordset, moment: moment });
    });
});
router.post('/delete', function (req, res, next) {//删除一条id对应的userInfo表的数据
    console.log(req.body, 77);
    const { UserId } = req.body
    const id = UserId
    db.del("where id = @id", { id: id }, "userInfo", function (err, result) {
        console.log(result, 66);
        res.send('ok')
    });
});
router.post('/update/:id', function (req, res, next) {//更新一条对应id的userInfo表的数据
    var id = req.params.id;
    var content = req.body.content;
    db.update({ content: content }, { id: id }, "userInfo", function (err, result) {
        res.redirect('back');
    });
});

module.exports = router;