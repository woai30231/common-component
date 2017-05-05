## 前言

这个组件是我写过的关于移动端h5活动转盘抽奖的页面，当时写完之后确定挺好看、挺炫的，所以就把它单独出来了，以后再写类似的页面，可以参考其中的一些实现原理！

### 主要用到的技术

* 用Math.random()方法实现一个区间的随机数，用于实现每次用户点击抽奖的时候，随机得到转盘需要所转的盘数。代码原理如下：


```javascript
	//获取一个介于某两个数之间的
	function getRandomNumber(min,max){
		return Math.floor(Math.random() * (max - min)) + min;
	};
```

* 在实现转盘的时候，用到了两个随机数，一个较小，一个较大，主要用来分别控制指针和奖品转盘以不同的速度旋转，用以给用户实现视差！

* 转盘旋转之前，用不同的初始角度代表不同的不同的奖品，那么最后转盘要转的角度就是:随机数n * 360。比如“xx奖品”的默认角度相对于转盘是45度，抽奖的时候，得到的随机数是2，那么转盘就应该转2 * 360 + 45 = 765度。这样就能把每次转盘所转的角度跟产品对应起来了！

* 动画实现方面主要用到了setTimeout和window.requestAnimationFrame，但是主要在用setTimeout的时候，为了防止动画的抖动，应该保证1s中绘制60帧页面，也就是说，转盘要转3圈，用时3秒的话，那么每调一次setTimeout方法，转盘所转的角度就是：

```javascript
	var perAngle = 3 * 360 / 3 * 60;//6°
```

* 另外，为了防止用户多次点击抽奖，多次向后台发送数据，对ajax请求进行了一定的处理，当然了，也为了防止连续点击抽奖按钮，多次动画，也进行了响应的处理，主要思路就是点击抽奖的时候，显示一个遮罩层，这个遮罩层的z-index大于抽奖按钮，这样就阻止了用户再次点击抽奖按钮，最后抽奖成功之后，再把这个遮罩层隐藏。主要原理代码如下：

```javascript
	var isRequesting = false;
	function getData(){
		//如果当前用户正在进行抽奖，那么就返回
		if(isRequesting)return false;
		isRequesting = true;
		//显示遮罩层
		$("._mask").css('display','block');
		//其余代码省略
		$.ajax({
			url:server_api_address,
			type:'GET',
			success : function(data){
				isRequesting = false;
				//其余代码省略


				//当前转盘动画完成之后
				//再隐藏遮罩层
				animationComplate(function(){
					$("._mask").css('display','none');
				});
			},
			error:function(data){
				//代码省略
			}
		});
	};
```


### 需要改进的地方

* 目前来看，我觉得唯一有点欠缺的地方就是：转盘和指针的旋转速度总是匀速的，很难带给用户那种惊心动魄、期待的真实抽奖的感觉。所以转盘的速度算法方面应该做一些改进！让抽奖更接近真实感觉！

* 当然其它一些地方问题，这里就不注重谈了，因为涉及到具体的前后台对接问题！

