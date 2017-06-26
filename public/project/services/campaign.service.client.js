(function () {
    angular
        .module('DiceRole')
        .service('campaignService', campaignService);

    function campaignService ($http) {

        this.createCampaign = createCampaign;
        this.findAllCampaignsForPlayer = findAllCampaignsForPlayer;
        this.findAllCampaigns = findAllCampaigns;
        this.findCampaignById = findCampaignById;
        this.updateCampaign = updateCampaign;
        this.deleteCampaign = deleteCampaign;

        function createCampaign (campaign) {
            var url = "/api/player/" + campaign.developerId + "/campaign";
            return $http
                .post(url, campaign)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCampaignsForPlayer (userId) {
            var url = "/api/player/" + userId + "/campaign";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCampaigns () {
            var url = "/api/campaign";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCampaignById (campaignId) {
            var url = "/api/campaign/" + campaignId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateCampaign (campaignId, campaign) {
            var url = "/api/campaign/" + campaignId;
            return $http
                .put(url, campaign)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteCampaign (campaignId) {
            var url = "/api/campaign/" + campaignId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();