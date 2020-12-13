function dropDown() {
    let wrapper = document.getElementById("genreContainerWrapper");
    wrapper.style.lineHeight = "1.5";
    wrapper.style.height = "30px";
    wrapper.style.color = "#000";
    wrapper.style.borderBottom = "2px solid #000"
    wrapper.style.overflow = "visible";
}

function dropUp() {
    let wrapper = document.getElementById("genreContainerWrapper");
    wrapper.style.lineHeight = "0";
    wrapper.style.height = "0px";
    wrapper.style.color = "transparent";
    wrapper.style.overflow = "hidden";
}