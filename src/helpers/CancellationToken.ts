export default class CancellationToken {

    isCancellationRequested: boolean;
    immediate: boolean;

    constructor() {
        this.isCancellationRequested = false;
        this.immediate = false;
    }

    cancel(immediate = false): void {
        this.isCancellationRequested = true;
        this.immediate = immediate;
    }
}