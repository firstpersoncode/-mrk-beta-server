"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const errorHandler = (err, _req, res) => res.status(404).json({
    status: 'error',
    message: err.message,
    stack: 
    // print a nicer stack trace by splitting line breaks and making them array items
    process.env.NODE_ENV === 'development' &&
        (err.stack || '')
            .split('\n')
            .map((line) => line.trim())
            .map((line) => line.split(path_1.default.sep).join('/'))
            .map((line) => line.replace(process
            .cwd()
            .split(path_1.default.sep)
            .join('/'), '.')),
});
exports.default = errorHandler;
