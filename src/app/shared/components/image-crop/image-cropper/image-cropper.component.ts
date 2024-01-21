import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  @Input() url: string;
  public APP_URL = environment.apiUrl;
  public APP_URL_API = environment.apiUrl;

  arrayToEndBody: string[] = [
    this.APP_URL+'assets/js/vendor/cropper.min.js',
    this.APP_URL+'assets/js/vendor/jic.js',
    this.APP_URL+'assets/js/cropper.script.js'
  ];
  arrayToEndHead: string[] = [
    this.APP_URL+'assets/css/vendor/cropper.min.css'
  ];
  constructor() { }

  ngOnInit(): void {

    CommonUtils.addJSFilesToEndBody(this.arrayToEndBody);
    CommonUtils.addCssFilesToEndHead(this.arrayToEndHead);



  }


//    <link rel="stylesheet" href="../../dist-assets/css/plugins/cropper.min.css" />
//<script src="../../dist-assets/js/plugins/cropper.min.js"></script>
//<script src="../../dist-assets/js/scripts/cropper.script.min.js"></script>
}
