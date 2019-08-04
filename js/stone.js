(function(){
	function Stone(){
		this.width = 20;//石头的宽
		this.height = 20;//石头的高
		this.num = 0;//字母个数
	}
	//给原型对象添加石头初始化方法
	Stone.prototype.init = function(box){
		//随机获取字母个数
		this.num = Random.getRandom(2,8);
		//给石头定宽
		this.width = this.width + 15*this.num;
		//给石头定高
		this.height = this.height + 3*this.num;
		this.addDiv(box);
	}
	//给原型对象添加石头添加元素方法
	Stone.prototype.addDiv = function(box){
		//创建一个新的石头div元素
		var new_div = $("<div class='stone star'></div>");
		new_div.width(this.width);//div的宽
		new_div.height(this.height);//div的高
		//根据字母个数num，遍历给div加入span
		for(var i = 0; i < this.num; i++){
			//创建新的span元素，并加入一个随机字母
			var new_span = $("<span>"+Random.getRandomLetter(97,123)+"</span>");
			//将span加入到new_div中
			new_div.append(new_span);
		}
		//将新增的div加入box中
		box.append(new_div);
		this.proLoad(new_div, box);
		this.move(new_div, box);
	}
	//为新建div定位方法
	Stone.prototype.proLoad = function(div, box){
		//纵坐标
		var y = 0;
		//横坐标
		var x = Random.getRandom(0, box.width() - div.width());
		div.css({'top': y, 'left': x});
		div.children("span").css({'margin-top': div.height()/2-10});
	}
	//石头移动定时器
	Stone.prototype.move = function(div, box){
		//每次移动的纵坐标距离
		var move_itval = setInterval(function(){
			if(div.hasClass("star")){
				//每次移动box高度的十分之一
				div.animate({'top': '+='+box.height()/10},1450,function(){
					//如果下一次不够距离移动
					if(box.height()-div.position().top < box.height()/10*2){
						//清除定时器
						clearInterval(move_itval);
						//将div移动到最底部
						div.animate({'top': +box.height()-div.height()},1500,function(){
							//div淡出
							div.fadeOut(500,function(){
								div.remove();//移除该div
							});
						});
					}
				});
			}
		},1500);
	}
	window.Stone = Stone;
})(window)
