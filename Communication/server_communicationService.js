const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 6400

http.listen(PORT,()=>{
    console.log('Listening on port' + PORT)
})

app.use(
    express.urlencoded(
        {
            extended: true 
        }
    )
)
app.use(express.json()) ;

var resultArray = [] ;

app.post('/communication', (req, res) => {
    var jsonData = JSON.parse(JSON.stringify(req.body));
    console.log("Thanks, I got the resultsArray");
    resultArray = jsonData.results;
    if(resultArray.length!=0){
        console.log(resultArray.length);
    }
})

//Socket
const io = require('socket.io')(http)

io.on("connection", (socket) => {
    console.log("Connected(Communication)....")
    setInterval(()=>{
        socket.emit('result', resultArray)
    }, 5000) ;
})
