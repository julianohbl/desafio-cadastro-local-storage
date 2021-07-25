const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },

  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("cadastro:cliente")) || [];
  },

  set(client) {
    localStorage.setItem(
      "cadastro:cliente",
      JSON.stringify(client)
    );
  },
};

const Client = {
  all: Storage.get(),

  add(client) {
    Client.all.push(client);
    App.reload();
  },

  remove(index) {
    Client.all.splice(index, 1);

    App.reload();
  },
};

const DOM = {
  ClientsContainer: document.querySelector("#data-table tbody"),

  addClient(client, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLClient(client, index);
    tr.dataset.index = index;

    DOM.ClientsContainer.appendChild(tr);
  },

  innerHTMLClient(client, index) {
    const html = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>
        <img onclick="Client.remove(${index})" src="../assets/minus.svg" alt="Remover cliente">
      </td>
    `;
    return html;
  },

  clearClients() {
    DOM.ClientsContainer.innerHTML = "";
  },
};

const Form = {
  name: document.querySelector("input#name"),
  email: document.querySelector("input#email"),
  phone: document.querySelector("input#phone"),

  getValues() {
    return {
      name: Form.name.value,
      email: Form.email.value,
      phone: Form.phone.value,
    };
  },

  validateFields() {
    const { name, email, phone } = Form.getValues();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === ""
    ) {
      throw new Error("Por favor preencha todos os campos");
    }
  },

  formatValues() {
    let = { name, email, phone } = Form.getValues();
    return {
      name,
      email,
      phone,
    };
  },

  clearFields() {
    Form.name.value = "";
    Form.email.value = "";
    Form.phone.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const client = Form.formatValues();
      Client.add(client);
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Client.all.forEach(DOM.addClient);
    Storage.set(Client.all);
  },
  reload() {
    DOM.clearClients();
    App.init();
  },
};

App.init();
