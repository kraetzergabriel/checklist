const fs = require("fs")
const http = require("http");
const path = require("path");

const PORT = 8081;

const MIME_TYPES = {
    default: "application/octet-stream",
    html: "text/html; charset=UTF-8",
    js: "application/javascript",
    css: "text/css"
};

const STATIC_PATH = path.join(process.cwd(), "./src");

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
    const paths = [STATIC_PATH, url];
    if (url.endsWith("/")) {
        paths.push("index.html");
    }
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(STATIC_PATH);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : STATIC_PATH + "/404.html";
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);
    return {found, ext, stream};
};

const post = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const jsonData = JSON.parse(body);

        fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), (error) => {
            if (error) {
                res.writeHead(500, {'content-type': 'application/json'});
                res.end(JSON.stringify({message: 'manda esse json certo seu arrombado'}));
            }
        })
    })
}

http
    .createServer(async (req, res) => {
        if (req.method === 'POST') {
            post(req, res)
        }

        const file = await prepareFile(req.url);
        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
        res.writeHead(statusCode, {"Content-Type": mimeType});
        file.stream.pipe(res);
        console.log(`${req.method} ${req.url} ${statusCode}`);
    })
    .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
