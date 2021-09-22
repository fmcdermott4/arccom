const db = require('../config/connection');
const { Profile, ConductedAudit } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const conductedAuditSeeds = require('./conductedAuditSeeds.json');

db.once('open', async ()=>{
    try{
        // await Profile.deleteMany({});
        // await Profile.create(profileSeeds);
        await ConductedAudit.create(conductedAuditSeeds);


        console.log("Successfully seeded");
        process.exit(0);
    } catch(err){
        throw err
    }

});