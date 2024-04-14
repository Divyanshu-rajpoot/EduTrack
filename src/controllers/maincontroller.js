
const infoabout = (req, res) => {
    res.render('about');
};

const infologin = (req, res) => {
    res.render('login');
};

const infohome = (req, res) => {
    res.render('firstpage', { title: 'Home' });
}



export{
    infoabout,
    infologin,
    infohome
};