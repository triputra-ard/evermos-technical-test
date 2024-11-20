declare global {
  interface InfResponsePaginationServer {
    total: number;
    pageStart: number;
    perPage: number;
    page: number;
    order: string;
    sortBy?: string;
  }
  interface InfResponseStandard {
    data: any[] | object;
    success: boolean;
    message: string;
    pagination?: InfResponsePaginationServer;
  }
}
export {};
