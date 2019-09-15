import { RenderOptions, ServerOptions, ServerRenderer, HtmlRender, ExpressCallBack } from '../types'

const helmetCtx: any = {}
const routerCtx: any = {}

const html: HtmlRender = ({ css, helmetCtx, scripts, state, content }: RenderOptions): string => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${helmetCtx.helmet.base.toString()}
    ${helmetCtx.helmet.title.toString()}
    ${helmetCtx.helmet.meta.toString()}
    ${helmetCtx.helmet.link.toString()}
    ${helmetCtx.helmet.script.toString()}
    ${css
        .filter(Boolean)
        .map((href) => {
            return `<link href="${href}" rel="stylesheet" />`
        })
        .join('\n')}
  </head>
  <body>
    <div id="app">${content}</div>
    <script>
      window.__PRELOADED_STATE__ = ${state}
    </script>
    ${scripts
        .map((src) => {
            return `<script src="${src}"></script>`
        })
        .join('\n')}
  </body>
</html>
`

const serverRenderer: ServerRenderer = (options: ServerOptions): ExpressCallBack => (
    req: any,
    res: any
): void => {
    const { store, render }: ServerOptions = options
    const content: string = render({
        routerCtx,
        helmetCtx,
        location: req.url,
    })
    const state: string = JSON.stringify(store.getState())
    res.send(
        html({
            css: [res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')],
            helmetCtx,
            scripts: [res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')],
            state,
            content,
        })
    )
}

export default serverRenderer
