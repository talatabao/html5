/**
 * author : pqbao1987@gmail.com
 */
function onCreateBanner(_stage)
{
	var _display = _stage;
	var _border;
	var _queueLoad;
	var _arrItem = [];
	var _arrItemDisplay = [];

	/**
	 * [onCreateBG Tạo background và boder]
	 * @param  {[int]} _width       [chiều rộng background]
	 * @param  {[int]} _height      [chiều cao background]
	 * @param  {[unit]} _colorBg     [màu của background "#000000"]
	 * @param  {[int]} _strokeLine  [độ dày đường viền]
	 * @param  {[util]} _strokeColor [màu đường viền "#c0c0c0"]
	 * @return {[vois]}              [thực thi]
	 */
	this.onCreateBg = function(_width, _height, _colorBg, _strokeLine, _strokeColor)
	{
		//tao background
		var shape = new createjs.Shape();
	 	shape.graphics.beginFill(_colorBg).drawRect(0, 0, _width, _height);
	 	_display.addChild(shape);

		//tao boder
		_border = new createjs.Shape();
		_border.graphics.beginStroke(_strokeColor);
		_border.graphics.setStrokeStyle(_strokeLine);
		_border.snapToPixel = true;
		_border.graphics.drawRect(_strokeLine, _strokeLine, _width-_strokeLine*2, _height-_strokeLine*2);				
		_display.addChild(_border);
		//border.zIndex  = 9999;
	}

	this.onCreateBorder = function(_width, _height, _colorBg, _strokeLine, _strokeColor)
	{
		//tao boder
		_border = new createjs.Shape();
		_border.graphics.beginStroke(_strokeColor);
		_border.graphics.setStrokeStyle(_strokeLine);
		_border.snapToPixel = true;
		_border.graphics.drawRect(_strokeLine, _strokeLine, _width-_strokeLine*2, _height-_strokeLine*2);				
		_display.addChild(_border);
	}
	/**
	 * [onLoadData Thực hiện việc load dữ liệu]
	 * @param  {[array]} _arrObj  [description]
	 * @param  {[Boolean]} _visible [hiện - ẩn dữ liệu sau khi load]
	 * @return {[type]}          [description]
	 */
	this.onLoadData = function(_arrObj, _isShow)
	{
		_queueLoad = new createjs.LoadQueue(_isShow); 
		_queueLoad.loadManifest(_arrObj); 			
		_queueLoad.addEventListener('fileload', handleFileLoad);
		_queueLoad.addEventListener("complete",handelComplete);
		function handelComplete(event)
		{			
			//console.log("queue-loader-complete --> dispatchEvent 'LOAD_COMPLETE'");	

			for (var j = 0; j < _arrItem.length; j++) {				
				var _val = _queueLoad.getResult(_arrItem[j].id);
				var _myVal = new createjs.Bitmap(_val);
				//gan id lai cho doi tuong 
				_myVal._valID = _arrItem[j].id;

				//add doi tuong vao stage
				_display.addChild(_myVal);				

				//an - hien hinh anh theo y nguoi dung sau khi loader finish
				_myVal.visible = _isShow;

				_arrItemDisplay.push(_myVal);				
			};
			
			adsEvent.dispatch("LOAD_COMPLETE");
		}
		function handleFileLoad(event)
		{
			//console.log("file-load-compelete-->" + event.item);
			_arrItem.push(event.item);
		}
	}

	/**
	 * [onGetImage hàm này trả về item tương ứng với _id truyền vào và hiển thị item đó lên stage]
	 * @param  {[String]} _id [truyền vào _id của đối tượng muốn lấy ra]
	 * @return {[type]}     [description]
	 */
	this.onGetImage = function(_id)
	{
		for (var i = _arrItemDisplay.length - 1; i >= 0; i--) {
			
			if(_arrItemDisplay[i]._valID == _id){
				//hien thi hinh anh len man hinh
				_arrItemDisplay[i].visible = true;
				//tra ve doi tuong nguoi dung can tuong ung voi id truyen vao
				return _arrItemDisplay[i];
			}
		};
	}


	this.onTweener = function()
	{
		
	}
	
}