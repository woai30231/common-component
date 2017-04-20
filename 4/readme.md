##　前言

* 这里实现了一个后台商品属性规格添加，修改，删除等功能，因为当时做这个功能的时候，本不是需要我完成这个工作，而是一个后台妹子，需要在后台实现一个类似修改商品属性等的功能，所以就找了我帮忙去写这个功能，于是我刚好手头也没有很紧急的事情，于是就爽快接了下来，虽然帮到后面结果就是：假设某天后台接口数据变了，需要我来重新改代码，变成我自己的事来维护这个功能了，你们懂的！

* 虽然最后功能确实是实现了，但是想起来，还是有一些不足的：1、当时以为这个功能应该蛮简单的，而且本身功能需求也比较单一，说白了就是写个功能，所以也没有去用框架，就直接用jquery+原生js写，这样带来的后果就是有很多dom更新、页面更新的操作，需要我自己去写，而不是靠框架来完成，其实这也就是无可厚非，无非相对来说多写了很多代码，但是因为过多地自己实现dom的绘制操作，导致大脑没有集中到真正的主题（这个功能实现的核心）上，所以绕了很多弯子；2、我觉得最主要的就是其中用了很多for循环去遍历数据，有的时候还多层循环，真的很烦，而且代码很难看，所以现在要我来优化这个功能的js脚本的话，我肯定会想到从for循环出发来优化！

### 实现的功能

* 商品属性添加、修改、删除等！

* 设置商品库存、价格、编码等！

* 批量修改商品库存、价格、编码！

* 还可以显示商品的默认规格、库存、价格、编码等！


### 值得借鉴的地方

虽然这里的代码总是有那么一点差强人意，可以在大师那里看来是该删的代码，但是他确实有它值得思量的地方，下面从几个点来说明：

* 1、**模拟数据** 这里的模拟数据有多种理解哈：

1）我在实现写这个功能的时候，后台并没有给我明确的接口数据，所以我也并不知道后台会传给我什么数据，那该怎么做呢？其实到这里，你完全不需要考虑后台的接口，**而你只需要的是，你实现的这个功能需要什么数据才能足以考虑到功能的方方面面**！然后你模拟一个这样的数据，就好比，我在在实现这个功能的时候，虽然后台给我的是一大串很复杂的json数据，但是其实我并不完全需要这样一个数据，因为从几个方面来说，我并不直接需要后台给我的数据，第一，后台返回数据一般都是很复杂，并不是跟构建的dom匹配；第二，从解耦的思路来说，你需要的数据不能太直接依赖后台的数据，这样很容把你的功能写死。那么最后怎么跟后台的接口联系起来呢？ok，你只需要构建一个“桥梁”，来建立这层关系，就像一条的河流的两岸一样，只要能构建好桥梁，它们之间就能通过了！好，我们来看代码：

```javascript
	//首先后台返回的接口数据
	var interface_data_arr = [
    {
        "id": 4,
        "model_name": "大小",
        "sortIndex": "255",
        "attr_value": [
            {
                "is_active": false,
                "alternative_name": "XL",
                "id": 3
            },
            {
                "is_active": true,
                "alternative_name": "L",
                "id": 5
            },
            {
                "is_active": false,
                "alternative_name": "M",
                "id": 7
            },
            {
                "is_active": false,
                "alternative_name": "S",
                "id": 15
            }
        ],
        "is_currentUse": true
    },
    {
        "id": 5,
        "model_name": "颜色",
        "sortIndex": "256",
        "attr_value": [
            {
                "is_active": true,
                "alternative_name": "红色",
                "id": 33
            },
            {
                "is_active": false,
                "alternative_name": "黑色",
                "id": 34
            },
            {
                "is_active": false,
                "alternative_name": "蓝色",
                "id": 35
            },
            {
                "is_active": false,
                "alternative_name": "绿色",
                "id": 36
            },
            {
                "is_active": false,
                "alternative_name": "黄色",
                "id": 37
            }
        ],
        "is_currentUse": true
    },
    {
        "id": 6,
        "model_name": "对象",
        "sortIndex": "257",
        "attr_value": [
            {
                "is_active": false,
                "alternative_name": "成人",
                "id": 83
            },
            {
                "is_active": false,
                "alternative_name": "儿童男",
                "id": 97
            },
            {
                "is_active": false,
                "alternative_name": "儿童女",
                "id": 98
            },
            {
                "is_active": false,
                "alternative_name": "绿色",
                "id": 36
            },
            {
                "is_active": false,
                "alternative_name": "黄色",
                "id": 37
            }
        ],
        "is_currentUse": false
    },
    {
        "id": 7,
        "model_name": "花色",
        "sortIndex": "258",
        "attr_value": [
            {
                "is_active": true,
                "alternative_name": "红花",
                "id": 100
            },
            {
                "is_active": false,
                "alternative_name": "百花",
                "id": 120
            },
            {
                "is_active": false,
                "alternative_name": "粉花",
                "id": 130
            },
            {
                "is_active": false,
                "alternative_name": "绿色",
                "id": 36
            },
            {
                "is_active": false,
                "alternative_name": "黄色",
                "id": 37
            }
        ],
        "is_currentUse": true
    }
];
```

而我实现功能并不需要这样的数据的，我只需要下面的数据：

```javascript
	var alternative_models_data = [
		//尺寸
		 {
		 	model_name:'尺寸',
		 	alternative_data:['X','S','M'],
		 	is_currentUse:false	
		 },
		//颜色
		 {
		 	model_name:'颜色',
		 	alternative_data:['红色','绿色','蓝色'],
			is_currentUse:false
		 },
		//内存
		 {
		 	model_name:'内存',
		 	alternative_data:['8G','16G'],
		 	is_currentUse:false
		 }

	];
```

我们可以通过实现一个“桥梁”，来把后台的数据变成我们需要的数据：

```javascript
	var alternative_models_data = [];
	(function(){
		for(var i = 0,len = interface_data_arr.length;i<len;i++){
			var obj = {};
			obj.model_name = interface_data_arr[i].model_name;
			obj.alternative_data = [];
			// obj.is_currentUse = false;
			obj.is_currentUse = interface_data_arr[i].is_currentUse;
			for(var j = 0,len1 = interface_data_arr[i].attr_value.length;j<len1;j++){
				obj.alternative_data.push(interface_data_arr[i].attr_value[j].alternative_name);
			};
			alternative_models_data.push(obj);
		};
	})();
```

我们这样是不是把后台给的数据换成我们理想的数据了呢？所以我们根本不用太在意后台的接口数据！导致你就能单纯的实现你的功能，不用受后台接口数据的影响了！

2） 模拟数据还有一种理解就是根据需要我们可以定义一个数据用来表示某种状态或者某种结果，比如我们可以定义一个值为1表示成功、通过等，用0表示失败，未通过等！当然，尽量用一个数字表示来模拟这种数据，这样有一个好处就是，你可以计算了，最后再通过这个最终值，来判断是否达到某种状态，来看一个例子吧，我们实现一个答题的功能，最后根据用户的答题来给用户打分，满分是100，总共5道单选题，那么就这个逻辑来说，我们可以这样出发：

```javascript
	//定义一个数组存储用户的成绩，grade_item代表题的序号，grade分表代表这道题的通过情况
	//1就是通过，0通过
	//当然了，这里user_grade可以默认为空数组，我们可以在用户答完一道题之后向数组里面推送一个
	//成绩数据
	var user_grade = [
		{
			grade_item:0,
			grade : 0
		},
		{
			grade_item:1,
			grade : 0
		},
		{
			grade_item:2,
			grade : 0
		},
		{
			grade_item:3,
			grade : 0
		},
		{
			grade_item:4,
			grade : 0
		}
	];


	//答题代码省略
	

	//假设成绩答完， 现在user_grade变成了，如下：

	var user_grade = [
		{
			grade_item:0,
			grade : 1
		},
		{
			grade_item:1,
			grade : 0
		},
		{
			grade_item:2,
			grade : 1
		},
		{
			grade_item:3,
			grade : 1
		},
		{
			grade_item:4,
			grade : 0
		}
	];
	//于是我们看到用户答对了3道题，所以得分应为60分，那么我们可以这样计算出来
	

	//算出每道题答对之后的应得分
	var shouldScore = 100/5;
	//那么最后用户的得分应该是每道题的总分 * 答对题数
	var userScore = (function(){
		var num = 0;
		for(var i = 0,len = user_grade.length;i<len;i++){
			if(user_grade[i].grade == 1){
				num += shouldScore;
			};
		};
		return num;
	})();

	console.log(userScore);
```

说了这么多，你可能会问：我是不是在废话呀，我们平时开发不是都这样做的吗？我想说明什么？ 其实我就是想说的是一种思想或者说思维：任何我们现实中存在的事物，在我们的代码中都可以用一种数据来对应它，这样我们才能实现在代码中对事物的某种操作！事物跟代码的关系在某种意义上是一种对等关系！虽然本质上没有任何关系，理解到这一点很重要，因为当你真正理解之后你会发现最终无非在做一些数学计算！


* 2、在写代码的时候，你会发现，我大量使用了function，这是javascript函数编程的一大亮点，其实这样做好处是有很多的！1） 首先你重用了你的代码；2）减小了你单个函数的函数体量，因为可以设想如果把一个功能写在一个函数里面，那么可想而知，你这个函数是多么的臃肿和难以阅读；3）不知道你有没有发现，你把一个大函数分解成很多小函数的，其实每个小函数的命名起到了很好的解释和注释作用！来看下下面这个例子：

```javascript
	//最开始的大函数
	//实现先加后减
	function evaluation(a,b,c){
		var d = a + b;
		var e = d - c;
		return e;
	};
	evaluation(3,5,4);//4


	//再来看看另外一种方式实现同样的功能
	function ev(a,b,c){
		var d = sum(a,b);
		var e = diff(e,c);
		return e;
	};
	function sum(a,b){
		return a+b;
	};
	function diff(a,b){
		return a-b;
	};
	ev(3,5,4);//4

	//首先说明一下，因为这里代码量很小哈，所以可能好处并不明显，
	//但是直观地看第二种方式有几个好处，
	//1、sum和diff可以在其它地方复用
	//2、sum和diff的名称是不是让你一眼就知道它们的功能?
	//3、ev函数体里面的代码是不是很容容易阅读，只要会点英语，都能知道它干嘛的

```

所以，应提倡用这种函数式编程来优化你的脚本！

* 3、我们平时在前端开发过程中，可能大家更多的印象就是用js实现一下有关dom的操作，用一下ajax来对接数据等等，其实当我们实现一个稍微复杂的功能的时候，js也是完全可以上升到需要用“算法”的层次的！当然了，说到算法，这个是一个很有意义的概念，当然了，这方面我也是有很多不足的，在这里提出这个概念，只是让大家在开发的过程中应该始终有算法这个概念，因为了，算法有了，就相当于一个人有了灵魂了，它还需要的仅仅是一个肉体（代码）了！不说了，粘贴上写这个功能的时候用到的别人写的一个关于数组排列组合的算法：

```javascript
// Arbitrary base x number class 
var BaseX = function(initRadix){
    this.radix     = initRadix ? initRadix : 1;    
    this.value     = 0;
    this.increment = function(){
        return( (this.value = (this.value + 1) % this.radix) === 0);
    }
};

function combinations(input){
    var output    = [],    // Array containing the resulting combinations
        counters  = [],    // Array of counters corresponding to our input arrays
        remainder = false, // Did adding one cause the previous digit to rollover?
        temp;              // Holds one combination to be pushed into the output array

    // Initialize the counters
    for( var i = input.length-1; i >= 0; i-- ){
        counters.unshift(new BaseX(input[i].length));
    }

    // Get all possible combinations
    // Loop through until the first counter rolls over
    while( !remainder ){
        temp      = [];   // Reset the temporary value collection array
        remainder = true; // Always increment the last array counter

        // Process each of the arrays
        for( i = input.length-1; i >= 0; i-- ){
            temp.unshift(input[i][counters[i].value]); // Add this array's value to the result

            // If the counter to the right rolled over, increment this one.
            if( remainder ){
                remainder = counters[i].increment();
            }
        }
        output.push(temp); // Collect the results.
    }

    return output;
};

// Input is an array of arrays
// console.log(combinations([[0,1], [0,1,2,3], [0,1,2]]));
// var r=allPossibleCases(allArrays);
// console.log(r);

```



