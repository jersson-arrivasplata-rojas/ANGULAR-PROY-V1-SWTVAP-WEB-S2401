import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-editor-bubble',
  templateUrl: './editor-bubble.component.html',
  styleUrls: ['./editor-bubble.component.scss']
})
export class EditorBubbleComponent implements OnInit, AfterViewInit {
  arrayToEndBody: string[] = [
    //'../../../../assets/js/vendor/quill.min.js'
   // '../../../../assets/js/plugins/highlight.js/9.12.0/highlight.min.js',
    //'../../../../assets/js/vendor/quill.wb.js'
  ];
  arrayToEndHead: string[] = [
    '../../../../assets/css/vendor/quill.bubble.css',
    '../../../../assets/css/vendor/quill.snow.css'
  ];

  id: string = CommonUtils.claseAletaria;
  constructor() { }

  ngOnInit(): void {

    CommonUtils.addJSFilesToEndBody(this.arrayToEndBody);
    CommonUtils.addCssFilesToEndHead(this.arrayToEndHead);
    //https://www.npmjs.com/package/quill
    //https://killercodemonkey.github.io/ngx-quill-example/
  }
  ngAfterViewInit() {
    // editorQuill(this.claseAleatoria);
    let id = '#' + this.id;
    const Quill = require('quill');

    var quill = new Quill(id, {
      modules: {
        syntax: !0,
      },
      theme: 'bubble'
    });
  }
}
