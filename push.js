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

const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/cbCJroRzkZ0:APA91bFPSJbnEHXV8sQA-OvrJiYDqZvMW32OiqN9osu9drSfo_EG7tY0iHIseIssLoT4Iur-YxOubT_d1Ku_y4W9q-rNz420gxTI7Pd2oEcN5AfXemeSQKv70irz9MMudijZ6acT8JTP","expirationTime":null,"keys":{"p256dh":"BAj7acmSdJiEsekgqanDzVAAv0ls_SGIpS-cPl5Ft2iq5KyANDrii3KwrWY6hjdSVt7EPSNzPvo39yoS5ZKlniA=","auth":"e7mXVE9u_92KRSap2Bjb0g=="}};


const notification = JSON.stringify({
    title: 'Stahlstadt.js #13',
    body: 'Hello World, Stahlstadtkinder ;)',
    url: 'https://twitter.com/stahlstadtjs',
});

webpush
    .sendNotification(subscription, notification)
    .then(success => console.log(success))
    .catch(error => console.log(error));
