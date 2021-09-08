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
        token: ID!
        profile: Profile
    }
    type ConductedAudit {
        name: String
        conductedBy: Profile
        auditType: AuditType
        dateConducted: String
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
        value: Int
        correctAnswer: String
        answerGiven: String
        answers:[String]        
    }
    type Query {
        accesses: [Access]
        auditTypes: [AuditType]
        auditsToConduct: [AuditToConduct]
        facilities:[Facility]
        facility(id: ID):Facility
        me: Profile
        profile(id: ID): Profile
        profiles: [Profile]    
    }
    type Mutation {        
        createAuditType(name:String): AuditType
        createAuditToConduct(name:String!, auditType:ID!): AuditToConduct
        createAccess(level:String): Access
        createFacility(name:String): Facility
        createProfile(name: String!, email: String!, password: String!): Auth
        deleteAuditType(id:ID):AuditType
        login(email: String!, password: String!): Auth
        updateAuditType(id:ID, name:String):[AuditType]
    }
`;
module.exports = typeDefs;