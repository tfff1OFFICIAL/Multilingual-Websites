//Global Variables:
var attributeName;
var debugMode = false;

function matchesLangID(value) {
    return value === attributeName;
}

function changeLanguage(targetLang, LocationOfLanguageFile, Debug) {
    
    debugMode = Debug;
    
    var targetLangFile = LocationOfLanguageFile + "/" +  targetLang + ".lang";
    console.log("Searching for lang file for " + targetLang + " at: " + targetLangFile);
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // OK
            } else {
                // not OK
                alert('Error: Failed to load. Request Returned: ' + xhr.responseText);
            }
        }
    };
    
    xhr.open('GET', targetLangFile, false);
    xhr.send(null);
    
    var string = xhr.responseText.split('\n');
    var langArray = string.concat();
// `log` is the array of logs you want
    log("Found Array: " + langArray);
    // Start changing Text:
    $("lang").each(function () {
        log("Started work on new Lang Element");
        attributeName = $(this).attr('langID');
        log("Attribute Name = " + attributeName);
        
        var langLine = langArray.filter(function(str){
            return str.indexOf(attributeName) > -1
        });
                
        log("Found Lang Line for " + attributeName + " to be: " + langLine);
        
        var langLineString = langLine.toString();
        var langLineArray = langLineString.split('=');
        var langLineNoTitle = langLineArray.splice(1, 999999999);
        
        log("Removed start of Line, now it looks like: " + langLineNoTitle);
        
        //Final Step - Display Text:
        $(this).html(langLineNoTitle);
    });
    console.log("Language Changes Complete!");
}

function log(message) { 
    if (debugMode === true) {
        console.log(message);
    }
    return null
}