import path from 'path'
import fs from 'fs'

export const CWD: string = process.cwd()
export const DEFAULT_PORT: number = 8500
// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory: string = fs.realpathSync(CWD)
const resolveApp = (relativePath: string): string => path.resolve(appDirectory, relativePath)

export const paths: any = {
    BUILD_: resolveApp('build'),
    BUILD_CLIENT: resolveApp('build/client'),
    BUILD_SERVER: resolveApp('build/server'),
    SRC: resolveApp('src'),
    LOCALES: resolveApp('src/locales'),
    APP: resolveApp('src/app'),
    CLIENT: resolveApp('src/app/client'),
    SERVER: resolveApp('src/app/server'),
    STORE: resolveApp('src/app/store'),
    TS_CONFIG: resolveApp('tsconfig.json'),
    PUBLIC_PATH: '/',
}
