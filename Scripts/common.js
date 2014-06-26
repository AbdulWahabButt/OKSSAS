// common.js is useless for you!

(function () {
    var button = document.getElementById('send-message');
    
    var disqus_shortname;
    
    if(document.domain == 'www.rtcmulticonnection.org') {
        disqus_shortname = 'rtcmulticonnection';
    }
    
    if(document.domain == 'www.webrtc-experiment.com') {
        disqus_shortname = 'webrtcexperiment';
    }
    
    if(button && disqus_shortname) {
        var hr = document.createElement('hr');
        hr.setAttribute('style', 'border: 0;border-top: 1px solid rgb(189, 189, 189);');
        button.parentNode.appendChild(hr);
        
        var div = document.createElement('div');
        div.id = 'disqus_thread';
        button.parentNode.appendChild(div);
        
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }
    
    var textarea = document.getElementById('message');
    if (textarea && document.getElementById('send-message')) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function () {
            document.getElementById('send-message').onclick = function () {
                if (!textarea.value.length || textarea.value.length < 10) {
                    alert('Too short message. Type at least 10 characters.');
                    textarea.focus();
                    return;
                }

                this.disabled = true;

                var element = this;
                element.style.color = 'gray';
                element.innerHTML = 'Sending...';

                if (!window.messenger) return alert('Unable load script. Please refresh the page; or directly contact with muazkh@gmail.com.');
                messenger.deliver(textarea.value, function () {
                    element.style.color = 'white';
                    textarea.value = '';
                    element.innerHTML = 'Send Message';
                    element.disabled = false;
                    alert('Your message has been delivered successfully. Hope you included your email address in the message. Thanks.');
                });

            };    
        }
        
        script.src = "messenger.js";
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }
})();
