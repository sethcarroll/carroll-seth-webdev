(function() {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page._id = new Date().getTime().toString();
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            return pages.filter(function(page) {
                return page["websiteId"] === websiteId;
            });
        }

        function findPageById(pageId) {
            if (typeof page !== "undefined") {
                return pages.find(function(page) {
                    return page["_id"] === pageId;
                });
            }
        }

        function updatePage(pageId, updatedPage) {
            var outdatedPage = pages.find(function(page) {
                return pageId === page['_id'];
            });
            if (typeof outdatedPage !== "undefined") {
                 var index = pages.indexOf(outdatedPage);
                pages.splice(index, 1, updatedPage);
            }
        }

        function deletePage(pageId) {
            var page = pages.find(function(page) {
                return page['_id'] === pageId;
            });
            if (typeof page !== "undefined") {
                var index = pages.indexOf(page);
                pages.splice(index,1);
            }
        }
    }
})();