"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_manifest_helpers_1 = __importDefault(require("express-manifest-helpers"));
const constants_1 = require("./constants");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const serverRenderer_1 = __importDefault(require("./middleware/serverRenderer"));
const app = express_1.default();
const serveApp = (options, port) => {
    // Use Nginx or Apache to serve static assets in production or remove the if() around the following
    // lines to use the express.static middleware to serve assets for production (not recommended!)
    // if (process.env.NODE_ENV === 'development') {
    app.use(constants_1.paths.PUBLIC_PATH, express_1.default.static(path_1.default.join(constants_1.paths.BUILD_CLIENT, constants_1.paths.PUBLIC_PATH)));
    // }
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    // app.get('/locales/refresh', refreshTranslations)
    // // It's probably a good idea to serve these static assets with Nginx or Apache as well:
    // app.get('/locales/:locale/:ns.json', i18nextXhr)
    const manifestPath = path_1.default.join(constants_1.paths.BUILD_CLIENT, constants_1.paths.PUBLIC_PATH);
    app.use(express_manifest_helpers_1.default({
        manifestPath: `${manifestPath}/manifest.json`,
    }));
    app.use(serverRenderer_1.default(options));
    app.use(errorHandler_1.default);
    if (!port) {
        port = constants_1.DEFAULT_PORT;
    }
    const listener = app.listen(port, () => {
        console.log(`⚛  - App is running in port: ${port}`);
    });
    return {
        listener,
        app,
    };
};
exports.default = serveApp;
