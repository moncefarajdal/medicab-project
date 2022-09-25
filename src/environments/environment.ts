// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    // dateFormatCreate: 'dd/mm/yy',
    dateFormatCreate: 'dd/mm/yy',
    dateFormatEdit: 'dd/mm/yy',
    dateFormatView: 'dd/mm/yy',
    dateFormatList: 'dd/mm/yyyy',
    trueValue: 'Vrai',
    falseValue: 'Faux',
    emptyForExport: '-----',

    baseUrl: 'http://localhost:8036/api/',
    // I removed the "/" because the links already have a /
    apiUrl: 'http://localhost:8036/api/',
    loginUrl: 'http://localhost:8036/',
    // rootAppUrl: 'app',
    rootAppUrl: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
