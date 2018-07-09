declare namespace Store {
  interface State {
    router: Router;
  }

  interface Router {
    location: {
      pathname: string;
      search: string;
      hash: string;
      key: string;
    }
  }
}
