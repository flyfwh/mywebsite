//自调函数 ------------>游戏
(function() {
	function Game(map) {
		this.food = new Food(); //食物对象
		this.snake = new Snake(); //小蛇对象
		this.map = map;
		that = this; //让that指向此时this所指向的对象
		this.Score = 0;
	}
	Game.prototype.again = function(){
		this.snake = new Snake();
		this.Score = 0;
	};
	//游戏初始化
	Game.prototype.init = function() {
		document.getElementById("score-number").innerHTML= this.Score;
		this.food.creatFood(this.map);
		this.snake.init(this.map)
		//设置定时器，让小蛇移动起来
		var timeId = setInterval(function() {
			this.changeDire();
			this.snake.move(this.map);
			this.snake.init(this.map);
			//蛇头的横坐标
			var x = this.snake.body[0].x * this.snake.width;
			//蛇头的纵坐标
			var y = this.snake.body[0].y * this.snake.height;
			//蛇头出地图----->游戏结束
			if(x >= this.map.offsetWidth || x < 0 || y >= this.map.offsetHeight || y < 0 || this.snake.over) {
				//清理定时器
				clearInterval(timeId);
				alert("游戏结束");
				//返回首页
				this.map.style.zIndex = -1;
				//成绩消失
				document.querySelector(".score").style.opacity = 0;
			}
			this.eat();
		}.bind(that), 200);
	}
	//食物被吃掉
	Game.prototype.eat = function() {
		//蛇头跟食物重叠
		if(this.snake.body[0].x * this.snake.width == this.food.x && this.snake.body[0].y * this.snake.height == this.food.y) {
			this.food.creatFood(this.map); //重新生成新的食物
			//蛇尾加一块小方块,并将原本最后一块的样式复制给他
			var last = this.snake.body[this.snake.body.length - 1];
			this.snake.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			});
			this.Score += 1;
			document.getElementById("score-number").innerHTML= this.Score;
		}

	};
	//获取玩家按键，改变小蛇的方向
	Game.prototype.changeDire = function() {
		document.addEventListener("keydown", function(e) {
			switch(e.keyCode) {
				case 37:
					if(this.snake.direction != "right") {
						this.snake.direction = "left";
					}
					break;
				case 38:
					if(this.snake.direction != "bottom") {
						this.snake.direction = "top";
					}
					break;
				case 39:
					if(this.snake.direction != "left") {
						this.snake.direction = "right";
					}
					break;
				case 40:
					if(this.snake.direction != "top") {
						this.snake.direction = "bottom";
					}
					break;

			}
		}.bind(that), false);
	}
	window.Game = Game;
})();