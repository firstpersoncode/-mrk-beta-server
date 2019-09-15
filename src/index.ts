import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import manifestHelpers from 'express-manifest-helpers'

import { paths, DEFAULT_PORT } from './constants'
import errorHandler from './middleware/errorHandler'
import serverRenderer from './middleware/serverRenderer'
import { ServerOptions, ServeApp, Server } from './types'

const app = express()

const serveApp: ServeApp = (options: ServerOptions, port?: number): Server => {
    // Use Nginx or Apache to serve static assets in production or remove the if() around the following
    // lines to use the express.static middleware to serve assets for production (not recommended!)
    // if (process.env.NODE_ENV === 'development') {
    app.use(paths.PUBLIC_PATH, express.static(path.join(paths.BUILD_CLIENT, paths.PUBLIC_PATH)))
    // }

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // app.get('/locales/refresh', refreshTranslations)
    // // It's probably a good idea to serve these static assets with Nginx or Apache as well:
    // app.get('/locales/:locale/:ns.json', i18nextXhr)

    const manifestPath = path.join(paths.BUILD_CLIENT, paths.PUBLIC_PATH)

    app.use(
        manifestHelpers({
            manifestPath: `${manifestPath}/manifest.json`,
        })
    )

    app.use(serverRenderer(options))

    app.use(errorHandler)

    if (!port) {
        port = DEFAULT_PORT
    }

    const listener = app.listen(port, () => {
        console.log(`⚛  - App is running in port: ${port}`)
    })

    return {
        listener,
        app,
    }
}

export default serveApp
