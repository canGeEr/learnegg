'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx , service , config } = this;
    const userInfo = ctx.request.body;
    
    const sqlUserInfo = await service.user.checkname(userInfo.username);

    if(!sqlUserInfo || sqlUserInfo.status === '0'){
      //用户不存在
      ctx.status = 301;
      ctx.redirect('/login');
    }else if(sqlUserInfo.password === userInfo.password){
      //登入成功,保存cookie
      ctx.cookies.set('username', sqlUserInfo.username, {maxAge: config.maxAge, httpOnly: false});
      ctx.status = 301;
      ctx.redirect('/index');
    }
  }


  async register() {
    //没有进行长度验证，和密码重复验证,移交给前端完成
    const { ctx , service } = this;
    const userInfo = ctx.request.body;

    const sqlUserInfo = await service.user.checkname(userInfo.username);

    if(sqlUserInfo) {
      //用户名已经存在
      if( sqlUserInfo.status === '0' )
        await service.user.registerSoft(sqlUserInfo.id, userInfo.password);
    }else {
        await service.user.register(userInfo.username, userInfo.password);
    }
    ctx.status = 301;
    console.log(sqlUserInfo);
    if(sqlUserInfo && sqlUserInfo.status === '1')
      ctx.redirect('/');
    else 
      ctx.redirect('/login');
  }
}

module.exports = UserController;
