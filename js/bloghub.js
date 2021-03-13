BlogHub = function(params = {}) {

    this.config = params;
    
    this.getPosts = function(callback, callbackError) {
        this.call('/posts/posts.json', callback, callbackError);
    }

    this.getConfig = function() {
        return this.config;
    }
    
    this.getPost = function(slug, callback, callbackError) {
        self = this;
        self.call('/posts/' + slug + '/post.json', function(obj) {
            self.call('/posts/' + slug + '/content.md', function(content) {
                obj['content'] = content;
                callback(obj);
            }, callbackError, false);
        }, callbackError);
    }

    this.render = function(templateId, data, targetId) {
        var template = document.getElementById(templateId).innerHTML;
        var rendered = Mustache.render(template, data);
        document.getElementById(targetId).innerHTML = rendered;
    }

    this.call = function(urlTarget, callback, callbackError, parse = true) {
        self = this;

        http = new XMLHttpRequest();
        url = this.config.url + urlTarget;
        http.open("GET", url);
        if (parse !== true) {
            http.overrideMimeType('text/plain');
            http.setRequestHeader('X-Requested-With', 'xmlhttprequest');
        }
        http.send();

        http.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (parse === true) {
                        try {
                            var responseParsed = JSON.parse(http.responseText);
                        }
                        catch (e) {
                            callbackError(e.description);
                            return;
                        }
                        responseParsed['config'] = self.config;
                        callback(responseParsed);
                    } else {
                        callback(http.responseText);
                    }
                }
                else {
                    callbackError(http.statusText);
                }
            }
        };
    }

}

