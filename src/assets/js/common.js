// UI - Dropdown Menu
// UI - Dropdown Menu
// UI - Dropdown Menu
var dropdown = document.querySelectorAll('.dropdown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);
dropdownArray.forEach(function(el){
	var button = el.querySelector('a[data-toggle="dropdown"]'),
        menu = el.querySelector('.dropdown-inner');

	button.onclick = function(event) {
		if(!menu.hasClass('show')) {
			menu.classList.add('show');
			menu.classList.remove('hide');
			event.preventDefault();
		}
		else {
			menu.classList.remove('show');
			menu.classList.add('hide');
			event.preventDefault();
		}
	};
})

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};


// UI - TreeView
// UI - TreeView
// UI - TreeView
var toggler = document.getElementsByClassName("mn-link");
    var i;
    
    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("open");
        });
    }


// UI - Accorcion
// UI - Accorcion
// UI - Accorcion
const accordionTitles = document.querySelectorAll(".accordion-title");

accordionTitles.forEach((accordionTitle) => {
  accordionTitle.addEventListener("click", () => {
    if (accordionTitle.classList.contains("open")) {
      accordionTitle.classList.remove("open");
    } else {
      const accordionTitlesWithIsOpen = document.querySelectorAll(".open");
      accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
        accordionTitleWithIsOpen.classList.remove("open");
      });
      accordionTitle.classList.add("open");
    }
  });
});


// UI - TabMenu
// UI - TabMenu
// UI - TabMenu
var tab;
var tabContent;

window.onload=function() {
    tabContent=document.getElementsByClassName('tab-content');
    tab=document.getElementsByClassName('tab-menu');
    hideTabsContent(1);
}

document.getElementById('tabs').onclick= function (event) {
    var target=event.target;
    if (target.className=='tab-menu') {
       for (var i=0; i<tab.length; i++) {
           if (target == tab[i]) {
               showTabsContent(i);
               break;
           }
       }
    }
}

function hideTabsContent(a) {
    for (var i=a; i<tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('active');
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('active');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}


