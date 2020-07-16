const vision = require('@google-cloud/vision');

async function app(){
  const client = new vision.ImageAnnotatorClient();
  const fileName = 'pic2.jpg';

  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  convertToHtml(fullTextAnnotation.text);
}

function convertToHtml(text){
  var lines = text.split("\n");
  var resultHTML = "<html><body>"
  var imageFormat = ".jpg"

  lines.forEach((line, i) => {
    var temp = line.substring(3);
    if(line.toUpperCase().includes('#T#')) {
      resultHTML = resultHTML + "<h1>"+temp+"</h1>"
    }else if(line.toUpperCase().includes('#S#')) {
      resultHTML = resultHTML + "<h2>"+temp+"</h2>"
    }else if(line.toUpperCase().includes('#I#')) {
      resultHTML = resultHTML + "<img src='"+temp+imageFormat+"'/>'"
    }else if(line.toUpperCase().includes('#P#')) {
      resultHTML = resultHTML + "<p>"+temp+"</p>"
    }
  });

  resultHTML = resultHTML + "</body></html>"
  console.log(resultHTML);
}

app();
