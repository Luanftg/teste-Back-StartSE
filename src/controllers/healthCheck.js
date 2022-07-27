const  healthCheck = {
    health: (req,res)=> {
        res.send(200).json({"message":"Healthcheck!"});
    }
};

export default healthCheck