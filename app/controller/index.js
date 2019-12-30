'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    const username = ctx.cookies.get('username');
    console.log(username);
    await ctx.render('index',{
      name: 'index',
      username
    });
  }
  async login() {
    const { ctx } = this;
    const username = ctx.cookies.get('username');
    if(username){
      ctx.redirect('/index');
      return;
    } 
    await ctx.render('login', {
      name: 'login'
    })
  }

  async register() {
    const { ctx } = this;
    await ctx.render('register', {
      name: 'register',
    });
  }
}

module.exports = IndexController;
