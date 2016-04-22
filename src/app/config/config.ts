import myEnv from './proto.ts';

const ENV_FILE_NAME_PROD = 'production';
const ENV_FILE_NAME_STAG = 'staging';
const ENV_FILE_NAME_DEV = 'development';
const ENV_FILE_NAME_PROTO = 'proto';

const PORT_PROD = 8085;
const PORT_STAG = 8084;
const PORT_DEV = 8083;
const PORT_PROTO= 8080;

const PORT_UNIT_TEST= 8082;


var myEnvFileName = ENV_FILE_NAME_PROTO;
//var myEnv = require('./' + myEnvFileName + '.ts');

function $getPort(url) {
    if(url) {
        var arr = url.split(':');
        var arr2 = arr && arr.length > 2 ? arr[2].split('/') : '';
        var port = arr2 && arr2.length > 0 ? arr2[0]: '';
        port = port ? Number(port) : -1;
        return port;
    }
    return -1;
}

function $setEnv(url) {
    var port = $getPort(url);
    switch(port) {
        case PORT_PROD:
            myEnvFileName = ENV_FILE_NAME_PROD;
            break;
        case PORT_STAG:
            myEnvFileName = ENV_FILE_NAME_STAG;
            break;
        case PORT_DEV:
            myEnvFileName = ENV_FILE_NAME_DEV;
            break;
        case PORT_PROTO:
            myEnvFileName = ENV_FILE_NAME_PROTO;
            break;
        default:
            myEnvFileName = ENV_FILE_NAME_STAG;
    }
    //myEnv = require('./' + myEnvFileName + '.ts');
    //import myEnv from './' + myEnvFileName + '.ts';

    console.log('env set to ', myEnvFileName);
    return myEnvFileName;
}

function getEnv() {
    return myEnv;
}

$setEnv(window.location.href);
export {getEnv}
