
(function(){
	//轮播图---star
	$(document).ready(function(){
		//获取轮播图片数
		var count = $(".show_left ul:first li").length;
		//当前选取页数
		var current = 1;
		//每切换一次的移动距离
		var moveWidth = $(".show_left img").width()+20;
		//获取轮播图所在的ul对象
		var moveUl = $(".box_img");
		//使轮播图自动播放
		var intime = setInterval(moveRight,3000);
		
		//注册鼠标移入事件
		$(".show_leftbox").mouseenter(function(){
			$(".arr").fadeIn("slow");
			clearInterval(intime);
			showDot();
		});
		//注册鼠标移出事件
		$(".show_leftbox").mouseleave(function(){
			$(".arr").fadeOut("slow");
			intime = setInterval(moveRight,3000);
		});
		//为左箭头注册点击事件
		$(".arr-l").click(function(){
			moveLeft();
		});
		//为右箭头注册点击事件
		$(".arr-r").click(function(){
			moveRight();
		});
		//下边圆点光标的选择事件
		$(".select li").click(function(){
			//获得该li的索引
			var index = $(this).index();
			//清除所有li的样式
			$(".select li").removeClass("beSelected");
			//给点击li加上样式
			$(this).addClass("beSelected");
			//当前页数
			current = index+1;
			//图片移动到相应位置
			moveUl.animate({left:"-"+moveWidth*index},1500);
		});
		//换取下一张的共用函数
		function moveRight(){
			//如果图片没在切换
			if(!moveUl.is(":animated")){
				//当前页数加1
				current++;
				//光标移动
				showDot();
				//图片移动
				moveUl.animate({left:'-='+moveWidth},1500,function(){
					if(current == count){
						moveUl.css({"left":0+"px"}).show("fast");
						current = 1;
					}
				});	
			}
		}
		
		//换取上一张图片的共用函数
		function moveLeft(){
			if(!moveUl.is(":animated"))
			{
				//判断是否为第一张图片，如果是的话，跳到最后一张
				if(current == 1){
					current=count;
					moveUl.css({"left": -moveWidth*(count-1)+"px"}).show("fast");		
				}
				moveUl.animate({left:'+='+moveWidth},1500);
				current--;
				//光标移动
				showDot();
			}			
		}
		//显示下面的选择光点
		function showDot(){
			//判断图片是否为最后一张，如果是的话，则索引为1
			var currents = current==5?1:current;
			$(".select li").removeClass("beSelected");
			$(".select li:eq("+(currents-1)+")").addClass("beSelected");
		}
		//轮播图---end
		//注册文章操作按钮事件
		$(".art_likes").click(function(){
			var num = $(this).children("span").text();
			num++;
			$(this).children("span").text(num);
			//如果是文章底部的按钮，则换位实心红桃
			if($(this).parent().hasClass("contain_footer")){
				$(this).children("i").text("");
			}
			
		});
		//当文章内容空间不足时，显示"..."
		if($(".contain_text").height()>$(".contain_text_box").height()){
			//创建一个显示"..."的p标签，并在文章末尾
			var addText = $("<p style='color: #876D54;font-size:16px;font-weight:bold'>...</p>");
			$(".article_contain").append(addText);
		}
		//注册鼠标进去文章内部，进度条进行事件
		$(".articles").mouseenter(function(){
			$(this).children(".progress").animate().stop();
			$(this).children(".progress").animate({"width":$(".articles").width()},4000);
		});
		//注册鼠标移出文章范围，进度条缩回动画
		$(".articles").mouseleave(function(){
			$(this).children(".progress").animate().stop();
			$(this).children(".progress").animate({"width":0},4000);
		});
		//鼠标进入文章框，显示title内容
		//注册鼠标移入事件
		$(".contain_text_box").mouseenter(function(){
			//获取文章内容
			var containText = $(this).children(".contain_text").text();
			//给contain_text_box加上title
			$(this).attr("title",containText);
		});
		//鼠标移入文章图片，图片放大
		//鼠标进入事件
		$(".art_pic").mouseenter(function(){
			//创建一个新的img
			var new_img = $("<img class='big_pic' />");
			//获取图片路径
			new_img.attr("src",$(this).attr("src"));
			//加入到当前元素的父级元素中
			$(this).parent().append(new_img);
			//鼠标移动事件
			$(this).mousemove(function(e){
				//new_img 的top值
				var dis_top = e.clientY+ $(window).scrollTop() - $(this).parent().offset().top;
				//new_img 的left值
				var dis_left = e.clientX+ $(window).scrollLeft() - $(this).parent().offset().left;
				//赋值
				$(".big_pic").css({'top': dis_top+10, 'left': dis_left+10});
			});
		});
		//鼠标移出事件
		$(".art_pic").mouseleave(function(){
			//删除放大的Img
			$(this).siblings(".big_pic").remove();
		});
		//文章右边的窗帘拉条事件
		$(".articles").mouseenter(function(){
			//拉条顶部的纵坐标
			var h_y = $(this).siblings("h2").offset().top + $(this).siblings("h2").height();
			$(this).mousemove(function(e){
				//鼠标纵坐标
				var e_y = e.clientY + $(window).scrollTop();
				//拉条需要移动距离
				var moveY = e_y - h_y;
				//注册拉条移动动画
				$(".cl_img").animate().stop();
				$(".window_cl").animate().stop();
				$(".cl_img").animate({"top": (moveY-40)},500)
				$(".window_cl").animate({"height": moveY},500);
			})	
		});
		//鼠标移出，拉条恢复原状
		$(".articles").mouseleave(function(){
				//注册拉条恢复动画
				$(".cl_img").animate().stop();
				$(".window_cl").animate().stop();
				$(".cl_img").animate({"top": -40},500)
				$(".window_cl").animate({"height": 0},500);
		});
		//为热度排行和推荐文章模块注册a标签的鼠标移入事件和移出事件
		//鼠标移入事件
		$(".article_r ul a").mouseover(function(){
			$(this).animate().stop();
			$(this).animate({"font-size": "13px","color":'#FFFFFF',"margin-left":'7px'},500)
		});
		//鼠标移出事件
		$(".article_r ul a").mouseout(function(){
			$(this).animate().stop();
			$(this).animate({"font-size": "12px","color":'#222222',"margin-left":'0px'},500)
		});
		//<----页面曲卷事件--->
		//注册导航栏固定事件
		var margTop = $(".main").offset().top;//main原本到顶部的距离
		$(window).scroll(function(){
			if($(window).scrollTop() > $(".head").height()){
				$(".head").addClass("head_fixed");
				$(".main").css('margin-top',margTop);
			}else{
				$(".head").removeClass('head_fixed');
				$(".main").css('margin-top',0);
			}
		});
		//为热度排行和推荐文章注册拉帘动画
		//鼠标移入li，上下帘子拉上
		$(".article_r ul li").mouseenter(function(){
			var top = $(this).offset().top - $(this).parent().offset().top;//鼠标所处的li到ul顶部的距离
			var bottom =$(this).parent().height() - top - $(this).height();//鼠标所处的li到ul底部的距离
			//停止之前的动画
			$(this).siblings().animate().stop();
			//上方帘子拉上动画
			$(this).siblings(".ul_bg_top").animate({"height": top, "opacity": 0.2}, 1500);
			//下方帘子拉上动画
			$(this).siblings(".ul_bg_botoom").animate({"height": bottom+10, "opacity": 0.2}, 1500);	
		});
		//鼠标移出li，上下帘子拉回
		$(".article_r ul li").mouseleave(function(){
			var top = $(this).offset().top - $(this).parent().offset().top;//鼠标所处的li到ul顶部的距离
			var bottom =$(this).parent().height() - top - $(this).height();//鼠标所处的li到ul底部的距离
			//停止之前的动画
			$(this).siblings().animate().stop();
			//上方帘子拉上动画
			$(this).siblings(".ul_bg_top").animate({"height": 0, "opacity": 0.8}, 200);
			//下方帘子拉上动画
			$(this).siblings(".ul_bg_botoom").animate({"height": 0, "opacity": 0.8}, 200);
			
		});
		
		
	});
	
	
	
})(window)

