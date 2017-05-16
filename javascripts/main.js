console.log("main js connected")

app.run((FIREBASE_CONFIG) => {
    firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("mushroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
    let getMushList = () => {
        $scope.items = [];

        $scope.showListView = true;

        return $q((resolve, reject) => {
            let itemz = [];
            $http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
                .then((fbItems) => {
                    let mushroomCollection = fbItems.data;
                    Object.keys(mushroomCollection).forEach((key) => {
                        mushroomCollection[key].id = key;
                        itemz.push(mushroomCollection[key]);
                    });
                    console.log("resultz", itemz);
                    resolve(itemz);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let getMushrooms = () => {
        getMushList().then((itemz) => {
            $scope.items = itemz;
        }).catch((error) => {
            console.log("got an error", error);
        });
    };

    getMushrooms();

    $scope.showMushrooms = () => {
        $scope.showListView
        // $scope.showListView = true;
    };


});