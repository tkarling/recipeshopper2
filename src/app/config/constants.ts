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

import {getEnv} from './config.ts';

export const FB_BASE_PATH = 'https://recipeshopper2.firebaseio.com';
export const FB_BASE_ENV_PATH = getEnv().FB_BASE_ENV_PATH;