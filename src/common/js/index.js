// window.onload = function() {
//     // var desktopTemplate = document.querySelector('#desktop');
//     // var clone = document.importNode(desktopTemplate.content, true);
//     // document.body.appendChild(clone);
//
// };

document.onreadystatechange = function ()
{
    if(document.readyState == "complete") {
        document.getElementById('loading-spinner').style.opacity = 0;
        document.getElementById('loading-spinner').style.pointerEvents = 'none';
        document.getElementById('loading-overlay').style.opacity = 0;
        setTimeout(function() {
            document.getElementById('loading-overlay').style.display = 'none';
        },1000);
        document.body.classList.remove("loading");
    }
};
