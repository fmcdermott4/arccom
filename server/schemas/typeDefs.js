const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Access {
        _id: ID
        level: String
    }
    type AuditToConduct {
        _id: ID
        name: String
        auditType: AuditType
        questions: [Question]
    }
    type AuditType {
        _id:ID
        name: String
    }
    type Auth {
        token: String
        profile: Profile
    }
    type ConductedAudit {
        _id: ID
        name: String
        facility: Facility
        conductedBy: Profile
        auditType: AuditType
        dateConducted: String
        finding: String
        discrepancy: String
        questions: [Question]
    }    
    type Facility {
        _id: ID
        name: String
    }
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
        access: Access
        active: Boolean
    }
    type Question {
        _id:ID
        requirement: String
        question: String
        value: String
        correctAnswer: String
        answerGiven: String
        answers:[String]
        comment: String
    }
    type Query {
        access(id:ID):Access
        accesses: [Access]
        auditType(id:ID):AuditType
        auditTypes: [AuditType]
        auditToConduct(id:ID):AuditToConduct
        auditsToConduct: [AuditToConduct]
        auditsToConductByAuditType(auditType:ID):[AuditToConduct]
        conductedAudit(id:ID):ConductedAudit
        conductedAudits: [ConductedAudit]
        conductedAuditsFiltered(id:ID, facility:ID, auditType:ID, name:String):[ConductedAudit]
        facilities:[Facility]
        facility(id: ID):Facility
        me: Profile
        profile(id: ID): Profile
        profiles: [Profile]    
    }
    type Mutation {
        createAccess(level:String): Access        
        createAuditType(name:String): AuditType
        createAuditToConduct(name:String!, auditType:ID!, questions:[AnsweredQuestion]): AuditToConduct
        createConductedAudit(name:String, facility:ID, conductedBy:ID, auditType:ID, dateConducted:String, finding:String, discrepancy:String, questions:[AnsweredQuestion]):ConductedAudit
        createFacility(name:String): Facility
        createProfile(name: String!, email: String!, password: String!): Auth
        deleteAccess(id:ID):Access
        deleteAuditType(id:ID):AuditType
        deleteAuditToConduct(id:ID):AuditToConduct
        deleteConductedAudit(id:ID):ConductedAudit
        deleteFacility(id:ID):Facility
        deleteProfile(id:ID):Profile        
        login(email: String!, password: String!): Auth
        updateAccess(id:ID, level:String):Access
        updateAuditToConduct(id:ID, name:String, auditType:ID, questions:[AnsweredQuestion]): AuditToConduct
        updateAuditType(id:ID, name:String):[AuditType]
        updateConductedAudit(id:ID, name:String, conductedBy:ID, auditType:ID, dateConducted:String, questions:[AnsweredQuestion]):ConductedAudit
        updateFacility(id:ID, name:String):Facility
        updateProfile(id:ID, name:String, email:String, password:String, access:ID, active:Boolean):Profile
    }
    input AnsweredQuestion {
        _id:ID
        requirement: String
        question: String
        value: String
        correctAnswer: String
        answerGiven: String
        answers:[String] 
        comment:String   
    }
`;
module.exports = typeDefs;