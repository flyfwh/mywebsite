//自调函数 ---------小蛇
(function() {
	//存放小方块
	var packs = [];
	//小蛇的构造函数
	function Snake(width, height, direction) {
		this.width = width || 20; //小蛇每个部分的宽度
		this.height = height || 20; //小蛇每个部分的高度
		this.direction = direction || "right"; //小蛇前进的方向
		this.over = false; //小蛇是否头身碰撞，是的话结束
		this.body = [{
				x: 3,
				y: 2,
				color: "red"
			},
			{
				x: 2,
				y: 2,
				color: "skyblue"
			},
			{
				x: 1,
				y: 2,
				color: "skyblue"
			}
		];
	};
	//原型对象的添加------->小蛇的初始化
	Snake.prototype.init = function(map) {
		//删除原来的小蛇
		delSnake();
		for(var j = 1; j < this.body.length - 1; j++) {
			if(this.body[0].x == this.body[j].x && this.body[j].y == this.body[0].y) {
				this.over = true;
			}
		}
		//循环遍历创建div
		for(var i = 0; i < this.body.length; i++) {
			//创建一个div存放小蛇身体部位
			var div = document.createElement("div");
			div.style.position = "absolute"; //脱离文档流
			//小蛇身体部位的横坐标
			div.style.left = this.body[i].x * this.width + "px";
			//小蛇身体部位的横坐标
			div.style.top = this.body[i].y * this.height + "px";
			//身体颜色
			div.style.backgroundColor = this.body[i].color;
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.borderRadius = "5px";
			//将div加入map地图中
			map.appendChild(div);
			//将div加入packs中
			packs.push(div);
		}
	};
	//为原型添加方法---------->小蛇的移动
	Snake.prototype.move = function(map) {
		var i = this.body.length - 1; //指向小蛇最后一个身体方块的索引
		//遍历移动小蛇的身体部分
		for(; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		//小蛇头部的移动
		switch(this.direction) {
			case "left":
				this.body[0].x -= 1;
				break;
			case "right":
				this.body[0].x += 1;
				break;
			case "top":
				this.body[0].y -= 1;
				break;
			case "bottom":
				this.body[0].y += 1;
				break;
		}
	};
	//删除小蛇的私有函数
	function delSnake() {
		//获取数组
		var i = packs.length - 1;
		for(i; i >= 0; i--) {
			var ele = packs[i];
			//找到该元素的父级元素并删除该子元素
			ele.parentNode.removeChild(ele);
			//在packs数组中删除该元素
			packs.splice(i, 1);
		}
	}
	window.Snake = Snake;
})();