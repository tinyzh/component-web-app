/**
 * Created by zhangchao on 16/8/17.
 */
var H5componentBase = function(name,cfg){
    var cfg = cfg || {};
    var id = ('h5_c_' + Math.random()).replace('.','');
    var cls = 'h5_component_'+cfg.type;
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+' " id="'+id+'">');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');


    if(cfg.center === true){
        component.css({
            marginLeft : (cfg.width/4 * -1) + 'px',
            left : '50%'
        });
    }

    if(cfg.relativeTo !== undefined){
        component.css('visibility','hidden');
    }

    component.on('onLoad',function(){
        component.addClass(cls+'_load').removeClass(cls+'_leave');
        if(cfg.relativeTo !== undefined){
            var relativeToComponent = component.parent().find('.h5_component_name_'+cfg.relativeTo);
            var top = parseInt(relativeToComponent.css('top'));
            var left = parseInt(relativeToComponent.css('left'));
            if(cfg.css.top !== undefined){
                component.css({
                    top:cfg.css.top + top
                })
            }
            if(cfg.css.left !== undefined){
                component.css({
                    left:cfg.css.left + left
                })
            }
            component.css('visibility','visible');
        }

        cfg.animateIn && component.animate(cfg.animateIn);

        return false;
    });
    component.on('onLeave',function(){
        component.addClass(cls+'_leave').removeClass(cls+'_load');
        cfg.animateOut && component.animate(cfg.animateOut);
        return false;
    });




    return component;
}