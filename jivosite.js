(function($){$(document).ready(function () {

	let chatNodeDiv = document.querySelector('div[id^="chatbot-"]');
	chatNodeDiv.querySelector('div').style.paddingBottom = '40px';

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
		window.jivo_cstm_widget.style.borderBottomLeftRadius = '15px';
		window.jivo_cstm_widget.style.borderBottomRightRadius = '15px';
		window.jivo_cstm_widget.style.padding = '10px 20px';
		window.jivo_cstm_widget.style.cursor = 'pointer';
		window.jivo_cstm_widget.style.display = 'none';
		window.jivo_cstm_widget.innerHTML = 'Chat with a human';

		document.querySelector('div[id^="chatbot-"]').querySelector('div').appendChild(window.jivo_cstm_widget);
		window.jivo_cstm_widget.setAttribute('id', 'jivo_custom_widget');
		

		set_jivo_cstm_widget_events(window.jivo_cstm_widget);
	
	}

	window.jivo_onOpen = function() {
		// If chat is deployed - hide shortcut
		if (jivo_cstm_widget){
			jivo_cstm_widget.style.display = 'none';
		}
	}

	window.jivo_onClose = function() {
		// If chat is minimized - show label
		if (jivo_cstm_widget)
			jivo_cstm_widget.style.display = 'block';
	}

	window.set_jivo_cstm_widget_events = function (e) {
		e.onclick = function(){
			$('div[id^="chatbot-"] div[role="button"]').click();
			jivo_api.open();
		}
		e.onmouseover = function(){
			e.style.backgroundColor = '#1E293B';
		}
		e.onmouseout = function(){
			e.style.backgroundColor = '#0F172A';
		}
	}

	let target = document.querySelector('div[id^="chatbot-"] div');
	let config = { attributes: true};
	let observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(mutation.attributeName === 'class'){
				if(mutation.target.classList.contains('open')){
					$('#jivo_custom_widget').appendTo(mutation.target);
					set_jivo_cstm_widget_events(document.getElementById('jivo_custom_widget'));
					console.log("open")
					document.getElementById('jivo_custom_widget').style.display = 'block';
				}else{
					document.getElementById('jivo_custom_widget').style.display = 'none';
				}
			}
		});
	});
	observer.observe(target, config);
});


});

