var AppView = Backbone.View.extend({

	el: '#container',
	
	events:{
		"click #btn-llama": "iniciarLlamada"
	},

	initialize: function() {
		this.render();
	},
	
	template: _.template($("#tmpl-prin").html()),
	
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	
	iniciarLlamada: function(){
		var msg = new SpeechSynthesisUtterance();
		msg.lang = 'es-PA';
		msg.text = "Bienvenido al Sistema de Consulta. Me permite su numero de cédula?";
		speechSynthesis.speak(msg);
	}
});