(function(){
	function Game(){
		this.numbers = 7;
		this.animal = new Animal();
		that = this;
	}
	Game.prototype.selct = function(){
		//注册选择难度事件
		$(".selDifficult").change(function(){
			if($("#easy").is(":checked")){
				this.numbers = 7;
			}
			if($("#middle").is(":checked")){
				this.numbers = 9;
			}
			if($("#difficult").is(":checked")){
				this.numbers = 11;
			}
			this.star();
		}.bind(that));
		//注册重新开始事件
		$("#reset").click(function(){
			this.star();
		}.bind(that));
		this.star();
		
	}
	Game.prototype.star = function(){
		remove();
		this.animal = new Animal(this.numbers);
		this.animal.init($(".box"));
	}
	function remove(){
		$(".banner").siblings().remove();
	}
	window.Game = Game;
})(window);
