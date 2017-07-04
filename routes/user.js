exports.login = function(req, res){

    /**
     * Create users schema.npm
     */

    /**
     * Put check credentials here.
     */

    //TODO Hardcoded user/pass
    if (req.body.email === 'user@test.com' && req.body.pwd === 'pass') {
        console.log('pass');
        req.session.authenticated = true;
        res.redirect('user/userProfile');
    } else {
        console.log(req.body.email + 'fail' + req.body.pwd);
        res.redirect('/');
    }
};

exports.viewUserProfile = function(req, res){
    res.render('user/userProfile', {title : "User Profile"});
};


exports.logout = function(req, res){

    delete req.session.authenticated;
    res.redirect('/');

};