const Sauce = require("../models/sauces");
const fs = require('fs'); // file system de node

// crea sauces dans mongo
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; 
    const sauce = new Sauce({ // new dans mongoose crée un champ _id
      ...sauceObject, // opérateur spread = copie tous les éléments
      likes: 0,
      dislikes: 0,
      usersLiked: [],  // RAZ déjç dans models par défaut mais ... o k u
      usersDisliked: [],      
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.userId // init userId pour compare in front
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  };

  
// modifier sauce dans mongo  
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  
  Sauce.updateOne({ _id: req.params.id, userId : req.userId  }, { ...sauceObject, _id: req.params.id })  // verification du userId
  
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
 
};


// supprime sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id, userId : req.userId }) // _id de mongoDB + verification du userId
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

    
 // recup une seule sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })   
        .then(sauce => res.status(200).json(sauce))   
        .catch(error => res.status(404).json({ error }));

};

// recup ttes les sauces 
exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};
    

// like sauce  /------------------------------
exports.likerSauce = (req, res, next) => { 

  const choix = req.body.like 
  const userId = req.body.userId
  console.log('-----------------');
  console.log('table req.body = ');
  console.table(req.body);
      //----------------------

   if (choix === 1 ){  // vote pour
      Sauce.updateOne({ _id: req.params.id }, {    //   --- ouf !!!  merci mongoDb
        // mongo = arrayFilters
        $inc: { likes: 1 },                        
        // incrémente
        $push: { usersLiked: userId }              
        // ajoute 
      })
        .then(() => { res.status(201).json({ message: "bien vu ! " }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
           //----------------------
      } else if (choix === 0 ){           //  change d'avis                                      
      Sauce.findOne({ _id: req.params.id })
      
        .then((sauce) => {
          if (sauce.usersLiked.find( user => user === userId)) {  // on cherche userId dans table
            Sauce.updateOne({ _id: req.params.id }, {         
              $inc: { likes: -1 },                           
              $pull: { usersLiked: userId }    // on retire userId de la table
              
            })
              .then(() => { res.status(201).json({ message: "bon ... ok."}); }) 
              .catch((error) => { res.status(400).json({error}); });              
          } 
        //--------------  

          if (sauce.usersDisliked.find(user => user === req.body.userId)) {  
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: userId }
            })
              .then(() => { res.status(201).json({ message: "merci ! " }); })
              .catch((error) => { res.status(400).json({error}); });
          }
        })
        .catch((error) => { res.status(404).json({error}); });
      
      //----------------------
      } else if (choix === -1 ){  // vote contre
    
      Sauce.updateOne({ _id: req.params.id }, {         
        $inc: { dislikes: 1 },                               
        $push: { usersDisliked: userId }            
      })
        .then(() => { res.status(201).json({ message: "vous êtes sûr ? " }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
         
      }
      
    };
  
