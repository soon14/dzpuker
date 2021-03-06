/**
 * 手牌 & 牌型组件
 */
module joker {

	export const DEFAULT_CARD_SKIN:string = "JokerCardItemSkin";
	export const FIVE_CARD_NUM:number = 5;

	/**
	 * 牌型动画控制
	 */
	export class JokerPkPatternsComp extends gameabc.UICustomComponent {

		cardValues:number[] = [];
		private cardSkin:string = "";
		/**
		 * 卡牌
		 */
		cards:JokerCardItem[] = [];

		/**
		 * 卡牌的动画控制
		 */
		arrageAnimateion:JokerCardArrageAnimation;

		/**
		 * @cardValues 5张扑克牌
		 * @cardSkinName 名的样式
		 */
		public constructor(cardsValues:number[]=[0,0,0,0,0],cardSkinName:string = DEFAULT_CARD_SKIN) {
			super();
			this.cardSkin = cardSkinName;
			this.cardValues = cardsValues;
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.arrageAnimateion.normalArrage();	/**默认排序扑克牌序列位子 */
		}

		createChildren():void {
			super.createChildren();

			/**
			 * 创建5张扑克牌
			 */
			var i:number = 0;
			for(i = 0; i < FIVE_CARD_NUM; i++) {
				var card:JokerCardItem = new JokerCardItem();
				card.skinName = DEFAULT_CARD_SKIN;
				if(this.cardValues[i] > 0)	card.setBackId(this.cardValues[i]);
				else						card.setCardBack(); 
				this.addChild(card);
				this.cards.push(card);	
			}

			/**
			 * 牌型动画控制
			 */
			this.arrageAnimateion = new JokerCardArrageAnimation(this);
		}

		/**
		 * 翻牌，牌值要有5个参数,不要翻的牌参数给0
		 */
		async tumover(cards:number[]) {
			if(cards.length < FIVE_CARD_NUM) {
				throw new Error("牌值的参数要有5个");
			}

			this.cardValues = cards;
			var i:number = 0;
			for(i = 0; i < FIVE_CARD_NUM; i++) {
				var cardV:number = this.cardValues[i];
				var cardItem:playcards.CardItem = this.cards[i];
				if(cardV > 0) {
					cardItem.setBackId(cardV);
					cardItem.turnOver();
				} 
				else {
					cardItem.setCardBack();
				}
			}
		}
	}
}