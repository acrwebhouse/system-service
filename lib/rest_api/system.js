exports.on = function(app) {
    const preRestApi = '/system';
    const system = require('../role/system');
    const middleware = require('./middleware').middleware;

    app.post(preRestApi + '/writeAnnouncement',[middleware.tokenAuth], function(req, res) {
        /*
        #swagger.security = [{
               "apiKeyAuth": []
        }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'writeAnnouncement',
            schema: {
                txt "公告資訊"
            }
        }*/ 
        const txt = req.body.txt
        const response = {
            'status':true,
            'data':''
        }
        response.data = txt
        res.send(response);
    });

    app.get(preRestApi + '/readAnnouncement', function(req, res) {
        const response = {
            'status':true,
            'data':'txt\n123'
        }
        res.send(response);
    });

   
}