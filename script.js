document.getElementById('cep-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
  
    if (cep.length !== 8) {
      mostrarResultado('❌ CEP inválido. Deve conter 8 dígitos.');
      return;
    }
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (!response.ok) throw new Error('Erro na requisição');
        return response.json();
      })
      .then(data => {
        if (data.erro) {
          mostrarResultado('❌ CEP não encontrado.');
        } else {
          mostrarResultado(`
            <strong>Endereço:</strong> ${data.logradouro}<br>
            <strong>Bairro:</strong> ${data.bairro}<br>
            <strong>Cidade:</strong> ${data.localidade} - ${data.uf}<br>
            <strong>CEP:</strong> ${data.cep}
          `);
        }
      })
      .catch(() => mostrarResultado('❌ Erro ao buscar o CEP.'));
  });
  
  function mostrarResultado(msg) {
    document.getElementById('resultado').innerHTML = msg;
  }
  