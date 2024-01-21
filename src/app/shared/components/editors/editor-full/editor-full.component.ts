import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
//import { editorQuill } from './editor';

@Component({
  selector: 'app-editor-full',
  templateUrl: './editor-full.component.html',
  styleUrls: ['./editor-full.component.scss']
})
export class EditorFullComponent implements OnInit, AfterViewInit {
  arrayToEndBody: string[] = [
    //'../../../../assets/js/vendor/quill.min.js'
   // '../../../../assets/js/plugins/highlight.js/9.12.0/highlight.min.js',
   // '../../../../assets/js/vendor/quill.wb.js'
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
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
            color: []
          }, {
            background: []
          }],
          [{
            script: "super"
          }, {
            script: "sub"
          }],
          [{
            header: "1"
          }, {
            header: "2"
          }, "blockquote", "code-block"],
          [{
            list: "ordered"
          }, {
            list: "bullet"
          }, {
            indent: "-1"
          }, {
            indent: "+1"
          }],
          ["direction", {
            align: []
          }],
          ["link", "image", "video", "formula"],
          ["clean"]
        ]
      },
      theme: 'snow'
    });
  }
}
/*
   <link href="../../../../cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../../dist-assets/css/plugins/quill.bubble.min.css" />
    <link rel="stylesheet" href="../../dist-assets/css/plugins/quill.snow.min.css" />

      <script src="../../dist-assets/js/plugins/quill.min.js"></script>
    <script src="../../dist-assets/js/scripts/quill.script.min.js"></script>
*/
/*

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode((
      new Quill(`.${this.claseAleatoria}`, {
        modules: {
          syntax: !0,
          toolbar: [
            [{
              font: []
            }, {
              size: []
            }],
            ["bold", "italic", "underline", "strike"],
            [{
              color: []
            }, {
              background: []
            }],
            [{
              script: "super"
            }, {
              script: "sub"
            }],
            [{
              header: "1"
            }, {
              header: "2"
            }, "blockquote", "code-block"],
            [{
              list: "ordered"
            }, {
              list: "bullet"
            }, {
              indent: "-1"
            }, {
              indent: "+1"
            }],
            ["direction", {
              align: []
            }],
            ["link", "image", "video", "formula"],
            ["clean"]
          ]
        },
        theme: 'snow'
      })
    )));
    document.body.appendChild(script);

*/
