export interface HttpResponse<T> {
  statusCode: number;
  result: T;
  error?: string;
  time: string;
}
