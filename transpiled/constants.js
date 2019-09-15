"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.CWD = process.cwd();
exports.DEFAULT_PORT = 8500;
// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs_1.default.realpathSync(exports.CWD);
const resolveApp = (relativePath) => path_1.default.resolve(appDirectory, relativePath);
exports.paths = {
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
};
