'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //渲染页面
  router.get('/', controller.index.login);
  router.get('/index', controller.index.index);
  router.get('/login', controller.index.login);
  //处理逻辑Controller
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
};
