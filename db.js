const Sequelize=require('sequelize');
const sequelize=new Sequelize('gushiwen','root','root',{
	host:'localhost',
	dialect: 'mysql',
	pool: {
		max:5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});
sequelize
.authenticate()
.then(()=>{
    console.log('数据库链接成功~');
})
.catch((error)=>{
    console.log('数据库链接失败~'+error);
});

const User = sequelize.define('user', {
        name: Sequelize.STRING,
        author: Sequelize.STRING,
        article: Sequelize.TEXT,
        tag: Sequelize.STRING,
    });

User.setData=function(data,cb){
	User.sync().then(()=>{
		User.bulkCreate(data).then(()=>{
			console.log('存储成功了~');
			cb(null);
		}).catch((err)=>{
			console.log('数据库有错误~')
			cb(err);
		})
	})
       
}
module.exports=User;


