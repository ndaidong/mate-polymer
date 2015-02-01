/**
 * board/view.js
 * @ndaidong
 * @copy: *.techpush.net
*/

var app = window['app'] || {};

;(function(){

    'use strict';
    
    var $btnLogin;
    var $boardSwitcher, $switcherPicked, $switcherPickedAvatar, $switcherPickedLabel;
    
    function updateRetime(){
        Bella.dom.all('.relative-time').forEach(function(el){
            var pre = el.getAttribute('data-time');
            if(!!pre){
                var d = new Date(pre);
                if(!!d){
                    var ret = Bella.date.toRelativeTime(d);
                    el.innerHTML = ret;
                }
            }
        });
    }
    
    function toTop(){
        var $scroller = Bella.element('scroller');   
        $scroller.scrollTop = 0;
    }
    
    var V = Bella.createView('board', {
        init: function(){
            var M = Bella.Model.board;
            
            V.compile({}, function(tpl){
                var el = Bella.element('articleList');
                if(!!el && !!tpl){
                    el.html(tpl);
                    addEventListener('template-bound', M.loadMore);
                }
            });
            
            $btnLogin = Bella.element('btnLogin');
            if(!!$btnLogin){
                $btnLogin.click(function(){
                    window.location.href='/auth/twitter';
                });
            }
            
            $boardSwitcher = Bella.element('boardSwitcher');
            $switcherPicked = Bella.element('switcherPicked');
            $switcherPickedAvatar = Bella.element('switcherPickedAvatar');
            $switcherPickedLabel = Bella.element('switcherPickedLabel');
            
            var M = Bella.Model.board, owner = app.owner() || {};
            var current = owner.alias || 'tech';

            Bella.dom.all('#boardSwitcher .switcher-item').forEach(function(item){
                item.click(function(e){
                    Bella.event.exit(e);
                    $boardSwitcher.toggleClass('hover');
                    var rel = this.getAttribute('related');
                    if(!!rel && rel!=current){

                        $boardSwitcher.setAttribute('selected', rel);
                        var label = this.getAttribute('label');
                        var avatar = this.getAttribute('avatar');
                        $switcherPickedLabel.html(label);
                        $switcherPickedAvatar.style.backgroundImage = 'url('+avatar+')';
                        if(rel!='tech' && rel!='sports' && rel!='finance'){
                            $switcherPickedAvatar.removeClass('special-item');
                            $switcherPicked.removeClass('special-item');
                        }
                        else{
                            $switcherPickedAvatar.addClass('special-item');
                            $switcherPicked.addClass('special-item');
                        }

                        setTimeout(function(){
                            current = rel;
                            $boardSwitcher.setAttribute('selected', rel);
                            $switcherPicked.setAttribute('related', rel);
                            M.choose(rel);
                        }, 100);
                    }
                });         
            });
            Bella.setClickCallback(function(e, tg){
                if(!tg.hasClass('switcher-item')){
                    $boardSwitcher.removeClass('hover');
                }
                if(tg.hasAttribute('rel-twid')){
                    Bella.event.exit(e);
                }
            });
        },
        render : function(){
            
        },
        cleanBoard : function(){
            
        },
        toTop : toTop
    });
})();
