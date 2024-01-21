
export class ScopesUtil{

  public variables = [];
  public fonts = [];
  public templates = undefined;
  public autoapplysass = true;
  public isViewLoading = false;
  public loading = true;
  public show = 'variables';
  public subRoute = 'html';
  public showHTML = true;
  public showCSS = true;
  public editorOptions = {
    css: {
      lineWrapping: false,
      lineNumbers: true,
      firstLineNumber: 1,
      mode: 'css',
      tabSize: 2,
    },
    html: {
      lineWrapping: false,
      lineNumbers: true,
      firstLineNumber: 1,
      mode: 'text/html',
      tabSize: 2,
    }
  };
  public fixedContent = {
    blobUrl: undefined,
    html: undefined
  };

  public template = {
    blobUrl: '',
    html:
      '<div id="example" class="container"><div class="row"><div class="col-sm-12"><h3>Import your HTML/CSS code or use on of Bootstrap ready-to-start example</h3><p>You can add your own HTML/CSS and see how your Bootstrap themes looks like on your website or application. If you like it, just save your theme. Enjoy and share the love!</p></div></div></div>',
    css: '#example{margin-top: 50px;}'
  };

}
