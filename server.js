const webpush = require('web-push');

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey);
// console.log(vapidKeys.privateKey);
// process.exit();

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90',
    'Rs4ALPgHaAgjaOUrihdpNCaSWtUTPu5ZyU-oHBetX0E',
);

const subscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/doeTqvcZcQw:APA91bHPcTJFKG_4G7PawtSggXl8ktRW243vOzeS_uAFdwZ-s5qZAOX6TL8yfHhqIMw_UgMm56DONeijgbd9LUU66sAD-aRbayMwSsL4Vwkkhvx2BRFx5Ongum4boyZcS5Kje9yxlssO",
    "expirationTime": null,
    "keys": {
        "p256dh": "BChF93bZUXuIb_S-rfYjfPmhaLkOLPlBQH0ihxwwLZ_BAzFgumxwgjNQEbxTpOO6hl-6QJt3znKgsb5yadwr7_U=",
        "auth": "aMh1BuYkM3Q1XbwM01E1Sw=="
    }
}


const notification = JSON.stringify({
    title: 'Stahlstadt.js #13',
    body: 'Hello World, Stahlstadtkinder ;)',
    url: 'https://twitter.com/stahlstadtjs',
});

webpush
    .sendNotification(subscription, notification)
    .then(success => console.log(success))
    .catch(error => console.log(error));
