
module.exports = (req,res,next) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //  RDGP
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // RGPD

    if(regexEmail.test(req.body.email)) {
        if(regexPassword.test(req.body.password)) {
            next();
        } else {
            res.status(400).json({ message: 'Le mot de passe doit comporter au moins 8 caractères, '
            +'posséder au moins un chiffre, une majuscule, une minuscule' + 'et un des caractères spéciaux suivant: @$!%*?&.'});
        }
    } else {
        res.status(400).json({ message: 'Vous devez saisir une adresse mail valide !'});
    }
}