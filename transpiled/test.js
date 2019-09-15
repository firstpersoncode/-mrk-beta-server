"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const constants_1 = require("./constants");
describe('create server', () => {
    it('should create server instance and run in default port 8500', () => {
        const server = _1.default({
            store: {},
            render: () => { },
        });
        expect(server.listener.address().port).toEqual(constants_1.DEFAULT_PORT);
        server.listener.close();
    });
    it('should create server instance and run in port 3500', () => {
        const PORT = 3500;
        const server = _1.default({
            store: {},
            render: () => { },
        }, PORT);
        expect(server.listener.address().port).toEqual(PORT);
        server.listener.close();
    });
});
