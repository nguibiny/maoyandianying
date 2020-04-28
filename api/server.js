const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const app = express();
app.use(bodyParser.json());
// 登陆接口
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password)
    const info = await db.findOne("gbList", {
        username,
        password
    })
    if (info) {
        res.json({
            ok: 1, msg: "登陆成功", user: username
        })
    } else {
        res.json({
            ok: -1,
            msg: "查找不到该用户"
        })
    }
    console.log(info.ok)
})


// 注册
app.post("/zhuce", async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password)
    const data = await db.insertOne("gbList", {
        "username": username,
        "password": password,
        addTime: Date.now()
    })
    res.json({
        ok: "1",
        msg: "注册成功", data
    })
})

//关注
app.post("/guanzhu", async (req, res) => {
    // celebrityName: "蔡依林"   celebrityId: 406976   headUrl: "https://p0.meituan.net/moviemachine/f3301599b4e89fe2bb25132d477de191132449.png"
    const { celebrityId, celebrityName, headUrl, id } = req.body;
    if (await db.findOne("gzList", { 'celebrityId': celebrityId, "ok": '1' })) {
        db.deleteOneById("gzList", { "celebrityId": celebrityId })
        res.json({
            ok: "2",
            msg: "取消关注"
        })
    } else {
        const data = await db.insertOne("gzList", {
            "celebrityId": celebrityId,
            "celebrityName": celebrityName,
            "headUrl": headUrl,
            "ok": '1',
            "id": id

        })
        res.json({
            ok: "1",
            msg: "关注成功",
            data
        })
    }
})

//查看是否关注

app.post("/sfguanzhu", async (req, res) => {

    const { id } = req.body;
    // console.log(celebrityId)
    if (await db.findOne("gzList", { "id": id })) {
        res.json({
            ok: "1",
            msg: "以关注"
        })
    } else {
        res.json({
            ok: "2",
            msg: "未关注"
        })
    }
})

//我的关注内容
app.post("/wdguanzhu", async (req, res) => {
    const data = await db.find("gzList")
    res.json({
        data
    })
})

///////////////////////////////////

// 收藏shoucang
app.post("/shoucang", async (req, res) => {
    const { Id, imgUrl, idName } = req.body;
    if (await db.findOne("scList", { 'Id': Id })) {
        db.deleteOneById("scList", { "Id": Id })
        res.json({
            ok: "2",
            msg: "取消收藏"
        })
    } else {
        const data = await db.insertOne("scList", {
            "Id": Id,
            "imgUrl": imgUrl,
            "idName": idName

        })
        res.json({
            ok: "1",
            msg: "收藏成功",
            data
        })
    }
})

//查看是否收藏
app.post("/sfshoucang", async (req, res) => {

    const { Id } = req.body;
    if (await db.findOne("scList", { "Id": Id })) {
        res.json({
            ok: "1",
            msg: "以收藏"
        })
    } else {
        res.json({
            ok: "2",
            msg: "收藏"
        })
    }
})


//我的收藏的内容
app.post("/wdshoucang", async (req, res) => {
    const data = await db.find("scList")
    res.json({
        data
    })
})

app.listen(80, function () {
    console.log("success");
})