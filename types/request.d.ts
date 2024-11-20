declare global {
  type requestType = "product" | "category";
  interface InfRequestPaginationClient {
    type: requestType; //product, category,
    category?: string;
    request: InfRequestStandard;
  }
  interface InfRequestStandard {
    pageStart: number;
    perPage: number;
    page: number;
    sortBy?: string;
    order: string;
    search?: string;
  }
  interface InfRequestPaginationServer {
    limit: number;
    skip: number;
    sortBy: string;
    order: string;
    q?: string;
  }
}
export {};
