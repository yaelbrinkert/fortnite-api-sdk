export declare class FortniteAPIError extends Error {
    status: number;
    data: any;
    constructor(message: string, status: number, data?: any);
}
