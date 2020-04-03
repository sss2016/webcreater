import React from 'react';
import App from '../SSR/App'
const mongoose = require('../utils/mongoose');
// const general = require('./general')
// const moment = require('moment')
// const strlen = require('../utils/tools').strlen
const Design = mongoose.model('Design');
const {renderToString} = require('react-dom/server');
exports.showSSR=(req, res)=>{
    var id = req.params.id;
    var author = req.params.author
    const filds = 'content'
    Design.findOne({
        author:author,
        timestamp:id
    }, filds).then(function(result){
       //  console.log(styles)
       // var r_data =result.toJSON()
       // var text = renderToString(<Container datas={r_data.content} />)
    const content = renderToString(<App datas={result.content}/>);
    res.send(`
          <!doctype html>
          <html>
              <title>ssr</title>
              <head>
                <link rel="stylesheet" type="text/css" href="/ssr/bundle.css" >  
              </head>
              <body>
                  <div id="root">${content}</div>
              </body> 
              <script src="/ssr/bundle.js"></script>
          </html>
      `);
    //    res.json({code:200,content:result.content})
    }).catch(err => {
       res.json({ code: -200, message: err.toString() })
   })
    
}