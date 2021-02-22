var express = require('express');
var router = express.Router();
var axios = require('axios');

var infra_red = 0;
var face_recog = 0;
var bluetooth = 0;
var doorlock = 1;

var url = 'http://ae27261b.ngrok.io';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/bt', function(req, res, next) {

    bluetooth = req.body.status;

    console.log("Bluetooth status: " + bluetooth);

    res.json({
        "bluetooth" : bluetooth
    });

    // when door is unlocked then bluetooth is disconnected,
    // lock door
    if(bluetooth == 0 && face_recog == 1 && doorlock == 0){
        console.log('lock');

        axios.post(url + '/command-lock-door', {

        })
            .then(function (response) {
                face_recog = 0;
                doorlock = 1;
                console.log(response.data.message);
                console.log("door locked");
                console.log("bluetooth:", bluetooth);
                console.log("facerecog:", face_recog);
                console.log("doorlock:", doorlock);
            })
            .catch(function (error) {

                console.log(error);

            });

    }

});

router.post('/fr', function(req, res, next){

    face_recog = req.body.status;

    console.log("Face recognition status: " + face_recog);

    res.json({
        "face_recog" : face_recog,
        "bluetooth" : bluetooth
    });

    verify_fr();

});

router.post('/ir', function(req, res, next){
    if (infra_red != req.body.status){
        infra_red = req.body.status;

        console.log("Infra red status: " + infra_red);

        res.json({
            "infra_red" : infra_red,
            "bluetooth" : bluetooth
        });

        verify_ir();

    }

});

function verify_fr(){

    if(face_recog == 1){

        if(bluetooth == 1 && doorlock == 1) {

            console.log('unlock');
            axios.post(url + '/command-capture-safe-door', {

            })
            .then(function (response) {

                console.log(response.data.message);
                doorlock = 0;

            })
            .catch(function (error) {
                console.log(error);
            });

        } else if (bluetooth == 0){

            console.log('someone at frontdoor');

            axios.post(url + '/command-capture-stranger-door', {

            })
                .then(function (response) {
                    console.log(response.data.message);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

}

function verify_ir(){

    if (infra_red == 1){

        if(bluetooth == 1) {
            console.log('user open window 1');
            axios.post(url + '/command-capture-safe-window', {

            })
                .then(function (response) {

                    console.log(response.data.message);

                })
                .catch(function (error) {
                    console.log('kenapa error');
                    console.log(error);

                });

        } else if (bluetooth == 0){
            console.log('someone went through the window');
            axios.post(url + '/command-capture-danger-window', {

            })
                .then(function (response) {

                    console.log(response.data.message);

                })
                .catch(function (error) {
                    console.log('nyampe kok');

                });

        }

    }

}

// to do:
// status timeout
module.exports = router;