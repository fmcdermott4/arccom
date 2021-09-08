const {Schema, model} = require('mongoose');

const auditToConductSchema = new Schema({ 
    name:{
        type: String,
        required: true
    },
    auditType:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AuditType",
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
                default: 1
            },
            correctAnswer: {
                type: String,
                required: true,
                trim:true,        
            },
            answers: [
                {
                    type:String,
                    trim:true,
                }
            ]            
        }
    ]
});

const AuditToConduct = model('AuditToConduct', auditToConductSchema);

module.exports = AuditToConduct;