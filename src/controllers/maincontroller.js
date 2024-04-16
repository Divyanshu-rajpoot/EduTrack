
const infoabout = (req, res) => {
    res.render('about');
};

const infologin = (req, res) => {
    res.render('login',{title: 'Login'});
};

const infohome = (req, res) => {
    res.render('firstpage', { title: 'Home' });
}

const register = (req, res) => {
    res.render('register',{title: 'Register'});
}

const error = (req, res) => {
    res.render('error',{title: 'Error', message: `${res.status = 404} Page not found!`});
}

const analytics = (req, res) => {
    res.render('analytics');
}

export{
    infoabout,
    infologin,
    infohome,
    register,
    error,
    analytics
};