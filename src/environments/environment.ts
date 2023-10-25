// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://beautyhubapi-test.ap-south-1.elasticbeanstalk.com/",
  rootPathUrl: "https://beautyhub-file.s3.ap-south-1.amazonaws.com/FileToSave/",


  firebase: {
    apiKey: "AIzaSyBtlN7iOdtANEkPIIWI4tVj4iELAy5Axt8",
    authDomain: "beautyhub-76894.firebaseapp.com",
    projectId: "beautyhub-76894",
    storageBucket: "beautyhub-76894.appspot.com",
    messagingSenderId: "645722580916",
    appId: "1:645722580916:web:fbc8bf19b3d224e57b74e1",
    measurementId: "G-FJ3NE22S1L",
   
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
