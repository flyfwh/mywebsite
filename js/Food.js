
//自调函数----------小方块
(function() {
	//食物的构造函数
	function Food(width, height, bgcolor) {
		this.width = width || 20; //默认的小方块的宽
		this.height = height || 20; //默认的小方块的高
		this.bgColor = bgcolor || "blue"; //小方块的颜色
		this.x = 0; //随机x坐标
		this.y = 0; //随机y坐标
		this.element = document.createElement("div"); //小方块的元素
	};
	//初始化小方块的效果和位置，并显示出来
	Food.prototype.creatFood = function(map) {
		//设置小方块的样式
		var div = this.element;
		div.style.position = "absolute"; //脱离文档流
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.bgColor;

		//将小方块加入到map地图中
		map.appendChild(div);
		this.proLoad(map);
	};
	//生成随机坐标，并将小方块放到坐标处
	Food.prototype.proLoad = function(map) {
		//随机生成小方块的横坐标
		var x = Random.getRandom(0, map.offsetWidth / this.width) * this.width;
		//随机生成小方块的纵坐标
		var y = Random.getRandom(0, map.offsetHeight / this.height) * this.height;
		this.x = x;
		this.y = y;
		var div = this.element;
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";

	};
	window.Food = Food; //将Food对象暴露给顶级对象window------>外部可以使用该对象
})();