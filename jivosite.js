document.addEventListener("DOMContentLoaded", function() { 
	let chatNodeDiv = document.querySelector('div[id^="chatbot-"]');
	if ( !chatNodeDiv ) return;

	chatNodeDiv.querySelector('div').style.paddingBottom = '40px';
	chatNodeDiv.querySelector('div').style.display = 'flex';
	chatNodeDiv.querySelector('div').style.flexDirection = 'column';


	window.jivo_onLoadCallback = function() {
		// Create a DIV element for the label
		window.jivo_cstm_widget = document.createElement('div');
		window.jivo_cstm_widget.style.fontWeight = 700;
		window.jivo_cstm_widget.style.color = '#38BDF7';
		window.jivo_cstm_widget.style.fontSize = '1.125rem';
		window.jivo_cstm_widget.style.lineHeight = '1rem';
		window.jivo_cstm_widget.style.fontFamily = 'Mulish, sans-serif';
		window.jivo_cstm_widget.style.tabSize = 4;
		window.jivo_cstm_widget.style.margin = 0;
		window.jivo_cstm_widget.style.height = 50;
		window.jivo_cstm_widget.style.borderWidth = 0;
		window.jivo_cstm_widget.style.borderStyle = 'solid';
		window.jivo_cstm_widget.style.borderColor = '#e5e7eb';
		window.jivo_cstm_widget.style.backgroundColor = '#0F172A';
		window.jivo_cstm_widget.style.boxSizing = 'border-box';
		window.jivo_cstm_widget.style.borderBottomLeftRadius = '20px';
		window.jivo_cstm_widget.style.borderBottomRightRadius = '20px';
		window.jivo_cstm_widget.style.padding = '10px 20px';
		window.jivo_cstm_widget.style.cursor = 'pointer';
		window.jivo_cstm_widget.style.display = 'none';
		window.jivo_cstm_widget.innerHTML = 'Chat with a human';

		document.querySelector('div[id^="chatbot-"]').querySelector('div').appendChild(window.jivo_cstm_widget);
		window.jivo_cstm_widget.setAttribute('id', 'jivo_custom_widget');
		

		set_jivo_cstm_widget_events(window.jivo_cstm_widget);
	
	}

	window.set_jivo_cstm_widget_events = function (e) {
		e.onclick = function(){
			document.querySelector('div[id^="chatbot-"] div[role="button"]').click();
			jivo_api.open();
		}
		e.onmouseover = function(){
			e.style.backgroundColor = '#1E293B';
		}
		e.onmouseout = function(){
			e.style.backgroundColor = '#0F172A';
		}
	}

	window.jivo_onOpen = function(){
		document.querySelector('div[id^="chatbot-"] div[role="button"]').style.display = 'none';
	}
	
	window.jivo_onClose = function(){
		document.querySelector('div[id^="chatbot-"] div[role="button"]').style.display = 'block';
	}

	let target = document.querySelector('div[id^="chatbot-"] div');
	let config = { attributes: true};
	let observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
				if(mutation.target.classList.contains('open', 'cnx-slide-down')){
					document.querySelector('#jivo_custom_widget').appendTo(mutation.target);
					set_jivo_cstm_widget_events(document.getElementById('jivo_custom_widget'));
					if (document.getElementById('jivo_custom_widget').classList.contains('no-animation')){
						document.getElementById('jivo_custom_widget').style.display = 'block';
						return;
					}
					setTimeout(function(){
						if (document.getElementById('jivo_custom_widget').style.display === 'block') return;
						document.getElementById('jivo_custom_widget').style.display = 'block';
						document.getElementById('jivo_custom_widget').classList.add('jivo-slide-up');
						setTimeout(function(){
							document.getElementById('jivo_custom_widget').classList.remove('jivo-slide-up');
							document.getElementById('jivo_custom_widget').classList.add('no-animation');
						}, 1000);
					},10000);

				}else{
					document.getElementById('jivo_custom_widget').style.display = 'none';
				}
		});
	});
	observer.observe(target, config);

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `@keyframes slideUp {from {transform: translateY(100%);opacity: 0;}to {transform: translateY(0%);opacity: 1;}}.jivo-slide-up {animation: slideUp 1s forwards; }`;
	document.getElementsByTagName('head')[0].appendChild(style);	
});
// https://rawcdn.githack.com/ahanfybekheet/js/3302cf039676dd3b5747c720f221817661f0b77c/combine_jivochat_chatnode.min.js
