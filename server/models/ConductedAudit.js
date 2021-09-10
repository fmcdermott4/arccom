const {Schema, model} = require('mongoose');

const conductedAuditSchema = new Schema({ 
    name:{
        type: String,
        required: true
    },
    conductedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    auditType:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AuditType",
    },
    dateConducted:{
        type: String,
        required: true,
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
                required: true,
                trim:true,
            },
            value: {
                type: Number,
                required: true,
                default: 0
            },
            correctAnswer: {
                type: String,
                required: true,
                trim:true,        
            },
            answerGiven: {
                type: String,
                required: true,
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