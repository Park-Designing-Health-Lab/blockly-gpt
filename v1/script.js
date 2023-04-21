document.addEventListener('DOMContentLoaded', function () {
    const saveAuthButton = document.getElementById('saveAuth');
    const deleteAuthButton = document.getElementById('deleteAuth');
    const systemPrompt = document.getElementById('system-prompt');
    const userPrompt = document.getElementById('user-prompt');
    const response = document.getElementById('response');
    const submitButton = document.getElementById('submit');

    systemPrompt.value = 'Act as an excellent developer.';
    userPrompt.value = 'Write a Python code that sums up from 1 to n, and print it.';

    saveAuthButton.addEventListener('click', saveAuth);
    deleteAuthButton.addEventListener('click', deleteAuth);
    submitButton.addEventListener('click', fetchCompletion);
    
    const rightPane = document.getElementById('right-pane');

    loadAuth();
});


