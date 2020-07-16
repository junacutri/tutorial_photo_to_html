const vision = require('@google-cloud/vision');
const fs = require('fs');

async function app(){
  const client = new vision.ImageAnnotatorClient();
  const fileName = 'pic2.jpg';

  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  convertToHtml(fullTextAnnotation.text);
}

function convertToHtml(text){
  //preclean
  var cleanText = text;
  ["#t#", "#s#", "#i#", "#p#"].forEach((item, i) => {
    cleanText = cleanText.split(item).join("\n"+item.toUpperCase());
    cleanText = cleanText.split(item.toUpperCase()).join("\n"+item.toUpperCase());
  });
  cleanText = cleanText.split("\n\n").join("\n");

  var lines = cleanText.split("\n");
  var resultHTML = "<html><body>"
  var imageFormat = ".jpg"

  lines.forEach((line, i) => {
    var temp = line.substring(3);
    if(line.toUpperCase().includes('#T#')) {
      resultHTML = resultHTML + "<h1>"+temp+"</h1>"
    }else if(line.toUpperCase().includes('#S#')) {
      resultHTML = resultHTML + "<h2>"+temp+"</h2>"
    }else if(line.toUpperCase().includes('#I#')) {
      resultHTML = resultHTML + "<img src='"+temp+imageFormat+"'/>"
    }else if(line.toUpperCase().includes('#P#')) {
      resultHTML = resultHTML + "<p>"+temp+"</p>"
    }
  });
  resultHTML = resultHTML + "</body></html>"

  //postclean
  var tags = ["<h1>", "<h2>", "<p>"];
  tags.forEach((tag, i) => {
    resultHTML = resultHTML.split(tag+" ").join(tag);
    var closingTag = tag.split("<").join("</");
    resultHTML = resultHTML.split(" "+closingTag).join(closingTag);
  });
  resultHTML = resultHTML.split("src=' ").join("src='");

  fs.writeFile("test.html", resultHTML, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was generated!");
});
}

app();
