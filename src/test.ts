import serveApp from '.'
import { DEFAULT_PORT } from './constants'
import { Server } from './types'

describe('create server', () => {
    it('should create server instance and run in default port 8500', () => {
        const server: Server = serveApp({
            store: {},
            render: () => {},
        })
        expect(server.listener.address().port).toEqual(DEFAULT_PORT)
        server.listener.close()
    })

    it('should create server instance and run in port 3500', () => {
        const PORT: number = 3500
        const server: Server = serveApp(
            {
                store: {},
                render: () => {},
            },
            PORT
        )

        expect(server.listener.address().port).toEqual(PORT)
        server.listener.close()
    })
})
