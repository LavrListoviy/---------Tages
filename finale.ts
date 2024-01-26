import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { promisify } from "util";

import kWayMerge from "./kWayMerge";

const writeFileAsync = promisify(fs.writeFile);

export async function sortFile(
  inputFilePath: string,
  outputFilePath: string,
  memoryLimit: number
): Promise<void> {
  console.log("Sorting started...");

  // Reading file and partitioning
  const rs = fs.createReadStream(inputFilePath, { encoding: "utf-8" });
  const rl = readline.createInterface({ input: rs });

  let currentChunk: string[] = [];
  let currentSize: number = 0;
  let counter: number = 0;

  const processChunk = async (): Promise<void> => {
    console.log(`Processing chunk ${++counter}`);
    const fileName = path.join(__dirname, `tempChunk-${counter}`);
    await writeFileAsync(fileName, currentChunk.join("\n"), {
      encoding: "utf-8"
    })
      .then(() => {
        console.log(`Chunk ${counter} processed`);
      })
      .catch((err) => {
        if (err) {
          throw new Error(`Error: ${err}`);
        }
      });
    currentChunk = [];
    currentSize = 0;
  };

  try {
    for await (const line of rl) {
      currentChunk.push(line);
      currentSize += line.length;

      if (currentSize >= memoryLimit) {
        await processChunk();
      }
    }

    if (currentChunk.length > 0) {
      await processChunk();
    }

    // Sorting every temp file
    const sortEveryChunk = async (counter: number): Promise<string[]> => {
      const sortedChunks: string[] = [];
      for (let i = 1; i <= counter; i++) {
        const fileName = path.join(__dirname, `tempChunk-${i}`);
        const sortedFileName = path.join(__dirname, `tempSortedChunk-${i}`);
        sortedChunks.push(sortedFileName);

        // Reading lines and sorting them
        const data = fs.readFileSync(fileName, "utf-8").split("\n");

        const sortedData = data.sort();

        // Writing down sorted data and removing prev temp file
        fs.writeFileSync(sortedFileName, sortedData.join("\n"), "utf-8");
        fs.unlinkSync(fileName);

        // Memory usage for debugging purposes
        const memoryInfo = process.memoryUsage();
        console.log(
          `Memory usage after processing chunk ${i}: ${JSON.stringify(
            memoryInfo
          )}`
        );
      }
      return sortedChunks;
    };

    await sortEveryChunk(counter).then((sorted) =>
      kWayMerge(outputFilePath, sorted).then(() => {
        for (const file of sorted) {
          fs.unlinkSync(file);
        }
        console.log("Sorting completed. Wait for program stops.");
      })
    );
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}

const inputFilePath = "./test-data.txt";
const outputFilePath = "./sorted-data.txt";
const memoryLimit = 500000000; // 500 МБ

sortFile(inputFilePath, outputFilePath, memoryLimit).catch((e) =>
  console.error(e)
);
