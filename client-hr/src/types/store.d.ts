/// <reference types='history'/>

declare namespace Store {
  interface State {
    router: {
      location: Location;
    };

    app: StateApp;
  }
}
