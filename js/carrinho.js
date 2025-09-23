// Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
//     - atualizar o contador
//     - adicionar o produto no localStorage
//     - atualizar a tabela HTML do carrinho

const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho');

botoesAdicionarAoCarrinho.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
        const elementoProduto = evento.target.closest('.produto');
        const produtoId = elementoProduto.dataset.id;
        const produtoNome = elementoProduto.querySelector('.nome').textContent;
        const produtoImagem = elementoProduto.querySelector('img').getAttribute('src');
        const produtoPreco = parseFloat(
            elementoProduto
                .querySelector('.preco')
                .textContent.replace('R$ ', '')
                .replace('.', '')
                .replace(',', '.')
        );

        //buscar a lista de produtos do localStorage
        const carrinho = obterProdutosDoCarrinho();
        //testar se o produto já está no carrinho
        const existeProduto = carrinho.find((produto) => produto.id === produtoId);
        //se existe produto, incrementar a quantidade
        if (existeProduto) {
            existeProduto.quantidade += 1;
        } else {
            //se não existe, adicionar o produto com quantidade 1
            const produto = {
                id: produtoId,
                nome: produtoNome,
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1,
            };
            carrinho.push(produto);
        }
        salvarProdutosNoCarrinho(carrinho);
        atualizarContadorDoCarrinho();
        renderizarTabelaDoCarrinho();
    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem('carrinho');
    return produtos ? JSON.parse(produtos) : [];
}

//passo 4 - atualizar o contador do carrinho de compras
function atualizarContadorDoCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach((produto) => {
        total += produto.quantidade;
    });

    document.getElementById('contador-carrinho').textContent = total;
}

atualizarContadorDoCarrinho();

//passo 5 - renderizar a tabela do carrinho de compras
function renderizarTabelaDoCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector('#modal-1-content table tbody');
    corpoTabela.innerHTML = ''; // Limpar tabela antes de renderizar

    produtos.forEach((produto) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="td-produto">
                                        <img
                                            src="${produto.imagem}"
                                            alt="${produto.nome}"
                                        />
                                    </td>
                                    <td>${produto.nome}</td>
                                    <td class="td-preco-unitario">R$ ${produto.preco
                                        .toFixed(2)
                                        .replace('.', ',')}</td>
                                    <td class="td-quantidade">
                                        <input type="number" value="${
                                            produto.quantidade
                                        }" min="1" />
                                    </td>
                                    <td class="td-preco-total">R$ ${(
                                        produto.preco * produto.quantidade
                                    )
                                        .toFixed(2)
                                        .replace('.', ',')}</td>
                                    <td><button class="btn-remover" data-id="${
                                        produto.id
                                    }" id="deletar"></button></td>`;
        corpoTabela.appendChild(tr);
    });
}
renderizarTabelaDoCarrinho();
