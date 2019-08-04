(function(){
	$(document).ready(function(){
		//注册鼠标进入图片框，文本框进入事件
		$(".pictures li").mouseenter(function(){
			$(this).children(".show_message").stop().slideDown(1000);
		});
		//注册鼠标移出，文本框退出事件
		$(".pictures li").mouseleave(function(){
			$(this).children(".show_message").stop().slideUp(1000);
		});
		//页面滚动，图片淡入淡出事件
		$(window).scroll(function(){
			 $(".pictures li").each(function(){
			 	//li到达可视区域上方的距离
				var load_top = $(this).offset().top - $(window).scrollTop();
				if(load_top <= $(window).height() - 100){
					$(this).stop().animate({'opacity': 1},1000);
					if($(window).scrollTop() - $(this).offset().top >260){
						$(this).stop().animate({'opacity': 0},1000);
					}else{
						$(this).stop().animate({'opacity': 1},1000);
					}
				}else{
					$(this).stop().animate({'opacity': 0},1000);
				}
			 });
		})
		
	});
})(window)
