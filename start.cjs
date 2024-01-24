const UglifyJS = require("uglify-js")
const liveServer = require("live-server")
const fs = require("fs")
const chokidar = require("chokidar")

const srcPath = "src"
const code = {}

const isDirectory = async (path) => {
  try {
    const stats = await fs.promises.lstat(path)
    return stats.isDirectory()
  } catch (error) {
    throw new Error("No such file or Directory")
  }
}


const createTree = async (path) => {
  const data = await fs.promises.readdir(path)
  for (const item of data) {
    const currentLocation = `${path}/${item}`
    const isDir = await isDirectory(currentLocation)
    if (!isDir) {
        code[currentLocation] = fs.readFileSync(currentLocation, "utf8")
        continue
    }
    await createTree(currentLocation)
  }
}


const buildCodeTree = async () => {
  try {
    await createTree(srcPath)
    const result = UglifyJS.minify(code, {
      toplevel: false
    })
    const minifiedBuffer = Buffer.from(result.code)
    fs.writeFile("./public/adv.min.js", minifiedBuffer, (err) => {
      if (err) {
        throw err
      } 
    })
  } catch (error) {
    console.log(error.message)
  }
}

chokidar.watch("./src").on("all", () => {
  buildCodeTree()
})
buildCodeTree()

const liveServerParams = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./public", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  ignore: "scss,my/templates", // comma-separated string for paths to ignore
  file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  mount: [["/components", "./node_modules"]], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [
    function (req, res, next) {
      next()
    },
  ], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}
liveServer.start(liveServerParams)
