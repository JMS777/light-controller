export default class CancellationToken {

    isCancellationRequested: boolean;

    constructor() {
        this.isCancellationRequested = false;
    }

    cancel() {
        this.isCancellationRequested = true;
    }
}