'use strict';

var fs = require('fs')
  , path = require('path');

var rootFiles = fs.readdirSync(path.join(__dirname , '..'))
  .map(function (x) { return path.join(__dirname, '..',  x) } )
var xFiles = fs.readdirSync(path.join(__dirname , '..', 'x'))
  .map(function (x) { return path.join(__dirname , '..', 'x',  x) } )

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

var insertText = `
<!-- START linuxasmtools github insertion -->
<a href="https://github.com/thlorenz/linuxasmtools"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-32151587-12', 'auto');
  ga('send', 'pageview');

</script>
<!-- END linuxasmtools github insertion -->`


rootFiles
  .concat(xFiles)
  .filter(function ishtml(x) { return path.extname(x) === '.html' })
  .forEach(updateContent);

function updateContent(file) {
  var s = fs.readFileSync(file, 'utf8');
  var lines = s.split('\n');

  var found = false;
  for (var i = lines.length; i >= 0; i--) {
    if (/^<\/body>(<\/html>)?$/.test(lines[i])) {
      found = true;
      break;
    }
  }
  lines.splice(i, 0, insertText)
  var html = lines.join('\n');
  fs.writeFileSync(file, html, 'utf8');
}
