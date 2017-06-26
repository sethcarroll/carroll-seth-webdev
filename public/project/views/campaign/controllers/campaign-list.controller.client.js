(function() {
    angular
        .module('DiceRole')
        .controller('campaignListController', campaignListController);

    function campaignListController(currentPlayer, $routeParams, campaignService) {

        var model = this;
        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];

        function init() {
            campaignService
                .findAllCampaigns()
                .then(function (campaigns) {
                    model.campaigns = campaigns;
                });
        }
        init();
    }
})();