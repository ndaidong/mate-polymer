/**
 * board/model.js
 * @ndaidong
 * @copy: *.techpush.net
*/

var app = window['app'] || {};

;(function(){

    'use strict';
    
    var Tweets = [], _stream = 'tech', $board;
    var _data = {}, _lastUpdate = 0, _lifeTime = 15*6e4, isLoading = false;
    
    function load(opts, callback){
        var stream = opts.stream || _stream;
        var skip = opts.skip || 0;
        var limit = opts.limit || 12;
        Bella.transactor.pull('/api/articles', {stream: stream, skip: skip, limit: limit}, function(res){
            callback(res);
        });
    }
    
    function onload(res){
        if(!!res && !res.error && !!res.entries && !!res.owner){
            if(res.skip===0){
                app.owner(res.owner);
                $board.data = [];
                _data[_stream] = {
                    cache: res,
                    saveTime: (new Date()).getTime()
                }
                Bella.View.board.toTop();
            }
            var start = res.skip, end = start+res.limit;
            var data = $board.data, entries = res.entries;
            for(var i=start, j=0; i<end; i++, j++){
                if(!!entries[j]){
                    var item = entries[j];
                    if(!item.image){
                        item.image = '/public/images/bg/file-not-found.jpg';
                    }
                    data[i] = item;
                }
            }
            $board.data = data;
            $board.$.threshold.clearLower();
            isLoading = false;
            setTimeout(app.registerTweetsEmbed, 1000);
        }
    }
    
    var loadArticles = function(e){
        $board = e.target;
        $board.data = [];
        load({skip: 0, limit: 24}, function(res){
            if(!!res && !!res.owner){
                onload(res);
            }
        });
        $board.loadMore = function(){
            if(!isLoading){
                isLoading = true;
                var count = $board.data.length, size = 12;
                load({skip: count, limit: 12}, function(res){
                    onload(res);
                });
            }
        }
        $board.loadMore = function(){
            if(!isLoading){
                isLoading = true;
                var count = $board.data.length, size = 12;
                load({skip: count, limit: 12}, function(res){
                    onload(res);
                });
            }
        };
    }

    function choose(username){
        _stream = username;
        if(!!_data[_stream]){
            var data = _data[_stream],
                res = data.cache,
                sav = data.saveTime,
                now = (new Date()).getTime();
            if(now-sav<_lifeTime){
                return onload(res);
            }
        }
        load({skip: 0, limit: 24}, function(res){
            if(!!res && !!res.owner){
                onload(res);
            }
        });
    }
    
    var V, M = Bella.createModel('board', {
        init : function(){
            V = Bella.View.board;
            V.init();
        },
        loadMore : loadArticles,
        choose : choose
    });
})();
