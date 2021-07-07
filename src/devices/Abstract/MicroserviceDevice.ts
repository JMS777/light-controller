import { IPhysicalDevice } from "./IPhysicalDevice";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
export default abstract class MicroserviceDevice implements IPhysicalDevice {

    childProcess: ChildProcessWithoutNullStreams;

    constructor(processPath: string, args: string[] | undefined = undefined) {
        const processArgs: string[] = [];
        processArgs.push(processPath);

        if (args)
            processArgs.push(...args);

        this.childProcess = spawn('python', processArgs);

        console.log(`Python process spawned with args '${processArgs}', PID: ${this.childProcess.pid}`);
        this.childProcess.stderr.pipe(process.stderr);
        this.childProcess.stdout.pipe(process.stdout);
    }

    command(command: string, args: unknown, callback: undefined | ((res: any) => void)): void {
        const data = JSON.stringify({ command: command, args: args });

        this.childProcess.stdin.write(data + "\n", (err) => {
            if (err)
                console.error(err);
        });
    }

    abstract update(properties: any): void;
}