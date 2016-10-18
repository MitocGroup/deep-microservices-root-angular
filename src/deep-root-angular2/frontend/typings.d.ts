/// <reference path="./typings/index.d.ts" />

declare var DeepFramework: {
  angularDependencies: any,
  Kernel: {
    isLocalhost: boolean,
    bootstrap(cb: Function),
    env: string,
    get(service: string): any,
    config: {
      identityProviders: Object,
      microservices: any
    },
  },
};

declare var System : any;
