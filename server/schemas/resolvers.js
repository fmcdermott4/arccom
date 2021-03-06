const { Access, AuditType, AuditToConduct, ConductedAudit, Facility, Profile } = require('../models')
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        access: async (parent, {id}) =>{
            return await Access.findOne({_id:id});
        },
        accesses: async () =>{
            return await Access.find({});
        },
        auditType: async (parent, {id}) =>{
            return await AuditType.find({_id: id});
        },
        auditTypes: async () =>{
            return await AuditType.find({});
        },
        auditToConduct: async (parent, {id}) =>{
            return await AuditToConduct.findOne({_id: id}).populate("auditType quesions");
        },
        auditsToConduct: async () =>{
            return await AuditToConduct.find({}).populate("auditType");
        },
        auditsToConductByAuditType: async (parent, {auditType})=>{
            return await AuditToConduct.find({auditType: auditType}).populate("auditType")
        },
        conductedAudit: async (parent, {id}) =>{
            return await ConductedAudit.findOne({_id: id}).populate("conductedBy auditType facility")
        },
        conductedAudits: async () =>{
            return await ConductedAudit.find().populate("conductedBy auditType facility")
        },  
        conductedAuditsFiltered: async(parent, {id, facility, auditType, name}) =>{
            const auditFilters = {};
            if( id !== undefined){
                auditFilters._id = id
            };
            if( facility !== undefined){
                auditFilters.facility = facility
            };
            if( auditType !== undefined){
                auditFilters.auditType = auditType
            };
            if( name !== undefined){
                auditFilters.name = name
            }
            return await ConductedAudit.find(auditFilters).populate("conductedBy auditType facility")
        },      
        facilities: async () => {
            return await Facility.find({});
        },
        facility: async (parent,{id}) => {
            return await Facility.findOne({_id:id});
        },
        profiles: async () => {
            return Profile.find({}).populate("access")
            // populate("access");
        },
        profile: async (parent, {id}) => {
            return Profile.findOne({ _id: id }).populate("access");
        },
    },
    Mutation: {       
        createAuditType: async(parent, {name})=>{
            return await AuditType.create({name});          
        },
        createAuditToConduct: async (parent, {name, auditType, questions}) => {
            return await AuditToConduct.create({name, auditType, questions})
        },              
        createAccess: async (parent, {level}) =>{
            return await Access.create({level});
        },
        createConductedAudit: async (parent, {name, conductedBy, facility, auditType, dateConducted, finding, discrepancy, questions})=>{
            return await ConductedAudit.create({name, conductedBy, facility, auditType, dateConducted, finding, discrepancy, questions})
        }, 
        createFacility: async (parent, {name})=>{
            return await Facility.create({name});
        },
        createProfile: async (parent, { name, email, password }) => {
            const access = await Access.findOne({level : "user"})
            const profile = await Profile.create({ name, email, password, access });
            const token = signToken(profile);      
            return { token, profile };          
        },
        deleteAccess: async (parent, {id}) =>{
            return await Access.findOneAndDelete({_id: id})
        },
        deleteAuditToConduct: async (parent,{id})=>{
            return await AuditToConduct.findOneAndDelete({_id: id})
        },
        deleteAuditType: async (parent, {id}) =>{
            return await AuditType.findOneAndDelete({_id: id})
        },
        deleteConductedAudit: async (parent, {id})=>{
            return await ConductedAudit.findOneAndDelete({_id: id})
        },
        deleteFacility: async (parent, {id}) =>{
            return await Facility.findOneAndDelete({_id: id})
        },
        deleteProfile: async (parent, {id})=>{
            return await Profile.findOneAndDelete({_id: id})
        },
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email }); 
            if (!profile) {
                throw new AuthenticationError('No profile with this email found!');
            }      
            const correctPw = await profile.isCorrectPassword(password);      
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }      
            const token = signToken(profile);
            return { token, profile };
        },
        updateAccess: async (parent, {id, level})=>{
            return await Access.findOneAndUpdate({_id: id}, {level: level})
        },
        updateAuditType: async (parent, {id, name})=>{
            return await AuditType.findOneAndUpdate({_id: id},{name: name});
        },
        updateAuditToConduct: async(parent, {id, name, auditType, questions}) =>{
            const changeData = {};
            if(name !== undefined){
                changeData.name = name
            }
            if(auditType !== undefined){
                changeData.auditType = auditType
            } 
            if(questions !== undefined){
                changeData.questions = questions;
            }

            return await AuditToConduct.findOneAndUpdate({_id: id}, changeData)
        },
        updateConductedAudit: async (parent, {id, name, conductedBy, auditType, dateConducted, questions})=>{
            const changeData = {};
            if(name !== undefined){
                changeData.name = name
            }
            if(conductedBy !== undefined){
                changeData.conductedBy= conductedBy
            }
            if(auditType !== undefined){
                changeData.auditType = auditType
            }
            if(dateConducted !== undefined){
                changeData.dateConducted = dateConducted
            }
            if(questions !== undefined){
                changeData.questions = questions
            }            
            return await ConductedAudit.findOneAndUpdate({_id: id}, changeData)
        }, 
        updateFacility: async (parent, {id, name})=>{
            return await Facility.findOneAndUpdate({_id: id}, {name: name})
        },
        updateProfile: async(parent, {id, name, email, password, access, active})=>{
            const changeData = {};
            if(name !== undefined){
                changeData.name = name
            }
            if(email !== undefined){
                changeData.email = email
            }
            if(password !== undefined){
                changeData.password = password
            }
            if(access !== undefined){
                changeData.access = access
            }
            if(active !== undefined){
                changeData.active = active
            }

            return await Profile.findOneAndUpdate({_id: id}, changeData)
        }
        
    }
};

module.exports = resolvers;