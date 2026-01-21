document.getElementById('likertForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const urlAppScript = "https://script.google.com/macros/s/AKfycbxnm7VGIXuoobxqrYc9Bn7kh4w6L2KNdMmoNQVO90urA-6-8VQt8QWe31z0FUHj3pzvbA/exec";
    const btn = e.target.querySelector('button');
    const formData = new FormData(this);
    const payload = {};

    // 1. Feedback visual de carregamento
    btn.disabled = true;
    btn.innerText = "Obtendo IP...";

    // 2. Captura apenas o IP do usuário
    let userIp = "IP não capturado";
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIp = data.ip;
    } catch (error) {
        console.error("Erro ao capturar IP:", error);
    }

    // 3. Mapeia as respostas do formulário para o payload
    formData.forEach((value, key) => {
        payload[key] = value;
    });

    // 4. Adiciona o IP capturado ao payload
    payload['userIp'] = userIp;

    btn.innerText = "Enviando dados...";

    // 5. Envio para o Google Apps Script
    fetch(urlAppScript, {
        method: "POST",
        body: JSON.stringify(payload),
        mode: "no-cors", 
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        }
    })
    .then(() => {
        alert("Sucesso! Respostas enviadas com o IP: " + userIp);
        this.reset();
        btn.disabled = false;
        btn.innerText = "Finalizar Teste";
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro ao enviar dados.");
        btn.disabled = false;
        btn.innerText = "Tentar Novamente";
    });
});