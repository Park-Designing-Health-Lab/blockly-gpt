function displayCompletion(data) {
    const response = document.getElementById('response');
    const response_label = document.getElementById('response-label');

    const md = new markdownit();
    const message = data.choices[0]?.message?.content || '';
    const html = md.render(message);
    response.innerHTML = html;
    response.classList.remove('hidden');
    response_label.classList.remove('hidden');
}

async function fetchCompletion() {
    const submitButton = document.getElementById('submit');
    const systemPrompt = document.getElementById('system-prompt');
    const userPrompt = document.getElementById('user-prompt');
    const modelSelect = document.getElementById('model-selection');

    submitButton.disabled = true;
    submitButton.innerHTML = 'Working...';
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`,
        'OpenAI-Organization': orgId.value
    });

    const messages = [
        { role: 'system', content: systemPrompt.value },
        { role: 'user', content: userPrompt.value }
    ];

    const body = JSON.stringify({
        model: modelSelect.value,
        messages: messages,
        temperature: 0.7
    });

    try {
        const response = await fetch(url, { method: 'POST', headers: headers, body: body });
        const data = await response.json();
        displayCompletion(data);
        console.log('Request:', body);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error fetching completion:', error);
    }
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit';
}
