const db = require('../config/connection');
const { Profile, ConductedAudit, AuditToConduct } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const conductedAuditSeeds = require('./conductedAuditSeeds.json');
const oshaAuditSeeds = require('./oshaAuditSeeds.json');
const isoSeeds = require('./iso9001.json');
const productionQuestions = require('./productionQuestions.json');

db.once('open', async ()=>{
    try{
        // await Profile.deleteMany({});
        // await Profile.create(profileSeeds);
        // await ConductedAudit.create(conductedAuditSeeds);
        // await AuditToConduct.create(oshaAuditSeeds);
        // await AuditToConduct.create(isoSeeds);
        await AuditToConduct.create(productionQuestions);


        console.log("Successfully seeded");
        process.exit(0);
    } catch(err){
        throw err
    }

});