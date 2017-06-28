(function() {
    angular
        .module('DiceRole')
        .controller('campaignNewController', campaignNewController);

    function campaignNewController(currentPlayer, campaignService, $location, $routeParams) {

        var model = this;
        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);
        model.createCampaign = createCampaign;
        model.deleteCampaign = deleteCampaign;

        function init() {
            var world = 'world'
            campaignService
                .findAllCampaigns(world)
                .then(function (campaigns) {
                    model.campaigns = campaigns;
                });
        }
        init();

        function createCampaign (campaign) {
            campaign.userId = model.userId;
            campaign.world = 'world';
            campaignService
                .createCampaign(campaign)
                .then(function () {
                    $location.url('/campaign/');
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
