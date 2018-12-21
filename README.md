
## Ionic 3 project for converting HTML to PDF


This is a simple repository that show you how to use [jsPDF](https://github.com/MrRio/jsPDF) &  [html2canvas](https://github.com/niklasvh/html2canvas) for generating PDF from HTML using Ionic created By Marouane Souah.

### Features:
* Select custom Div element for generating PDF
* Fixed images issue for not displaying when generating PDF
* Save PDF to device ( Android / IOS ) 

### Installing Dependency
First of all you need to create an Ionic project , you can follow this [Guide](https://ionicframework.com/getting-started/) , Or you can clone this project .

#### Installing jsPdf
Open your terminal (inside Ionic Project) and put : 
```
npm install jspdf --save
```
This will install jsPDF inside our ionic apps , but it will not work since we use TypeScript in our project . <br>
So we need to install @types for jsPDF
<br>
```
npm install @types/jspdf --save
```
#### Installing html2Canvas

```
npm install html2canvas --save
```
```
npm install @types/html2canvas --save
```
#### Installing Cordova File Plugin
You can follow this [Guide](https://ionicframework.com/docs/native/file/)

### Examples : 
After installing our Dependency , we can import jsPDF and Html2Canvas in TypeScript like this : 
```
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
```
##### Simple example 
```javascript
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';

constructor(private file:File) {
  }
  
generatePdf(){
    const div = document.getElementById("Html2Pdf");
    const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
    html2canvas(div,options).then((canvas)=>{
      //Initialize JSPDF
      var doc = new jsPDF("p","mm","a4");
      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 20,20 );
      
      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }


      //This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/
      const directory = this.file.externalApplicationStorageDirectory ;

      //Name of pdf
      const fileName = "example.pdf";
      
      //Writing File to Device
      this.file.writeFile(directory,fileName,buffer)
      .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
      .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
  
  
    });
  }

  
```
