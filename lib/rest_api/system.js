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
                data : '公告資訊'
            }
        }*/ 
        const data = req.body.data
        const response = {
            'status':true,
            'data':''
        }
        system.writeAnnouncement(data,(result,data)=>{
            if(result === false){
                response.status = result
            }
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/readAnnouncement', function(req, res) {
        const response = {
            'status':true,
            'data':'txt\n123'
        }
        res.send(response);
    });

   
}