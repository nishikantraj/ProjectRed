import http from 'http';
import { app } from './app.js';
import { config } from './config/index.js';

const server = http.createServer(app);

server.listen(config.PORT,()=>{
    console.log(`Server listening on PORT http://localhost:${config.PORT}`);
})