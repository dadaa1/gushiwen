let superagent=require('superagent');
let async=require('async');
let cheerio=require('cheerio');
let output=require('./db').setData;
let url='http://www.gushiwen.org/shiwen/default_0A0A';

let url_list=[];

for(let i=1;i<=1000;i++){
	url_list.push(url+i+'.aspx');
}
console.log(url_list[999]);

function getPage(url,cb){
	superagent.get(url).end(function(err,res){
		if(err){
			console.log('获取页面出错~');
			cb(err);
		}
		//console.log(res.text);
		let $=cheerio.load(res.text);
		let data=[];
		$('.main3>.left').find('.sons').each(function(i,ele){
			let b={
				tag:$(ele).find('.tag').text(),
				name:$(ele).find('p').text(),
				author:$(ele).find('.source').text(),
				article:$(ele).find('.contson').text(),
			}
			data.push(b);
			console.log(i,'i a tag',JSON.stringify(b));
		});
		setTimeout(function(){
			output(data,cb);
		},3000)
	});
}

async.eachLimit(url_list,1,function(item,callback){
	getPage(item,callback);
},function(err){
	if(err){
		console.log('有错误发生了~');
	}
console.log('我执行完毕了~');
})

