(function() {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService() {

        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ]
        ;

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            website['_id'] = new Date().getTime().toString();
            website['developerId'] = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            return websites.filter(function (website) {
                return website['developerId'] === userId;
            });
        }

        function findWebsiteById(websiteId) {
            var website = websites.find(function(website) {
                return website['_id'] === websiteId;
            });

            if (typeof website !== "undefined") {
                return website;
            }
        }

        function updateWebsite(websiteId, updatedWebsite) {
            var outdatedWebsite = websites.find(function(website) {
                return website['_id'] === websiteId;
            });

            if (typeof outdatedWebsite !== "undefined") {
                var index = websites.indexOf(outdatedWebsite);
                websites.splice(index, 1, updatedWebsite);
            }
        }

        function deleteWebsite(websiteId) {
            var website = websites.find(function(website) {
                return website['_id'] === websiteId;
            });

            if (typeof website === "undefined") {
                var index = websites.indexOf(website);
                websites.splice(index, 1);
            }
        }
    }
})();