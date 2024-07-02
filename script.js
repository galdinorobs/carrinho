document.querySelector('.add').addEventListener('click', addToCart);
document.querySelector('.clear').addEventListener('click', clearCart);

function addToCart() {

    const productSelect = document.querySelector('.product');
    const quantityInput = document.querySelector('#quantity');
    const itemsList = document.querySelector('.items-list');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.textContent = '';

    const productValue = productSelect.value;

    if (productValue === "0") {
        errorMessage.textContent = "Por favor, selecione um produto.";
        return;
    }

    // divide o value para obter o nome e o preço
    const [productName, productPrice] = productValue.split(',');

    // parseint = converte a string em numero valido
    //isnan = se o valor é nan (not a number)
    const quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        errorMessage.textContent = "Por favor, insira uma quantidade válida.";
        return;
    }

    // transforma os li's em um array e usa o find para verificar se o produto já está no carrinho
    const existingItem = Array.from(itemsList.children).find(item => item.dataset.productName === productName);

    // Atualiza a quantidade se o produto já estiver no carrinho, caso contrário adiciona um novo item
    if (existingItem) {
        const newQuantity = parseInt(existingItem.dataset.quantity) + quantity;
        existingItem.dataset.quantity = newQuantity;
        // retirando a multiplicação * newquantity ele não soma os itens ao imprimir o nome na tela
        existingItem.textContent = `${newQuantity}x ${productName} - R$${(parseFloat(productPrice) * newQuantity).toFixed(2)}`;
    } else {
        const listItem = document.createElement('li');
        listItem.dataset.productName = productName;
        listItem.dataset.quantity = quantity;
        listItem.dataset.productPrice = productPrice; // Armazena o preço original
        listItem.textContent = `${quantity}x ${productName} - R$${(parseFloat(productPrice) * quantity).toFixed(2)}`;
        itemsList.appendChild(listItem);
    }

    updateTotal();
}


function clearCart() {

    document.querySelector('.items-list').innerHTML = '';
    document.querySelector('.product').value = "0";
    document.querySelector('#quantity').value = 1;
    document.querySelector('.error-message').textContent = '';

    updateTotal();
}

function updateTotal() {
    const itemsList = document.querySelector('.items-list');
    const totalSpan = document.querySelector('.total');
    //armazena o valor total do carrinho
    let total = 0;

    // parseint e parsefloat convertem a string
    for (let item of itemsList.children) {
        const quantity = parseInt(item.dataset.quantity);
        const productPrice = parseFloat(item.dataset.productPrice);
        //multiplica a quantidade pelo valor unitario do produto
        total += productPrice * quantity;
    }

    // tofixed(2) = converte a string para valor com 2 decimais p/ ficar no formato de moeda
    totalSpan.textContent = `R$${total.toFixed(2)}`;
}
