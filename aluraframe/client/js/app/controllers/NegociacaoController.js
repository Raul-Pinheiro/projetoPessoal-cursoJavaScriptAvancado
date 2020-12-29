class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor'); 

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona','esvazia'],
            model=>{
                this._negociacaoView.update(model)
            }
        );



        this._negociacaoView = new NegociacaoView($('#negociacaoView'));
        this._mensagem=ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            (model)=> this._mensagemView.update(model)
        );
        this._mensagemView= new MensagemView($('#mensagemView'));


       
        this._negociacaoView.update(this._listaNegociacoes);



        Object.freeze(this);

    }
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );     
      
    }
    _limpaFormulario(){
        this._inputData.value='';
        this._inputQuantidade.value=1;
        this._inputValor.value=0;
        this._inputData.focus();
        
    }
    adicionaNegociacao(event) {

        event.preventDefault();  
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto='Negociação realizada com sucesso!';     
        //this._mensagemView.update(this._mensagem);        
        this._limpaFormulario();        
        console.log(this._listaNegociacoes.negociacao);
    }

    apagaNegociacao(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto='Lista de Negociações Apagada com Sucesso';
        //this._mensagemView.update(this._mensagem);
    }
  

}