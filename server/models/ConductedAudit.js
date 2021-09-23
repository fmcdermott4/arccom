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
    facility:{
        type:Schema.Types.ObjectId,
        ref: "Facility"
    },
    questions:[
        {
            requirement: {
                type: String,
                trim: true,
                default:"No documented requirement"
            },
            question: {
                type: String,
                trim:true,
                required:true,
                default: "No question"
            },
            value: {
                type: String,
                required: true,
                default: "1"
            },
            correctAnswer: {
                type: String,
                trim:true,
                required:true,
                default: "Yes"       
            },
            answerGiven: {
                type: String,
                trim: true,
                required: true,
                default: "No"
            },
            answers: [
                {
                    type:String,
                    trim:true,
                    required:true,
                    default:["Yes", "No", "n/a"]
                }
            ],
            comment: {
                type: String,
                trim: true,
                default:"No comments"
            }            
        }
    ]
});

const ConductedAudit = model('ConductedAudit', conductedAuditSchema);

module.exports = ConductedAudit;