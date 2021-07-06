const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const { HOST, PORT } = require('./config/config.default')

const errorHandler = require('./middleware/errorHandler');
require('./model')

const router = require('./router')
const app = express();

app.use(express.json());
// 日志输出
app.use(morgan("dev"))
// 跨域
app.use(cors())
app.use('/static', express.static('public'))
// 端口设置
const port = PORT || 3000

// 路由使用
app.use('/api', router);

app.get('/api/publickey', (req, res, next) => {
    const data = fs.readFileSync(path.join(__dirname, './RSA/rsa_public.key.pem'), 'utf8');
    res.status(200).send(data);
})

//错误处理中间件 
app.use(errorHandler());


app.listen(PORT, () => {
    console.log(`\nServer is now running at  ${HOST}:${port}/\n`);
})