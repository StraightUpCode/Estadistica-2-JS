//Math.max rewrite
let Probabilidad = new Map();
const getMax = arr => Math.max(...arr); //Toma un arreglo, retorna valor maxima
const getMin = arr => Math.min(...arr); //Toma un arreglo, retorna valor minimo
const forceMap = arr => new Map(arr);
const sumArr = arr => arr.reduce((acc, current) => (acc += current), 0); //Recibe un grupo de Numeros, retorna la suma
const mediaMuestral = () => {};
const distMuestralMedia = arrMediaMuestral =>
  arrMediaMuestral.reduce(
    (acc, current) => (acc += current * Probabilidad.getKey(current))
  );
const desviacionEstandar = (datos, mediaPoblacional) => {
  let sum = datos.reduce(
    (acc, current) => (acc += Math.pow(current - mediaPoblacional, 2)),
    0
  );
  console.log(sum);
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
  let sum = sumArr(arr);
  console.log(sum);
  let result = sum / arr.length;
  return result;
};

// Datos numericos del Problema
const Data = [7, 7, 8, 8, 7, 8, 9];
const tamañoPoblacion = Data.length;
const tamañoMuestra = 2;
let mediaP = mediaPoblacional(Data);
let desvStandar = desviacionEstandar(Data, mediaP);
let desvStandarMuestral = desviacionEstandarMuestral(
  tamañoMuestra,
  tamañoPoblacion,
  desvStandar
);

console.log(`Media Poblacional = ${mediaP}
Desviacion Estandar = ${desvStandar}
Desviacion Estandar Muestral = ${desvStandarMuestral}`);
