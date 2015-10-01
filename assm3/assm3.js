function initialise()
{
	navigationMenu();
	changeTitle();
	getText(document.getElementById("topstories-s1"));
	changeText();
	newsChange();
	Button();
}

// FIRST PART //
function navigationMenu()
{
	var navigate = document.getElementById("navigate");
	var menuitems = navigate.getElementsByClassName("menuitems");
	var menutitle = navigate.getElementsByClassName("menutitle");

	for(var i=0; i<menuitems.length; i++)
	{
		menuitems[i].style.display = "none";
		menuitems[i].setAttribute("onmouseover" , "mouseOver(this);");
		menuitems[i].setAttribute("onmouseout" , "mouseOut(this);");
	}

	for(var i=0; i<menutitle.length; i++)
	{
		menutitle[i].setAttribute("onmouseover" , "mouseOver(this);");
		menutitle[i].setAttribute("onmouseout" , "mouseOut(this);");
	}

}

function mouseOver(title)
{
	var menutitle = title.parentNode;
	var menuitems = menutitle.getElementsByClassName("menuitems")[0];
	menuitems.style.display = "block";	
	
} 

function mouseOut(title)
{
	var menutitle = title.parentNode;
	var menuitems = menutitle.getElementsByClassName("menuitems")[0];
	menuitems.style.display = "none";
}


// SECOND PART //
var i = 0;
function changeTitle()
{
	setTimeout("changeTitle()", 3000);
	var breaking = document.getElementById("breaking"); 
	var newstories = document.getElementById("newstories-list");
	var fakelink = newstories.getElementsByClassName("fakelink");
	breaking.innerHTML = breaking.innerHTML.substr(0,27) + " " + fakelink[i].innerHTML;
	i++;

	if(i == fakelink.length)
	{
		i=0;
	}
}

// THIRD PART //
function changeText()
{
	var storylists = document.getElementById("storylists");
	var fakelink = storylists.getElementsByClassName("fakelink");
	for(var i=0 ; i<fakelink.length; i++)
	{
		fakelink[i].setAttribute("onclick", "getText(this);");
	}
}

function hideStories() 
{

	var storypanel = document.getElementById("storypanel"); 
	var story = storypanel.getElementsByClassName("story"); 

	for(var i=0; i<story.length; i++) 
	{ 
		story[i].style.display = "none"; 
	}
}

function getText(storyTitle)
{
	var storyTitleId = storyTitle.id;
	var title = storyTitle.parentNode;
	var storypanel = document.getElementById("storypanel"); 
	var idStory = storyTitleId.split("-")[1];
	var header = storypanel.getElementsByClassName("header")[0];
	var storyBody = document.getElementById(idStory);
	var storytitle = storyBody.getElementsByClassName("title");

	hideStories();
	header.innerHTML = title.innerHTML; 
	storyBody.style.display = "block";
	storytitle[0].style.display = "none";
}
	

// FOURTH PART //
function newsChange()
{
	var listheaders = document.getElementById("listheaders");	
	var div = listheaders.getElementsByTagName("div");
	for (var i=0; i<div.length; i++)
	{
		div[i].setAttribute("onclick", "changeNews(this);");
	}
	
}

function changeNews(title)
{
	hideTitles();
	hideDisplay();
	var storyTitleId = title.id;	
	var header = document.getElementById(storyTitleId);
	header.className = "listheader";
	var story = storyTitleId + "-list";
	var list = document.getElementById(story).style.display = "block";
}

function hideTitles()
{
	var storylist = document.getElementsByClassName("storylist");
	for(var i=0; i<storylist.length; i++)
	{
		storylist[i].style.display = "none";
	}
}

function hideDisplay()
{
	var listheader = document.getElementsByClassName("listheader");
	for(var i=0; i<listheader.length; i++)
	{
		listheader[i].className = "listheader-hidden";
	}
}

// FIFTH PART //
function Button()
{
	var navigate = document.getElementById("navigate");
	var searchButton = navigate.getElementsByClassName("search");
	var fakelink = searchButton[0].getElementsByClassName("fakelink");
	fakelink[0].setAttribute("onclick", "storySearch();");
}

function storySearch()
{
	var searching = prompt("Please enter what you want to search");
	var firstletter = searching.substring(0,1);
	var restletters = searching.substring(1,searching.length).toLowerCase();
	var uppercaseLetter = firstletter.toUpperCase();
	var searchinglow = uppercaseLetter + restletters;
	var searchinghigh = firstletter + restletters;
	var title = document.getElementsByClassName("title");

	hideStories();
	var header = storypanel.getElementsByClassName("header")[0];
	header.innerHTML = "No stories found for the word: " + searching;

	for(var i=0; i<title.length; i++)
	{
		var arr = title[i].innerHTML.split(" ");
		for(var j=0 ; j<arr.length; j++)
		{
			if(arr[j] == searchinghigh || arr[j] == searchinglow || arr[j] == searching)
			{
				hideStories();
			}
		}
	}
	for(var i=0; i<title.length; i++)
	{
		var arr = title[i].innerHTML.split(" ");
		for(var j=0 ; j<arr.length; j++)
		{
			if(arr[j] == searchinghigh || arr[j] == searchinglow || arr[j] == searching)
			{
				var header = storypanel.getElementsByClassName("header")[0];
				var parent = title[i].parentNode;
				var id = parent.id;
				var storyid = document.getElementById(id);
				var storytitle = storyid.getElementsByClassName("title")[0];
				storytitle.style.display = "block";
				parent.style.display = "block";
				header.innerHTML = "Stories containing word: " + searching;

				
			}
		}
	}
	var keywords = document.getElementsByClassName("keyword");
	for(var i=0; i<keywords.length; i++)
	{
		if(keywords[i].innerHTML == searchinghigh || keywords[i].innerHTML == searchinglow || keywords[i].innerHTML == searching)
		{
			hideStories();
		}
	}
	for(var i=0; i<keywords.length; i++)
	{
		if(keywords[i].innerHTML == searchinghigh || keywords[i].innerHTML == searchinglow || keywords[i].innerHTML == searching)
		{
			var parent = keywords[i].parentNode;
			var grandparent = parent.parentNode;
			var grandparentId = grandparent.id;
				
			var story = document.getElementById(grandparentId);
			var title = story.getElementsByClassName("title")[0];
			var header = storypanel.getElementsByClassName("header")[0];
			story.style.display = "block";
			title.style.display = "block";
			header.innerHTML = "Stories containing keyword: " + searching; 
		}
	}
}










