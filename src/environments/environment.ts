// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'recept-page',
    appId: '1:756218777555:web:a1c7016960cdc7e921e926',
    databaseURL: 'https://recept-page-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'recept-page.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyC2NSVshE91Dx0k-RUgxgkT6CmWwPZJx8c',
    authDomain: 'recept-page.firebaseapp.com',
    messagingSenderId: '756218777555',
    measurementId: 'G-F6Y9TVF4M1',
  },
  production: false,
  hostUrl: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
