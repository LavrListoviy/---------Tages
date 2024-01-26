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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortFile = void 0;
var fs = require("fs");
var path = require("path");
var readline = require("readline");
var util_1 = require("util");
var kWayMerge_1 = require("./kWayMerge");
var writeFileAsync = (0, util_1.promisify)(fs.writeFile);
function sortFile(inputFilePath, outputFilePath, memoryLimit) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var rs, rl, currentChunk, currentSize, counter, processChunk, _d, rl_1, rl_1_1, line, e_1_1, sortEveryChunk, e_2;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Sorting started...");
                    rs = fs.createReadStream(inputFilePath, { encoding: "utf-8" });
                    rl = readline.createInterface({ input: rs });
                    currentChunk = [];
                    currentSize = 0;
                    counter = 0;
                    processChunk = function () { return __awaiter(_this, void 0, void 0, function () {
                        var fileName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Processing chunk ".concat(++counter));
                                    fileName = path.join(__dirname, "tempChunk-".concat(counter));
                                    return [4 /*yield*/, writeFileAsync(fileName, currentChunk.join("\n"), {
                                            encoding: "utf-8"
                                        })
                                            .then(function () {
                                            console.log("Chunk ".concat(counter, " processed"));
                                        })
                                            .catch(function (err) {
                                            if (err) {
                                                throw new Error("Error: ".concat(err));
                                            }
                                        })];
                                case 1:
                                    _a.sent();
                                    currentChunk = [];
                                    currentSize = 0;
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 18, , 19]);
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 8, 9, 14]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _e.label = 3;
                case 3: return [4 /*yield*/, rl_1.next()];
                case 4:
                    if (!(rl_1_1 = _e.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 7];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    currentChunk.push(line);
                    currentSize += line.length;
                    if (!(currentSize >= memoryLimit)) return [3 /*break*/, 6];
                    return [4 /*yield*/, processChunk()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _d = true;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    if (!(currentChunk.length > 0)) return [3 /*break*/, 16];
                    return [4 /*yield*/, processChunk()];
                case 15:
                    _e.sent();
                    _e.label = 16;
                case 16:
                    sortEveryChunk = function (counter) { return __awaiter(_this, void 0, void 0, function () {
                        var sortedChunks, i, fileName, sortedFileName, data, sortedData, memoryInfo;
                        return __generator(this, function (_a) {
                            sortedChunks = [];
                            for (i = 1; i <= counter; i++) {
                                fileName = path.join(__dirname, "tempChunk-".concat(i));
                                sortedFileName = path.join(__dirname, "tempSortedChunk-".concat(i));
                                sortedChunks.push(sortedFileName);
                                data = fs.readFileSync(fileName, "utf-8").split("\n");
                                sortedData = data.sort();
                                // Writing down sorted data and removing prev temp file
                                fs.writeFileSync(sortedFileName, sortedData.join("\n"), "utf-8");
                                fs.unlinkSync(fileName);
                                memoryInfo = process.memoryUsage();
                                console.log("Memory usage after processing chunk ".concat(i, ": ").concat(JSON.stringify(memoryInfo)));
                            }
                            return [2 /*return*/, sortedChunks];
                        });
                    }); };
                    return [4 /*yield*/, sortEveryChunk(counter).then(function (sorted) {
                            return (0, kWayMerge_1.default)(outputFilePath, sorted).then(function () {
                                for (var _i = 0, sorted_1 = sorted; _i < sorted_1.length; _i++) {
                                    var file = sorted_1[_i];
                                    fs.unlinkSync(file);
                                }
                                console.log("Sorting completed. Wait for program stops.");
                            });
                        })];
                case 17:
                    _e.sent();
                    return [3 /*break*/, 19];
                case 18:
                    e_2 = _e.sent();
                    console.error("Error: ".concat(e_2));
                    return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    });
}
exports.sortFile = sortFile;
var inputFilePath = "./test-data.txt";
var outputFilePath = "./sorted-data.txt";
var memoryLimit = 500000000; // 500 МБ
sortFile(inputFilePath, outputFilePath, memoryLimit).catch(function (e) {
    return console.error(e);
});
