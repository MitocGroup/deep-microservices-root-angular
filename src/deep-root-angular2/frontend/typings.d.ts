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
  accountStyles: any,
};

declare var System : any;
declare interface NodeRequire {
  ensure: any;
}
