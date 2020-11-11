export default interface IPinService {
    initialisePin(id: number): void;
    setPin(id: number, value: number): void;
}