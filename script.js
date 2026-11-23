const PRICES = {
  drinking: 600,
  technical: 300
};
const LITERS_PER_BARREL = 200;
const FORM_BASE_URL = 'https://forms.yandex.ru/u/6b03e270aeb3525e7973b0cf';

let barrels = 1;

const waterTypeSelect = document.getElementById('waterType');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const barrelCountEl = document.getElementById('barrelCount');
const totalLitersEl = document.getElementById('totalLiters');
const totalPriceEl = document.getElementById('totalPrice');
const selectButtons = document.querySelectorAll('.btn-select');
const formIframe = document.getElementById('yandexFormIframe');

const contactsModal = document.getElementById('contactsModal');
const openContactsBtn = document.getElementById('openContactsBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

function syncFormUrl(totalLiters, totalPrice) {
  if (!formIframe) return;

  const typeLabel = waterTypeSelect.value === 'drinking'
    ? 'Питьевая (600 ₽ / 200 л)'
    : 'Техническая — река Вилюй (300 ₽ / 200 л)';

  const params = new URLSearchParams({
    iframe: '1',
    water_type: typeLabel,
    barrels: String(barrels),
    liters: String(totalLiters),
    total_price: String(totalPrice)
  });

  formIframe.src = `${FORM_BASE_URL}?${params.toString()}`;
}

function updateCalculator() {
  const selectedType = waterTypeSelect.value;
  const pricePerBarrel = PRICES[selectedType];

  const totalLiters = barrels * LITERS_PER_BARREL;
  const totalPrice = barrels * pricePerBarrel;

  barrelCountEl.textContent = barrels;
  totalLitersEl.textContent = `${totalLiters} л`;
  totalPriceEl.textContent = `${totalPrice} ₽`;

  syncFormUrl(totalLiters, totalPrice);
}

minusBtn.addEventListener('click', () => {
  if (barrels > 1) {
    barrels--;
    updateCalculator();
  }
});

plusBtn.addEventListener('click', () => {
  if (barrels < 20) {
    barrels++;
    updateCalculator();
  }
});

waterTypeSelect.addEventListener('change', updateCalculator);

selectButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    waterTypeSelect.value = btn.dataset.type;
    updateCalculator();
    document.getElementById('order-section').scrollIntoView({ behavior: 'smooth' });
  });
});

openContactsBtn.addEventListener('click', () => {
  contactsModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  contactsModal.classList.add('hidden');
});

contactsModal.addEventListener('click', (event) => {
  if (event.target === contactsModal) {
    contactsModal.classList.add('hidden');
  }
});

updateCalculator();