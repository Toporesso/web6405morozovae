document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    if (name && email && age) {
        displayTables(name, email, age);
        fetchDataForTable3();
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
});

function displayTables(name, email, age) {
    const tablesContainer = document.getElementById('tablesContainer');
    tablesContainer.style.display = 'block';

    const table1 = `
        <h3>Таблица 1: Ваши данные</h3>
        <table>
            <tr><th>Имя</th><td>${name}</td></tr>
            <tr><th>Email</th><td>${email}</td></tr>
            <tr><th>Возраст</th><td>${age}</td></tr>
        </table>
    `;

    const table2 = `
        <h3>Таблица 2: Конфигурации</h3>
        <table>
            <tr><th>Name</th><td>Продукт A</td></tr>
            <tr><th>GPU</th><td>3050</td></tr>
            <tr><th>CPU</th><td>Ryzen 7 2700</td></tr>
        </table>
    `;

    document.getElementById('table1').innerHTML = table1;
    document.getElementById('table2').innerHTML = table2;
}

async function fetchDataForTable3() {
    try {
        const response = await fetch('http://127.0.0.1:8000/home');
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        const data = responseData.data;

        let rows = '';
        data.forEach(item => {
            rows += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.gpu}</td>
                    <td>${item.cpu}</td>
                </tr>
            `;
        });

        const table3 = `
            <h3>Таблица 3: Данные с сервера</h3>
            <table>
                <tr><th>Name</th><th>GPU</th><th>CPU</th>
                ${rows}
            </table>
        `;

        document.getElementById('table3').innerHTML = table3;

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        document.getElementById('table3').innerHTML = `
            <h3>Таблица 3: Ошибка при загрузке данных</h3>
            <p>${error.message}</p>
        `;
    }
}
