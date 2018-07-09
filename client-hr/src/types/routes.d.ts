declare interface RouteComponentPropType {
  [key: string]: string;
}

declare interface RouteMatch {
  isExact: boolean;
  params: {
    [key: string]: string;
  }
  path: string;
  url: string;
}
