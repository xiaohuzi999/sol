package com.xiaohuzi999.storyEditor.model
{
	import com.greensock.easing.Strong;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.storyEditor.vo.StoryVo;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.util.ArrayUtils;
	import com.xiaohuzi999.xControls.util.GUID;
	import com.xiaohuzi999.xControls.util.XCookie;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.system.System;

	/**
	 * LocalDataManager //本地数据保存-sharedObject对象存储；
	 * 数据格式
	 * [
	 * 		{storyName:场景名,storyId:场景id,dialogList:{对话}}
	 * ]
	 * 
	 * author:xiaohuzi999
	 * LocalDataManager.as 2015-5-19 下午4:02:46
	 * version 1.0
	 */
	public class DB
	{
		/***/
		private static const NAME:String = "storyData";
		/**数据源*/
		private static var _storyList:Array;
		/**城池名/章节名*/
		private static var _chapName:String = "新章节";
		/**图片*/
		private static var _pic:String = "";
		public function DB()
		{
			
		}
		
		/**初始化*/
		public static function init(localData:String = null):void{
			if(localData){
				XCookie.set(NAME, JSON.parse(localData));
			}
			_storyList = new Array;
			var storyVo:StoryVo;
			var recordVo:RecordVo;
			
			_chapName = data.name;
			_pic = data.pic
			var list:Array = (data.list || []);
			list.sortOn("storyId", Array.NUMERIC);
			for(var i:uint=0; i<list.length; i++){
				storyVo = new StoryVo(list[i]);
				storyVo.dialogList = new Object();
				for(var j:String in list[i].dialogList){
					recordVo = new RecordVo(list[i].dialogList[j]);
					storyVo.dialogList[recordVo.recordId] = recordVo
				}
				_storyList.push(storyVo);
			}
			
		}
		
		/**保存*/
		public static function save():void{
			XCookie.set(NAME, {pic:_pic,name:_chapName, list:_storyList});
		}
		
		/**新建一个剧情*/
		public static function createStory(name:String, condition:String="", type:String="0"):StoryVo{
			if(getStoryByName(name)){
				return null;
			}
			var storyId:int = getStoryId();
			var storyInfo:StoryVo = new StoryVo();
			storyInfo.storyId = storyId;
			storyInfo.storyName = name;
			storyInfo.condition = condition;
			storyInfo.type = type;
			//初始化数据
			storyInfo.dialogList["0"] = new RecordVo({"recordId":0});
			_storyList.push(storyInfo);
			_storyList.sortOn("storyId", Array.NUMERIC);
			save();
			return storyInfo;
		}
		
		/**获取某个剧情的数据*/
		public static function getStoryByName(name:String):Object{
			for(var i:String in _storyList){
				if(_storyList[i].storyName == name){
					return _storyList[i];
				}
			}
			return null;
		}
		
		/**删除一个剧情*/
		public static function delStory(name:String):void{
			for(var i:uint = 0; i<_storyList.length; i++){
				if(_storyList[i].storyName == name){
					_storyList.splice(i, 1);
					break;
				}
			}
			for(; i<_storyList.length; i++){
				_storyList[i].storyId --;
			}
			save();
		}
		
		/***/
		private static function getStoryId():int{
			if(_storyList && _storyList[_storyList.length -1]){
				return _storyList[_storyList.length -1].storyId+1;
			}
			return 0;
		}
		
		/**获取对话信息*/
		private static function getDialogInfo(storyInfo:Object, diaId:String):RecordVo{
			var list:Object = storyInfo.dialogList;
			return list[diaId];
		}
		
		/**修改剧情信息*/
		public static function modifyDialog(storyName:String, dialogInfo:Object):void{
			var storyInfo:Object = getStoryByName(storyName);
			var tempInfo:Object = getDialogInfo(storyInfo, dialogInfo.recordId);
			if(!tempInfo){
				storyInfo.dialogList[tempInfo.recordId] = tempInfo;
			}else{
				dialogInfo = JSON.parse(JSON.stringify(dialogInfo))
				for(var i:String in dialogInfo){
					tempInfo[i] = dialogInfo[i];
				}
			}
			save();
		}
		
		/**
		 * 新增对话
		 * @param storyName 剧情名
		 * @param  preId 前一个数据的ID
		 * @param vo 数据，如果空表示新建，否则克隆
		 */
		public static function addDialog(storyName:String, preId:String, vo:Object = null, key:String = "0"):void{
			var dialogInfo:RecordVo = new RecordVo()
			if(vo){
				vo = JSON.parse(JSON.stringify(vo))
				dialogInfo.setValue(vo);
			}
			
			var storyInfo:Object = getStoryByName(storyName);
			var list:Object = storyInfo.dialogList;
			
			//dialogInfo.recordId = GUID.create();
			dialogInfo.recordId = storyInfo.diaIndex;
			storyInfo.diaIndex ++ ;
			
			//取出插入数据=====================
			var preData:RecordVo = getDialogInfo(storyInfo, preId);
			if(!preData){
				XTip.showTip("数据错误~");
				return;
			}
			//
			dialogInfo["nextRecordId_"+0] = preData["nextRecordId_"+key];
			preData["nextRecordId_"+key] = dialogInfo.recordId;
			
			//插入
			list[dialogInfo.recordId] = dialogInfo;
			save();
		}
		
		/**删除对话*/
		public static function delDialog(storyName:String,id:String):void{
			var storyInfo:Object = getStoryByName(storyName);
			var list:Object = storyInfo.dialogList;
			var dialogInfo:RecordVo = getDialogInfo(storyInfo, id);
			var delList:Array = new Array();
			
			//分歧节点,删除所有子节点
			var tempInfo:RecordVo;
			var nextId:String = dialogInfo.nextRecordId_0
			if(dialogInfo.label_1){
				for(i in list){
					if(list[i].parentId == dialogInfo.recordId){//
						if(!tempInfo){
							tempInfo = getDialogInfo(storyInfo, list[i].nextRecordId_0);
							if(tempInfo && tempInfo.parentId  == list[i].parentId){
								tempInfo = null;
							}
						}
						list[i] = null;
						delete list[i];
					}
				}
				if(tempInfo){
					nextId = tempInfo.nextRecordId_0
				}
			}else{
				//删除
				for(i in list){
					if(list[i].recordId == id){
						list[i] = null;
						delete list[i];
						break;
					}
				}
			}
			
			//修改链接到当前数据的节点 
			for(var i:String in list){
				for(var j:uint=0; j<4; j++){
					if(list[i]["nextRecordId_"+j] == id){
						list[i]["nextRecordId_"+j] = nextId;
					}
				}
			}
			save();
		}
		
		/**获取对话列表*/
		public static function getDialogList(storyName:String):Array{
			var list:Array = new Array();
			var storyInfo:Object = getStoryByName(storyName);
			var dialogInfo:Object = storyInfo.dialogList;
			//找到第一个对话
			var info:RecordVo = dialogInfo["0"];
			list.push(info);
			
			while(info && info.nextRecordId_0){
				var tempInfo:RecordVo
				if(info.label_1){
					//分支剧情
					var currentId:String;
					var endData:RecordVo
					for(var j:uint=0 ;j<4; j++){
						if(info["nextRecordId_"+j]){
							currentId = info["nextRecordId_"+j];
							if(!endData){
								endData = getDiffDialogList(list, info.recordId, currentId);
							}else{
								getDiffDialogList(list, info.recordId, currentId);
							}
						}else{
							break;
						}
					}
					//分支剧情结束
					if(endData){
						list.push(endData);
					}
					info = endData;
					endData = null;
				}else{
					//trace(info.recordId,info.nextRecordId_0);
					tempInfo = getDialogInfo(storyInfo, info.nextRecordId_0);
					if(tempInfo){
						list.push(tempInfo);
					}
					info = tempInfo;
				}
			}
			return list;
			
			
			//不支持分支嵌套；
			function getDiffDialogList(arr:Array,parentType:String, curRecordId:String):RecordVo{
				var vo:RecordVo
				while(curRecordId && curRecordId != "null"){
					var curInfo:RecordVo = getDialogInfo(storyInfo, curRecordId);
					if(curInfo &&  curInfo.parentId == parentType){
						arr.push(curInfo);
						curRecordId = curInfo.nextRecordId_0;
					}else{
						vo = curInfo;
						curRecordId ="";
					}
				}
				return vo;
			}
		}
		
		/**一键背景*/
		public static function setBgOnce(storyName:String, bgName:String):void{
			var storyInfo:Object = getStoryByName(storyName);
			var dialogInfo:Object = storyInfo.dialogList;
			for(var i:String in dialogInfo){
				dialogInfo[i].bg = bgName
			}
			save();
		}
		
		/**继承立绘*/
		public static function setPlayer(storyName:String, record:Object):void{
			var storyInfo:Object = getStoryByName(storyName);
			var dialogInfo:Object = storyInfo.dialogList;
			var nowRecord:Object;
			var targetRecord:Object;
			for(var i:String in dialogInfo){
				if(dialogInfo[i].recordId == record.recordId){
					nowRecord = dialogInfo[i];
				}else if(dialogInfo[i].nextRecordId_0 == record.recordId || dialogInfo[i].nextRecordId_1 == record.recordId || 
					dialogInfo[i].nextRecordId_2 == record.recordId || dialogInfo[i].nextRecordId_3 == record.recordId){
					targetRecord = dialogInfo[i];
				}
				if(nowRecord && targetRecord){
					nowRecord.leftPlayer = targetRecord.leftPlayer
					nowRecord.rightPlayer = targetRecord.rightPlayer
					break;
				}
			}
		}
		
		public static function get storyList():Array{
			if(!_storyList){
				init();
			}
			return _storyList;
		}
		
		public static function set chapName(v:String):void{
			_chapName = v;
			save();
		}
		
		public static function get chapName():String{
			return _chapName;
		}
		
		public static function set pic(v:String):void{
			_pic = v;
			save();
		}
		
		public static function get pic():String{
			return _pic;
		}
		
		/**导入数据*/
		public static function importData(data:String):void{
			init(data);
			MainDispatcher.getInstance().dispatchEvent(new XEvent(XEvent.CHANGE));
		}
		
		/**导出*/
		public  static function export():String{
			var str:String = ""
			var info:Object = {};
			info.name = DB.chapName;
			info.pic = DB.pic
			info.list = DB.storyList
				
				
			//扔掉冗余数据========================
			var list:Object = JSON.parse(JSON.stringify(info.list));
			for(var i:String in list){
				var diaList:Object = list[i].dialogList;
				for(var j:String in diaList){
					var tmp:Object = diaList[j];
					for(var k:String in tmp){
						if(!tmp[k]){
							delete tmp[k];
						}
					}
				}
			}
			info.list = list;
			//end=================================
			
			str = JSON.stringify(info);
			
			System.setClipboard(str);
			
			str = JSON.stringify(info);
			return str;
		}
		
		
		public static function get data():Object{
			if(!XCookie.get(NAME)){
				XCookie.set(NAME, {name:"新章节",list:[]});
			}
			var info:Object = XCookie.get(NAME)
			return XCookie.get(NAME);
		}
	}
}