module.exports = (options, app)=>{
  return async function csrf(ctx, next){
    ctx.state.csrf = ctx.csrf;
    await next();
  }
}