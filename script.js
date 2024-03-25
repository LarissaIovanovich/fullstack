async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function displayList(category) {
    const container = document.getElementById(`${category}-list`);
    const list = container.querySelector('ul');
    list.innerHTML = '';

    const data = await fetchData(`https://mhw-db.com/${category}`);
    if (!data) return;

    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Tipo:</strong> ${item.type}</p>
        `;
        list.appendChild(li);
    });

    document.querySelectorAll('.list-container').forEach(el => {
        el.classList.remove('active');
    });
    container.classList.add('active');
}
