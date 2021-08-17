// Menu button toggle function
function menuToggle(x) {
    x.classList.toggle("change");
    if (document.getElementById("menuContainer").classList.contains("menu-fadeOut")) {
        document.getElementById("menuContainer").classList.add("menu-fadeIn");
        document.getElementById("menuContainer").classList.remove("menu-fadeOut");
        document.getElementById("title").style.visibility = "hidden"
    }
    else {
        document.getElementById("menuContainer").classList.add("menu-fadeOut");
        document.getElementById("menuContainer").classList.remove("menu-fadeIn");
        document.getElementById("title").style.visibility = "visible"
    }
}