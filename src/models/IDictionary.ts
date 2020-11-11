export default interface IDictionary<T> {
    [Key: number]: T;
    [Key: string]: T;
}