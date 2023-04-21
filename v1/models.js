async function fetchModels() {
    const url = 'https://api.openai.com/v1/models';
    const headers = new Headers({
        'Authorization': `Bearer ${apiKey.value}`,
        'OpenAI-Organization': orgId.value
    });

    try {
        const response = await fetch(url, { headers: headers });
        const data = await response.json();
        populateModelSelect(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        deleteAuth();
    }
}

function populateModelSelect(data) {
    const modelSelect = document.getElementById('model-selection');

    const allowedModels = [
        'gpt-4', 'gpt-4-0314', 'gpt-4-32k', 'gpt-4-32k-0314', 'gpt-3.5-turbo', 'gpt-3.5-turbo-0301'
    ];

    let models = data.data.map(model => model.id).filter(model => allowedModels.includes(model)).sort();
    models = models.filter(model => model !== 'gpt-3.5-turbo');
    models.unshift('gpt-3.5-turbo');
    modelSelect.innerHTML = models.map(model => `<option>${model}</option>`).join('');
}