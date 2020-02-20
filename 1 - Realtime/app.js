/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var cards = [];

/**
 * firebase: objeto global
 * database(): metedo para acesso ao realtime database
 * ref(): url em string para referencia do caminho do banco 
 */
var ref = firebase.database().ref('card')

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor(Math.random() * (NOMES.length - 1))],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    }

    /*
     * set(): metodo que cria dados na url passada
     * child(): Acessa o nó filho passado por parâmetro
     */
    // ref.child(card.nome)
    //     .set(card)
    //     .push(card)
    //     .then(() => {
    //         adicionaCardATela(card)
    //     })

    /**
     * push(): cria um id unico e insere os dados dentro de uid
     */
    // ref.push(card).then(snapshot => {
    //     adicionaCardATela(card, snapshot.key)
    // })

    /**
     * Requisição AJAX utilizando Fetch
     */
    fetch('https://curso-firebase-webapps-6074c.firebaseio.com/card.json', {
        body: JSON.stringify(card),
        method: 'POST',
        mode: 'no-cors' // Modo não cors
    }).catch(err => console.log(err))
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id)

    // remove(): remove o nó em que o metodo é utilizado, remove também todos os nós desse nó removido.     
    ref.child(id).remove().then(() => card.remove())

    // set(null): Ao setar um nó em nulo exclui esse nó do firebase
    // ref.child(id).set(null).then(() => card.remove())
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id)
    var count = card.getElementsByClassName('count-number')[0]
    var countNumber = +count.innerText
    countNumber = countNumber + 1

    // set(): Pode ser acesssado diretamente o objeto que quer atualizar e passar o valor atualizado
    // ou pode-se passar o objeto completo e atualiza-lo com os novos valores nos campos correspondentes
    ref.child(id + '/curtidas').set(countNumber).then(() => {
        count.innerText = countNumber
    })
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
    var card = document.getElementById(id)
    var count = card.getElementsByClassName('count-number')[0]
    var countNumber = +count.innerText

    if (countNumber > 0) {
        countNumber = countNumber - 1

        // update(): Recebe um objeto (apenas um objeto) e atualiza APENAS as propriedades desse objeto
        ref.child(id + '/curtidas').update({ curtidas: countNumber }).then(() => {
            count.innerText = countNumber
        })
    }
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    // LOGGING DO STATUS DAS CHAMADAS DO FIREBASE
    // firebase.database.enableLogging(message => console.log(message))
    // ===================================

    /**
     * once(): retorna os dados lidos de uma URL
     * snapshot: objeto retornado pela leitura
     * val(): valores do objeto
     */
    // ref.once('value').then(snapshot => {
    // acessa um nó filho
    // console.log('child', snapshot.child('-M0TuAqA1UyqyZNet1pw').val())

    // checa se existe algo no snapshot
    // console.log('exists()', snapshot.exists())

    // e existe o filho passado na url
    // console.log('hasChild() nome', snapshot.hasChild('-M0TuAqA1UyqyZNet1pw/nome'))
    // console.log('hasChild() comentario', snapshot.hasChild('-M0TuAqA1UyqyZNet1pw/comentario'))

    // se existe algum filho no nó
    // console.log('hasChildren()', snapshot.child('-M0TuAqA1UyqyZNet1pw').hasChildren())

    // numero de filhos no snapshot
    // console.log('numChildren()', snapshot.numChildren())

    // a chave desse snapshot
    // console.log('chave', snapshot.key)

    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key)
    //     })
    // })
    // ===================================

    /**
     * ON
     */
    // ref.on('value', snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key)
    //     })
    // })

    // ref.on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key)
    // })

    // ref.on('child_changed', (snapshot, uid) => {
    //     console.log(snapshot.key, uid)
    // })

    // ref.on('child_removed', snapshot => {
    //     console.log('removed', snapshot.key)
    // })
    // ===================================

    /**
     * ORDENAÇÃO
     * 
     * orderByChild('filho'): Ordena pela propriedade filho passado como parâmetro
     * orderByKey(): Ordena pela chave dos nós    
     * orderByValue(): Ordena pelo valor de cada propriedade dentro do nó, 
     *  não vale para nós que tenham como filho outros nós     
     * !!! É possível utilizar apenas um método de ordenação por vez !!!
     */
    // ref.orderByChild('idade').on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key)
    // })
    // ===================================

    /**
     * FILTRO
     * 
     * startAt(any-value): Traz valores cujo valor passado na query comece no valor da propriedade selecionada (>=)
     * endAt(any-value): Traz valores cujo valor passado na query vá até o valor da propriedade selecionada (<=)
     * equalTo(any-value): Traz valores cujo valor passado na query bata exatamente com o valor da propriedade selecionada (=)
     */
    // ref.orderByChild('idade').equalTo(20)
    //     .on('child_added', snapshot => {
    //         adicionaCardATela(snapshot.val(), snapshot.key)
    //     })
    // ===================================


    /**
     * LIMITES
     * 
     * limitToFirst(Number): Retorna apenas os primeiros valores de acordo com o número passado por parâmetro
     * limitToLast(Number): Retorna apenas os últimos valores de acordo com o número passado por parâmetro
     */
    // ref.limitToLast(5)
    //     .on('child_added', snapshot => {
    //         adicionaCardATela(snapshot.val(), snapshot.key)
    //     })
    // ===================================

    /**
     * .off() || .off('value'): Remover observável da rota
     */
    // ref.on(
    //     'value',
    //     snapshot => {
    //         snapshot.forEach(value => {
    //             adicionaCardATela(value.val(), value.key)
    //         })

    //         ref.off('value')
    //     },
    //     // Tratamento de erros
    //     err => console.error('erro ao descurtir', err)
    // )

    /**
     * Requsição AJAX com Fetch
     * 
     * OBS: url da requisa com .json no final
     */
    fetch('https://curso-firebase-webapps-6074c.firebaseio.com/card.json')
        .then(res => res.json())
        .then(res => {
            for (const key in res) {
                if (res.hasOwnProperty(key)) {
                    adicionaCardATela(res[key], key)
                }
            }
        })
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}