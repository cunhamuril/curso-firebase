/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById("file-input");
var stringInput = document.getElementById("string-input");

/**
 * Referencia para o storage do firebase criando uma pasta com o nome de arquivos.
 */
var ref = firebase.storage().ref("arquivos").child("nome");

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  /**
   * .child(nome) - Acessar o caminho para inserir o arquivo.
   * ,put(arquivo) - Vai inserir o arquivo
   */
  ref
    .child("arquivo")
    .put(arquivo)
    .then((snapshot) => {
      console.log("snapshot", snapshot);

      /**
       * .getDownloadURL() - Retornar a url para download/apresentação desse arquivo enviado.
       */
      ref
        .child("arquivo")
        .getDownloadURL()
        .then((url) => console.log("string para download: ", url));
    });
};

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {};
