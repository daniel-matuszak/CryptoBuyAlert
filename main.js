// $('.button').on('click', function() {
//   window.open('https://www.binance.com/login.html')
// })
// document.getElementById('buttonEx').onclick=function(){
// 	window.open('https://www.binance.com/login.html');
// }


setTimeout(ajaxCall, 1000);

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
			//array of objects with name and indicator properties
	    const top3 = allCoins.sort((a,b)=> b.indicator - a.indicator).slice(0,3);
			createMessageBox(top3);
			
			//preload the image, grab image by id of highest indicator value
			var newimgsrc = "https://s2.coinmarketcap.com/static/img/coins/32x32/" + top3[0].id + ".png"
      //set the coin image
			document.body.style.backgroundImage = "url("+newimgsrc+")";
	})
}
function createMessageBox(top3arr,) {
  //build our text box
  var newDiv = document.createElement("div");
  newDiv.className = "blinking";
	var newContent = document.createTextNode('FOMO buy/sell ' + 
	  top3arr[0].name + '(' + top3arr[0].indicator + ') ' +
		top3arr[1].name + '(' + top3arr[1].indicator + ') ' +
		top3arr[2].name + '(' + top3arr[1].indicator + ')!');
  newDiv.appendChild(newContent);

  document.body.appendChild(newDiv);
  //invoke this on each existing message obj and new message obj
}

function ajaxCall7d() {
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
		    	let weeklyPriceChange = top100.data[index].quotes.USD.percent_change_7d;
   
					let indicator = Math.abs(volCapRatio / weeklyPriceChange);
					//get rid of divide by 0 error
					if (dailyPriceChange > 0 && volCapRatio >= 15) {
            allCoins.push({name : name, indicator: indicator, id: index})
					}
		    	
		    }
			}
			//array of objects with name and indicator properties
	    const top3 = allCoins.sort((a,b)=> b.indicator - a.indicator).slice(0,3);
			createMessageBox(top3, '7d');
			
			//preload the image, grab image by id of highest indicator value
			var newimgsrc = "https://s2.coinmarketcap.com/static/img/coins/32x32/" + top3[0].id + ".png"
      //set the coin image
			document.body.style.backgroundImage = "url("+newimgsrc+")";
	})
}
