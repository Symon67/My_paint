var tool = "draw";

$(document).ready(function () {
    $("#draw").click(function() {
        tool = "draw";
    });

    $("#circle").click(function() {
        tool = "circle";
    });

    $("#rectangle").click(function() {
        tool = "rectangle";
    });

    let masson = "#rectangle";
    let xrectangle, yrectangle;
    let x,y
    let canvas, ctx,
        brush = {
            color: '#000000',
            size: 10,
            down: false,
        },
        circleMode = false;
    circleStart = false;
    xCircle = 0;
    yCircle = 0;
    
    
    strokes = [],
        currentStroke = null;
    canvas = $('#board');
    ctx = canvas[0].getContext('2d');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    function circle(e) {
        if(tool == "circle") {
        if (!circleStart) {
            xCircle = e.offsetX;
            yCircle = e.offsetY;
            circleStart = true;
        }
        else {
            ctx.beginPath();
            ctx.arc(xCircle, yCircle, e.offsetX - xCircle, 0, 2 * Math.PI);
            ctx.stroke();
            circleStart = false;
        }
    }
    }

    $('#rectangle').click(function (e) {
        masson = "rectangle";
        square(e);
    });

    $('#redraw').click(function (e) {
        masson = "draw";
        square(e);
    });

    function square(e) {
        if(tool == "rectangle") {
        ctx.beginPath();
        
        xRectangle = e.offsetX;
        yRectangle = e.offsetY;
        ctx.fillRect(xrectangle, yrectangle, e.offsetX - xrectangle, e.offsetY - yrectangle);
        ctx.stroke();
        ctx.beginPath();

    }
}



    function redraw() {
        if(tool == "draw") {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
        ctx.lineCap = 'round';
        for (var i = 0; i < strokes.length; i++) {
            var s = strokes[i];
            ctx.strokeStyle = s.color;
            ctx.lineWidth = s.size;
            ctx.beginPath();
            ctx.moveTo(s.points[0].x, s.points[0].y);
            for (var j = 0; j < s.points.length; j++) {
                var p = s.points[j];
                ctx.lineTo(p.x, p.y);
            }
            
            ctx.stroke();
        }
    }
    }

    function init() {

        function mouseEvent(e) {
            brush.x = e.pageX;
            brush.y = e.pageY;

            currentStroke.points.push({
                x: brush.x,
                y: brush.y,
            });

            redraw();
        }

        canvas.mousedown(function (e) {
            brush.down = true;
            xrectangle = e.offsetX;
            yrectangle = e.offsetY;

            currentStroke = {
                color: brush.color,
                size: brush.size,
                points: [],
            };

            strokes.push(currentStroke);

            mouseEvent(e);
        }).mouseup(function (e) {
            brush.down = false;

            mouseEvent(e);

            currentStroke = null;
        }).mousemove(function (e) {
            if (!brush.down) return;
            mouseEvent(e);
        }).click(function (e) {
            if (circleMode) {
                return circle(e);
            }
        });

        $('#download').on('click', download);

        function download() {
            const imgData = canvas[0].toDataURL('image/png');
            const link = document.createElement('a');
            link.setAttribute('download', 'img');
            link.href = imgData;
            link.click();
        }


        $('#clear-btn').click(function () {
            strokes = [];
            redraw();
        });

        $('#color-picker').on('input', function () {
            brush.color = this.value;
        });

        $('#brush-size').on('input', function () {
            brush.size = this.value;
        });

        $('#circle').on('click', function () {
            circleMode = true;
        })

        $('#board').click(function(e) {
           if(masson == "rectangle"){
               square(e);
           }

        })
    }

    init();
});
