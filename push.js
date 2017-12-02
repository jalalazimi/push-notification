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
    endpoint: 'https://fcm.googleapis.com/fcm/send/eHT6RkSPAC4:APA91bHAVmJVY7xBhMlB2v25OvqQ0ENycbiA9QdS9RfwV8RPCDRaOX-1L05n7Okywh27jAQX_Yod8IA4azpmYqCUR2P-kZyiA02N1l4VWT48Q5hAjsoGDGURRPaw6ET0X9eBAtYMEo_H',
    expirationTime: 0,
    TTL: 0,
    keys: {
        p256dh: 'BA77BdtEMPl9HSh5BUt01W9sLN0ZRSwOPkP53fARb2voLN9-w0Gm39U_XGptlwn7aBMg02XU7DpRnmRsJfAqPKc=',
        auth: 'oaBKUkGKSGhJfF7klW2AtA==',
    },
};

// const subscription = {
//     endpoint: 'https://fcm.googleapis.com/fcm/send/cHjJw9pouJA:APA91bE-kgTql_2n2iNrt0aTYSe_AF0FwBnq7v1CYw_CUz-5bGIqgk1gSzM4jSYhLH3nbCoX4PpQLzk6rmSJQoDw1fH4RhcHOT84avIwXQ0CSH459WoWCTcP4vrsTEcu1u2Tok-rFdtw',
//     expirationTime: 0,
//     TTL: 0,
//     keys: {
//         p256dh: 'BOFkMRUaYwu9neie6Zdx2voNX4jtiJHGRuIKB72PkcxN8jGd-5xHDrBJZkPBr8RNwj30O09tCFhZaBrZ9dGwbuw=',
//         auth: 'iGKbkrcDMLSfCYrYHkSHJg==',
//     },
// };

const notification = JSON.stringify({
    title: 'Stahlstadt.js #13',
    body: 'Hello behrad, Stahlstadtkinder ;)',
    url: 'https://twitter.com/stahlstadtjs',
});

webpush
    .sendNotification(subscription, notification)
    .then(success => console.log(success))
    .catch(error => console.log(error));
