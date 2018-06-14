	// 首页banner轮播
	// 顶部手动轮播图1
var width = document.documentElement.clientWidth;
var imgNum = $('.top-slider-imgbox li').length;
$('.all-num').text(imgNum)
var index = 1;
var imgBox = document.getElementById("imgbox")
console.log(imgBox)
$(imgBox).css('width', width * imgNum + 'px');
//$('.top-slider-imgbox li').css('width', width + 'px');

// 提取公用方法
var addTransition = function() {
	// 增加过渡
	imgBox.style.transition = 'all 0.2s';
	imgBox.style.webkitTransition = "all 0.2s"; //兼容
}
var removeTransition = function() {
	// 清除过渡
	imgBox.style.transition = 'none';
	imgBox.style.webkitTransition = "none"; //兼容
}
var setTranlateX = function(translatex) {
	// 设置位移
	imgBox.style.transform = "translateX(" + translatex + "px)";
	imgBox.style.webkitTramsform = "translateX(" + translatex + "px)";
}

var index = 0;
$('.current-num').text(index + 1)
var timer = setInterval(function() {
	index++;
	// 增加过渡
	addTransition();
	//位移
	setTranlateX(-index * width);
}, 3000);
// 怎么监听过渡截止的时间 过渡结束S事件
imgBox.addEventListener('transitionend', function() {
	// 无缝滚动
	if(index >= imgNum) {
		// 瞬间定位到第一张
		index = 0;
		// 先清除过渡，然后在根据index定位
		removeTransition();
		setTranlateX(-index * width);
	}
	// 无缝滑动（定时器、过渡、位移）
	else if(index <= 0) {
		index = imgNum - 1;
		removeTransition();
		setTranlateX(-index * width);
	}
	console.log(index)
	$('.current-num').text(index + 1)

})

var startX = 0; //记录开始的X的坐标
var distanceX = 0; //记录坐标轴的改变
// 为了严谨
var ismove = false;
// 可以滑动（touch事件  监听触摸点坐标的改变距离 位移）
imgBox.addEventListener("touchstart", function(e) {
	 //在做滑动之前清除定时器
	clearInterval(timer);
	//记录开始的位移
	startX = e.touches[0].clientX;
	// console.log(startX);
});

imgBox.addEventListener("touchmove", function(e) {
	var moveX = e.touches[0].clientX;
	distanceX = moveX - startX;
	//当distanceX大于0的时候向右滑动，小于0的时候向左滑动
	// 基于当前的位置来计算定位，而不是用0,0
	var translateX = -index * width + distanceX;
	// // 即时的跟着手指做滑动，因此就不需过渡了
	removeTransition();
	// // 做定位
	setTranlateX(translateX);
	ismove = true;
});

// 手指离开屏幕的时候触发
imgBox.addEventListener("touchend", function(e) {
	console.log(distanceX);
	// 滑动事件结束以后来判断当前滑动距离
	// 有一个范围，如果滑动的范围大于三分之一则切换图片，如果小于三分之一则定位回去
	if(ismove) {
		if(Math.abs(distanceX) < width / 3) {
			// 移动距离不够的时候（过渡效果、位移）
			addTransition();
			setTranlateX(-index * width);
		} else {
			//滑动距离够了的时候（切换上一张、下一张）
			if(distanceX > 0) {
				// 向右滑，切换到上一张
				index--;
			} else {
				// 向左滑
				index++;
			}
			addTransition();
			setTranlateX(-index * width);
		}
	}
	// 为了严谨，保证只加一次定时器
	clearInterval(timer);
	// 手指离开的时候要加上定时器
	timer = setInterval(function() {
		index++;
		// 增加过渡
		addTransition();
		//位移
		setTranlateX(-index * width);
	}, 2000);
	//重置参数，表面滑动结束后对效果产生影响
	startX = 0;
	distanceX = 0;
	ismove = false;
});