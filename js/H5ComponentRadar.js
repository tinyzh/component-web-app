//雷达图
var H5ComponentRadar = function(name,cfg){
    var component = new H5componentBase(name,cfg);

    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布 背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var step = cfg.data.length;

    var r = w/2;//半径


    //计算一个圆周上的坐标(计算多边形的顶点坐标)
    //已知：圆心坐标(a,b)、半径r、角度deg.
    //rad = (2*Math.PI / 360) * (360 / step) * i       弧度
    //x = a + Math.sin(rad) * r;
    //Y = b + Math.cos(rad) * r;

    //绘制网格背景(分面绘制，分为10面)
    var isBlue = false;
    for(var s = 10;s>0;s--){
        ctx.beginPath();
        for(var i = 0;i<step;i++){
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * (s/10);
            var y = r + Math.cos(rad) * r * (s/10);

            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        ctx.fill();
    }

    //绘制伞骨
    for(var i = 0;i<step;i++){
        var rad = (2*Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r;
        var y = r + Math.cos(rad) * r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    //数据层的开发
    //加入一个画布 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.strokeStyle = '#f00';

    var draw = function(per) {
        //输出数据的折线

        for(var i = 0;i<step;i++){
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var rate = cfg.data[i][1];
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.lineTo(x,y);
        }

        ctx.closePath();
        ctx.stroke();



    };

    draw(1);


    component.on('onLoad',function(){
        //雷达图生长动画
        var s = 0;
        for(var i = 0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                //draw(s);
            },i*10+500);
        }
    });

    component.on('onLeave',function(){
        //雷达图退场动画
        var s = 1;
        for(var i = 0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                //draw(s);
            },i*10);
        }
    });


    return component;

}