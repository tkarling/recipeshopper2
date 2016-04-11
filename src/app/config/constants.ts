export class Constants {
    public static get FIREBASE_BASE_URL() : string {
        return 'https://recipeshopper2.firebaseio.com/';
    }
    public static get FIREBASE_DEV_URL() : string {
        return this.FIREBASE_BASE_URL + "dev/";
    }
    public static get FIREBASE_STAG_URL() : string {
        return this.FIREBASE_BASE_URL + "stag/";
    }
    public static get FIREBASE_PROD_URL() : string {
        return this.FIREBASE_BASE_URL + "prod/";
    }
}
