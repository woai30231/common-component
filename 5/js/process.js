"use strict";
var _process = (function(){
	var dom = null;
	return {
		show:show,
		hide:hide
	};
	function preview_load(){
		show();
		hide();
	};
	preview_load();
	function show(){
		if(!dom){
			var tips = tips?tips:'加载中......';
			dom = document.createElement('div');
			$(dom).css({
				'position':'fixed',
				'left':'0px',
				'right':'0px',
				'top':'0px',
				'bottom':'0px',
				'maxWidth':'6.4rem',
				'zIndex':999,
				'margin':'0px auto',
			});
			dom.innerHTML = '<div style=\"text-align:center;background-color:rgba(255,255,255,0.5);-webkit-border-radius:0.10rem;-moz-border-radius:0.10rem;-o-border-radius:0.1rem;border-radius:0.1rem;width:150px;height:150px;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);\">\n'+
				'<img style=\"display:block;margin:0px auto;margin-top:40px;\" src=\"./images/vote_search-icon5.gif\"/>\n'+
				'<span style=\"color:#fff;\">'+tips+'</span>\n'+
			'</div>';
			document.body.appendChild(dom);
		};
		dom.style.display = 'block';
	};
	function hide(){
		dom.style.display = 'none';
	};
})();