
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';


declare var cordova:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   fileName:string;

  constructor(
    public navCtrl: NavController,
    private file:File
  ) {

  }



  
  generatePdf(){
    const div = document.getElementById("Html2Pdf");
    var doc = new jsPDF("p","mm","a4");
    html2canvas(div,{background:"white",height :div.clientHeight , width : div.clientWidth  }).then((canvas)=>{
      //Initialize JSPDF
     
      console.log("HEIGHt : 1  " +  div.offsetHeight + " Client : "+ div.clientHeight);
      console.log("widht : 1  " +  div.offsetWidth + " Client : "+ div.offsetWidth);

      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 20,20 );
      let pdfOutput = doc.output();
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }


      //This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/
      const directory = this.file.externalApplicationStorageDirectory ;

      //Name of pdf
      const fileName = this.fileName+".pdf";
      
      //Writing File to Device
      this.file.writeFile(directory,fileName,buffer)
      .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
      .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
  
  
    });
  }


}
