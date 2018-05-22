"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
function getArticles(type) {
    return __awaiter(this, void 0, void 0, function () {
        var vergeAPI, techAPI, req, _a, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    vergeAPI = "https://newsapi.org/v2/everything?sources=the-verge&sortBy=publishedAt&apiKey=ee582714b32645c8a48b8601e7267063";
                    techAPI = "https://newsapi.org/v2/everything?sources=the-next-web&sortBy=publishedAt&apiKey=ee582714b32645c8a48b8601e7267063";
                    if (!(type === 'verge')) return [3 /*break*/, 2];
                    return [4 /*yield*/, node_fetch_1["default"](vergeAPI)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, node_fetch_1["default"](techAPI)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    req = _a;
                    return [4 /*yield*/, req.json()];
                case 5: return [4 /*yield*/, (_b.sent())];
                case 6:
                    data = _b.sent();
                    return [2 /*return*/, data.articles.map(function (article) { return ({
                            title: article.title,
                            description: article.description,
                            author: article.author,
                            url: article.url
                        }); })];
            }
        });
    });
}
var NewsService = (function () {
    function NewsService() {
    }
    NewsService.prototype.thenextweb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getArticles('thenextweb')];
            });
        });
    };
    NewsService.prototype.verge = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getArticles('verge')];
            });
        });
    };
    NewsService.prototype.hackerNews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var hhListAPI, hhItemAPIprefix, hhItemAPIpostfix, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hhListAPI = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
                        hhItemAPIprefix = "https://hacker-news.firebaseio.com/v0/item/";
                        hhItemAPIpostfix = ".json?print=pretty";
                        return [4 /*yield*/, node_fetch_1["default"](hhListAPI)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, Promise.all(data.slice(0, 20).map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                                var itemUrl, item;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            itemUrl = hhItemAPIprefix + id + hhItemAPIpostfix;
                                            return [4 /*yield*/, node_fetch_1["default"](itemUrl)];
                                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                                        case 2:
                                            item = _a.sent();
                                            return [2 /*return*/, {
                                                    title: item.title,
                                                    description: item.title,
                                                    author: item.by,
                                                    url: item.url
                                                }];
                                    }
                                });
                            }); }))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NewsService.prototype.reddit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var redditAPI, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        redditAPI = "https://www.reddit.com/user/gagar1n/m/1_programming.json";
                        return [4 /*yield*/, node_fetch_1["default"](redditAPI)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.data.children.map(function (article) { return ({
                                title: "(" + article.data.score + " | " + article.data.num_comments + ") " + article.data.title,
                                url: article.data.url,
                                author: article.data.author,
                                description: ""
                            }); })];
                }
            });
        });
    };
    return NewsService;
}());
exports.NewsService = NewsService;
