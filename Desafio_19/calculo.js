process.on('message', function (message) {
      console.log(`Message from app.js: ${message}`);
});
let count = parseInt(process.argv[2]);

function calculo(cantidad) {
      const numeros = [];
      for (let i = 1; i <= 1000; i++) {
            let numerito = { indice: i, valor: 0 };
            numeros.push(numerito);
      }
      const generador = (inicio, fin) =>
            Math.floor(Math.random() * (fin - inicio + 1) + inicio);

      for (let i = 0; i <= cantidad; i++) {
            const num = generador(1, 1000);

            numeros.map((numero) => {
                  if (numero.indice === num) {
                        numero.valor = numero.valor + 1;
                  }
            });
      }

      return numeros;
}

process.send(calculo(count));
