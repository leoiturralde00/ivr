const INICIADO = 1;
const FINALIZADO = 2;
const RECIBIENDO_INPUT=3;
const DEJAR_RECIBIR=5;
const EN_ESPERA = 4;
const keypressed = new Audio("sound/keypressed.mp3");
const msg = new SpeechSynthesisUtterance();msg.language
msg.lang = 'es-PA';
const hablar = (texto)=>{msg.text=texto;speechSynthesis.speak(msg);};


const AppModel = Backbone.Model.extend({
	defaults: ()=>{return {estado: EN_ESPERA,input: ""}},
	initialize: function(obj){
		_.defaults(obj,this.defaults);
	}
});

const AppView = Backbone.View.extend({
	
	el: '#container',
	
	events:{
		"click #btn-llama": "iniciarLlamada",
		"keypress #inpt-num": "recibirInput"
	},

	initialize: function() {
		this.model = new AppModel();
		this.listenTo(this.model, "change:estado", this.render);
		this.render();
	},
	
	template: _.template($("#tmpl-prin").html()),
	
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	
	iniciarLlamada: function(){
		this.model.initialize();
		hablar("Bienvenido al Sistema de Consulta. Me permite su numero de cédula? Toque Numeral para terminar");
		this.model.set("estado", RECIBIENDO_INPUT);
	},
	
	recibirInput: function(e){
		let c = String.fromCharCode(e.which);
		if($.isNumeric(c)){
			keypressed.play();
			this.model.set("input", this.model.get("input")+c);
			return true;
		}
		if(c==="#"){
			this.model.set("estado",DEJAR_RECIBIR);
			this._checkearData(this.model.get("input"));
		}
		return false;
	},
	
	_checkearData: function _checkdata(input){
		if(input==="8856305"){
			hablar("Su saldo es 50 balboas. Gracias Por Llamar");
		}
		else
		{
			hablar("La cédula no se encuentra en nuestros sistemas. Por Favor verifica la información provista. Gracias");
		}
		this.model.set("estado",EN_ESPERA);
	}
});