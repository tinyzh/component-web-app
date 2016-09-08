//散点图
var H5ComponentPoint = function(name,cfg){
    var component = new H5componentBase(name,cfg);

    var base = cfg.data[0][1]; //已第一个数据的 比例为大小的 100%

    //输出每个 point
    $.each(cfg.data,function(idx,item){
        var point = $('<div class="point">');
        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="per">'+ (item[1]*100) +'%</div>');
        name.append(rate);
        point.append(name);

        var per = (item[1] / base * 100) + '%';
        point.width(per).height(per);
        if(idx === 0){
            point.css('zIndex',99);
        }else{
            point.css({
                'left':'25%',
                'top':'25%'
            })
        }

        if(item[2]){
            point.css('backgroundColor',item[2]);
        }
        if(item[3] !== undefined && item[4]){
            point.data('left',item[3]).data('top',item[4]);
        }

        component.append(point);

    });

    component.on('onLoad',function(){

            component.find('.point').each(function(idx,item){
                setTimeout(function(){
                   $(item).css({
                       'left':$(item).data('left'),
                       'top':$(item).data('top')
                   });
                },500 * idx);
            });
        return false;
    });

    component.on('onLeave',function(){
       component.find('.point').not(':first').css({
           'left':'25%',
           'top':'0'
       });
        return false;
    });




    return component;

}