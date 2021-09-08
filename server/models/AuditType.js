const {Schema, model} = require('mongoose');

const auditTypeSchema = new Schema({ 
    name:{
        type: String,
        required: true,
        trim: true
    }
});

const AuditType = model('AuditType', auditTypeSchema);

module.exports = AuditType;