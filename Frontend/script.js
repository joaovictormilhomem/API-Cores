window.onload = function () {

  function createColorElement(colorData) {
    const colorsElement = document.getElementById('colors');

    const colorContainerElement = document.createElement('div');
    colorContainerElement.className = 'color-container';

    const colorElement = document.createElement('div');
    colorElement.className = 'color';
    colorElement.style.backgroundColor = `#${colorData.hexCode}`;
    colorContainerElement.appendChild(colorElement);
    colorElement.onclick = () => navigator.clipboard.writeText(`#${colorData.hexCode}`);
    colorElement.innerText = colorData.pKey;

    const colorNameElement = document.createElement('p');
    colorNameElement.className = 'color-name';
    colorNameElement.innerText = colorData.colorName;
    colorContainerElement.appendChild(colorNameElement);

    colorsElement.appendChild(colorContainerElement);
  }

  function createColor(hexCode, colorName) {
    const fetchData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hexCode, colorName }),
    }
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3003/api/color', fetchData)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  function updateColor(pKey, hexCode, colorName) {
    const fetchData = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pKey, hexCode, colorName }),
    }
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3003/api/color', fetchData)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  function deleteColor(pKey) {
    const fetchData = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pKey }),
    }
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3003/api/color', fetchData)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  function getColors() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3003/api/colors')
        .then(res => res.json())
        .then(data => resolve(data.result))
        .catch(err => resolve(err))
    })
  }

  async function start() {
    const hexCodeInput = document.getElementById('hexCodeInput');
    const colorNameInput = document.getElementById('colorNameInput');
    const pKeyInput = document.getElementById('pKeyInput');
    const newColorBtn = document.getElementById('newColorBtn');
    const changeColorBtn = document.getElementById('changeColorBtn');
    const deleteColorBtn = document.getElementById('deleteColorBtn');

    newColorBtn.onclick = async () => {
      const response = await createColor(hexCodeInput.value, colorNameInput.value);
      response.error ? alert(response.error) : location.reload();
    };
    changeColorBtn.onclick = async () => {
      const response = await updateColor(pKeyInput.value, hexCodeInput.value, colorNameInput.value);
      response.error ? alert(response.error) : location.reload();
    };
    deleteColorBtn.onclick = async () => {
      const response = await deleteColor(pKeyInput.value);
      response.error ? alert(response.error) : location.reload();
    };

    const colorDatas = await getColors();
    if (colorDatas) {
      colorDatas.forEach(colorData => {
        createColorElement(colorData);
      });
    }
  }

  start();
}