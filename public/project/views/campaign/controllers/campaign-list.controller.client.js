(function() {
    angular
        .module('DiceRole')
        .controller('campaignListController', campaignListController);

    function campaignListController(currentPlayer, $routeParams, campaignService, $location) {

        var model = this;
        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);


        model.deleteCampaign = deleteCampaign;

        function init() {
            var world = 'world';
            campaignService
                .findAllCampaigns(world)
                .then(function (campaigns) {
                    model.campaigns = campaigns;
                });
        }
        init();

        function deleteCampaign (campaignId) {
            campaignService
                .deleteCampaign(campaignId)
                .then(function () {
                    $location.url('/campaign');
                });
        }
    }
})();