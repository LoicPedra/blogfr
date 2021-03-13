bh.getPost(getAllUrlParams().slug, function(obj) {
    obj['content'] = DOMPurify.sanitize(marked(obj.content));
    bh.render('template-post', obj, 'post-content');
    bh.render('template-tags', obj, 'post-tags');
    document.title = document.title + ' ' + obj.title;
}, function(errorText) {
    console.error(errorText);
});