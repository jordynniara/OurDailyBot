const http = require('http');;

class Server {

    constructor(router, port){

        this.server = http.createServer(function (req, res) {
            req.chunks = [];
            req.on('data', function (chunk) {
              req.chunks.push(chunk.toString());
            });
          
            // error handling
            router.dispatch(req, res, function(err) {
              res.writeHead(err.status, {"Content-Type": "text/plain"});
              res.end(err.message);
            });
          });
        
        this.port = Number(port || 5000);
    }

    serve () {
        // start listening on server
        this.server.listen(this.port);
        console.log('Running on port ' + this.port);
    }

    static ping () {
        this.res.writeHead(200);
        this.res.end("Just a humble bot spreading the Word.");
    }

    // static post () {
    //     const requestMessage = JSON.parse(this.req.chunks[0]);

    //     if(screamo.checkMessage(requestMessage))
    //     {
    //         screamo.screamIt();
    //     }else{
    //         this.res.writeHead(200);
    //         this.res.end();
    //     }
    // }
}
module.exports = Server;