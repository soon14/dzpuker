module joker {

	export function getProxy():JokerDBProxy {
		return __GET_PROXY(JokerDBProxy);
	}


	export class JokerDBProxy extends app.mvc.AbsractProxy {
		static NAME:string = "__JOKDER_DB_PROXY__";
		
		/**
		 * 桌子信息
		 */
		private tableInfo:appvos.PMTableVO;

		/**
		 * 下注后的下注信息
		 */
		private betInfo:appvos.PMInfoVO;

		/**
		 * 牌型结构体
		 */
		private handCardResult:playcards.CardsResult;

		/**
		 * 换牌时被弃掉的牌
		 */
		discard:number[] = [];

		/**
		 * 投注门数
		 */
		handlerCount:number[] = [1,5,10,25,50]

		/**
		 * 投入的金额
		 */
		ratios:number[] = [10,50,100,500,1000,5000];

		/**
		 * 当前选择的门数
		 */
		nowCount:number = 0;

		/**
		 * 当前投入的金额
		 */
		nowBet:number = 0;

		/**
		 * 当前的倍率
		 */
		nowRatio:number = 1;

		/**
		 * 最大倍率
		 */
		MAX_RATIO:number = 5;

		/**
		 * 最小倍率
		 */
		MIN_RATIO:number = 1;


		public constructor(name?:string,data?:any) {
			super(JokerDBProxy.NAME,data);
		}

		/**
		 * 桌子信息
		 */
		setTableInfo(info:appvos.PMTableVO):void {
			this.tableInfo = info;
			__SEND_NOTIFICATION(JokerGameMediator.TABLE_INITIALIZED);
		}

		/**
		 * 获取当前桌子信息
		 */
		getTableInfo():appvos.PMTableVO {
			return this.tableInfo;
		}

		/**
		 * 验证是否可以下注
		 */
		validation():boolean {
			return true;
		}

		/**
		 * 下注之后服务器返回的下注信息处理
		 */
		setBetInfo(info:appvos.PMInfoVO):void {
			this.betInfo = info;
			if(this.betInfo.card && this.betInfo.card.cards) {
				//计算自己起始的牌型
				this.handCardResult = playcards.getProxy().getCardResult(this.betInfo.card.cards)
			} 
			else {
				console.log("");
				//throw new Error("返回的下注信息不正确");
			}
		}

		/**
		 * 随机获取5张牌
		 */
		getFiveRandomCard():number[] {
			var res:number[] = [];
			var CARD_LEN:number = 5;
			while(res.length < CARD_LEN) {
				var index:number = Math.floor(Math.random() * 52);
				var randomValue:number = playcards.getProxy().m_cbCardData[index];
				if(res.indexOf(randomValue) == -1) {
					res.push(randomValue);
				}
			}
			return res;
		}

		/**
		 * 获取下注信息
		 */
		getBetInfo():appvos.PMInfoVO {
			return this.betInfo;
		}

		/**
		 * 下注时的手牌
		 */
		getHandCardResult():playcards.CardsResult {
			return this.handCardResult;
		}

		dispose():void {
			super.dispose();
		}
	}
}