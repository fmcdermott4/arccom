const { Access, AuditType, AuditToConduct, Facility, Profile } = require('../models')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        access: async (parent, {id}) =>{
            return await Access.findOne({_id:id});
        },
        accesses: async () =>{
            return await Access.find({});
        },        
        auditsToConduct: async () =>{
            return await AuditToConduct.find({}).populate("auditType");
        },
        auditTypes: async () =>{
            return await AuditType.find({});
        },
        facilities: async () => {
            return await Facility.find({});
        },
        facility: async (parent,{id}) => {
            return await Facility.findOne({_id:id});
        },
        profiles: async () => {
            return Profile.find({}).populate("access");
        },
        profile: async (parent, {id}) => {
            return Profile.findOne({ _id: id }).populate("access");
        },
    },
    Mutation: {       
        createAuditType: async(parent, {name})=>{
            return await AuditType.create({name});          
        },
        createAuditToConduct: async (parent, {name, auditType}) => {
            return await AuditToConduct.create({name, auditType})
        },
        createProfile: async (parent, { name, email, password }) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);      
            return { token, profile };          
        },
        createAccess: async (parent, {level}) =>{
            return await Access.create({level});
        },
        createFacility: async (parent, {name})=>{
            return await Facility.create({name});
        },
        deleteAccess: async (parent, {id}) =>{
            return await Access.findOneAndDelete({_id: id})
        },
        deleteAuditType: async (parent, {id}) =>{
            return await AuditType.findOneAndDelete({_id: id})
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