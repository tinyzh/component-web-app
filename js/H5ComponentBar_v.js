//柱图组件对象
var H5ComponentBar_v = function(name,cfg){
    var component = new H5componentBase(name,cfg);

    $.each(cfg.data,function(idx,item){
       var line = $('<div class="line">');
       var name = $('<div class="name">');
       var rate = $('<div class="rate">');
       var per = $('<div class="per">');

        var height = item[1]*100 + '%';
        var bgStyle = '';
        if(item[2]){
            bgStyle = 'style="background-color:'+item[2]+'"';
        }

        rate.html('<div class="bg"></div>');

        rate.css({
            'height':height,
            'backgroundColor':item[2]
        });
        name.text(item[0]);
        per.text(height);
        rate.append(per).append(name);
        line.append(rate);

        component.append(line);




    });


    return component;

}