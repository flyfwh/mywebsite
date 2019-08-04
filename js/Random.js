//自调函数-----------随机数对象
(function() {
	//产生随机数的构造函数
	function Random() {};
	//在原型对象中添加方法
	Random.prototype.getRandom = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};
	//在原型对象中添加获取随机字母方法
	Random.prototype.getRandomLetter = function(min, max){
		return String.fromCharCode(Math.floor(Math.random() * (max - min) + min));
	};
	//把Random对象暴露给顶级对象window =====>外部可以直接使用这个对象
	window.Random = new Random();
})();