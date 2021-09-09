import { DiaDaSemana } from '../enums/weekday-enum.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-views.js';
import { NegociacoesView } from '../views/negociacoes-views.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagensView = new MensagemView('#mensagemView');
        this.SABADO = 6;
        this.DOMINGO = 0;
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        if (!this.diaUtil(negociacao.data)) {
            this.mensagensView.update('Negociações são aceitas apenas em dias úteis!');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limparFormulario();
    }
    diaUtil(data) {
        return data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO;
    }
    criaNegociacao() {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagensView.update('Negociação incluida com sucesso!');
    }
}
