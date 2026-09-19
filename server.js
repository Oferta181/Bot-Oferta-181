const http=require("node:http");
const fs=require("node:fs");
const path=require("node:path");
const port=Number(process.env.PORT||3000);
const index=fs.readFileSync(path.join(__dirname,"index.html"));
const server=http.createServer((req,res)=>{
  if(req.url==="/health"){
    res.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"});
    return res.end(JSON.stringify({ok:true,service:"flow181-integration-setup"}));
  }
  if(req.url!=="/" && !req.url.startsWith("/?")){
    res.writeHead(302,{location:"/"});
    return res.end();
  }
  res.writeHead(200,{
    "content-type":"text/html; charset=utf-8",
    "cache-control":"no-store, no-cache, must-revalidate",
    "x-content-type-options":"nosniff",
    "referrer-policy":"no-referrer",
    "permissions-policy":"camera=(), microphone=(), geolocation=()",
    "content-security-policy":"default-src 'self'; connect-src 'self' https://tmrbhpanbebhnkemsamh.supabase.co; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"
  });
  res.end(index);
});
server.listen(port,"0.0.0.0",()=>console.log("Flow 181 setup online on",port));
