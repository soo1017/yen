var {Recipient} = require('./../models/recipient');

var recipientsMatching2AgeCnty = (res, country0, age_range_0, age_range_1) => {
    
     Recipient.find({
            donorConnected: false,
            Country: country0,
            $and: [ { Age: { $gte: age_range_0 }}, { Age: { $lte: age_range_1 }} ]
        }).sort({'date': 1}).limit(40).then((recip) => {
//            recip.Picture = 'https://yen-bucket.s3.amazonaws.com/'.concat(recip.Picture);
//            console.log("recip.Picture: ", recip.Picture);
            if (!recip) {
                return res.status(404).send('NoDoc-Found');
            }
            res.status(200).send(recip);

        }, (err) => {
            res.status(400).send(err);
        });
};

module.exports = {recipientsMatching2AgeCnty};
