(function(){
	function Animal(numbers){
		this.width =  0;//边框的宽
		this.height = 0;//边框的高
		this.numbers = numbers || 7;//边框个数
		this.oneNum = 0;   //每边几个动物框
	}
	Animal.prototype.init = function(box){
		this.width = Math.floor(($(".box").width()-this.numbers*22) / this.numbers) ; //每个动物框的宽度
		this.height = this.width * 1.5 ;  //每个动物框的高度
		this.oneNum = Math.floor(this.numbers / 2);//每边动物框个数
		this.addDiv(box);
		this.jump();
	}
	//添加边框和图片
	Animal.prototype.addDiv = function(box){
		//遍历在box里面创建存放图片的div
		for(var i = 0; i < this.numbers; i++){
			//创建新的边框
			var newDiv =$("<div class='animal'></div>");
			newDiv.width(this.width);//div的宽度
			newDiv.height(this.height);//div的高度
			newDiv.attr("index", i+1);
			//加入到box中
			box.append(newDiv);
			//为左边的边框加入图片
			if(i < this.oneNum){
				var newImage = $("<img  />");
				newImage.width(this.width);
				newImage.height(this.height);
				newImage.attr("src", "img/kaola.jpg")
				newDiv.append(newImage);
				newDiv.addClass("imageLeft")
			}
			//为右边边的边框加入图片
			if(i > this.oneNum){
				var newImage = $("<img />");
				newImage.width(this.width);//图片的宽度
				newImage.height(this.height);//图片的高度
				newImage.attr("src", "img/huli.jpg");
				newDiv.append(newImage);
				newDiv.addClass("imageRight");
			}
		}
	};
	//鼠标点击动物的跳转事件
	Animal.prototype.jump = function(){
		var num = this.oneNum;
		$(".animal").click(function(){
			//------------左边图片的判定
			//如果点击图片下一个边框是空白
			var next = $(this).next();
			//点击的是左边图片，且下一个是空白，则移动
			if(next.children().length ==0 && $(this).hasClass("imageLeft")){
				//图片移动到下一格
				next.append($(this).children());
				//互换类名
				next.addClass("imageLeft");
				$(this).removeClass("imageLeft");
			}
			//如果点击图片下下格是空白
			else if(next.next().children().length ==0 && $(this).hasClass("imageLeft")){
				//图片移动到下下格
				next.next().append($(this).children());
				//互换类名
				next.next().addClass("imageLeft");
				$(this).removeClass("imageLeft");
			}
			//----------右边图片的判定
			//上一个兄弟元素
			var pre = $(this).prev();
			//当点击的是右边图片时
			if($(this).hasClass("imageRight")){
				//上一格为空白
				if(pre.children().length == 0){
					//图片移动到上一格
					pre.append($(this).children());
					//互换类名
					pre.addClass("imageRight");
					$(this).removeClass("imageRight");
				}
				//上上格为空白
				else if(pre.prev().children().length == 0){
					pre = pre.prev();//图片移动到上上格
					pre.append($(this).children());
					//互换类名
					pre.addClass("imageRight");
					$(this).removeClass("imageRight");
				}
			}
			isOver(num);
		});
	}
	//判断是否结束
	function isOver(oneNum){
		if(!$(".animal:gt("+oneNum+")").hasClass("imageRight") && !$(".animal:eq("+oneNum+")").hasClass("imageLeft")){
			alert("恭喜你，真棒！");
		}
	}
	window.Animal = Animal;
})(window);
