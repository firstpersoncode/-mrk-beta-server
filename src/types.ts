export interface ServerOptions {
    store: any
    render: any
}

export interface RenderOptions {
    css: string[]
    helmetCtx: any
    scripts: string[]
    state: string
    content: string
}

export interface TranslationCache {
    [locale: string]: {
        [ns: string]: {
            values: any
            updatedAt: number
        }
    }
}

export interface Server {
    listener: any
    app: any
}

export type HtmlRender = (options: RenderOptions) => string

export type ExpressCallBack = (req: any, res: any) => void

export type ExpressErrCallBack = (err: any, req: any, res: any) => void

export type ServerRenderer = (options: ServerOptions) => ExpressCallBack

export type ServeApp = (options: ServerOptions, port?: number) => Server
