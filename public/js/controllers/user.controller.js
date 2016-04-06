(function(){

  "use strict"

  angular
    .module("victor")
    .controller("UserController", UserController)

  UserController.$inject = ["$log", "tokenService", "$state", "$http", "regimenService"]

  function UserController($log, token, $state, $http, rs) {
    $log.info("user controller loaded")
    var vm = this;
    vm.logout             = logout;
    vm.user               = token.decode();
    vm.submitnewRegimen   = submitnewRegimen;
    vm.showMeds       = showMeds;
    vm.generateEmptyArray = generateEmptyArray;
    vm.emptyArr           = 1;
    vm.delMed             = delMed;
    vm.generateEmptyArray();


    vm.doseUnits          = rs.doseUnits;
    vm.quantity           = rs.quantity;


    vm.newRegimen = {name: "123", dosage: "123", description: "123", direction: "take it", reminder: true};

    function generateEmptyArray() {
      var emptyArray = [];

      for (var i = 0; i < vm.frequency; i++) {
        emptyArray.push("");
      }
      vm.emptyArr = emptyArray
    }


    function logout() {
      $log.info("logout click");
      token.destroy();
      $state.go('splash.welcome');
    }



    //regimen http calls



    function submitnewRegimen() {
      var data = [];

      generateNewRegimenInputData(data)
      $log.info('click', data);
      rs.newRegimen(data)
      .then(function(){
        vm.newRegimen = {};
        vm.frequency  = 0;
        vm.generateEmptyArray();

        $state.go("user.myregimen")
      })
      .catch(function(err){
        $log.debug(err)
      });
    }

    function showMeds() {
      rs.showMeds()
      .then(function(data) {
        $log.info(data);
        vm.regimenIndex = data;
        $log.info(vm.regimenIndex);
      });
    }

    function delMed(data){
      $log.info("del clicked", data)
      rs.deleteMed(data)
      .then(function(data){
        vm.regimenIndex = data;
        $log.info(vm.regimenIndex);
      })

    }



    //helper & data packaging function

    //generating an array of new regimen if there are multiple reminder time slot
    function generateNewRegimenInputData(data) {
      if (vm.emptyArr.length != 0) {
        vm.emptyArr.forEach(function(el, idx) {

          vm.newRegimen.dosage = `${vm.newRegimen.dose} ${vm.newRegimen.units}`
          console.log(vm.newRegimen.dosage)


          var input = angular.copy(vm.newRegimen);
          $log.debug("what is input",input)

          var apm = vm.emptyArr[idx].apm === "am" ? 0 : 12;


          input.hour   = parseInt(vm.emptyArr[idx].hr) + apm
          input.hour === 24 ? input.hour = 0 : "";
          input.minute = vm.emptyArr[idx].min

          data.push(input);
        });
      }
    }


  }
})()
