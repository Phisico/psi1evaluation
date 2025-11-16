// --- DADOS DE SUBMISSÃO DO GOOGLE FORM ---
const GOOGLE_FORM_SUBMIT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSen6fYSguq2ryvKriyO0Hfvf5G4XG2T82CLFM1bUTLJijhe5g/formResponse';
const NAME_FIELD_ID = 'entry.2112855462';
const SCORE_FIELD_ID = 'entry.656499958';

// --- CÓDIGO DE SEGURANÇA ---
const SECRET_UNLOCK_CODE = 'a3379bc'; 

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
    { question: "Numa relação 1:N (um para muitos), onde se deve colocar a Chave Estrangeira?", options: ["Na tabela do lado 'um'", "Na tabela do lado 'muitos'", "Em ambas as tabelas", "Numa tabela de junção"], answer: "Na tabela do lado 'muitos'", studentAnswer: null },

    // 4 Perguntas: Dados por Omissão e Validação
    { question: "Qual é o principal objetivo de uma Regra de Validação?", options: ["Aumentar o desempenho", "Garantir a precisão e consistência dos dados", "Gerar relatórios automáticos", "Esconder registos"], answer: "Garantir a precisão e consistência dos dados", studentAnswer: null },
    { question: "Qual das seguintes regras de validação impede que um campo 'Idade' receba um valor negativo?", options: ["NOT NULL", "< 100", "> 0", "IS NUMERIC"], answer: "> 0", studentAnswer: null },
    { question: "O valor 'Dados por Omissão' (Default Value) é inserido...", options: ["Quando o utilizador clica duas vezes no campo", "Quando o campo fica vazio", "Quando um novo registo é criado e o campo não é preenchido", "Após a submissão do formulário"], answer: "Quando um novo registo é criado e o campo não é preenchido", studentAnswer: null },
    { question: "Se o 'Texto de Validação' for 'Data Inválida', quando é que esta mensagem aparece?", options: ["Sempre que o utilizador clica no campo", "Quando a Regra de Validação não é cumprida", "Quando o tipo de dados é incorreto", "Ao fechar o Access"], answer: "Quando a Regra de Validação não é cumprida", studentAnswer: null },
    
    // 3 Perguntas: Formulários
    { question: "Os Formulários são usados principalmente para...", options: ["Análise de dados complexa", "Imprimir dados formatados", "Introdução e visualização de dados amigável", "Automatizar cálculos"], answer: "Introdução e visualização de dados amigável", studentAnswer: null },
    { question: "Qual a Vantagem principal de usar um formulário em vez de editar diretamente a tabela?", options: ["Melhor desempenho", "Maior segurança e controlo sobre a entrada de dados", "Possibilidade de criar consultas", "Geração de gráficos"], answer: "Maior segurança e controlo sobre a entrada de dados", studentAnswer: null },
    { question: "No Modo de Estrutura de um Formulário, o que representa a 'Secção de Detalhe'?", options: ["O título e os logótipos", "As regras de validação", "A área onde os dados dos registos são exibidos", "Os botões de navegação"], answer: "A área onde os dados dos registos são exibidos", studentAnswer: null },

    // 3 Perguntas: Consultas (Queries)
    { question: "Qual é o principal propósito de uma Consulta de Seleção no Access?", options: ["Alterar dados permanentemente", "Filtrar, ordenar e resumir dados", "Criar novas tabelas", "Imprimir relatórios"], answer: "Filtrar, ordenar e resumir dados", studentAnswer: null },
    { question: "Se quiser ver apenas os registos do Porto, o que deve usar na Consulta?", options: ["Um Relatório", "Critérios (Criteria)", "Um Formulário", "Uma Chave Estrangeira"], answer: "Critérios (Criteria)", studentAnswer: null },
    { question: "O 'cálculo' de um novo campo (ex: Preço * 1.23) deve ser feito em qual objeto?", options: ["Tabela", "Formulário", "Relatório", "Consulta"], answer: "Consulta", studentAnswer: null },

    // 2 Perguntas: Relatórios
    { question: "Qual a função principal de um Relatório no Access?", options: ["Recolher dados do utilizador", "Analisar as relações da base de dados", "Apresentar e imprimir dados de forma formatada e organizada", "Inserir novos registos"], answer: "Apresentar e imprimir dados de forma formatada e organizada", studentAnswer: null },
    { question: "Num Relatório, qual Secção é usada para exibir totais e resumos para todo o documento?", options: ["Cabeçalho de Página", "Rodapé de Grupo", "Cabeçalho de Relatório", "Detalhe"], answer: "Rodapé de Grupo", studentAnswer: null }
];

// --- VARIÁVEIS DE ESTADO E SEGURANÇA ---
let currentQuestionIndex = 0;
let currentSelectedOption = null; 
let isTestBlocked = false; // Estado do bloqueio

const quizDiv = document.getElementById('quiz');
const resultsDiv = document.getElementById('results');
const scoreDisplay = document.getElementById('score-display');
const submitMessage = document.getElementById('submit-message');

const blockOverlay = document.getElementById('block-overlay');
const unlockButton = document.getElementById('unlock-button');
const unlockCodeInput = document.getElementById('unlock-code-input');
const unlockFeedback = document.getElementById('unlock-feedback');

// --- FUNÇÕES DE SEGURANÇA ---

/**
 * Bloqueia o teste, tornando a overlay visível e iniciando o flash.
 */
function blockTest() {
    // Bloqueia apenas se o teste estiver a decorrer (ainda não terminou)
    if (currentQuestionIndex < questions.length) { 
        isTestBlocked = true;
        blockOverlay.style.display = 'flex';
        // Adiciona a classe para iniciar a animação de flash
        blockOverlay.classList.add('flashing'); 
        document.body.style.overflow = 'hidden'; 
        // Limpa e foca o campo para o professor
        unlockCodeInput.value = '';
        unlockFeedback.textContent = '';
        unlockCodeInput.focus();
    }
}

/**
 * Tenta desbloquear o teste usando o código.
 */
function attemptUnlock() {
    const enteredCode = unlockCodeInput.value.trim();
    
    if (enteredCode === SECRET_UNLOCK_CODE) {
        unlockTest();
    } else {
        unlockFeedback.textContent = '❌ Código incorreto. Tente novamente.';
        unlockCodeInput.value = ''; // Limpa o campo
        unlockCodeInput.focus();
    }
}

/**
 * Desbloqueia o teste (chamado por attemptUnlock se o código for correto).
 */
function unlockTest() {
    isTestBlocked = false;
    // Remove a classe para parar a animação
    blockOverlay.classList.remove('flashing'); 
    blockOverlay.style.display = 'none';
    document.body.style.overflow = '';
    unlockCodeInput.value = '';
    unlockFeedback.textContent = '';
    // Recarrega a questão atual para garantir que o estado visual é restaurado
    displayQuestion(); 
}

/**
 * Configura os event listeners para detetar perda de foco e o desbloqueio.
 */
function setupFocusDetection() {
    // 1. EVENTO DE PERDA DE FOCO (Sair da aba/janela)
    window.addEventListener('blur', blockTest);

    // 2. NOVO: Evento de MOUSE LEAVING (Sair da área da janela)
    document.addEventListener('mouseleave', blockTest); 
    
    // 3. AÇÃO DE DESBLOQUEIO MANUAL (Botão "DESBLOQUEAR")
    unlockButton.addEventListener('click', attemptUnlock);
    
    // 4. Permite desbloqueio via tecla Enter
    unlockCodeInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            attemptUnlock();
        }
    });
}
// --- 2. FUNÇÕES DE LÓGICA DO TESTE ---

function displayQuestion() {
    // Verifica e impõe o bloqueio se estiver ativo
    if (isTestBlocked) {
        blockTest();
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        calculateFinalScore();
        showResults();
        return;
    }

    const q = questions[currentQuestionIndex];
    currentSelectedOption = q.studentAnswer;

    let html = `
        <div class="question-box">
            <h4>Pergunta ${currentQuestionIndex + 1} de ${questions.length}</h4>
            <p><strong>${q.question}</strong></p>
    `;
    
    q.options.forEach(option => {
        const isSelected = option === q.studentAnswer ? 'selected' : '';
        html += `<div class="option ${isSelected}" data-value="${option}" onclick="selectOption(this, '${option}')">${option}</div>`;
    });

    let confirmButtonText = (currentQuestionIndex === questions.length - 1) ? 
        'Confirmar e Terminar Teste >>' : 
        'Confirmar e Próxima >>';

    html += `</div>
        <div id="feedback"></div>
        <div class="navigation-buttons">
            <button id="prev-button" onclick="navigateQuestion(-1)" ${currentQuestionIndex === 0 ? 'disabled' : ''}>&lt;&lt; Anterior</button>
            <button id="confirm-button" onclick="confirmAnswer()" ${!q.studentAnswer ? 'disabled' : ''}>${confirmButtonText}</button>
        </div>`;
        
    quizDiv.innerHTML = html;
}

function selectOption(element, value) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    element.classList.add('selected');
    currentSelectedOption = value;

    questions[currentQuestionIndex].studentAnswer = value;
    
    document.getElementById('confirm-button').disabled = false;
    
    document.getElementById('feedback').textContent = '';
}

function confirmAnswer() {
    navigateQuestion(1);
}

function navigateQuestion(step) {
    // Verifica bloqueio antes de avançar/retroceder
    if (isTestBlocked) {
        blockTest();
        return;
    }
    
    currentQuestionIndex += step;
    
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = 0;
    } else if (currentQuestionIndex >= questions.length) {
        calculateFinalScore();
        showResults();
        return;
    }
    
    displayQuestion();
}

function calculateFinalScore() {
    let finalScore = 0;
    questions.forEach(q => {
        if (q.studentAnswer === q.answer) {
            finalScore++;
        }
    });
    window.score = finalScore;
}

function showResults() {
    quizDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
    scoreDisplay.textContent = window.score;
}

function submitResults() {
    const name = document.getElementById('student-name').value.trim();
    if (name === "") {
        submitMessage.textContent = "Por favor, preencha o seu nome.";
        return;
    }
    
    const finalSubmitURL = GOOGLE_FORM_SUBMIT_URL; 
    
    const data = new FormData();
    data.append(NAME_FIELD_ID, name);
    data.append(SCORE_FIELD_ID, window.score); 
    
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
setupFocusDetection(); 
// NOTA: A chamada displayQuestion() deve ser gerida pelo script inline no index.html 
// para coordenar com o carregamento da imagem de cabeçalho.