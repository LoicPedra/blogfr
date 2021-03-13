bh.getPosts(function(obj) {
    bh.render('template-posts', obj, 'posts-content')
}, function(errorText) {
    console.error(errorText);
});