"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ProgressBar = require("cli-progress");
var colors = require("ansi-colors");
var outputFile = "test-data.txt";
var lineSize = 100; // String length
var totalSize = 2 * 1024 * 1024 * 1024; // File end weight
var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function generateRandomLine() {
    var randomLine = "";
    for (var i = 0; i < lineSize; i++) {
        var randomCharIndex = Math.floor(Math.random() * characters.length);
        randomLine += characters.charAt(randomCharIndex);
    }
    return randomLine + "\n";
}
function formatSpeed(speed) {
    return "".concat((speed / 1024).toFixed(2), " KB/s");
}
function generateFile() {
    var currentSize = 0;
    var startTime = Date.now();
    var writeStream = fs.createWriteStream(outputFile, {
        flags: "a"
    });
    var progressBar = new ProgressBar.SingleBar({
        format: "File Filling Progress |" +
            colors.cyan("{bar}") +
            "| {percentage}% || {value}/{total} Bytes || Speed: {speed}",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true
    });
    function writeRandomLines() {
        progressBar.start(totalSize, 0);
        function updateProgress() {
            var currentTime = Date.now();
            var elapsedTime = (currentTime - startTime) / 1000;
            var speed = currentSize / elapsedTime;
            progressBar.update(currentSize, { speed: formatSpeed(speed) });
        }
        function writeChunk() {
            var randomLine = generateRandomLine();
            var lineSizeInBytes = Buffer.from(randomLine).length;
            if (currentSize + lineSizeInBytes <= totalSize) {
                currentSize += lineSizeInBytes;
                var canContinue = writeStream.write(randomLine);
                if (canContinue) {
                    updateProgress();
                    writeChunk();
                }
                else {
                    writeStream.once("drain", function () {
                        updateProgress();
                        writeChunk();
                    });
                }
            }
            else {
                progressBar.stop();
                writeStream.end();
                console.log("File successfully created and filled with random strings");
            }
        }
        writeChunk();
    }
    writeRandomLines();
}
generateFile();
