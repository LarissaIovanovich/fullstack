const dados = fetch('https://mhw-db.com/monsters')
.then(response => response.json())
.then(monsters => {
    console.log(monsters)
});