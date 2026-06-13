const api = '/api';

const form = document.querySelector('#reservation-form');
const feedback = document.querySelector('#feedback');
const tableMap = document.querySelector('#table-map');
const tableDetails = document.querySelector('#table-details');
const reservationsList = document.querySelector('#reservations-list');
const filterButton = document.querySelector('#filter-button');

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
}

function showFeedback(message, type = 'success') {
  feedback.textContent = message;
  feedback.className = type;
}

async function request(path, options = {}) {
  const response = await fetch(`${api}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Erro na requisição.');
  return payload;
}

async function loadTableMap() {
  const { data } = await request('/tables/map');
  tableMap.innerHTML = '';

  data.forEach((table) => {
    const item = document.createElement('button');
    item.className = `table-card ${table.visualStatus}`;
    item.innerHTML = `Mesa ${table.number}<small>${table.capacity} lugares<br>${table.location}</small>`;
    item.onclick = () => {
      if (!table.currentReservation) {
        tableDetails.innerHTML = `<strong>Mesa ${table.number}</strong><p>Disponível para reserva.</p>`;
        form.tableNumber.value = table.number;
        return;
      }
      tableDetails.innerHTML = `
        <strong>Mesa ${table.number}</strong>
        <p>Status: ${table.visualStatus}</p>
        <p>Cliente: ${table.currentReservation.customerName}</p>
        <p>Horário: ${formatDate(table.currentReservation.reservationDate)}</p>
      `;
    };
    tableMap.appendChild(item);
  });
}

function getFilters() {
  const params = new URLSearchParams();
  const customerName = document.querySelector('#filter-client').value;
  const tableNumber = document.querySelector('#filter-table').value;
  const date = document.querySelector('#filter-date').value;
  const status = document.querySelector('#filter-status').value;

  if (customerName) params.set('customerName', customerName);
  if (tableNumber) params.set('tableNumber', tableNumber);
  if (date) params.set('date', date);
  if (status) params.set('status', status);
  return params.toString();
}

async function loadReservations() {
  const query = getFilters();
  const { data } = await request(`/reservations${query ? `?${query}` : ''}`);

  reservationsList.innerHTML = '';

  data.forEach((reservation) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${reservation.customerName}</td>
      <td>${reservation.customerContact}</td>
      <td>${reservation.tableNumber}</td>
      <td>${reservation.peopleCount}</td>
      <td>${formatDate(reservation.reservationDate)}</td>
      <td><span class="badge ${reservation.status}">${reservation.status}</span></td>
      <td class="actions-cell">
        <button class="menu-btn">⋯</button>

        <div class="action-menu">
          <button class="edit-btn">Editar reserva</button>
          <button class="cancel-btn-menu">Cancelar reserva</button>
          <button class="delete-btn">Excluir reserva</button>
        </div>
      </td>
    `;

    const menuButton = row.querySelector('.menu-btn');
    const menu = row.querySelector('.action-menu');
    const editButton = row.querySelector('.edit-btn');
    const cancelButton = row.querySelector('.cancel-btn-menu');
    const deleteButton = row.querySelector('.delete-btn');

    menuButton.onclick = () => {
      document.querySelectorAll('.action-menu').forEach((item) => {
        if (item !== menu) item.classList.remove('show');
      });

      menu.classList.toggle('show');
    };

    editButton.onclick = () => {
      openEditModal(reservation);
      menu.classList.remove('show');
    };

    cancelButton.onclick = async () => {
      if (reservation.status === 'cancelado') {
        showFeedback('Esta reserva já está cancelada.', 'error');
        return;
      }

      const confirmCancel = confirm(
        `Tem certeza que deseja cancelar a reserva de ${reservation.customerName}?\n\nA reserva continuará registrada no sistema, mas a mesa ficará disponível para novas reservas.`
      );

      if (!confirmCancel) return;

      await request(`/reservations/${reservation._id}`, {
        method: 'DELETE'
      });

      showFeedback('Reserva cancelada com sucesso.');
      await refresh();
    };

    deleteButton.onclick = async () => {
      const confirmDelete = confirm(
        'Tem certeza que deseja excluir esta reserva?\n\nA reserva será excluída definitivamente e a mesa ficará disponível.'
      );

      if (!confirmDelete) return;

      await request(`/reservations/${reservation._id}/delete`, {
        method: 'DELETE'
      });

      showFeedback('Reserva excluída com sucesso.');
      await refresh();
    };

    reservationsList.appendChild(row);
  });
}

async function refresh() {
  await Promise.all([loadReservations(), loadTableMap()]);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.tableNumber = Number(data.tableNumber);
  data.peopleCount = Number(data.peopleCount);

  try {
    const result = await request('/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    showFeedback(result.message);
    form.reset();
    await refresh();
  } catch (error) {
    showFeedback(error.message, 'error');
  }
});

const modal = document.createElement('div');

modal.className = 'modal-overlay';
modal.innerHTML = `
  <div class="modal">
    <h2>Editar reserva</h2>

    <form id="edit-form">
      <input name="customerName" placeholder="Nome do cliente" required>
      <input name="customerContact" placeholder="Contato" required>
      <input name="tableNumber" type="number" placeholder="Número da mesa" required>
      <input name="peopleCount" type="number" placeholder="Quantidade de pessoas" required>
      <input name="reservationDate" type="datetime-local" required>
      <textarea name="notes" placeholder="Observações"></textarea>

      <div class="modal-actions">
        <button type="button" id="cancel-edit">Cancelar edição</button>
        <button type="submit">Confirmar edição</button>
      </div>
    </form>
  </div>
`;

document.body.appendChild(modal);

let editingReservationId = null;

function toDatetimeLocal(date) {
  const value = new Date(date);
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
  return value.toISOString().slice(0, 16);
}

function openEditModal(reservation) {
  editingReservationId = reservation._id;

  const editForm = document.querySelector('#edit-form');

  editForm.customerName.value = reservation.customerName;
  editForm.customerContact.value = reservation.customerContact;
  editForm.tableNumber.value = reservation.tableNumber;
  editForm.peopleCount.value = reservation.peopleCount;
  editForm.reservationDate.value = toDatetimeLocal(reservation.reservationDate);
  editForm.notes.value = reservation.notes || '';

  modal.classList.add('show');
}

document.querySelector('#cancel-edit').onclick = () => {
  modal.classList.remove('show');
  editingReservationId = null;
};

document.querySelector('#edit-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target));

  data.tableNumber = Number(data.tableNumber);
  data.peopleCount = Number(data.peopleCount);

  await request(`/reservations/${editingReservationId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  modal.classList.remove('show');
  editingReservationId = null;

  showFeedback("Reserva atualizada com sucesso.");
  await refresh();
});

filterButton.addEventListener('click', loadReservations);
refresh().catch((error) => showFeedback(error.message, 'error'));
