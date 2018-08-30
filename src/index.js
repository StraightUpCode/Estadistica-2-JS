//Math.max rewrite
const getMax = arr => Math.max(...arr); //Toma un arreglo, retorna valor maxima
const getMin = arr => Math.min(...arr); //Toma un arreglo, retorna valor minimo
const makeMapfromArr = arr => new Map(arr);
const sumArr = arr => arr.reduce((acc, current) => (acc += current), 0); //Recibe un grupo de Numeros, retorna la suma
const countElement = (arr, el) => arr.filter(cur => cur === el).length;
const getUnique = arr =>
  arr.filter((cur, index, array) => array.indexOf(cur) === index);
const calcularProbabilidades = (valoresUnicos, arr) => {
  return makeMapfromArr(
    valoresUnicos.map(current => [current, countElement(arr, current)])
  );
};
const combination = (arr, k) => {
  if (k === arr.lenght) {
    return arr;
  }
  if (k > arr.length || arr.length === 0) {
    return [];
  }
  if (k === 1) {
    return arr.map(el => [el]);
  }
  let comb = [];
  for (let i = 0; i < arr.length; i++) {
    let head = arr.slice(i, i + 1);
    let tailcomb = combination(arr.slice(i + 1), k - 1);
    for (let j = 0; j < tailcomb.length; j++) {
      comb.push(head.concat(tailcomb[j]));
    }
  }
  return comb;
};
const mediaCombinaciones = arrCombinaciones => {
  return arrCombinaciones.map(combinacion => mediaPoblacional(combinacion));
};
const distMuestralMedia = (arrMediaMuestral, frecuencia, numeroElemento) =>
  arrMediaMuestral.reduce(
    (acc, current) =>
      (acc += (current * frecuencia.get(current)) / numeroElemento),
    0
  );
const desviacionEstandar = (datos, mediaPoblacional) => {
  let sum = datos.reduce(
    (acc, current) => (acc += Math.pow(current - mediaPoblacional, 2)),
    0
  );
  return Math.sqrt((1 / datos.length) * sum);
};

const desviacionEstandarMuestral = (
  tamañoMuestra,
  tamañoPoblacion,
  devStandar
) => {
  let desv = devStandar / Math.sqrt(tamañoMuestra);
  return tamañoMuestra / tamañoPoblacion <= 0.05
    ? desv
    : desv *
        Math.sqrt((tamañoPoblacion - tamañoMuestra) / (tamañoPoblacion - 1));
};
const desviacionEstandarMuestralProporcional = (
  sizeMuestra,
  sizePoblacion,
  Proporcion
) => {
  let desv = Math.sqrt((Proporcion * (1 - Proporcion)) / sizeMuestra);
  return sizeMuestra / sizePoblacion <= 0.05
    ? desv
    : desv * Math.sqrt((sizePoblacion - sizeMuestra) / (sizePoblacion - 1));
};
const mediaPoblacional = arr => {
  return sumArr(arr) / arr.length;
};

// Datos numericos del Problema
const Data = [7, 7, 8, 8, 7, 8, 9];
const tamañoPoblacion = Data.length;
const tamañoMuestra = 2;
let combinaciones = combination(Data, 2);
let mediaComb = mediaCombinaciones(combinaciones);
let mediaP = mediaPoblacional(Data);
let desvStandar = desviacionEstandar(Data, mediaP);
let desvStandarMuestral = desviacionEstandarMuestral(
  tamañoMuestra,
  tamañoPoblacion,
  desvStandar
);
let elementoUnicos = getUnique(mediaComb);
let probabilidad = calcularProbabilidades(elementoUnicos, mediaComb);
let distrMuestralMedia = distMuestralMedia(
  elementoUnicos,
  probabilidad,
  mediaComb.length
);
const mapProbalidades = prob => {
  let arr = [];
  prob.forEach((val, key) => arr.push(`${key} = ${val} \n`));
  return arr;
};
console.log(`Media Poblacional = ${mediaP}
Probabilidades :
${mapProbalidades(probabilidad)}
Media Muestral = ${mediaComb}
Distribucion Muestral de la Media ${distrMuestralMedia}
Desviacion Estandar = ${desvStandar}
Desviacion Estandar Muestral = ${desvStandarMuestral}`);
