'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  //传入姓名，并返回相应的信息
  async checkname(username) {
    const { app } = this;
    const userInfo = await app.mysql.get('egg_user', {username: username});
    return userInfo;
  }
  
  //传入姓名和密码并保存
  async register(username, password) {
    const { app } = this;
    return await app.mysql.insert('egg_user', {
      username,
      password,
    })
  }

  //传入姓名查询更新 =》 密码，status
  async registerSoft(id, password){
    const { app } = this;
    return await app.mysql.update('egg_user',{id, status: '1', password});
  }
}

module.exports = UserService;
