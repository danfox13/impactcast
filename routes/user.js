exports.login = function(req, res){

    /**
     * Put check credentials here.
     */

    //TODO Hardcoded user/pass
    if (req.body.email === 'user@test.com' && req.body.pwd === 'pass') {
        console.log('pass');
        req.session.authenticated = true;
        res.redirect('/home');
    } else {
        console.log(req.body.email + 'fail' + req.body.pwd);
        res.redirect('/');
    }

};


exports.logout = function(req, res){

    delete req.session.authenticated;
    res.redirect('/');

};