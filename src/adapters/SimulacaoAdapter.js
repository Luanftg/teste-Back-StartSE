import simulacaoValorFuturo from "../controllers/aportes.js";

export class SimulacaoAdapter {

    static getSimulacao(aporteInicial, aporteMensal, taxaAA, prazoMeses) {
        const resultAporteInicial = [];
        const resultAporteMensal = [];
        const resultSimulacao = [];
        const resultRendimento = [];
        const resultIRFixa = [];
        const taxaAM = simulacaoValorFuturo.converteTaxaAnualParaMensal(taxaAA,12);

        for (let i = 0;i<=prazoMeses;i++) {
            let resultInicio = simulacaoValorFuturo.valorFuturoDoAporteInicial(aporteInicial,taxaAM,i);
            let resultMes = simulacaoValorFuturo.valorFuturoDosAportesMensais(aporteMensal,taxaAM,i);
            let totalValorFuturo = simulacaoValorFuturo.pegaValorFuturoERendimentoTotal(aporteInicial,aporteMensal,taxaAA,i);
            let rendimentoMes = totalValorFuturo.rendimentoTotal;
            let impostoRFixa = simulacaoValorFuturo.calculaIRRendaFixa(rendimentoMes,i);
            resultAporteInicial.push(resultInicio);
            resultAporteMensal.push(resultMes);
            resultSimulacao.push(totalValorFuturo.totalValorFuturo);
            resultRendimento.push(rendimentoMes);
            resultIRFixa.push(impostoRFixa);
        };

        return {resultIRFixa,resultRendimento,resultSimulacao,resultAporteInicial,resultAporteMensal}
    }


}