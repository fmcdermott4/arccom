const {Schema, model} = require('mongoose');

const conductedAuditSchema = new Schema({ 
    name:{
        type: String
    },
    conductedBy:{
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    auditType:{
        type: Schema.Types.ObjectId,
        ref: "AuditType"
    },
    dateConducted:{
        type: String,
        trim: true
    },
    questions:[
        {
            requirement: {
                type: String,
                trim: true
            },
            question: {
                type: String,
                trim:true
            },
            value: {
                type: String
            },
            correctAnswer: {
                type: String,
                trim:true       
            },
            answerGiven: {
                type: String,
                trim: true
            },
            answers: [
                {
                    type:String,
                    trim:true,
                }
            ],
            comment: {
                type: String,
                trim: true
            }            
        }
    ]
});

const ConductedAudit = model('ConductedAudit', conductedAuditSchema);

module.exports = ConductedAudit;