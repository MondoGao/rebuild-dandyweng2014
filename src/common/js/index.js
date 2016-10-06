window.onload = function() {
    var desktopTemplate = document.querySelector('#desktop');
    var clone = document.importNode(desktopTemplate.content, true);
    document.body.appendChild(clone);

};

document.onreadystatechange = function ()
{
    console.log(document.readyState);
  if(document.readyState == "complete") {
    document.getElementById('loading-spinner').style.opacity = 0;
    document.body.classList.remove("loading");
  }
};
