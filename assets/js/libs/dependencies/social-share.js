/**
 * social-share.js
 * @ndaidong
 * @copy: *.techpush.net
*/

;(function(){

	var tplURL = {
		gplus: '<a class="social-icon icon-gplus-circled" href="https://plus.google.com/share?url={URL}" target="_blank"></a>',
		linkedin: '<a class="social-icon icon-linkedin-squared" href="http://www.linkedin.com/shareArticle?mini=true&url={URL}" target="_blank"></a>',
		twitter: '<a class="social-icon icon-twitter" href="https://twitter.com/share?url={URL}&text={TEXT}" target="_blank"></a>'
	}
	
	var handle = function(){
		Bella.dom.all('.social-shares').forEach(function(g){
			var res = g.getAttribute('data-resolved');
			if(!res){
				var url = g.getAttribute('data-url');
				var txt = g.getAttribute('data-text');
				if(!!url && !!txt){
					url = Bella.encode(url);
					txt = Bella.encode(txt);
					
					var tpl = Bella.copies(tplURL, {});
					var sa = [];
					for(var k in tpl){
						sa.push(tpl[k].replace('{URL}', url).replace('{TEXT}', txt));
					}
					g.html(sa.join(' '));
				}
				g.setAttribute('data-resolved', 1);
			}
		});		
	}
	Bella.ssharer = {
		handle : handle
	}
})();
