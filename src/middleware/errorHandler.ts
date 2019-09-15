import path from 'path'

import { ExpressErrCallBack } from '../types'

const errorHandler: ExpressErrCallBack = (err: any, _req: any, res: any): void =>
    res.status(404).json({
        status: 'error',
        message: err.message,
        stack:
            // print a nicer stack trace by splitting line breaks and making them array items
            process.env.NODE_ENV === 'development' &&
            (err.stack || '')
                .split('\n')
                .map((line: any) => line.trim())
                .map((line: any) => line.split(path.sep).join('/'))
                .map((line: any) =>
                    line.replace(
                        process
                            .cwd()
                            .split(path.sep)
                            .join('/'),
                        '.'
                    )
                ),
    })

export default errorHandler
