(function(){
  "use strict"

  angular
    .module("victor")
    .controller("NavbarController", NavbarController)

    NavbarController.$inject = ["$log", "$state"]

    function NavbarController($log, $state) {
      $log.info("nav controller")
      var vm = this;
      vm.toggle          = false;

      vm.numb = 0;
      vm.num  = 0;

      vm.titleOne  = ["Your virtual pill box","Your health companion","Connect with your medical provider"];
      vm.paragraph = [
                        "You now can actually 'take your meds as prescribed.' But multiple doses per day or several medications in your regimen, and it quickly becomes hopelessly confusing. In the past, it's a roadblock to your health. With Victor, you have all the directions and reminder on the palm of your hand.",
                        "We understand it is very difficult to adhere to your medical regimen sometimes. Victor is here to keep you motivated. Victor will keep your record and keep you on track! With your presciption data on your phone, You can get educated about your regimen. Victor is there every step on the way to staying healthy.",
                        "As patients ourseleves, we feels like sometimes we are disconnected from our medical provider. Most of the time, during our visit, we forgot to ask questions we wanted to ask. Victor help you take notes on your regimen, ask your questions you need to ask next visit. In addition, your notes can be seen by your medical provider. We want to connect doctors and patients, and building a more effective health service."
                      ]



      vm.pic       = ["/assets/fill_3.png","/assets/pills.png","/assets/calendar.png","/assets/timer.png","/assets/downchart.png"];
      vm.words     = ["1 in 3 of all prescriptions are never filled...","of those, only 50% are actually taken.","Yearly, non-adherence causes 125,000 deaths...","in the U.S alone, that's a life every 4 minutes...","and $330 billion a year in unnecessary medical complication"];




      function changeNumb() {
        setInterval(changing, 8000);
        setInterval(changing2, 6000);

      }

      function changing(){
        if (vm.numb === 2) {
          vm.numb = -1;
        }
        vm.numb += 1
      }


      function changing2(){
        if (vm.num === 4) {
          vm.num = -1;
        }
        vm.num += 1

      }


      changeNumb();






    }
})();
