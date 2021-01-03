export default class CancellationToken {

    isCancellationRequested: boolean;
    immediate: boolean;

    constructor() {
        this.isCancellationRequested = false;
        this.immediate = false;
    }

    cancel(immediate: boolean = false) {
        this.isCancellationRequested = true;
        this.immediate = immediate;
    }
}