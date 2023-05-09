export interface Router {
  path: string;
  name?: string;
  element?: JSX.Element;
  children?: Array<Router>;
}
