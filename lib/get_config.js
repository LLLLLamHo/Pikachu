const path = require( 'path' );
const fs = require( 'fs' );

// 获取运行文件
module.exports = function () {

    //命令运行目录
    const RUN_PATH = process.cwd();
    //默认文件
    const DEFAULT_CONFIG_NAME = path.join( RUN_PATH, 'pikachu.config.js' );
    //指定文件
    let designationConfigPath = '';

    let config = {};

    let args = process.argv.splice( 2 );

    //获取指定文件
    for ( let i = 0; i < args.length; i++ ) {
        if ( args[i] == '--config' ) {
            designationConfigPath = args[i + 1];
        }
    }

    if ( designationConfigPath != '' ) {

        const DESIGNATION_PATH = path.join( RUN_PATH, designationConfigPath );

        if ( fs.existsSync( DESIGNATION_PATH ) ) {
            return DESIGNATION_PATH;
        } else {
            throw new Error( `
                not find pikachu.config.js. please check the dir whether the file exists
                The path is: ${DESIGNATION_PATH}
            ` );
        }

    } else {

        //默认获取目录下的pikachu.config.js
        if ( fs.existsSync( DEFAULT_CONFIG_NAME ) ) {
            return DEFAULT_CONFIG_NAME;
        } else {
            throw new Error(`
            not find pikachu.config.js. please check the dir whether the file exists
            The path is: ${DEFAULT_CONFIG_NAME}`);
        }

    }

}