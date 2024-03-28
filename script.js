async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function displayList(category, searchText = '') {
    const container = document.getElementById(`${category}-list`);
    const list = container.querySelector('ul');
    list.innerHTML = '';

    const data = await fetchData(`https://mhw-db.com/${category}`);
    if (!data) return;

    const searchChars = searchText.toLowerCase().split(''); // Divide o texto de busca em caracteres

    data.forEach(item => {
        const itemNameChars = item.name.toLowerCase().split(''); // Divide o nome do item em caracteres

        let matches = true;
        for (let i = 0; i < searchChars.length; i++) {
            if (itemNameChars[i] !== searchChars[i]) { // Compara caractere por caractere
                matches = false;
                break;
            }
        }

        if (matches) { // Se todos os caracteres coincidem, adiciona o item à lista
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Tipo:</strong> ${item.type}</p>
            `;
            list.appendChild(li);
        }
    });

    document.querySelectorAll('.list-container').forEach(el => {
        el.classList.remove('active');
    });
    container.classList.add('active');
}

async function search(category) {
    const searchText = document.getElementById(`${category}-search`).value;
    const errorMessageContainer = document.getElementById(`${category}-error-message`);

    await displayList(category, searchText);

    const container = document.getElementById(`${category}-list`);
    const list = container.querySelector('ul');
    const items = list.querySelectorAll('li');

    if (items.length === 0) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Nenhum resultado encontrado.';
        list.appendChild(errorMessage);
    }

    errorMessageContainer.textContent = '';
    
    if (searchText.trim() === '' || searchText.length < 1) {
        errorMessageContainer.textContent = 'Por favor, insira pelo menos 1 caracter para pesquisar.';
        return;
    }
}