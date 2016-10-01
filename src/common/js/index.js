window.onload = function() {
    var desktopTemplate = document.querySelector('#desktop');
    var clone = document.importNode(desktopTemplate.content, true);
    document.body.appendChild(clone);
};
