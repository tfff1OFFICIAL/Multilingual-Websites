//Global Variables:
var attributeName;
var debugMode = false;
var currentLang;
var Directory;
var target;
var revertAttemptsCount = 0;

// Getting the startup language from URL parameter:
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

function loadLanguage(htmlLang, LocationOfLanguageFiles, Debug) {
    //For use on a page's first load.
    var startLang = $.urlParam("lang");
    if (startLang === null) {
        console.log("Failed to find language set in URL, using Document Default. Calling changeLanguage...");
        changeLanguage(htmlLang, LocationOfLanguageFiles, Debug);
    }
    else {
        //Multiple URL Param Safety:
        if (startLang.indexOf('?lang=') > -1) {
            var startLangArray = startLang.split('?');
            var arrayLength = startLangArray.length;
            var finalStartLang = startLangArray.slice(0, 1);
            console.warn("Got language from URL to be: " + startLang + ". Detected multiple language Attributes, trimmed to: " + finalStartLang);
            changeLanguage(finalStartLang, LocationOfLanguageFiles, Debug);
        }
        else {
            console.log("Got language from URL to be: " + startLang + ". Calling changeLanguage...");
            changeLanguage(startLang, LocationOfLanguageFiles, Debug);
        }
    }
}

function matchesLangID(value) {
    return value === attributeName;
}

/*function getLang (targetLangFile) {
    /* Start of conversion to AJAX *//*

    var xhr = $.ajax({
        dataType: "text",
        method: "get",
        url: targetLangFile,
        statusCode: {
            404: function() {
                //Doesn't seem to work, tested on Firefox
                console.error("Language File not found. Reverting to " + currentLang);
                changeLanguage(currentLang);
                return;
            }
        }
        });
    
        xhr.done(function( data ) {
            var toReturn = data.split('\n');
            return toReturn;
        });
           }*/

function changeLanguage(targetLang, LocationOfLanguageFiles, Debug) {
    // Setting Global Variables:
    debugMode = Debug;
    
    var targetLangFile;
    if (LocationOfLanguageFiles === undefined||"") {
        if (Directory === undefined||"") {
            alert("Failed to find language file, directory is undefined. If this problem persists, notify the owner of the site. If you're the owner of the site, Docs can be found here: http://tfff1official.github.io/multilingual_websites");
            console.error("Language File Directory is undefined. For help visit: http://tfff1official.github.io/multilingual_websites");
        }
        else {
            targetLangFile = Directory + "/" +  targetLang + ".lang";
        }

    }
    else {
        Directory = LocationOfLanguageFiles;
        targetLangFile = LocationOfLanguageFiles + "/" +  targetLang + ".lang";
    }
    console.log("Getting Language file for " + targetLang + " at: " + targetLangFile);
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // OK
            }
            else {
                // not OK
                    //Doesn't seem to work, tested on Firefox
                    console.error("Language File not found. Checking if there are any embedded translations...");
                    if($("lang[" + targetLang + "]").length) {
                        //Move on.
                    }
                    else {
                        if (revertAttemptsCount < 3) {
                            console.error("Found no Elements with required attribute: " + targetLang + " Attempting to revert to old language...");
                            revertAttemptsCount = revertAttemptsCount + 1;
                            changeLanguage(currentLang);
                            return;
                        }
                        else {
                            alert("Something has broken, this is often something to do with ?lang= in the URL of the page, try deleting that and then refreshing. If this doesn't fixed the problem please contact the website's owner with details about this error.");
                            return;
                        }
                    }
            }
        }
    };
    
    xhr.open('GET', targetLangFile, false);
    xhr.send(null);
    
    var langArray = xhr.responseText.split('\n').concat();
    
    log("Found Array: " + langArray);
    
    //TEMPORARY: Set Target Lang to Global target:
    target = targetLang.toString();
    
    // Start changing Text:
    $("lang").each(function () {
        // Check if Language is stored in element or in Language File:
        var AttrDecider = $(this).attr(target);
                
        if (AttrDecider == undefined) {
            // Text not in Attributes:  
            log("Started work on new Lang Element");
            attributeName = $(this).attr('langID');
            log("Attribute Name = " + attributeName);
         
            var langLine = langArray.filter(function(str){
                return str.indexOf(attributeName) > -1
            });
                alert(langLine);
            
            if (langLine.length > 1) {
                langLine = langLine.shift();
            }
            
            log("Found Lang Line for " + attributeName + " to be: " + langLine);
        
            var langLineString = langLine.toString();
            var langLineArray = langLineString.split('=');
            
            writeChanges($(this), langLineArray.splice(1, 999999999));
            
            log("Removed start of Line, now it looks like: " + langLineArray.splice(1, 999999999));
        }
        else {
            log("Found lang element with embedded data.");
            // Text in attributes:
            writeChanges($(this), $(this).attr(target));
        }       
    });
    //Set Global Variable:
    currentLang = targetLang;
    console.log("Language Changes Complete!");
}

function writeChanges(target, toWrite) {
    if (toWrite == ""||undefined) {
        $(target).css("display", "none");
    }
    else {
        if($(target).css("display") == "none") {
            $(target).css("display", "block");
        }
        $(target).html(toWrite);
    }
    return
}

function log(message) { 
    if (debugMode === true) {
        console.log(message);
    }
    return null;
}

function langNavigate(URL) {
    // Returns a string with the URL setting for the current language added:
    var newPage = URL + "?lang=" + currentLang;
    return newPage;
};