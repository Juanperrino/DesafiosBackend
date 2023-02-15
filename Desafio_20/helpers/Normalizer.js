import { schema, normalize, denormalize } from 'normalizr';
export const Normalizador = async (data) => {
      let pruebaData = {
            id: 'mensaje',
            mensaje: [],
      };

      data.map((item) => {
            pruebaData.mensaje.push({
                  id: item.id.toString(),
                  text: item.text,
                  date: item.date,
                  author: {
                        email: item.author.email,
                        nombre: item.author.nombre,
                        apellido: item.author.apellido,
                        edad: item.author.edad,
                        alias: item.author.alias,
                        avatar: item.author.avatar,
                  },
            });
      });

      const autorScheme = new schema.Entity(
            'author',
            {},
            { idAttribute: 'email' }
      );

      const textS = new schema.Entity('text');
      const mensajeScheme = new schema.Entity('mensaje', {
            author: autorScheme,
      });
      const mensajeTotla = new schema.Entity('mensaje', {
            mensaje: [mensajeScheme],
      });
      const dataNormalized = normalize(pruebaData, mensajeTotla);

      return dataNormalized;
};
