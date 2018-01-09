var timeoutevent;

var ringer = {
    countdown_to: "02/18/2018",
    rings: {
        'DAYS': {
            s: 86400000, // mseconds in a day,
            max: 365
        },
        'HOURS': {
            s: 3600000, // mseconds per hour,
            max: 24
        },
        'MINUTES': {
            s: 60000, // mseconds per minute
            max: 60
        },
        // 'SECONDS': {
        //   s: 1000,
        //   max: 60
        // },
        'SECONDS': {
            s: 1000,
            max: 1
        },
        'MICROSEC': {
            s: 10,
            max: 100
        }
    },
    r_count: 5,
    r_spacing: 10, // px
    r_size: 100, // px
    r_thickness: 5, // px
    update_interval: 9, // ms


    init: function() {

        $r = ringer;
        // $r.cvs = document.createElement('canvas');
        // $("#photo").css("display", "inline");
        // var cvs = document.getElementById('countdown');
        // cvs.style.display = "inline";
        $("#countdown").css("display", "inline");

        // var cvs = document.getElementsByTagName("canvas")
        $r.cvs = document.getElementById('countdown');
        // $r.ref = document.getElementById('photo');
        $r.size = {
            // w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing * ($r.r_count - 1)),
            // h: ($r.r_size + $r.r_thickness)
            w: $r.cvs.width,
            h: $r.cvs.height
        };



        // $r.cvs.setAttribute('width', $r.size.w);
        // $r.cvs.setAttribute('height', $r.size.h);
        $r.ctx = $r.cvs.getContext('2d');
        // $(".countdownwrap").append($r.cvs);
        $r.cvs = $($r.cvs);
        $r.ctx.textAlign = 'center';
        // $r.actual_size = $r.r_size + $r.r_thickness;
        // $r.countdown_to_time = new Date($r.countdown_to).getTime();
        //Set the target as 3 seconds later than now
        $t = new Date();
        $t.setSeconds($t.getSeconds() + 3);
        $r.countdown_to_time = $t.getTime();

        // $r.cvs.css({ width: $r.size.w + "px", height: $r.size.h + "px" });
        $r.go();
    },
    ctx: null,
    go: function() {
        var idx = 0;

        $r.time = (new Date().getTime()) - $r.countdown_to_time;
        // console.log($r.time / 1000)

        for (var r_key in $r.rings) {
            $r.unit(idx++, r_key, $r.rings[r_key]);
        }
        // console.log(new Date().getTime());
        if ($r.time <= 0) {
            timeoutevent = setTimeout($r.go, $r.update_interval);
        } else {

            // $("#countdown").css("display","none")

        }



    },
    unit: function(idx, label, ring) {
        // var x, y, value, ring_secs = ring.s;
        // value = parseFloat($r.time / ring_secs);
        // $r.time -= Math.round(parseInt(value)) * ring_secs;


        var x, y, value, ring_secs = 1000;
        value = parseFloat($r.time / ring_secs);
        $r.secondc = Math.round(parseInt(value)) * ring_secs;

        value = Math.abs(value);

        // x = ($r.r_size * .5 + $r.r_thickness * .5);
        // x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
        // y = $r.r_size * .5;
        // y += $r.r_thickness * .5;

        x = $r.size.w / 2;
        y = $r.size.h / 2;

        //Skip these circles
        if (label != 'SECONDS') {
            return
        }


        // calculate arc end angle
        var degrees = 360 - ((value % 1) / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);


        $r.ctx.save();
        $r.ctx.clearRect(0, 0, $r.size.w, $r.size.h);


        $r.ctx.translate(x, y);
        // $r.ctx.clearRect($r.actual_size * -0.5, $r.actual_size * -0.5, $r.actual_size, $r.actual_size);

        // first circle
        $r.ctx.strokeStyle = "rgba(128,128,128,0.2)";
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 0, 2 * Math.PI, 2);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // second circle
        $r.ctx.strokeStyle = "rgba(178,34,34, 0.9)";
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 0, endAngle, 1);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // label
        $r.ctx.fillStyle = "#000000";

        // $r.ctx.font = '12px Helvetica';
        // $r.ctx.fillText(label, 0, 23);
        // $r.ctx.fillText(label, 0, 23);   

        $r.ctx.font = 'bold 40px Helvetica';
        $r.ctx.fillText(Math.floor(value), 0, 10);

        $r.ctx.restore();
    },


}

// ringer.init();


// var k = new Date();

function call() {
    // $r.countdown_to_time = new Date($r.countdown_to).getTime();
    // $t = new Date();
    // $t.setSeconds($t.getSeconds() + 3);
    ringer.init();
    console.log("caleed");



}