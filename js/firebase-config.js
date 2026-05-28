const firebaseConfig = {
  apiKey:            'AIzaSyA_jqOoPmoiw_7PRtcVyWU-fRcKpdG5QDc',
  authDomain:        'coinluck-sns-app.firebaseapp.com',
  databaseURL:       'https://coinluck-sns-app-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'coinluck-sns-app',
  storageBucket:     'coinluck-sns-app.firebasestorage.app',
  messagingSenderId: '733371261727',
  appId:             '1:733371261727:web:3fd98689e9d625df72062a',
  measurementId:     'G-FRFEY2FHTE',
};

firebase.initializeApp(firebaseConfig);

const fbDb       = firebase.database();
const FB_REF     = fbDb.ref('coinluck/state');
const FB_ONLINE  = fbDb.ref('.info/connected');
