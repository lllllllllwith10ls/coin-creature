class CoinMaker {
	constructor(args) {
		for(let prop in args) {
			if(typeof args[prop] !== "undefined" )
				this[prop] = args[prop];
		}
		
		this.name = args.name;
		args.commonName = args.commonName.split("|");
		this.single = args.commonName[0];
		this.plural = args.commonName[1];
		this.actionName = args.commonName[2];
		this.desc = args.desc;
		this.basePrice = args.price;
		this.price = Object.assign({}, this.basePrice);
		this.cps = args.cps;
		this.totalCoins = 0;
		this.background = args.background;

		this.unlocked = false;
		this.amount = 0;
		this.bought = 0;
		this.temp = 0;
		this.updatePrice = function() {
			for(let i in this.price) {
				this.price[i] = this.basePrice[i] * Math.pow(player.coinPriceFactor, Math.floor(this.amount));
			}
		};
		this.buy = function() {
			this.updatePrice();
			if(this.canBuy()) {
			
				for(let i in this.price) {
					player.currencies[i].amount -= this.price[i];
				}
				this.amount++;
				this.bought++;
				this.updatePrice();
			}
			update();
		};
		this.buyMax = function() {
			while(this.canBuy()) {
				this.buy();
			}
		};
		this.canBuy = function() {
			this.updatePrice();
			let canBuy = true;
			for(let i in this.price) {
				if(getCurrency(i) < this.price[i] || !isFinite(this.price[i])) {
					canBuy = false;
				}
			}
			return canBuy;
		};
		this.createDiv = function() {
			let div = document.createElement("div");
			let name = document.createElement("div");
			name.innerHTML = this.name;
			div.appendChild(name);

			let buy = document.createElement("div");
			let buy2 = document.createElement("a");
			buy2.setAttribute("onclick", "player.coinMakers[\"" + this.name + "\"].buy()");
			buy2.innerHTML = "Buy";
			let buyMax = document.createElement("a");
			buyMax.setAttribute("onclick", "player.coinMakers[\"" + this.name + "\"].buyMax()");
			buyMax.innerHTML = "Buy max";
			if(!this.canBuy()) {
				buy2.classList.add("unbuyable");
				buyMax.classList.add("unbuyable");
			}
			buy.appendChild(buy2);
			buy.appendChild(buyMax);
			div.appendChild(buy);

			let cost = document.createElement("div");
			cost.innerHTML = "Cost: " + formatPrice(this.price);

			let owned = document.createElement("div");
			owned.innerHTML = "Owned: " + formatNumber(this.amount, player.options.notation);


			div.appendChild(cost);
			div.appendChild(owned);

			let desc = document.createElement("div");
			desc.innerHTML = this.desc;

			let cps = document.createElement("div");
			cps.innerHTML = formatNumber(this.cps(), player.options.notation) + " Coinys per second";

			div.appendChild(cps)
			div.appendChild(desc);
			div.classList.add("floatbox");
			return div;
		}
		player.coinMakers[this.name] = this;
	}
}
class CakeBaker {
	constructor(args) {
		for(let prop in args) {
			if(typeof args[prop] !== "undefined" )
				this[prop] = args[prop];
		}
		
		this.name = args.name;
		args.commonName = args.commonName.split("|");
		this.single = args.commonName[0];
		this.plural = args.commonName[1];
		this.actionNameBake = args.commonName[2];
		this.actionNameDestroy = args.commonName[3];
		this.desc = args.desc;
		this.basePrice = args.price;
		this.price = Object.assign({}, this.basePrice);
		this.build = args.build;
		this.destroy = args.destroy;
		this.totalCakes = 0;
		this.totalDestroyed = 0;
		this.background = args.background;

		this.unlocked = false;
		this.amount = 0;
		this.bought = 0;
		this.temp = 0;
		
		this.updatePrice = function() {
			for(let i in this.price) {
				this.price[i] = this.basePrice[i] * Math.pow(player.cakePriceFactor, Math.floor(this.amount));
			}
		};
		this.buy = function() {
			this.updatePrice();
			if(this.canBuy()) {
			
				for(let i in this.price) {
					player.currencies[i].amount -= this.price[i];
				}
				this.amount++;
				this.bought++;
				this.updatePrice();
			}
			update();
		};
		this.buyMax = function() {
			while(this.canBuy()) {
				this.buy();
			}
		};
		this.canBuy = function() {
			this.updatePrice();
			let canBuy = true;
			for(let i in this.price) {
				if(getCurrency(i) < this.price[i] || !isFinite(this.price[i])) {
					canBuy = false;
				}
			}
			return canBuy;
		};
		this.createDiv = function() {
			let div = document.createElement("div");
			let name = document.createElement("div");
			name.innerHTML = this.name;
			div.appendChild(name);

			let buy = document.createElement("div");
			let buy2 = document.createElement("a");
			buy2.setAttribute("onclick", "player.cakeBakers[\"" + this.name + "\"].buy()");
			buy2.innerHTML = "Buy";
			let buyMax = document.createElement("a");
			buyMax.setAttribute("onclick", "player.cakeBakers[\"" + this.name + "\"].buyMax()");
			buyMax.innerHTML = "Buy max";
			if(!this.canBuy()) {
				buy2.classList.add("unbuyable");
				buyMax.classList.add("unbuyable");
			}
			buy.appendChild(buy2);
			buy.appendChild(buyMax);
			div.appendChild(buy);

			let cost = document.createElement("div");
			cost.innerHTML = "Cost: " + formatPrice(this.price);

			let owned = document.createElement("div");
			owned.innerHTML = "Owned: " + formatNumber(this.amount, player.options.notation);


			div.appendChild(cost);
			div.appendChild(owned);

			let desc = document.createElement("div");
			desc.innerHTML = this.desc;

			let cakes = document.createElement("div");
			if(this.destroy() > 0) {
				cakes.innerHTML = "Makes " + formatNumber(this.build(), player.options.notation) + " cakes if it destroys " + formatNumber(this.destroy(), player.options.notation) + " cakes";
			} else {
				cakes.innerHTML = "Makes " + formatNumber(this.build(), player.options.notation) + " cakes";
			}
			div.appendChild(cakes)

			div.appendChild(desc);
			div.classList.add("floatbox");
			return div;
		}
		player.cakeBakers[this.name] = this;
	}
}

class Currency {
	constructor(args) {
		for(let prop in args) {
			if(typeof args[prop] !== "undefined" )
				this[prop] = args[prop];
		}
		
		this.amount = 0;
		this.name = args.name;
		args.commonName = args.commonName.split("|");
		this.single = args.commonName[0];
		this.plural = args.commonName[1];
		this.desc = args.desc;
		this.background = args.background;
		player.currencies[this.name] = this;
	}
}


class Upgrade {
	constructor(args) {
		for(let prop in args) {
			if(typeof args[prop] !== "undefined" )
				this[prop] = args[prop];
		}
		
		this.name = args.name;
		this.desc = args.desc;
		this.price = args.price;
		this.unlocked = false;
		this.bought = false;
		this.updatePrice = function() {
			if(this.priceFunction) {
				this.priceFunction();
			}
		};
		this.buy = function() {
			this.updatePrice();
			if(this.canBuy()) {
				for(let i in this.price) {
					player.currencies[i].amount -= this.price[i];
				}
				this.bought = true;
				this.updatePrice();
				if(this.buyFunction) {
					this.buyFunction();
				}
			}
			update();
		};
		this.canBuy = function() {
			this.updatePrice();
			let canBuy = true;
			for(let i in this.price) {
				if(getCurrency(i) < this.price[i] || !isFinite(this.price[i])) {
					canBuy = false;
				}
			}
			return canBuy;
		};
		this.createDiv = function() {
			let div = document.createElement("div");
			let name = document.createElement("div");
			name.innerHTML = this.name;
			div.appendChild(name);

			if(!this.bought) {
				let buy = document.createElement("div");
				let buy2 = document.createElement("a");
				buy2.setAttribute("onclick", "player.upgrades[\"" + this.name + "\"].buy()");
				buy2.innerHTML = "Buy";
				if(!this.canBuy()) {
					buy2.classList.add("unbuyable");
				}
				buy.appendChild(buy2);
				div.appendChild(buy);
			

				let cost = document.createElement("div");
				cost.innerHTML = "Cost: " + formatPrice(this.price);
				div.appendChild(cost);
			}

			


			let desc = document.createElement("div");
			desc.innerHTML = this.desc;

			div.appendChild(desc);
			div.classList.add("floatbox");
			return div;
		}
		player.upgrades[this.name] = this;
	}
}

let defualtTimer = 60;
player = {
	coinys: 0,
	cakes: 0,
	options: {
		buyMax: false,
		notation: "Illions"
	},
	coinPriceFactor: 1.15,
	cakePriceFactor: 1.5,
	coinMakers: {},
	cakeBakers: {},
	upgrades: {},
	currencies: {},
	timer: defualtTimer,
	defualtTimer: defualtTimer,
}
new Currency({
	name: "Coiny",
	commonName: "Coiny|Coinys",
	desc: "A sentient penny.",
})
new Currency({
	name: "Cake",
	commonName: "cake|cakes",
	desc: "A cake.",
})
new CoinMaker({
	name: "Coiny Recovery Center",
	commonName: "CRC|CRCs|recovered",
	desc: "Recovers Coiny.",
	price: {Cake: 1},
	
	cps: function() {
		let baserate = 0.2;
		return baserate * player.coinMakers["Coiny Recovery Center"].amount;
	},
});

new CoinMaker({
	name: "Coiny Recovery Center",
	commonName: "CRC|CRCs|recovered",
	desc: "Recovers Coiny.",
	price: {Cake: 1},
	
	cps: function() {
		let baserate = 0.2;
		return baserate * player.coinMakers["Coiny Recovery Center"].amount;
	},
});


new CoinMaker({
	name: "Grotato Farm",
	commonName: "Farm|Farms|made from grotatoes",
	desc: "Sells grotatoes to make Coinys.",
	price: {Cake: 5},
	
	cps: function() {
		let baserate = 1;
		return baserate * player.coinMakers["Grotato Farm"].amount;
	},
});

new CakeBaker({
	name: "Pin",
	commonName: "Pin|Pins|baked|unbaked",
	desc: "Bakes cakes every Cake at Stake.",
	price: {Coiny: 15},
	
	build: function() {
		let baserate = 1;
		return baserate * player.cakeBakers["Pin"].amount;
	},
	destroy: function() {
		return 0;
	},
});


new CakeBaker({
	name: "Rocky",
	commonName: "Pin|Pins|eaten|vomited",
	desc: "Eats cakes and vomits out more.",
	price: {Coiny: 100},
	
	build: function() {
		let baserate = 5;
		return baserate * player.cakeBakers["Rocky"].amount;
	},
	destroy: function() {
		let baserate = 2;
		return baserate * player.cakeBakers["Rocky"].amount;
	},
});

new Upgrade({
	name: "Cake",
	desc: "A cake used to buy things and upgrades.",
	price: {Coiny: 1},
	boughtAmount: 0,
	priceFunction: function() {
		player.upgrades["Cake"].price = {Coiny: Math.pow(2,player.upgrades["Cake"].boughtAmount)};
	},
	buyFunction: function() {
		player.upgrades["Cake"].boughtAmount++;
		player.currencies["Cake"].amount++;
	},
})
function addCoins() {
	player.currencies["Coiny"].amount ++;
	document.getElementById("coinys").innerHTML = formatNumber(Math.floor(getCurrency("Coiny")), player.options.notation) + " " + (getCurrency("Coiny") === 1 ? player.currencies["Coiny"].single : player.currencies["Coiny"].plural);
}

function getCurrency(thing) {
	return player.currencies[thing].amount;
}

function update(second = false) {



	
	if(second) {
		produce();
		player.timer--;
		if(player.timer <= 0) {
			cakeAtStake();
			player.timer = player.defualtTimer;
		}
	}
	document.getElementById("cakeAtStakeTimer").innerHTML = Math.floor(player.timer);
	
	document.getElementById("cakes").innerHTML = formatNumber(Math.floor(getCurrency("Cake")), player.options.notation) + " " + (getCurrency("Cake") === 1 ? player.currencies["Cake"].single : player.currencies["Cake"].plural);
	document.getElementById("coinys").innerHTML = formatNumber(Math.floor(getCurrency("Coiny")), player.options.notation) + " " + (getCurrency("Coiny") === 1 ? player.currencies["Coiny"].single : player.currencies["Coiny"].plural);
	let div = document.getElementById('coinMakers');
	while(div.firstChild){
	    div.removeChild(div.firstChild);
	}
	for(let i in player.coinMakers) {
		if(player.coinMakers[i].unlocked) {
			document.getElementById("coinMakers").appendChild(player.coinMakers[i].createDiv());
		}
	}
	let div2 = document.getElementById('cakeBakers');
	while(div2.firstChild){
	    div2.removeChild(div2.firstChild);
	}
	document.getElementById("cakeBakers").innerHTML = "";
	for(let i in player.cakeBakers) {
		if(player.cakeBakers[i].unlocked) {
			document.getElementById("cakeBakers").appendChild(player.cakeBakers[i].createDiv());
		}
	}


	document.getElementById("upgrades").innerHTML = "";
	document.getElementById("boughtUpgrades").innerHTML = "";
	for(let i in player.upgrades) {
		if(player.upgrades[i].unlocked && !player.upgrades[i].bought) {
			document.getElementById("upgrades").appendChild(player.upgrades[i].createDiv());
		} else if(player.upgrades[i].bought) {
			document.getElementById("boughtUpgrades").appendChild(player.upgrades[i].createDiv());
		}
	}
	unlocks();
}
function unlocks() {
	if(player.upgrades["Cake"].bought) {
		player.upgrades["Cake"].bought = false;
		player.upgrades["Cake"].unlocked = true;
	} else {
		player.upgrades["Cake"].unlocked = true;
	}
	player.coinMakers["Coiny Recovery Center"].unlocked = true;
	player.cakeBakers["Pin"].unlocked = true;
	if(player.coinMakers["Coiny Recovery Center"].amount >= 1) {
		player.coinMakers["Grotato Farm"].unlocked = true;
	}
	if(player.cakeBakers["Pin"].amount >= 1) {
		player.cakeBakers["Rocky"].unlocked = true;
	}

}
function produce() {
	for(let i in player.coinMakers) {
		player.currencies["Coiny"].amount += player.coinMakers[i].cps();
	}
}
function cakeAtStake() {
	player.upgrades["Cake"].boughtAmount = 0;
	player.currencies["Coiny"].amount = 0;
	for(let i in player.cakeBakers) {
		if(getCurrency("Cake") < player.cakeBakers[i].destroy()) {
			player.currencies["Cake"].amount = 0;
		} else {
			player.currencies["Cake"].amount -= player.cakeBakers[i].destroy();
			player.currencies["Cake"].amount += player.cakeBakers[i].build();
		}
	}
}
setInterval(function() {update(true);},1000);