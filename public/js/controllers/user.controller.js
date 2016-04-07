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
    vm.editMedForm        = editMedForm;
    vm.submitEditMed      = submitEditMed;
    vm.showRegimens       = showRegimens;
    vm.generateEmptyArray();


    vm.doseUnits          = rs.doseUnits;
    vm.quantity           = rs.quantity;

    var now = new Date()
    vm.timeNow = now.getHours()

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




    function showMeds() {
      rs.showMeds()
      .then(function(data) {
        $log.info(data);
        vm.regimenIndex = data;
        $log.info(vm.regimenIndex);
      });
    }

    function showRegimens(){
      $log.info("showRegimen click")
      rs.showRegimens()
      .then(function(data){
        vm.showRegimenData = data

      })

    }

    function submitnewRegimen() {
      var data = [];

      generateNewRegimenInputData(data)
      $log.info('click', data);
      rs.newRegimen(data)
      .then(function(data){
        vm.newRegimen = {};
        vm.frequency  = 0;
        vm.generateEmptyArray();
        vm.regimenIndex = data;
        $state.go("user.mymeds")
      })
      .catch(function(err){
        $log.debug(err)
      });
    }

    function delMed(data){
      $log.info("del clicked", data)
      rs.deleteMed(data)
      .then(function(data){
        vm.regimenIndex = data;
        $log.info(vm.regimenIndex);
      });
    }

    function editMedForm(med) {

      $log.info("edit med", med)

      vm.frequency = med.time.length.toString()
      vm.generateEmptyArray();

      med.time.forEach(function(slot, idx){

        vm.emptyArr[idx] = {
          hr: "",
          min: "",
          apm: ""
        }
        vm.emptyArr[idx].hr     = slot.hour.toString()
        vm.emptyArr[idx].min    = slot.minute.toString()
        vm.emptyArr[idx].apm    = slot.apm.toString()

      });

      med.timeArray = vm.emptyArr
      var dosage = med.dosage.split(" ")
      med.dose  = dosage[0];
      med.units = dosage[1];

      vm.editMed = med;
      $state.go("user.editmed")
    }


    function submitEditMed(){
      var data = [];
      $log.info("edit form submit", vm.editMed);
      editRegimenInputData(data);
      rs.editRegimen(data)
      .then(function(data){
        vm.regimenIndex = data;
        $state.go("user.mymeds")
      })
      .catch(function(err){
        $log.debug(err)
      });
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
          input.hour === 12 ? input.hour = 0 : "";  // if value is 12, means 12am , midnight
          input.hour === 24 ? input.hour = 12 : ""; // if value is 24, means 12pm , noon
          input.minute = vm.emptyArr[idx].min

          data.push(input);
        });
      }
    }


    function editRegimenInputData(data) {
      if (vm.emptyArr.length != 0) {
        vm.emptyArr.forEach(function(el, idx) {

          vm.editMed.dosage = `${vm.editMed.dose} ${vm.editMed.units}`
          console.log(vm.editMed.dosage)
          var input = angular.copy(vm.editMed);

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
