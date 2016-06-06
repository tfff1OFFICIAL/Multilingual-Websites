//Global Variables:
var attributeName;

//$(window).ready(function () {
//    changeLanguage($('html').attr('lang'));
//});

function matchesLangID(value) {
    return value === attributeName;
}

function changeLanguage(targetLang) {
        
    var targetLangFile = "language/" + targetLang + ".lang";
    console.log("Searching for lang file for " + targetLang + " at: " + targetLangFile);
    
    var xhr = new XMLHttpRequest();

    xhr.open('GET', targetLangFile, false);
    xhr.send(null);
    
    var string = xhr.responseText.split('\n');
    var langArray = string.concat();
// `log` is the array of logs you want
    console.log("Found Array: " + langArray);
    // Start changing Text:
    $("lang").each(function () {
        console.log("gottem!");
        attributeName = $(this).attr('langID');
        console.log("Attribute Name = " + attributeName);
        
        var langLine = langArray.filter(function(str){
            return str.indexOf(attributeName) > -1
        });
                
        console.log("Found Lang Line for " + attributeName + " to be: " + langLine);
        
        var langLineString = langLine.toString();
        var langLineArray = langLineString.split('=');
        var langLineNoTitle = langLineArray.splice(1, 999999999);
        
        console.log("Removed start of Line, now it looks like: " + langLineNoTitle);
        
        //Final Step - Display Text:
        $(this).html(langLineNoTitle);
    });
    console.log("Language Changes Complete!");
}