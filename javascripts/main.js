console.log("main js connected")

app.run((FIREBASE_CONFIG) => {
   firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("mushroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
  let getItemList = () => {
  let itemz = [];
  
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
      .then((fbItems)=> {
        let itemCollection = fbItems.data;
        Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id=key;
            itemz.push(itemCollection[key]);
          });
          console.log("resultz", itemz);
          resolve(itemz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let getItems = () => {
      getItemList().then((itemz)=>{
        $scope.items = itemz;
      }).catch((error)=>{
        console.log("got and error", error);
      });
    };

  getItems();


});




