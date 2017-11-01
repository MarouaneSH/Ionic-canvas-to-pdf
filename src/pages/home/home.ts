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
    
    html2canvas(document.getElementById("Html2Pdf"),{background:"white"}).then((canvas)=>{

      //Initialize JSPDF
      var doc = new jsPDF("p","mm","a4");
      const width = doc.internal.pageSize.width;
      const height = doc.internal.pageSize.height;
      let imgData = canvas.toDataURL("image/PNG");

      doc.addImage(imgData, 'PNG', 20,20,width,height);
   

      let pdfOutput = doc.output();
     


      const directory = this.file.externalApplicationStorageDirectory  ;
      const fileName = this.fileName + ".pdf";
      
      this.file.writeFile(directory,fileName,pdfOutput)
      .then((success)=> console.log("succes" + JSON.stringify(success)))
      .catch((error)=> console.log("errror" +JSON.stringify(error)));
  
  
    });


  
  }


}
