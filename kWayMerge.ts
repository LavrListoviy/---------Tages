import * as fs from 'fs';
import * as readline from 'readline';
import MinHeap from './MinHeap';

interface MinHeapNode {
    value: string;
    readerIndex: number;
}

async function getNextLine(reader: readline.Interface): Promise<string | null> {
    const next = reader[Symbol.asyncIterator]().next();
    const { value, done } = await next;
    return done ? null : value;
}

async function kWayMerge(outputFilePath: string, inputFiles: string[]): Promise<void> {
    console.log('Merging in progress...')
    const streams = inputFiles.map(file => fs.createReadStream(file, { encoding: 'utf-8' }));
    const readers = streams.map(stream => readline.createInterface({ input: stream }));

    const outputFileStream = fs.createWriteStream(outputFilePath, { encoding: 'utf-8' });

    const heap = new MinHeap();

    console.log('Filling heap')
    // Filling heap with first values
    for (let i = 0; i < readers.length; i++) {
        const next = await getNextLine(readers[i]);
        if (next !== null) {
            heap.insert({ value: next, readerIndex: i });
        }
    }

    // Iteratively choosing next line 
    while (!heap.isEmpty()) {
        const minNode = heap.extractMin() as MinHeapNode;
        const { value, readerIndex } = minNode;    
        outputFileStream.write(`${value}\n`);

        const next = await getNextLine(readers[readerIndex]);
        if (next !== null) {
            heap.insert({ value: next, readerIndex });
        }
    }

    for (const stream of streams) {
        stream.close();
    }

    outputFileStream.end();
}

export default kWayMerge;
