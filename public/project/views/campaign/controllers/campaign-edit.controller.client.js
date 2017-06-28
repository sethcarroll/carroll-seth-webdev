(function() {
    angular
        .module('DiceRole')
        .controller('campaignEditController', campaignEditController);

    function campaignEditController(currentPlayer, $routeParams, campaignService, $location) {

        var model = this;

        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);
        model.campaignId = $routeParams['campaignId'];
        model.updateCampaign = updateCampaign;
        model.deleteCampaign = deleteCampaign;

        function init() {
            var world = 'world';
            campaignService
                .findAllCampaigns(world)
                .then(function (campaigns) {
                    model.campaigns = campaigns;
                });
            campaignService
                .findCampaignById(model.campaignId)
                .then(function (campaign) {
                    model.campaign = campaign;
                    model.oldCampaign = angular.copy(model.campaign);
                });
        }
        init();

        function updateCampaign (campaignId, campaign) {
            campaignService
                .updateCampaign(campaignId, campaign)
                .then(function () {
                    $location.url('/campaign');
                });
        }

        function deleteCampaign (campaignId) {
            campaignService
                .deleteCampaign(campaignId)
                .then(function () {
                    $location.url('/campaign');
                });
        }
    }
})();
