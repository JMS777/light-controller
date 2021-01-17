import VirtualDevice from "../../devices/Abstract/VirtualDevice";
import CancellationToken from "../../helpers/CancellationToken";

export default abstract class Effect {
    public id: string;

    public abstract affectsBrightness: boolean;
    public abstract affectsColour: boolean;

    protected cst: CancellationToken | undefined;
    private work: Promise<void> | undefined;

    constructor(id: string) {
        this.id = id;
    }

    public execute(device: VirtualDevice): void
    {
        this.cst = new CancellationToken();

        this.work = this.doWork(device, this.cst);
    }

    public async cancel(immediate: boolean = false, callback?: () => any) {
        this.cst?.cancel(immediate);

        await this.work;
        
        if (callback)
            callback();
    }

    protected abstract doWork(device: VirtualDevice, cst: CancellationToken): Promise<void>;
}

export class NoEffect extends Effect {
    public affectsBrightness: boolean = false;
    public affectsColour: boolean = false;

    constructor() {
        super("No Effect");
    }
    
    protected async doWork(device: VirtualDevice, cst: CancellationToken): Promise<void> {

    }

}