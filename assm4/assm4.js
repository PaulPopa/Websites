function initialise()
{
	title();
	setupAjax();
	scrollback();
	filter();
	searching();
}

//Sets onclick and mouseover/out events for different menu
function filter()
{
	var filter = document.getElementById("filter");
	var sort = document.getElementById("sort");
	
	sort.onmouseover = function() { display(); };
	sort.onmouseout = function() { hide(); };

	var date = sort.getElementsByClassName("menuitems")[0];
	date.onclick = function() { sortDate(); };

	var eventTitle = sort.getElementsByClassName("menuitems")[1];
	eventTitle.onclick = function() {sortEventTitle(); };

	var listeners = filter.getElementsByClassName("menuitems")[0];
	listeners.onclick = function() { filterListeners(); };

	var playcount = filter.getElementsByClassName("menuitems")[1];
	playcount.onclick = function() { filterPlaycount(); };

	filter.onmouseover = function() { display(); };
	filter.onmouseout = function() { hide(); };

	var filter3 = document.getElementById("filter3");

	var listeners3 = filter3.getElementsByClassName("menuitems")[0];
	listeners3.onclick = function() { filterListeners3(); };

	var playcount3 = filter3.getElementsByClassName("menuitems")[1];
	playcount3.onclick = function() { filterPlaycount3(); };

	filter3.onmouseover = function() { display(); };
	filter3.onmouseout = function() { hide(); };
}

//Displays the menuitems
function display()
{
	var menuitems = document.getElementsByClassName("menuitems");
	for(var i=0; i<menuitems.length; i++)
	{
		menuitems[i].style.display = "block";
	}
}

//Hides the menuitems
function hide()
{
	var menuitems = document.getElementsByClassName("menuitems");
	for(var i=0; i<menuitems.length; i++)
	{
		menuitems[i].style.display = "none";
	}
}

//Sets the main title of the website
function title()
{ 
	var text = "Last.fm is a music discovery service that gives you personalised recommendations based on the music you listen to.";
        var intervalId = null;
        var obj = document.getElementById("MyTicker");
        var tickerText = "";
        var i = 0;
        intervalId= setInterval(tick, 100);
        function tick() 
	{
		tickerText += text.charAt(i);
		obj.innerHTML = tickerText;
		i++;
		if (i == text.length) 
		{
		        clearInterval(intervalId);
		        tickerText = tickerText.substring(0, text.length);
		        obj.innerHTML = tickerText;
                }
        }
}

var k=0;
//Get the genres from the xml file and put them as a ticker
function getGenre(xmlhttp)
{
	var arr = [];
	var xmldoc = xmlhttp.responseXML;
	var genre = xmldoc.getElementsByTagName("tags");
	for(var i=0; i<genre.length; i++)
	{
		var tag = genre[i].getElementsByTagName("tag");
		for(var j=0; j<tag.length; j++)
		{
			arr.push(tag[j].innerHTML);
		}
	}
	setInterval(changeTitle, 1000);
	function changeTitle()
	{
		var genres = document.getElementById("genres");
		genres.innerHTML = genres.innerHTML.substring(0,16) + " " + arr[k].toUpperCase();
		k++;
		if(k == arr.length)
		{
			k=0;
		}
	}
	
}

//Displays the filter for the TopArtists menu
function displayFilter()
{
	var filter = document.getElementById("filter");
	filter.style.display = "block";
}

//Displays the filter for the TopTracks menu
function displayFilter3()
{
	var filter3 = document.getElementById("filter3");
	filter3.style.display = "block";
}

//Displays the sort for the Events Menu
function displaySort()
{
	var sort = document.getElementById("sort");
	sort.style.display = "block";
}

//Hides the filter for the TopArtists menu
function hideFilter()
{
	var filter = document.getElementById("filter");
	filter.style.display = "none";
}

//Hides the filter for the TopTracks menu
function hideFilter3()
{
	var filter3 = document.getElementById("filter3");
	filter3.style.display = "none";
}

//Hides the sort for the Events menu
function hideSort()
{
	var sort = document.getElementById("sort");
	sort.style.display = "none";
}

//Setups Ajax setting onclick function to the menuitems
function setupAjax()
{
	
	requestData("events.xml", getGenre);
	var menuitem1 = document.getElementById("Homepage");
	var menuitem2 = document.getElementById("topartists");
	var menuitem3 = document.getElementById("toptracks");
	var menuitem4 = document.getElementById("events");

	menuitem4.onclick = function() { requestData("events.xml", events), hideFilter(), hideFilter3(), displaySort(); };
	menuitem3.onclick = function() { requestData("toptracks.json", topTracks), hideFilter(), displayFilter3(), hideSort(); };
	menuitem2.onclick = function() { requestData("topartists.json", topArtists), displayFilter(), hideFilter3(), hideSort(); };
	menuitem1.onclick = function() { Homepage(), hideFilter(), hideFilter3(), hideSort(); };
}

var items = []; // the items taken from the topartist.json
var itemscopy = []; // the items placed as a copy of the topartist.json
var items2 = []; // the items taken from the events.xml
var itemscopy2 = []; // the items placed as a copy of the events.xml
var items3 = []; // the items taken from the toptracks.json
var itemscopy3 = []; // the items placed as a copy of the toptracks.json

//The homepage 
function Homepage()
{
	var header = document.getElementsByClassName("central-header")[0];
	var contents = document.getElementById("contents");
	var topartists = document.getElementById("topartists-header");
	topartists.style.display = "none";
	contents.style.display = "none";
	header.style.display = "block";
}

//The TopArtists
function topArtists(xmlhttp)
{
	var artistlist = document.getElementById("topartists2");
	artistlist.style.display = "block";

	var jsonDoc = JSON.parse(xmlhttp.responseText);
	var jsonArtist = jsonDoc.artists.artist;

	//Takes the wanted data from the Json File
	for(var i=0; i<jsonArtist.length; i++)
	{
		var img = jsonArtist[i].image[3]['#text'];
		var itemname = jsonArtist[i].name;
		var itemlisteners = jsonArtist[i].listeners;
		var itemplaycount = jsonArtist[i].playcount;
		var itemurl = jsonArtist[i].url;
		var item = 
		{
			imgUrl : img,
			name : itemname,
			listeners : itemlisteners,
			playcount : itemplaycount,
			url : itemurl
		};
		
		// Adds to the (global)list of items
		items.push(item);
	}
	fillTable();
	itemscopy = items;
	items = []; // so that the items won't reappear in the content div	
}


//FillTable for the TopArtists
function fillTable() 
{
	var header = document.getElementsByClassName("central-header")[0];
	header.style.display = "none";

	var topartists = document.getElementById("topartists-header");
	topartists.style.display = "block";
	topartists.innerHTML = "The top 20 most-listened artists last week";

	var contents = document.getElementById("contents");
	contents.style.display = "block";

	var table = document.getElementById("topartists2");
	
	// Clear any existing contents
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	for (var i = 0; i < items.length; i++) 
	{
		var tr = document.createElement("tr");
		//Create left hand cell
		var td1 = document.createElement("td");
		//Create image
		var img = document.createElement("img");
		img.setAttribute("src", items[i].imgUrl);
		td1.appendChild(img);
		//Create right hand cell
		var td2 = document.createElement("td");
		//Create title
		var divName = document.createElement("div");
		divName.innerHTML = items[i].name;
		divName.className = "rightpart";
		divName.id = "name";
		//Create listeners
		var divListeners = document.createElement("div");
		divListeners.innerHTML = "Listeners: " + items[i].listeners;
		divListeners.className = "rightpart";
		//Create playcount
		var divPlaycount = document.createElement("div");
		divPlaycount.innerHTML = "Playcount: " + items[i].playcount;
		divPlaycount.className = "rightpart";
		//Create URL
		var divURL = document.createElement("div");
		var link = document.createElement("a");
		link.setAttribute("href", items[i].url);
		divURL.appendChild(link);
		link.innerHTML = items[i].name + "'s page";
		divURL.className = "rightpart";

		//Apends the divs created above to the table
		td2.appendChild(divName);
		td2.appendChild(divListeners);
		td2.appendChild(divPlaycount);
		td2.appendChild(divURL);
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
}
var artistnames = [];
//Events menu
function events(xmlhttp)
{
	var xmldoc = xmlhttp.responseXML;
	var events = xmldoc.getElementsByTagName("event");
	var artists = xmldoc.getElementsByTagName("artists");

	//Takes the wanted data from the Xml File
	for(var i=0; i<events.length; i++)
	{
	
		var title = events[i].getElementsByTagName("title")[0].firstChild.data;
		var startDate = events[i].getElementsByTagName("startDate")[0].firstChild.data;
		var headliner = events[i].getElementsByTagName("headliner")[0].firstChild.data;
		var url = events[i].getElementsByTagName("url")[0].firstChild.data;
		
		for(var j=0 ; j<events[i].getElementsByTagName("artist").length; j++)
		{
			var artistname = events[i].getElementsByTagName("artist")[j].firstChild.data;
			artistnames.push(artistname);
		}
		var item =
		{
			eventTitle : title,
			artistHead : headliner,
			date : startDate,
			itemurl : url,
			artName : artistnames
		};
		// Adds to the (global)list of items
		items2.push(item);
		artistnames = [];
	}
	fillTable2();
	itemscopy2 = items2;
	items2 = []; // so that the items won't reappear in the content div

}

//Fill table for the events
function fillTable2() 
{
	var contents = document.getElementById("contents");
	contents.style.display = "block";

	var header = document.getElementsByClassName("central-header")[0];
	header.style.display = "none";

	var topartists = document.getElementById("topartists-header");
	topartists.style.display = "block";
	topartists.innerHTML = "O2 upcoming events "

	var table = document.getElementById("topartists2");
	// Clear any existing contents
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	
	//URL
	var divURL = document.createElement("div");
	divURL.className = "url";
	var link = document.createElement("a");
	link.setAttribute("href", items2[0].itemurl);
	divURL.appendChild(link);
	link.innerHTML = "More information about the upcoming events here";
	for (var i = 0; i < items2.length; i++) 
	{
		var tr = document.createElement("tr");
		//Create left hand cell
		var td1 = document.createElement("td");
		td1.className = "td1";
		td1.id = "tdid";
		//Artists Headliner
		var divName = document.createElement("div");
		divName.innerHTML = items2[i].artistHead;
		td1.appendChild(divName);
		//Create right hand cell
		var td2 = document.createElement("td");
		td2.className = "td2";
		//Artists name
		var divNam = document.createElement("div");
		divNam.innerHTML = "<strong>Artists: </strong>";
		var divArt = document.createElement("div");
		divArt.innerHTML = items2[i].artName;
		//Events Title
		var divTitle = document.createElement("div");
		divTitle.innerHTML = "<b>Event Name: </b>" + items2[i].eventTitle;
		//Events startDate
		var divDate = document.createElement("div");
		divDate.id = "bold";
		divDate.innerHTML = items2[i].date;

		//Apends the divs created above to the table
		td2.appendChild(divTitle);
		td2.appendChild(divNam);
		td2.appendChild(divArt);
		td2.appendChild(divDate);
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
		table.appendChild(divURL);
	}
}

//The TopTracks
function topTracks(xmlhttp)
{
	var artistlist = document.getElementById("topartists2");
	artistlist.style.display = "block";

	var jsonDoc = JSON.parse(xmlhttp.responseText);
	var jsonTrack = jsonDoc.tracks.track;

	for(var i=0; i<jsonTrack.length; i++)
	{
		var img = jsonTrack[0].image[2]['#text'];
		var itemname = jsonTrack[i].name;
		var artistname = jsonTrack[i].artist.name;
		var itemlisteners = jsonTrack[i].listeners;
		var itemplaycount = jsonTrack[i].playcount;
		var item =
		{
			artname : artistname,
			name : itemname,
			listeners : itemlisteners,
			playcount : itemplaycount
		};
		// Adds to the (global)list of items	
		items3.push(item);
	}		
	fillTable3();
	itemscopy3 = items3;
	items3 = []; // so that the items won't reappear in the content div
}

//Filltable for TopTracks
function fillTable3() 
{
	var header = document.getElementsByClassName("central-header")[0];
	header.style.display = "none";

	var topartists = document.getElementById("topartists-header");
	topartists.style.display = "block";
	topartists.innerHTML = "The top 20 most-listened tracks last week";

	var contents = document.getElementById("contents");
	contents.style.display = "block";

	var table = document.getElementById("topartists2");
	
	// Clear any existing contents
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	for (var i = 0; i < items3.length; i++) 
	{
		var tr = document.createElement("tr");
		//Create left hand cell
		var td1 = document.createElement("td");
		td1.className = "td1";
		//Create Artist Name
		var divArtistName = document.createElement("div");
		divArtistName.innerHTML = items3[i].artname;
		td1.appendChild(divArtistName);
		//Create right hand cell
		var td2 = document.createElement("td");
		td2.className = "td2";
		//Create title
		var divName = document.createElement("div");
		divName.innerHTML = items3[i].name;
		divName.id = "name2";
		//Create listeners
		var divListeners = document.createElement("div");
		divListeners.innerHTML = "Listeners: " + items3[i].listeners;
		//Create playcount
		var divPlaycount = document.createElement("div");
		divPlaycount.innerHTML = "Playcount: " + items3[i].playcount;

		//Apends the divs created above to the table
		td2.appendChild(divName);
		td2.appendChild(divListeners);
		td2.appendChild(divPlaycount);
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}

}

//Filter for TopArtists
function filterListeners() 
{
	var listeners = prompt("Insert a number and we'll show you which artist has more listeners than that number:", "");
	itemscopy = itemscopy.filter(function(item) 
	{
		if(listeners<75561)
		{
			return item.listeners > listeners;
		}
	} );
	items = itemscopy;
	fillTable();
	if(listeners > 75561 || isNaN(listeners))
	{
		alert("Nothing has been found. Returning to the Homepage");
		Homepage();
		hideFilter();
	}
	items = [];
}
//Filter for TopTracks
function filterListeners3()
{
	var listeners = prompt("Insert a number and we'll show you which artist has more listeners than that number:", "");	
	itemscopy3 = itemscopy3.filter(function(item) 
	{
		if(listeners<44762)
		{
			return item.listeners > listeners;
		}
	});
	items3 = itemscopy3;
	fillTable3();
	if(listeners > 44762 || isNaN(listeners))
	{
		alert("Nothing has been found. Returning to the Homepage");
		Homepage();
		hideFilter3();
	}
	items3 = [];
}
//Filter for TopArtists
function filterPlaycount() 
{
	var playcount = prompt("Insert a number and we'll show you which artist has more playcount than that number:", "");
	itemscopy = itemscopy.filter(function(item) 
	{
		if(playcount<538425)
		{
			return item.playcount > playcount;
		}
	});
	items = itemscopy;
	fillTable();
	if(playcount > 538425 || isNaN(playcount))
	{
		alert("Nothing has been found. Returning to the Homepage");
		Homepage();
		hideFilter();
	}
	items = [];
}

// Filter for TopTracks
function filterPlaycount3() 
{
	var playcount = prompt("Insert a number and we'll show you which artist has more playcount than that number:", "");
	itemscopy3 = itemscopy3.filter(function(item) 
	{
		if(playcount<104333)
		{
			return item.playcount > playcount;
		}
		} );
	items3 = itemscopy3;
	fillTable3();
	if(playcount > 104333 || isNaN(playcount))
	{
		alert("Nothing has been found. Returning to the Homepage");
		Homepage();
		hideFilter3();
	}
	items3 = [];
}

//Sort the events by Date
function sortDate()
{
	itemscopy2.sort(function(a,b)
	{
		var c = new Date(a.date);
		var d = new Date(b.date);
		return c-d;

	});
	items2 = itemscopy2;
	fillTable2();
	items2 = [];
}

//Sort the events by Title
function sortEventTitle()
{
	itemscopy2.sort(function(a,b) { if (a.eventTitle < b.eventTitle) return -1; else return 1; } );
	items2 = itemscopy2;
	fillTable2();
	items2 = [];
}

//ScrollBack to top function
function scrollback()
{
	$(document).ready(function()
	{
		//Check to see if the window is top if not then display button
		$(window).scroll(function()
		{
			if ($(this).scrollTop() > 250) 
			{
				$('.backtoTop').fadeIn();
			} 
			else 
			{
				$('.backtoTop').fadeOut();
			}
		});
	
		//Click event to scroll to top
		$('.backtoTop').click(function()
		{
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
	
	});
}

//Search function to look easier for words
function searching()
{
	var menuitem5 = document.getElementById("search");
	menuitem5.onclick=function()
	{ 
		word=prompt("Enter your word you want to search",""); 
		$('td:contains("'+ word +'")').css('background-color', '#FFFF88').css('border', 'solid 4px black');
	};
}
