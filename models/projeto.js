var mongoose = require('mongoose');

// Redacao Schema
var ProjetoSchema = mongoose.Schema({
	titulo: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	valorContrato: {
		type: String,
		required: true
	},
	competencia: {
		type: String,
		required: true
	},
	parcelas: {
		type: String,
		required: true
	},
	centroCusto: {
		type: String,
		required: true
	}
});

var Projeto = module.exports = mongoose.model('Projeto', ProjetoSchema);

module.exports.createProjeto = (newProjeto, callback)=> {
	newUser.save(callback);
}
