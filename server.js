/* easy课表 发布页 本地/局域网下载服务器：node server.js */
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const ROOT=__dirname, PORT=8899;
const MIME={'.html':'text/html; charset=utf-8','.apk':'application/vnd.android.package-archive','.png':'image/png','.jpg':'image/jpeg','.js':'text/javascript; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
  let p=decodeURIComponent((req.url||'/').split('?')[0]); if(p==='/')p='/index.html';
  const fp=path.join(ROOT,path.normalize(p).replace(/^([/\\])+/,''));
  if(!fp.startsWith(ROOT)||!fs.existsSync(fp)||fs.statSync(fp).isDirectory()){res.writeHead(404);res.end('Not Found');return;}
  res.writeHead(200,{'Content-Type':MIME[path.extname(fp).toLowerCase()]||'application/octet-stream','Content-Length':fs.statSync(fp).size});
  fs.createReadStream(fp).pipe(res);
}).listen(PORT,'0.0.0.0',()=>{
  console.log('easy课表 发布页服务器已启动，端口 '+PORT);
  console.log('  电脑本机:  http://127.0.0.1:'+PORT);
  const nets=os.networkInterfaces();
  for(const n of Object.keys(nets)) for(const it of (nets[n]||[])) if(it.family==='IPv4'&&!it.internal) console.log('  手机(同一Wi-Fi):  http://'+it.address+':'+PORT);
  console.log('按 Ctrl+C 关闭。');
});