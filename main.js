function getBTCPrice() {
	//need to fetch the bitcoin price 
	fetch('https://api.coinmarketcap.com/v2/ticker/')
	.then((res) => res.json())
	.then((btc) => {
		console.log('bitcoin price', btc.data[1].quotes.USD.price)
		return btc.data[1].quotes.USD.price;
	})
}
//const btcCurrentPrice = setTimeout(getBTCPrice, 0);
setTimeout(ajaxCall, 1);
function ajaxCall() {
	fetch('https://api.coinmarketcap.com/v2/ticker/')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(top100) {
	  	//console.log(Object.indexs(top100.data).length)
	  	const allCoins = [];

	    for (let index in top100.data) {

	    	if (top100.data[index].name !== "Tether") {
          
	    		let name = top100.data[index].name;
		    
		    	let dailyVolume = top100.data[index].quotes.USD.volume_24h;
		    
		    	let marketCap = top100.data[index].quotes.USD.market_cap;
		    	//volume / market capitalization
		    	let volCapRatio = 100 * (dailyVolume / marketCap);
          //price change over 24 hours
		    	let dailyPriceChange = top100.data[index].quotes.USD.percent_change_24h;
   
				  let indicator = Math.abs(volCapRatio / dailyPriceChange);
				  //get rid of divide by 0 error
					if (dailyPriceChange > 0 && volCapRatio >= 15) {
            allCoins.push({name : name, indicator: indicator, id: index})
					}
		    }
			}
			fetch('https://api.coinmarketcap.com/v2/ticker/')
				.then((res) => res.json())
				.then((btc) => {
					console.log('bitcoin price', btc.data[1].quotes.USD.price)
					const top3 = allCoins.sort((a,b)=> b.indicator - a.indicator).slice(0,3);
					const btcCurrentPrice = btc.data[1].quotes.USD.price;
					createMessageBox(top3, btcCurrentPrice);
				})
			//array of objects with name and indicator properties
			
			//preload the image, grab image by id of highest indicator value
			var newimgsrc = "https://s2.coinmarketcap.com/static/img/coins/32x32/" + top3[0].id + ".png"
			//set the coin image
			document.body.style.backgroundImage = "url("+newimgsrc+")";
	})
	
}
function createMessageBox(top3arr, btc) {
	//build our text box
	const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	const firstDate = new Date(2009,00,09);
	const secondDate = new Date();
	const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  const theoreticalVal = 10 ** (2.66167155005961 * Math.log(diffDays) - 17.9183761889864)
	const percentUnderValued = (theoreticalVal - btc)/theoreticalVal * 100
	const newDiv = document.createElement("div");
  newDiv.className = "blinking";
	const newContent = document.createTextNode('FOMO buy ' + 
	  (top3arr[0] ? top3arr[0].name + '(' + top3arr[0].indicator + ') ': 'nothing') +
		(top3arr[1] ? top3arr[1].name + '(' + top3arr[1].indicator + ') ' : '') +
		(top3arr[2] ? top3arr[2].name + '(' + top3arr[1].indicator + ')!' : '') +
		//current btc price
		'\n' + 'BTC price: ' + btc +
		//theoreticalVal
		'\n' + 'Theoretical Value: ' + theoreticalVal + 
    //percent that btc is currently undervalued accorded to the logarithmic regression
    '\n' + '%Undervalued: ' + percentUnderValued
		);
  newDiv.appendChild(newContent);

  document.body.appendChild(newDiv);
  //invoke this on each existing message obj and new message obj
}