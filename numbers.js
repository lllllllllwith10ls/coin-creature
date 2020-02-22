const illions = [
	"",
	"m",
	"b",
	"tr",
	"quadr",
	"quint",
	"sext",
	"sept",
	"oct",
	"non"
]
const illionRoots = [
	"",
	"un",
	"duo",
	"tre",
	"quattuor",
	"quin",
	"sex",
	"septen",
	"octo",
	"novem"
]
const illionRoots2 = [
	"",
	"dec",
	"vigint",
	"trigint",
	"quadragint",
	"quinquagint",
	"sexagint",
	"septuagint",
	"octogint",
	"nonagint",
	"centi"
]
function roundTowardsZero(number) {
	if(number < 0) return Math.ceil(number);
	if(number > 0) return Math.floor(number);
	return 0;
}
function truncate(number,places) {
	number *= Math.pow(10,places);
	number = Math.floor(number);
	number /= Math.pow(10,places);
	return number;
}
function getIllion(exponent) {

		let illionNumber = (exponent - exponent%3)/3 - 1;
		let illionRoot = (illionNumber)%10;
		let illionRoot2 = (illionNumber - illionRoot)/10;
		if(illionNumber <= 0) {
			return "thousand"
		}
		else if(illionNumber < 10) {
			return illions[illionRoot] + "illion";
		} else {
			return illionRoots[illionRoot] + illionRoots2[illionRoot2] + "illion";
		}
}
function formatNumber(number, notation) {
	if(isNaN(number)) return "Divided by Donut";
	if(!isFinite(parseFloat(number))) return 'Infinite';
	let exponent = roundTowardsZero(Math.log10(number));
	if(notation === "Illions") {
		if(exponent < 3) {
			return truncate(number,4);
		} else {
			let illion = getIllion(exponent);
			let mantissa = number / Math.pow(10,exponent - exponent%3);
			return truncate(mantissa,4) + " " + illion;
		}
	} else if(notation === "Scientific") {
		if(exponent < 3) {
			return truncate(number,4);
		} else {
			let mantissa = number / Math.pow(10,exponent);
			return truncate(mantissa,4) + "e" + exponent;
		}
	}
}


function formatPrice(cost) {
	let output = "";
	let length = Object.keys(cost).length;
	let number = 0;
	for(let i in cost) {
		cost[i] = Math.ceil(cost[i])
		if(length > 2) {
			if(number >= length-1) {
				output += " and"
			}
			output = output + " " + cost[i] + (number < length-1 ? "," : "");
			output = output + " " + (cost[i] === 1 ? player.currencies[i].single : player.currencies[i].plural);
		} else if(length === 2) {
			if(number >= length-1) {
				output += " and"
			}
			output = output + " " + cost[i];
			output = output + " " + (cost[i] === 1 ? player.currencies[i].single : player.currencies[i].plural);
		} else if(length === 1) {
			output = output + " " + cost[i];
			output = output + " " + (cost[i] === 1 ? player.currencies[i].single : player.currencies[i].plural);
		}
		number++
	}
	return output;
}
