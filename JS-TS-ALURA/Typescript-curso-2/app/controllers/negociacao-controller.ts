import { DiaDaSemana } from '../enums/weekday-enum.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-views.js';
import { NegociacoesView } from '../views/negociacoes-views.js';


export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView ('#negociacoesView');
    private mensagensView = new MensagemView('#mensagemView');
    private readonly SABADO = 6;
    private readonly DOMINGO = 0;
    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = this.criaNegociacao();
        if(!this.diaUtil(negociacao.data)){
            this.mensagensView.update('Negociações são aceitas apenas em dias úteis!');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limparFormulario();
    }

    private diaUtil(data: Date) {
        return data.getDay() > DiaDaSemana.DOMINGO && data.getDay()< DiaDaSemana.SABADO;
    }

    private criaNegociacao(): Negociacao {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagensView.update('Negociação incluida com sucesso!');
    }
}