// --- DADOS DE SUBMISSÃO DO GOOGLE FORM ---
const GOOGLE_FORM_SUBMIT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSen6fYSguq2ryvKriyO0Hfvf5G4XG2T82CLFM1bUTLJijhe5g/formResponse';
const NAME_FIELD_ID = 'entry.2112855462';
const SCORE_FIELD_ID = 'entry.656499958';

// --- 1. CONJUNTO COMPLETO DE 20 PERGUNTAS ---
const questions = [
    // 4 Perguntas: Tabelas & Estrutura
    { question: "Qual o nome dado a uma linha numa Tabela de Access?", options: ["Campo", "Consulta", "Registo", "Formulário"], answer: "Registo", studentAnswer: null },
    { question: "Qual o nome dado a uma coluna numa Tabela de Access?", options: ["Tabela", "Registo", "Campo Chave", "Campo"], answer: "Campo", studentAnswer: null },
    { question: "O que é que a Estrutura (ou Design View) de uma Tabela define?", options: ["Os dados inseridos", "O tipo de dados de cada Campo", "Os Relatórios a gerar", "As chaves externas"], answer: "O tipo de dados de cada Campo", studentAnswer: null },
    { question: "Uma base de dados bem estruturada minimiza a...", options: ["Validação", "Integridade", "Redundância", "Consulta"], answer: "Redundância", studentAnswer: null },
    
    // 4 Perguntas: Chave Primária/Estrangeira
    { question: "O que define a unicidade de cada linha (registo) numa tabela?", options: ["Chave Estrangeira", "Dados por Omissão", "Chave Primária", "Validação"], answer: "Chave Primária", studentAnswer: null },
    { question: "A Chave Estrangeira serve para estabelecer uma...", options: ["Consulta SQL", "Relação entre Tabelas", "Formatação de dados", "Cópia de segurança"], answer: "Relação entre Tabelas", studentAnswer: null },
    { question: "Uma Chave Primária pode ser nula (vazia)?", options: ["Sim, em relações 1:N", "Apenas se for de tipo texto", "Não, nunca pode ser nula", "Sim, desde que a tabela esteja vazia"], answer: "Não, nunca pode ser nula", studentAnswer: null },
    { question: "Numa relação 1:N (um para muitos), onde se deve colocar a Chave Estrangeira?", options: ["Na tabela do lado 1", "Na tabela do lado N", "Em ambas as tabelas", "Numa tabela de junção"], answer: "Na tabela do lado N", studentAnswer: null },

    // 4 Perguntas: Dados por Omissão e Validação
    { question: "Qual é o principal objetivo de uma Regra de Validação?", options: ["Aumentar o desempenho", "Garantir a precisão e consistência dos dados", "Gerar relatórios automáticos", "Esconder registos"], answer: "Garantir a precisão e consistência dos dados", studentAnswer: null },
    { question: "Qual das seguintes regras de validação impede que um campo 'Idade' receba um valor negativo?", options: ["NOT NULL", "< 100", "> 0", "IS NUMERIC"], answer: "> 0", studentAnswer: null },
    { question: "O valor 'Dados por Omissão' (Default Value) é inserido...", options: ["Quando o utilizador clica duas vezes no campo", "Quando o campo fica vazio", "Quando um novo registo é criado e o campo não é preenchido", "Após a submissão do formulário"], answer: "Quando um novo registo é criado e o campo não é preenchido", studentAnswer: null },
    { question: "Se o 'Texto de Validação' for 'Data Inválida', quando é que esta mensagem aparece?", options: ["Sempre que o utilizador clica no campo", "Quando a Regra de Validação não é cumprida", "Quando o tipo de dados é incorreto", "Ao fechar o Access"], answer: "Quando a Regra de Validação não é cumprida", studentAnswer: null },
    
    // 3 Perguntas: Formulários
    { question: "Os Formulários são usados principalmente para...", options: ["Análise de dados complexa", "Imprimir dados formatados", "Introdução e visualização de dados amigável", "Automatizar cálculos"], answer: "Introdução e visualização de dados amigável", studentAnswer: null },
    { question: "Qual a vantagem principal de usar um formulário em vez de editar diretamente a tabela?", options: ["Melhor desempenho", "Maior segurança e controlo sobre a entrada de dados", "Possibilidade de criar consultas", "Geração de gráficos"], answer: "Maior segurança e controlo sobre a entrada de dados", studentAnswer: null },
    { question: "No Modo de Estrutura de um Formulário, o que representa a 'Secção de Detalhe'?", options: ["O título e os logótipos", "As regras de validação", "A área onde os dados dos registos são exibidos", "Os botões de navegação"], answer: "A área onde os dados dos registos são exibidos", studentAnswer: null },

    // 3 Perguntas: Consultas (Queries)
    { question: "Qual é o principal propósito de uma Consulta de Seleção no Access?", options: ["Alterar dados permanentemente", "Filtrar, ordenar e resumir dados", "Criar novas tabelas", "Imprimir relatórios"], answer: "Filtrar, ordenar e resumir dados", studentAnswer: null },
    { question: "Se quiser ver apenas os registos do Porto, o que deve usar na Consulta?", options: ["Um Relatório", "Critérios (Criteria)", "Um Formulário", "Uma Chave Estrangeira"], answer: "Critérios (Criteria)", studentAnswer: null },
    { question: "O 'cálculo' de um novo campo (ex: Preço * 1.23) deve ser feito em qual objeto?", options: ["Tabela", "Formulário", "Relatório", "Consulta"], answer: "Consulta", studentAnswer: null },

    // 2 Perguntas: Relatórios
    { question: "Qual a função principal de um Relatório no Access?", options: ["Recolher dados do utilizador", "Analisar as relações da base de dados", "Apresentar e imprimir dados de forma formatada e organizada", "Inserir novos registos"], answer: "Apresentar e imprimir dados de forma formatada e organizada", studentAnswer: null },
    { question: "Num Relatório, qual Secção é usada para exibir totais e resumos para todo o documento?", options: ["Cabeçalho de Página", "Rodapé", "Cabeçalho de Relatório", "Detalhe"], answer: "Rodapé", studentAnswer: null }
];

// --- VARIÁVEIS DE ESTADO ---
let currentQuestionIndex = 0;
// currentSelectedOption é mantido para consistência, mas o valor real é guardado em questions[i].studentAnswer
let currentSelectedOption = null; 

const quizDiv = document.getElementById('quiz');
const resultsDiv = document.getElementById('results');
const scoreDisplay = document.getElementById('score-display');
const submitMessage = document.getElementById('submit-message');

// --- 2. FUNÇÕES DE LÓGICA DO TESTE ---

/**
 * Apresenta a pergunta atual no ecrã e os botões de navegação.
 */
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Se estiver no final, calcula e mostra os resultados
        calculateFinalScore();
        showResults();
        return;
    }

    const q = questions[currentQuestionIndex];
    currentSelectedOption = q.studentAnswer; // Carrega a resposta guardada

    let html = `
        <div class="question-box">
            <h4>Pergunta ${currentQuestionIndex + 1} de ${questions.length}</h4>
            <p><strong>${q.question}</strong></p>
    `;
    
    // Adicionar as opções
    q.options.forEach(option => {
        const isSelected = option === q.studentAnswer ? 'selected' : '';
        // selectOption guarda a resposta e ativa o botão de confirmação
        html += `<div class="option ${isSelected}" data-value="${option}" onclick="selectOption(this, '${option}')">${option}</div>`;
    });

    // Texto do botão de confirmação, que agora também navega
    let confirmButtonText = (currentQuestionIndex === questions.length - 1) ? 
        'Confirmar e Terminar Teste >>' : 
        'Confirmar e avançar >>';

    html += `</div>
        <div id="feedback"></div>
        <div class="navigation-buttons">
            <button id="prev-button" onclick="navigateQuestion(-1)" ${currentQuestionIndex === 0 ? 'disabled' : ''}>&lt;&lt; Anterior</button>
            <button id="confirm-button" onclick="confirmAnswer()" ${!q.studentAnswer ? 'disabled' : ''}>${confirmButtonText}</button>
        </div>`;
        
    quizDiv.innerHTML = html;
}

/**
 * Marca a opção clicada, guarda-a e ativa o botão de confirmação.
 * @param {HTMLElement} element - O elemento DIV da opção clicada.
 * @param {string} value - O valor da opção clicada.
 */
function selectOption(element, value) {
    // 1. Limpa a classe 'selected' de todas as opções
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 2. Adiciona a classe 'selected' à opção clicada
    element.classList.add('selected');
    currentSelectedOption = value;

    // 3. Guarda a resposta de forma persistente no array da pergunta
    questions[currentQuestionIndex].studentAnswer = value;
    
    // 4. Ativa o botão de confirmação
    document.getElementById('confirm-button').disabled = false;
    
    // Limpa o feedback (garante que não há texto)
    document.getElementById('feedback').textContent = '';
}

/**
 * ACEITA a resposta e AVANÇA para a próxima questão, sem dar feedback.
 */
function confirmAnswer() {
    // A resposta já foi guardada e o botão só está ativo se a resposta estiver selecionada.
    // Basta navegar para a próxima questão.
    navigateQuestion(1);
}

/**
 * Navega para a pergunta anterior ou próxima.
 * @param {number} step - -1 para anterior, 1 para próxima.
 */
function navigateQuestion(step) {
    currentQuestionIndex += step;
    
    // Verifica limites
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = 0; // Impede ir para trás da primeira
    } else if (currentQuestionIndex >= questions.length) {
        // Se for além da última (após o "Confirmar e Terminar")
        calculateFinalScore();
        showResults();
        return;
    }
    
    displayQuestion();
}

/**
 * Calcula a pontuação final (chamado apenas no fim do teste).
 */
function calculateFinalScore() {
    let finalScore = 0;
    questions.forEach(q => {
        if (q.studentAnswer === q.answer) {
            finalScore++;
        }
    });
    // Guarda o resultado final na variável global
    window.score = finalScore;
}

/**
 * Mostra o ecrã final com a pontuação.
 */
function showResults() {
    quizDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
    scoreDisplay.textContent = window.score;
}

/**
 * Envia os resultados para o Google Form/Sheet.
 */
function submitResults() {
    const name = document.getElementById('student-name').value.trim();
    if (name === "") {
        submitMessage.textContent = "Por favor, preencha o seu nome.";
        return;
    }
    
    const finalSubmitURL = GOOGLE_FORM_SUBMIT_URL.replace('/viewform', '/formResponse');
    
    const data = new FormData();
    data.append(NAME_FIELD_ID, name);
    data.append(SCORE_FIELD_ID, window.score); // Usa a pontuação calculada
    
    submitMessage.textContent = "A registar...";
    document.querySelector('#results button').disabled = true;

    fetch(finalSubmitURL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
    })
    .then(() => {
        submitMessage.textContent = `✅ Pontuação de ${window.score} registada com sucesso para ${name}!`;
        document.getElementById('student-name').disabled = true;
    })
    .catch(error => {
        console.error('Erro ao submeter:', error);
        submitMessage.textContent = "❌ Erro ao registar. Tente novamente ou informe o professor.";
        document.querySelector('#results button').disabled = false;
    });
}

// --- 3. INICIALIZAÇÃO ---
window.onload = displayQuestion;