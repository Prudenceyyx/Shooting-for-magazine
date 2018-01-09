 //
 //            init local pics,cover choices
 //
 //                    display covers
 //
 //               video on and update canvas 
 //
 //              If face
 //
 //                   and download with cover

 var covertemp;
 var cover;
 var context;
 var canvas;
 var draw_face = false;
 var time = 0;
 var recording = false;

 var localMediaStream = null;

 $(document).ready(function() {

     //Taking photo
     var video = document.getElementById('video');
     canvas = document.getElementById('photo');
     context = canvas.getContext('2d');




     var tracker = new tracking.ObjectTracker('face');
     tracker.setInitialScale(4);
     tracker.setStepSize(2);
     tracker.setEdgesDensity(0.1);
     tracking.track('#video', tracker, { camera: true });

     //Upload covers
     var date = new Date();

     var fileextension = ".png";
     var dir = "covers/";
     var imgpaths = [];




     //main()
     //Upload local covers
     $.ajax({
         url: dir,
         success: function(data) {
             //Find all pictures in the img file
             $(data).find("a:contains(" + fileextension + ")").each(
                 function(index, file) {
                     var filename = file.text;
                     // console.log(dir + filename)
                     loadImage(dir + filename, "#covers");
                     //Save the names to a list
                     imgpaths.push(dir + filename);
                 }
             );
             console.log("cvoers")
             // init();
             // console.log("done ajax1");

         },
         complete: function(data) {
             // init();
         }

     })

     tracker.on('track', function(event) {
         videoStream(event);


         if (covertemp == null || covertemp.length == 0) {
             chooseCover()

         } else {
             updateCover();
         }

         if (event.data.length > 0 & time < 2) {
             //countdown, then take photo
             // call();
             // setTimeout(snapshot, 3000);
         }
     });
     // console.log("here+"+imgpaths);
     // video.addEventListener('click', snapshot, false);

     navigator.getUserMedia({ video: true }, function(stream) {
         localMediaStream = stream;
     }, function(error) { console.error(error) });

     // function call() {
     //     // $r.countdown_to_time = new Date($r.countdown_to).getTime();
     //     // $t = new Date();
     //     // $t.setSeconds($t.getSeconds() + 3);
     //     // ringer.init();


     //     console.log("call")
     // }
 });



 //Random cover
 function chooseCover() {
     covertemp = document.getElementsByClassName('cover')
     var random_index = Math.floor(Math.random() * covertemp.length);
     // console.log(random_index);
     cover = covertemp[random_index];
     // var cover = covertemp[date.getMinutes() % 4]
     // })
 }


 function loadImage(path, target) {
     $('<img class="cover" src="' + path + '">').load(function() {
         $(this).appendTo(target);
     });
 }


 function videoStream(event) {

     context.clearRect(0, 0, canvas.width, canvas.height);
     if (recording) {
         //Draw the center part of video to canvas
         context.drawImage(video, video.width / 2 - canvas.width / 2, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    
     }


     //Draw face 
     if (draw_face) {
         context.save();
         context.translate((canvas.width - video.width) / 2, 0)
         event.data.forEach(function(rect) {
             context.strokeStyle = '#a64ceb';

             context.strokeRect(rect.x, rect.y, rect.width, rect.height);
             context.font = '11px Helvetica';
             context.fillStyle = "#fff";
             context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
             context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
             //Only draw the face part // 
             // context.drawImage(video, rect.x, rect.y, rect.width, rect.height, rect.x, rect.y, rect.width, rect.height);

         });
         context.restore();
     }

     //Auto download trigger by face detection
     // if (event.data.length > 0) {
     // snapshot();
     // time += 1;
     // var face = event.data[0];
     // }

 }

 //draw gray
 // http://foat.me/computer-vision-for-the-web/chapter2/1_trakinggrayscale.html
 function drawgray() {
     var canvasParent = document.getElementById('images');
     var imageData = context.getImageData(0, 0, cols, rows);
     var gray = tracking.Image.grayscale(imageData.data, cols, rows, true);
     var sobelImg = tracking.Image.sobel(gray, cols, rows);
     context.putImageData(new ImageData(new Uint8ClampedArray(sobelImg), cols, rows), 0, 0);
 }

 function updateCover() {
     //Draw the whole image
     // context.clearRect(0, 0, canvas.width, canvas.height);
     // context.drawImage(video, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

     var cols = canvas.width;
     var rows = canvas.height;
     // drawgray();

     var coefficient = cover.height / canvas.height;
     var coverWidth = cover.width / coefficient;
     var coverHeight = cover.height / coefficient
     // var coverX = face.x + face.width / 2 - coverWidth / 2;
     // coverX = Math.min(Math.max(coverX, 0), canvas.width - coverWidth);
     // context.drawImage(cover, 0, 0, cover.width, cover.height, coverX, 0, coverWidth, coverHeight);
     context.drawImage(cover, 0, 0, cover.width, cover.height, 0, 0, coverWidth, coverHeight);
 }

 function download() {
     document.querySelector('a#downloading').href = canvas.toDataURL('image/jpeg');
     //trigger the download by simulating click
     document.querySelector('a[download]').click();
 }


 // //Trigger download
 // function snapshot() {

 //     call();
 //     setTimeout(function() {

 //         context.clearRect(0, 0, canvas.width, canvas.height);
 //         //Draw the center part of video to canvas
 //         context.drawImage(video, video.width / 2 - canvas.width / 2, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

 //         //update the image to be downloaded
 //         // if (localMediaStream) {
 //         // document.querySelector('a').href = canvas.toDataURL('image/jpeg');
 //         // }
 //         updateCover();
 //         download();
 //         console.log("snapshot function " + time);
 //         time += 1;
 //     }, 3000);
 //     // delay();

 // }