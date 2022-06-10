export default interface Connection {
    connect(): Promise<void>;
    query(statement: string): Promise<any>;
    close(): Promise<void>;
}