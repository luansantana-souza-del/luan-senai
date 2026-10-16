

lucide.createIcons();


let selectedPaymentMethod = 'pix';

function goToStep(stepNumber) {

    document.querySelectorAll('.page-step').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${stepNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

  
    updateProgressBar(stepNumber);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar(step) {
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');
    
    const step1 = document.getElementById('step-nav-1');
    const step2 = document.getElementById('step-nav-2');
    const step3 = document.getElementById('step-nav-3');

    [step1, step2, step3].forEach(el => {
        el.className = 'text-slate-400 flex items-center space-x-2 transition-all';
        el.querySelector('.step-badge').className = 'step-badge w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center font-bold text-xs bg-white';
    });

    if (step === 1) {
        line1.style.width = '0%';
        line2.style.width = '0%';
        step1.className = 'step-active flex items-center space-x-2 transition-all';
    } else if (step === 2) {
        line1.style.width = '100%';
        line2.style.width = '0%';
        step1.className = 'step-done flex items-center space-x-2 transition-all';
        step2.className = 'step-active flex items-center space-x-2 transition-all';
    } else if (step === 3) {
        line1.style.width = '100%';
        line2.style.width = '100%';
        step1.className = 'step-done flex items-center space-x-2 transition-all';
        step2.className = 'step-done flex items-center space-x-2 transition-all';
        step3.className = 'step-active flex items-center space-x-2 transition-all';
    }
}

function setPaymentMethod(method) {
    selectedPaymentMethod = method;

    const tabs = ['pix', 'card', 'boleto'];
    tabs.forEach(m => {
        const tabBtn = document.getElementById(`pay-tab-${m}`);
        const panel = document.getElementById(`pay-panel-${m}`);

        if (m === method) {
            tabBtn.className = 'py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 border-blue-600 bg-blue-50 text-blue-700 transition';
            panel.classList.remove('hidden');
        } else {
            tabBtn.className = 'py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold flex flex-col items-center justify-center gap-1 text-slate-600 hover:bg-slate-50 transition';
            panel.classList.add('hidden');
        }
    });

    const summaryPrice = document.getElementById('summary-price');
    if(method === 'pix') {
        summaryPrice.textContent = 'R$ 297,00';
    } else {
        summaryPrice.textContent = 'R$ 29,70 /mês';
    }
}

function processOrder() {
    const nameInput = document.getElementById('cust-name');
    const emailInput = document.getElementById('cust-email');
    const phoneInput = document.getElementById('cust-phone');

    let isValid = true;

    if (!nameInput.value.trim()) {
        document.getElementById('err-name').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('err-name').classList.add('hidden');
    }

    if (!emailInput.value.includes('@')) {
        document.getElementById('err-email').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('err-email').classList.add('hidden');
    }

    if (!phoneInput.value.trim()) {
        document.getElementById('err-phone').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('err-phone').classList.add('hidden');
    }

    if (!isValid) return;

    const randomOrderId = '#FS-' + Math.floor(10000 + Math.random() * 90000);
    
    document.getElementById('out-order-id').textContent = randomOrderId;
    document.getElementById('out-name').textContent = nameInput.value;
    document.getElementById('out-email').textContent = emailInput.value;
    
    let methodLabel = 'PIX';
    let statusLabel = 'Aprovado (Instantâneo)';
    if (selectedPaymentMethod === 'card') {
        methodLabel = 'Cartão de Crédito (12x)';
        statusLabel = 'Aprovado';
    } else if (selectedPaymentMethod === 'boleto') {
        methodLabel = 'Boleto Bancário';
        statusLabel = 'Aguardando Pagamento';
    }

    document.getElementById('out-method').textContent = methodLabel;
    document.getElementById('out-status').textContent = statusLabel;

    goToStep(3);
}