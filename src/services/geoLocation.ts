class GeoLocation {
  static getLocation() {
    return new Promise((accept, reject) => {
      const instance = navigator.geolocation;
      if (!instance)
        reject(
          new Error("Ops... Seu dispositivo não da suporte a essa função")
        );
      instance.getCurrentPosition(
        (position) => {
          accept({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            last_timestamp: position.timestamp,
          });
        },
        (err) => {
          let message = "Erro ao buscar sua localização";

          switch (err.code) {
            case 0:
              message =
                "Ops... Não conseguimos encontrar seua posição. Entre em contato com a administração do sistema para reporta-lá";
              break;
            case 1:
              message =
                "Ops... Você não deu permição para ler sua posição. Veja suas configurações no seu navegador deste site";
              break;
            case 2:
              message =
                "Ops... Parece que o seu dispositivo ta dando conflitos de leitura de posição";
              break;
            case 3:
              message =
                "Ops... Seu dispositivo demorou muito para entregar a sua posição. Tente reiniciar o dispositivo e tente novamente";
              break;

            default:
              break;
          }

          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  }
}

export default GeoLocation;
