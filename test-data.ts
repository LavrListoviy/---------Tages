import * as fs from "fs";
import * as ProgressBar from "cli-progress";
import * as colors from 'ansi-colors';

const outputFile: string = "test-data.txt";
const lineSize: number = 100; // String length
const totalSize: number = 2 * 1024 * 1024 * 1024; // File end weight

const characters: string =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateRandomLine(): string {
  let randomLine: string = "";
  for (let i: number = 0; i < lineSize; i++) {
    const randomCharIndex: number = Math.floor(
      Math.random() * characters.length
    );
    randomLine += characters.charAt(randomCharIndex);
  }
  return randomLine + "\n";
}

function formatSpeed(speed: number): string {
  return `${(speed / 1024).toFixed(2)} KB/s`;
}


function generateFile(): void {
  let currentSize: number = 0;
  const startTime: number = Date.now();

  const writeStream: fs.WriteStream = fs.createWriteStream(outputFile, {
    flags: "a"
  });
  const progressBar = new ProgressBar.SingleBar({
    format:
      "File Filling Progress |" +
      colors.cyan("{bar}") +
      "| {percentage}% || {value}/{total} Bytes || Speed: {speed}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true
  });

  function writeRandomLines(): void {
    progressBar.start(totalSize, 0);

    function updateProgress(): void {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      const speed = currentSize / elapsedTime;
      progressBar.update(currentSize, { speed: formatSpeed(speed)});
    }

    function writeChunk(): void {
      const randomLine: string = generateRandomLine();
      const lineSizeInBytes = Buffer.from(randomLine).length;

      if (currentSize + lineSizeInBytes <= totalSize) {
        currentSize += lineSizeInBytes;
        const canContinue: boolean = writeStream.write(randomLine);

        if (canContinue) {
          updateProgress();
          writeChunk();
        } else {
          writeStream.once("drain", () => {
            updateProgress();
            writeChunk();
          });
        }
      } else {
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
