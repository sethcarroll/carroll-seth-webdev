(function() {
    angular
        .module('DiceRole')
        .controller('campaignNewController', campaignNewController);

    function campaignNewController(currentPlayer, campaignService, $location, $routeParams) {

        var model = this;
        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.createCampaign = createCampaign;

        function init() {
            campaignService
                .findAllCampaignsForPlayer(model.userId)
                .then(function (campaigns) {
                    model.campaigns = campaigns;
                });
        }
        init();

        function createCampaign (campaign) {
            campaign.developerId = model.userId;
            campaign._world = 'world';
            campaignService
                .createCampaign(campaign)
                .then(function () {
                    $location.url('/player/'+model.userId+'/campaign/');
                });
        }
    }
})();
