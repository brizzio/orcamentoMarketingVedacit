var mongoose = require('mongoose');

// Redacao Schema
var PagamentoSchema = mongoose.Schema({
	projeto:{
		type: String,
		requires:true
	},
	dataPagamento: {
		type: String,
		required: true
	},
	valorParcela: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Pagamento', PagamentoSchema);

module.exports.createPagamento = (newPagamento, callback)=> {
	newUser.save(callback);
}
