"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MinHeap = /** @class */ (function () {
    function MinHeap() {
        this.heap = [];
    }
    MinHeap.prototype.insert = function (item) {
        this.heap.push(item);
        this.heapifyUp();
    };
    MinHeap.prototype.extractMin = function () {
        if (this.isEmpty()) {
            return null;
        }
        var min = this.heap[0];
        var last = this.heap.pop();
        if (this.heap.length > 0 && last !== undefined) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        return min;
    };
    MinHeap.prototype.isEmpty = function () {
        return this.heap.length === 0;
    };
    MinHeap.prototype.heapifyUp = function () {
        var _a;
        var currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            var parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex].value > this.heap[currentIndex].value) {
                _a = [this.heap[currentIndex], this.heap[parentIndex]], this.heap[parentIndex] = _a[0], this.heap[currentIndex] = _a[1];
                currentIndex = parentIndex;
            }
            else {
                break;
            }
        }
    };
    MinHeap.prototype.heapifyDown = function () {
        var _a;
        var currentIndex = 0;
        while (true) {
            var leftChildIndex = 2 * currentIndex + 1;
            var rightChildIndex = 2 * currentIndex + 2;
            var smallestChildIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].value < this.heap[smallestChildIndex].value) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].value < this.heap[smallestChildIndex].value) {
                smallestChildIndex = rightChildIndex;
            }
            if (smallestChildIndex !== currentIndex) {
                _a = [this.heap[smallestChildIndex], this.heap[currentIndex]], this.heap[currentIndex] = _a[0], this.heap[smallestChildIndex] = _a[1];
                currentIndex = smallestChildIndex;
            }
            else {
                break;
            }
        }
    };
    return MinHeap;
}());
exports.default = MinHeap;
