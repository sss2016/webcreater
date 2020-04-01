const mongoose = require('../utils/mongoose')
const general = require('./general')
const moment = require('moment')
const strlen = require('../utils/tools').strlen
const Design = mongoose.model('Design')
// const { list} = general
exports.addNewDesign=(req, res)=>{
    const {d_name,content} = req.body
    console.log(d_name)
    const userid = req.cookies.username || req.headers.username
    return Design.createAsync({
        author:userid,
        d_name:d_name,
        author_name:'默认用户',
        content:content,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    })
        .then(() => {
            res.json({ code: 200, message: '保存成功!', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}
exports.getDesignByAuthorAndId=(req,res)=>{

    const filds = 'content'
    let referer= req.headers.referer.substr(8)
    let paths = referer.split('/')
    let [author,id] = [paths[2]||null,paths[3]||null]
    console.log(author,id)
    Design.findOne({
         author:author,
         timestamp:id
     }, filds).then(function(result){
        //  console.log(styles)
        // var r_data =result.toJSON()
        // var text = renderToString(<Container datas={r_data.content} />)
        console.log(result.content)
        res.json({code:200,content:result.content})
     }).catch(err => {
        res.json({ code: -200, message: err.toString() })
    })
}
exports.getDesigns=(req, res)=>{
    // const { by, id, key } = req.query
    const username = req.cookies.username || req.headers.username
    let { limit, page } = req.query
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const data = {
            is_delete: 0,
            author:username
        },
        skip = (page - 1) * limit
    // if (id) {
    //     data.author = id
    // }
    // if (key) {
    //     const reg = new RegExp(key, 'i')
    //     data.title = { $regex: reg }
    // }
    let sort = '-update_date'
    // if (by) {
    //     sort = '-' + by
    // }

    const filds = 'd_name author_name creat_date update_date'

    Promise.all([
        Design.find(data, filds)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(),
            Design.countDocumentsAsync(data)
    ])
        .then(([data, total]) => {
            const totalPage = Math.ceil(total / limit)
            // const user_id = req.cookies.userid || req.headers.userid
            const json = {
                code: 200,
                data: {
                    total,
                    hasNext: totalPage > page ? 1 : 0,
                    hasPrev: page > 1
                }
            }
            // if (user_id) {
            //     data = data.map(item => {
            //         item._doc.like_status = item.likes && item.likes.indexOf(user_id) > -1
            //         item.content = item.content.substring(0, 500) + '...'
            //         item.likes = []
            //         return item
            //     })
            //     json.data.list = data
            //     res.json(json)
            // } else {
            //     data = data.map(item => {
            //         item._doc.like_status = false
            //         item.content = item.content.substring(0, 500) + '...'
            //         item.likes = []
            //         return item
            //     })
                json.data.list = data
                res.json(json)
            // }
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })

}