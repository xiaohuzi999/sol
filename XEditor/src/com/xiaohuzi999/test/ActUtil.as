package com.xiaohuzi999.test
{
	import com.greensock.TweenLite;
	
	import flash.display.DisplayObject;

	/**
	 * ActUtil
	 * author:xiaohuzi999
	 * ActUtil.as 2018-10-22 下午8:49:54
	 * version 1.0
	 *
	 */
	public class ActUtil
	{
		public function ActUtil()
		{
		}
		
		public static function shake(dis:DisplayObject,  del:int=40, del2:int=20):void{
			var x:Number = dis.x;
			var y:Number = dis.y;
			var dx:int = int(Math.random()*del) - del2;
			var dy:int = int(Math.random()*del) -del2
			TweenLite.to(dis, 0.1, {x:x+dx, y:y+dy, onComplete:function():void{
				dx = int(Math.random()*del) - del2;
				dy = int(Math.random()*del) - del2;
				TweenLite.to(dis, 0.1, {x:x+dx, y:y+dy, onComplete:function():void{
					dx = int(Math.random()*del) - del2;
					dy = int(Math.random()*del) - del2;
					TweenLite.to(dis, 0.1, {x:x+dx, y:y+dy, onComplete:function():void{
						dx = int(Math.random()*del) - del2;
						dy = int(Math.random()*del) - del2;
						TweenLite.to(dis, 0.1, {x:x+dx, y:y+dy, onComplete:function():void{
							TweenLite.to(dis, 0.1, {x:x, y:y, onComplete:function():void{
							}})
						}})
					}})
				}})
			}})
		}
		
		public static function shakeOnce(dis:DisplayObject,  del:int=40, del2:int=20):void{
			var x:Number = dis.x;
			var y:Number = dis.y;
			var dx:int = int(Math.random()*del) - del2;
			var dy:int = int(Math.random()*del) -del2
			TweenLite.to(dis, 0.1, {x:x+dx, y:y+dy, onComplete:function():void{
				TweenLite.to(dis, 0.1, {x:x, y:y, onComplete:function():void{
				}})
			}})
		}
		
		public static function shakeX(dis:DisplayObject,  del:int=40, del2:int=20):void{
			var x:Number = dis.x;
			var dx:int = int(Math.random()*del) - del2;
			TweenLite.to(dis, 0.1, {x:x+dx, onComplete:function():void{
				dx = int(Math.random()*del) - del2;
				TweenLite.to(dis, 0.1, {x:x+dx, onComplete:function():void{
					dx = int(Math.random()*del) - del2;
					TweenLite.to(dis, 0.1, {x:x+dx,  onComplete:function():void{
						dx = int(Math.random()*del) - del2;
						TweenLite.to(dis, 0.1, {x:x+dx, onComplete:function():void{
							TweenLite.to(dis, 0.1, {x:x, onComplete:function():void{
							}})
						}})
					}})
				}})
			}})
		}
		
		public static function shakeY(dis:DisplayObject,  del:int=30, del2:int=15):void{
			var y:Number = dis.y;
			var dy:int = int(Math.random()*del) -del2
			TweenLite.to(dis, 0.1, {y:y+dy, onComplete:function():void{
				dy = int(Math.random()*del) - del2;
				TweenLite.to(dis, 0.1, {y:y+dy, onComplete:function():void{
					dy = int(Math.random()*del) - del2;
					TweenLite.to(dis, 0.1, { y:y+dy, onComplete:function():void{
						dy = int(Math.random()*del) - del2;
						TweenLite.to(dis, 0.1, {y:y+dy, onComplete:function():void{
							TweenLite.to(dis, 0.1, { y:y, onComplete:function():void{
							}})
						}})
					}})
				}})
			}})
		}
		
		public static function flash(dis:DisplayObject):void{
			dis.visible = true;
			dis.alpha = 0.5;
			TweenLite.to(dis, 0.1, {alpha:0.1, onComplete:function():void{
				TweenLite.to(dis, 0.1, {alpha:0.5, onComplete:function():void{
					TweenLite.to(dis, 0.1, {alpha:0.1, onComplete:function():void{
						TweenLite.to(dis, 0.1, {alpha:0.5, onComplete:function():void{
							dis.visible = false;
						}})
					}})
				}})
			}})
		}
	}
}