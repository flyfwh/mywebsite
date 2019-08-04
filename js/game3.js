(function(){
	$(document).ready(function(){
		var score = 0;//分数
		//定义一个定时器，使游戏不断随机生成石头
		var makeStone = setInterval(f1,2500);
		function f1(){
			var stone = new Stone();
			stone.init($(".game_box"));
			$(".score span").text(score);
		}
		//注册键盘按下监听事件
		$(document).on("keydown",function(evt){
			//获取所按下的键位
			var keycode = String.fromCharCode(evt.keyCode+32);
			//遍历查找div中的span中是否有对应的字母
			$(".game_box").children().each(function(){
				//查找span内容
				var search_span = $(this).children();
				//监控是否需要继续查找，0为继续，1为停止
				var search_num = 0;
				//span的索引
				var i = 0;
				//遍历在span中查找输入的值
				while(i < search_span.length && search_num == 0){
					//如果该span不含有class-xt，则说明还没入该值
					if(!$(search_span[i]).hasClass("xt")){
						//停止查找
						search_num=1;
						//span的文本值跟输入的值相同
						if($(search_span[i]).text() == keycode){
							$(search_span[i]).addClass("xt");//加入一个xt类选择器
							//如果该span正好是最后一个，除去其所在的div
							if(i == search_span.length-1){
								$(search_span).parent().stop();
								$(search_span).parent().fadeOut(2000);	
								score += search_span.length;
							}
						}
					}
					//如果该span的文本已被输入过了，继续往下面查找
					else{
						i++;
					}
				}
			});
		});
		//暂停按钮
		$(".star_stop").click(function(){
			if($(this).val() == "暂停"){
				$(this).val("开始");
				$("div").removeClass("star");
				clearInterval(makeStone);
			}else{
				$(this).val("暂停");
				$("div").addClass("star");
				makeStone = setInterval(f1,3000);
			}
		});
		//重新开始按钮事件
		$(".reset").click(function(){
			$(".game_box div").remove();
		});
	});
})(window)
