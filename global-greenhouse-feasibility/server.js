const http=require('http');
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'public');
const port=process.env.PORT||3000;
http.createServer(function(req,res){
  if(req.url==='/health'){
    res.writeHead(200,{'Content-Type':'application/json'});
    return res.end(JSON.stringify({status:'ok'}));
  }
  let url=(req.url||'/').split('?')[0];
  if(url==='/')url='/index.html';
  let file=path.join(root,url);
  fs.readFile(file,function(err,data){
    if(err){file=path.join(root,'index.html');data=fs.readFileSync(file);}
    let ext=path.extname(file);
    let type=ext==='.js'?'application/javascript':ext==='.css'?'text/css':'text/html';
    res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-cache'});
    res.end(data);
  });
}).listen(port,function(){console.log('Listening on '+port);});
