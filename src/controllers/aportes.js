
function pegaValorFuturoERendimentoTotal(aporteInicial, aportesMensais, taxaAoAno, prazoMeses) {
  const taxaConvertidaAoMes = converteTaxaAnualParaMensal(taxaAoAno, prazoMeses);
  const vFAM = valorFuturoDosAportesMensais(aportesMensais, taxaConvertidaAoMes, prazoMeses);
  const vFAI = valorFuturoDoAporteInicial(aporteInicial, taxaConvertidaAoMes, prazoMeses);
  const totalValorFuturo = vFAI + vFAM;
  const rendimentoTotal = (vFAI - aporteInicial) + (vFAM - aportesMensais * prazoMeses);
  return { valorFuturoDosAportesMensais: vFAM, valorFuturoDoAporteInicial: vFAI, totalValorFuturo, rendimentoTotal };
}

function valorFuturoDosAportesMensais(aportesMensais, taxaAoMes, prazoAoMes) {
  return aportesMensais * (1 + taxaAoMes / 100) * (((1 + taxaAoMes / 100) ** prazoAoMes - 1) / (taxaAoMes / 100));
}

function valorFuturoDoAporteInicial(aporteInicial, taxaAoMes, prazoAoMes) {
  return aporteInicial * (1 + taxaAoMes / 100) ** prazoAoMes;
}

function converteTaxaAnualParaMensal(taxaAnual) {
  return ((1 + (taxaAnual / 100)) ** (1 / 12) - 1) * 100
}

function calculaIRRendaFixa(rendimento, prazo) {
  const prazoConvertidoAoDia = prazo * 360;

  if (prazoConvertidoAoDia <= 180)
      return rendimento * 0.225;
  if (prazoConvertidoAoDia > 180 && prazoConvertidoAoDia <= 360)
      return rendimento * 0.20;
  if (prazoConvertidoAoDia > 360 && prazoConvertidoAoDia <= 720)
      return rendimento * 0.175;
  if (prazoConvertidoAoDia > 720)
      return rendimento * 0.15;

}

function calculaIRPrevidênciaPrivada(rendimento, prazo) {

  if (prazo < 2)
      return rendimento * 0.35;
  if (prazo >= 2 && prazo < 4)
      return rendimento * 0.3;
  if (prazo >= 4 && prazo < 6)
      return rendimento * 0.25;
  if (prazo >= 6 && prazo < 8)
      return rendimento * 0.2;
  if (prazo >= 8 && prazo < 10)
      return rendimento * 0.15;
  if (prazo >= 10)
      return rendimento * 0.1;
}

const simulacaoValorFuturo = {
  pegaValorFuturoERendimentoTotal,
  calculaIRPrevidênciaPrivada, 
  valorFuturoDosAportesMensais, 
  valorFuturoDoAporteInicial, 
  converteTaxaAnualParaMensal,
  calculaIRRendaFixa
 };

export default simulacaoValorFuturo;
