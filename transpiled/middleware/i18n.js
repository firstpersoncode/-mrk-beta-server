"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Add proper security checks instead of simply disabling ESLint warnings
/*
eslint-disable
security/detect-object-injection,
security/detect-non-literal-require,
security/detect-non-literal-fs-filename
*/
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const translationCache = {};
const localesDir = `${__dirname}/locales`;
const isCached = (locale, ns) => translationCache[locale] && translationCache[locale][ns] ? true : false;
const isOutdated = (locale, ns) => translationCache[locale] &&
    translationCache[locale][ns] &&
    translationCache[locale][ns].updatedAt <
        new Date(fs_1.default.statSync(path_1.default.resolve(`${localesDir}/${locale}/${ns}.json`)).mtime).getTime()
    ? true
    : false;
const loadAndCache = (locale, ns) => {
    translationCache[locale] = {
        [ns]: {
            values: fs_1.default.readFileSync(`${localesDir}/${locale}/${ns}.json`, { encoding: 'utf-8' }),
            updatedAt: new Date(fs_1.default.statSync(path_1.default.resolve(`${localesDir}/${locale}/${ns}.json`)).mtime).getTime(),
        },
    };
};
const getTranslation = (locale, ns) => translationCache[locale][ns];
// This middleware serves translation files requested via /locales/:locale/:ns
exports.i18nextXhr = (req, res) => {
    const { locale, ns } = req.params;
    try {
        if (isCached(locale, ns) === false || isOutdated(locale, ns) === true) {
            loadAndCache(locale, ns);
        }
        const { values, updatedAt } = getTranslation(locale, ns);
        return res.header('Last-Modified', new Date(updatedAt).toUTCString()).send(values);
    }
    catch (error) {
        console.log(error.message);
        return res.send(null);
    }
};
// Middleware to download updated translation files either manually or via webhook
exports.refreshTranslations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { download, writeFiles, cleanup } = require('../../../utils/i18n-lokalise')
    //
    // const data = await download()
    // await writeFiles(data, `${__dirname}/locales`)
    // cleanup()
    res.sendStatus(200);
});
exports.default = exports.i18nextXhr;
