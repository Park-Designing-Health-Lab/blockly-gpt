const authModal = new bootstrap.Modal(document.getElementById('authModal'));
function loadAuth() {
    orgId.value = localStorage.getItem('orgId') || '';
    apiKey.value = localStorage.getItem('apiKey') || '';

    if (orgId.value && apiKey.value) {
        authMessage.textContent = 'Auth credentials saved';
        fetchModels();
    } else {
        authModal.show();
    }

}

function saveAuth() {
    localStorage.setItem('orgId', orgId.value);
    localStorage.setItem('apiKey', apiKey.value);
    authModal.hide();
    authMessage.textContent = 'Auth credentials saved';
    fetchModels();
}

function deleteAuth() {
    localStorage.removeItem('orgId');
    localStorage.removeItem('apiKey');
    orgId.value = '';
    apiKey.value = '';
    authMessage.textContent = '';
    authModal.show();
}
