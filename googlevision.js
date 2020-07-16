// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

async function app(){
  const client = new vision.ImageAnnotatorClient();

  const fileName = 'pic.jpg';

  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(`Full text: ${fullTextAnnotation.text}`);
}

app();
