var middlewares= require('require-all')({
  dirname     :  __dirname+'/middlewares',
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

module.exports= middlewares;