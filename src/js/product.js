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
    return JSON.parse(localStorage.getItem("cadastro:produto")) || [];
  },

  set(product) {
    localStorage.setItem("cadastro:produto", JSON.stringify(product));
  },
};

const Product = {
  all: Storage.get(),

  add(product) {
    Product.all.push(product);
    App.reload();
  },

  remove(index) {
    Product.all.splice(index, 1);

    App.reload();
  },
};

const DOM = {
  ProductsContainer: document.querySelector("#data-table tbody"),

  addProduct(product, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLProduct(product, index);
    tr.dataset.index = index;

    DOM.ProductsContainer.appendChild(tr);
  },

  innerHTMLProduct(product, index) {
    const html = `
      <td>${product.code}</td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.amount}</td>
      <td>
        <img onclick="Product.remove(${index})" src="../assets/minus.svg" alt="Remover produto">
      </td>
    `;
    return html;
  },

  clearProducts() {
    DOM.ProductsContainer.innerHTML = "";
  },
};

const Form = {
  code: document.querySelector("input#code"),
  name: document.querySelector("input#name"),
  category: document.querySelector("input#category"),
  price: document.querySelector("input#price"),
  amount: document.querySelector("input#amount"),

  getValues() {
    return {
      code: Form.code.value,
      name: Form.name.value,
      category: Form.category.value,
      price: Form.price.value,
      amount: Form.amount.value,
    };
  },

  validateFields() {
    const { code, name, category, price, amount } = Form.getValues();

    if (
      code.trim() === "" ||
      name.trim() === "" ||
      category.trim() === "" ||
      price.trim() === "" ||
      amount.trim() === ""
    ) {
      throw new Error("Por favor preencha todos os campos");
    }
  },

  formatValues() {
    let = { code, name, category, price, amount } = Form.getValues();
    return {
      code,
      name,
      category,
      price,
      amount,
    };
  },

  clearFields() {
    Form.code.value = "";
    Form.name.value = "";
    Form.category.value = "";
    Form.price.value = "";
    Form.amount.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const product = Form.formatValues();
      Product.add(product);
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Product.all.forEach(DOM.addProduct);
    Storage.set(Product.all);
  },
  reload() {
    DOM.clearProducts();
    App.init();
  },
};

App.init();
