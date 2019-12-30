/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
//导入数据库配置模块
const mysql = require('./database');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  //cookie最长时间 (暂时设置为1小时)
  config.maxAge = 60*60*1;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577526974348_1656';

  // add your middleware config here
  config.middleware = ['csrf'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  //egg-view-ejs
  const view = {
    mapping: {
      '.html': 'ejs',
    }
  }

  //不清楚这里是不是不能 const
  config.security = {
    // 关闭csrf验证
    csrf: {
        enable: false,
    },
    // 白名单
    domainWhiteList: ['*']
  };

  //CORS跨域支持 
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,HEAD,PUT,DELETE,PATCH'
  }

  return {
    ...config,
    ...userConfig,
    view,
    mysql
  };
};
