document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');
    const orgId = document.getElementById('orgId');
    const apiKey = document.getElementById('apiKey');

    button.addEventListener('click', async function () {
        const url = 'https://api.openai.com/v1/models';
        const headers = new Headers({
            'Authorization': `Bearer ${apiKey.value}`,
            'OpenAI-Organization': orgId.value
        });

        try {
            const response = await fetch(url, { headers: headers });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
});
