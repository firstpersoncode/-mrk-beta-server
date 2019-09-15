// Type definitions for @my-react-kit/server 1.0.0
// Project: @my-react-kit/server
// Definitions by: Nasser <npm@firstpersoncode.com>
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
    }
}

declare module 'path'
declare module 'express'
declare module 'cors'
declare module 'body-parser'
declare module 'express-manifest-helpers'
