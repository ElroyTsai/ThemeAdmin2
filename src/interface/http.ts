export interface HttpResponse<T> {
  code: number;
  data: T;
  time: string;
}
