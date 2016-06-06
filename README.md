# tfff1's Multilingual-Websites
A small Javascript Library that allows for easy translation of websites.

## Getting Started

tfff1's Multilingual Websites is a tiny Javascript library that allows for easy translation for any website.

1. In the main directory of your website create a directory called "language". This will contain all of the language files.
2. Inside the Language directory create a .lang file. The naming convention is ll-cc.lang where ll is language and cc is country. 
for Example English United States would be called en-us.lang

3. In your html page link to JQuery & the Multilingual Websites javascript file.
4. Go through your website and replace text with <lang></lang>
5. Give each of these <lang> elements a unique name by adding a langID property (so it would look like: <lang langID="<unique name>"></lang>)
6. Use the unique name to give it a value in each different .lang file.

For Example if my html is:
```html
<lang langID="Welcome Header"></lang>
```
then my en-us.lang would be:
```
Welcome Header=Hello
```
and my es-es would be:
```
Welcome Header=Hola
```

7. Now that you've ported all of the text you want to be translated, add the following to the <head> of the document:
```html
<script type="text/javascript">
  $(window).ready(function() {
    changeLanguage($('html').attr('lang'));
  });   
</script>
```

8. Now if you load up the page you should be able to see the starting language's text displaying!

### Important Note

For This to work properly, you must have a valid lang set in the html element like so:
```html
<html lang="en-us"><!--Code Here--></html>
```
NOTE: By 'valid', I mean that a language chosen has an accessible .lang file. eg if I'd set it as "en-us", I'd need an en-us.lang file in my Language Directory.
