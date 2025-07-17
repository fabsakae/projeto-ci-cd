// Este é um arquivo JavaScript simples para o meu projeto CI/CD e DevSecOps.

function greet(name) {
  console.log("Olá, " + name + "! Seu pipeline está funcionando.");
}

greet("DevSecOps Student");

// Exemplo de uma vulnerabilidade BÁSICA (apenas para teste de ferramenta)
// NUNCA faça isso em código real!
function unsafeFunction(userInput) {
  // Exemplo de possível injeção de comando ou eval inseguro
  // console.log("Executando: " + eval(userInput)); // Não descomentar em ambiente de produção
  console.log("Input recebido: " + userInput);
}

// Chamada para a função insegura (apenas para o scanner encontrar)
// unsafeFunction("1 + 1");