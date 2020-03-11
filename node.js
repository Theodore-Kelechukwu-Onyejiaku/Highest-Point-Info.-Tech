const http = require("http");

http.createServer((req, res)=>{
    res.end("Hello Whatzapp")
}).listen(8000, ()=>{
    console.log("Server running successfully")
})