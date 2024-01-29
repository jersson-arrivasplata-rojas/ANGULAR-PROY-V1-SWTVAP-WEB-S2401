$(document).ready(function() {
    var $image = $('.cropper-main-img');
    /*var $dataX = $('.cropper-main-dataX');
    var $dataY = $('.cropper-main-dataY');
    var $dataHeight = $('.cropper-main-dataHeight');
    var $dataWidth = $('.cropper-main-dataWidth');
    var $dataRotate = $('.cropper-main-dataRotate');
    var $dataScaleX = $('.cropper-main-dataScaleX');
    var $dataScaleY = $('.cropper-main-dataScaleY');*/
    var options = {
        dragMode: 'move',
        viewMode: 1,
        aspectRatio: 1, // / 1
        preview: '.img-preview',
        minContainerWidth: 400,
        minContainerHeight: 400,
        minCropBoxWidth: 400,
        minCropBoxHeight: 400,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        crop: function(e) {
            /*$dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));//400
            $dataWidth.val(Math.round(e.width));//400
            $dataRotate.val(e.rotate);
            $dataScaleX.val(e.scaleX);
            $dataScaleY.val(e.scaleY);*/

        },
        ready: function() {
            console.log('ready');
            console.log(cropper.ready);
            $(this).cropper('setData', {
                height: 400,
                width: 400,
                scaleX: 1,
			          scaleY: 1,
            });

        }
    };
    //https://codepen.io/alexortiz_7/pen/WVNJXR
    //https://fengyuanchen.github.io/cropperjs/
    var cropper = $image.cropper(options);
    $('.js-save-cropped-avatar').on('click', function(event) {
        event.preventDefault();
        var result = $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 400,
            beforeDrawImage: function(canvas) {
                var context = canvas.getContext('2d');
                context.imageSmoothingEnabled = false;
                context.imageSmoothingQuality = 'high';
            },
        });
        var imageAsData = result.toDataURL('image/jpeg');

        // Just to get some base64 png example
        //const canvas = document.createElement('canvas')
        //const base64 = canvas.toDataURL().split(',')[1]

        // https://github.com/brunobar79/J-I-C/tree/master/src
        //https://edupala.com/calculate-base64-image-size/
        generateImageSize(imageAsData)
        $('#avatar-crop').attr('src', imageAsData);

        compressImage (imageAsData)

    });

    function compressImage (base64) {
      const canvas = document.createElement('canvas')
      const img = document.createElement('img')

      return new Promise((resolve, reject) => {
        img.onload = function () {
          let width = img.width
          let height = img.height
          const maxHeight = 400
          const maxWidth = 400

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width))
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height))
              height = maxHeight
            }
          }
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          //js-output-compress
          resolve(canvas.toDataURL('image/jpeg', 0.7))

          var imageDataURL = canvas.toDataURL('image/jpeg', 0.7);
          console.log(imageDataURL);

          var base64String = imageDataURL.split(",")[1];
          console.log("base64", base64String.length);

          //console.log("non blob", stringToBytesFaster(base64String).length);
          var nonBlob = stringToBytesFaster(base64String).length;
          console.log("non blob", nonBlob / 1000000, "MB", "-----", nonBlob / 1000, "KB");

          var file = dataURLtoBlob(imageDataURL);

          var size = file.size;

          var sizeKB = size / 1000;
          var sizeMB = size / 1000000;
          var p = document.querySelector('.js-output-compress');
          p.textContent = `Size: ${sizeMB}MB --- ${sizeKB}KB`;

          $('#avatar-crop-compress').attr('src', imageDataURL);

          //avatar-crop-compress
        }
        img.onerror = function (err) {
          reject(err)
        }
        img.src = base64
      })
    }
// https://codepen.io/AlvaroFelipe/pen/wjvwww?editors=1010
    function generateImageSize(imageAsData){
      var body = document.getElementsByTagName('body')[0];

      var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var image = new Image();

        window.console.log("f00");
        image.onload = function() {

            console.log("image loaded");
            var w = this.width,
                h = this.height;

            body.appendChild(this);
            canvas.width = w;
            canvas.height = h;
            body.appendChild(canvas);
            context.drawImage(this, 0, 0, w, h, 0, 0, w, h);



            var imageDataURL = canvas.toDataURL();
            console.log(imageDataURL);

            var base64String = imageDataURL.split(",")[1];
            console.log("base64", base64String.length);

            //console.log("non blob", stringToBytesFaster(base64String).length);
            var nonBlob = stringToBytesFaster(base64String).length;
            console.log("non blob", nonBlob / 1000000, "MB", "-----", nonBlob / 1000, "KB");

            var file = dataURLtoBlob(imageDataURL);
          //inicio

          //fin

            var size = file.size;

            var sizeKB = size / 1000;
            var sizeMB = size / 1000000;
            console.log("size", sizeMB, "MB", "-----", sizeKB, "KB");
            var p = document.querySelector('.js-output');
            p.textContent = `Size: ${sizeMB}MB --- ${sizeKB}KB`;

        }
        image.src = imageAsData;
    }
  /*  function upload(){
      var f = fileToUpload.files[0];
      var fileName = f.name.split('.')[0];
      var img = new Image();
      img.src = URL.createObjectURL(f);
      img.onload = function(){
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(function(blob){
                  console.info(blob.size);
                  var f2 = new File([blob], fileName + ".jpeg");
                  $('#avatar-crop-compress').attr('src',f2 );//jic.compress(file,60,'jpeg').src

                 // var xhr = new XMLHttpRequest();
                 // var form = new FormData();
                  //form.append("fileToUpload", f2);
                  //xhr.open("POST", "upload.php");
                 // xhr.send(form);
          }, 'image/jpeg', 0.5);
      }
  }*/

    function dataURLtoBlob(dataURL) {
        //http://mitgux.com/send-canvas-to-server-as-file-using-ajax
        // Decode the dataURL
        var binary = atob(dataURL.split(',')[1]);
        // Create 8-bit unsigned array
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        // Return our Blob object
        return new Blob([new Uint8Array(array)], { type: 'image/png' });
    }

    function stringToBytesFaster(str) {
        //http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
        var ch, st, re = [],
            j = 0;
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            if (ch < 127) {
                re[j++] = ch & 0xFF;
            } else {
                st = []; // clear stack
                do {
                    st.push(ch & 0xFF); // push byte to stack
                    ch = ch >> 8; // shift value down by 1 byte
                }
                while (ch);
                // add stack contents to result
                // done because chars have "wrong" endianness
                st = st.reverse();
                for (var k = 0; k < st.length; ++k)
                    re[j++] = st[k];
            }
        }
        // return an array of bytes
        return re;
    }







});
//https://fengyuanchen.github.io/cropperjs/
